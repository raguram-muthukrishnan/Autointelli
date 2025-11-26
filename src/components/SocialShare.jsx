import React from 'react';

const SocialShare = ({ title, excerpt, url }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = encodeURIComponent(title || 'Check this out!');
  const shareText = encodeURIComponent(excerpt || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${encodeURIComponent(shareUrl)}`
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#4a5568' }}>Share:</span>
      
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#1DA1F2', 
          color: '#fff',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        title="Share on Twitter"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
        </svg>
      </a>

      <a 
        href={shareLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#0A66C2', 
          color: '#fff',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        title="Share on LinkedIn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      </a>

      <a 
        href={shareLinks.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#1877F2', 
          color: '#fff',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        title="Share on Facebook"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      </a>

      <a 
        href={shareLinks.email}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#718096', 
          color: '#fff',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        title="Share via Email"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>

      {navigator.share && (
        <button 
          onClick={handleNativeShare}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: '#FFD600', 
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          title="Share"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SocialShare;
