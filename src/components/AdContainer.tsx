import { useEffect } from 'react';

interface AdContainerProps {
  slotId?: string;
  className?: string;
}

export function AdContainer({ slotId = 'default-slot', className = '' }: AdContainerProps) {
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div 
      className={`ad-container flex justify-center items-center bg-slate-100 border border-slate-200 min-h-[250px] my-5 overflow-hidden w-full ${className}`}
      data-ad-status="unfilled"
    >
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-PUB-YOUR_CLIENT_ID"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
