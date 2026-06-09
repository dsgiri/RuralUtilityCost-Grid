import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    
    // Track consent acceptance
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cookie_consent_accepted');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 z-50 text-white flex flex-col sm:flex-row items-center justify-between shadow-2xl text-[13px]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <div className="flex-grow text-center md:text-left">
          <p>
            We use cookies to analyze traffic, personalize content, and operate our platform. 
            By continuing to use this site, you agree to our use of cookies and our privacy policy.
          </p>
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          <a href="https://ruralutilitycost.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-slate-300 hover:text-white underline underline-offset-2 decoration-slate-500 font-medium tracking-wide">
            Read Policy
          </a>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold transition-colors shadow-sm"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
