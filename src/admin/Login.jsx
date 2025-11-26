import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './admin.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    console.log('🔐 Login attempt started');
    console.log('📧 Email/Identifier:', email);
    console.log('🔑 Password length:', password.length);

    try {
      const loginPayload = {
        identifier: email,
        password: password,
      };
      
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      
      console.log('📤 Sending login request to Strapi...');
      console.log('🎯 Endpoint:', `${STRAPI_URL}/api/auth/local`);
      console.log('📦 Payload:', { identifier: email, password: '***' });

      // Authenticate with Strapi
      const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Login failed - Error data:', errorData);
        console.error('❌ Error message:', errorData.error?.message);
        console.error('❌ Error details:', errorData.error?.details);
        throw new Error(errorData.error?.message || 'Invalid credentials');
      }

      const data = await response.json();
      console.log('✅ Login successful!');
      console.log('👤 User data:', {
        id: data.user?.id,
        username: data.user?.username,
        email: data.user?.email,
        confirmed: data.user?.confirmed,
        blocked: data.user?.blocked,
        role: data.user?.role
      });
      console.log('🎫 JWT token received:', data.jwt ? 'Yes (length: ' + data.jwt.length + ')' : 'No');
      
      // Store JWT token and user info
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAdmin', 'true');
      
      console.log('💾 Stored in localStorage:');
      console.log('  - jwt:', localStorage.getItem('jwt') ? 'Stored' : 'Failed');
      console.log('  - user:', localStorage.getItem('user') ? 'Stored' : 'Failed');
      console.log('  - isAdmin:', localStorage.getItem('isAdmin'));
      
      console.log('🚀 Redirecting to dashboard...');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('❌ Login error caught:', err);
      console.error('❌ Error message:', err.message);
      console.error('❌ Error stack:', err.stack);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (err.message.includes('Invalid identifier or password')) {
        errorMessage = 'Invalid email or password. Make sure you created a regular user account (not super admin). See CREATE_USER_FOR_LOGIN.md';
        console.log('💡 Hint: You need to create a regular user in Strapi, not use super admin credentials');
      } else if (err.message.includes('confirmed')) {
        errorMessage = 'Your account is not confirmed. Please check the "Confirmed" box in Strapi Admin → User.';
        console.log('💡 Hint: Go to Strapi Admin → Content Manager → User → Check "Confirmed"');
      } else if (err.message.includes('blocked')) {
        errorMessage = 'Your account is blocked. Please uncheck "Blocked" in Strapi Admin → User.';
        console.log('💡 Hint: Go to Strapi Admin → Content Manager → User → Uncheck "Blocked"');
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home Link */}
      <Link to="/" className="back-to-home">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Home page
      </Link>

      <div className="login-box">
        {/* Logo/Brand */}
        <div className="login-logo">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">We missed you! Please enter your details.</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3L21 21M10.5 10.5C10.1872 10.8128 10 11.2444 10 11.7C10 12.1556 10.1872 12.5872 10.5 13.0C10.8128 13.3128 11.2444 13.5 11.7 13.5C12.1556 13.5 12.5872 13.3128 13.0 13.0M10.5 10.5L13.0 13.0M10.5 10.5L7.36364 7.36364M13.0 13.0L16.6364 16.6364M7.36364 7.36364C5.68182 8.46364 4.36364 10.0909 3 12C5.45455 16.3636 8.18182 18.5455 12 18.5455C13.3636 18.5455 14.6364 18.1818 15.8182 17.5455M7.36364 7.36364L15.8182 17.5455M16.6364 16.6364C18.3182 15.5364 19.6364 13.9091 21 12C18.5455 7.63636 15.8182 5.45455 12 5.45455C10.6364 5.45455 9.36364 5.81818 8.18182 6.45455L16.6364 16.6364Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-signin">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
