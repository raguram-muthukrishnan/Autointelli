import React, { useEffect, useRef, useState } from 'react';

const CaptchaWrapper = ({ onChange }) => {
    const containerRef = useRef(null);
    const [widgetId, setWidgetId] = useState(null);
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
        console.error("VITE_TURNSTILE_SITE_KEY is not set in environment variables");
        return null;
    }

    useEffect(() => {
        // 1. Inject Script if not present
        const scriptId = 'cloudflare-turnstile-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }

        // 2. Initialize Widget
        const renderWidget = () => {
            if (window.turnstile && containerRef.current && !widgetId) {
                try {
                    const id = window.turnstile.render(containerRef.current, {
                        sitekey: siteKey,
                        callback: (token) => {
                            console.log("Turnstile success:", token);
                            onChange(token);
                        },
                        'error-callback': (err) => {
                            console.error("Turnstile error:", err);
                            onChange(null);
                        },
                        'expired-callback': () => {
                            console.warn("Turnstile expired");
                            onChange(null);
                        },
                        theme: 'light',
                    });
                    setWidgetId(id);
                } catch (e) {
                    console.error("Turnstile render error:", e);
                }
            }
        };

        // Try to render immediately if script is loaded
        if (window.turnstile) {
            renderWidget();
        } else {
            // Otherwise wait for script load
            window.onloadTurnstileCallback = renderWidget;
            // Also check aggressively in case onload passed
            const interval = setInterval(() => {
                if (window.turnstile) {
                    clearInterval(interval);
                    renderWidget();
                }
            }, 500);
            return () => clearInterval(interval);
        }

    }, [siteKey]); // Re-run if siteKey changes (should not happen often)

    return (
        <div
            ref={containerRef}
            className="captcha-container"
            style={{ margin: "15px 0", minHeight: "65px" }}
        ></div>
    );
};

export default CaptchaWrapper;
