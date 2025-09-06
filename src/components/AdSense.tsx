'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'banner';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' },
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        (window.adsbygoogle as unknown[]).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

// 미리 정의된 광고 컴포넌트들
export function BannerAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="YOUR_AD_SLOT_ID"
      adFormat="banner"
      className={className}
      style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
    />
  );
}

export function RectangleAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="YOUR_AD_SLOT_ID"
      adFormat="rectangle"
      className={className}
      style={{ display: 'inline-block', width: '300px', height: '250px' }}
    />
  );
}

export function ResponsiveAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="YOUR_AD_SLOT_ID"
      adFormat="auto"
      className={className}
      style={{ display: 'block', minHeight: '200px' }}
    />
  );
}