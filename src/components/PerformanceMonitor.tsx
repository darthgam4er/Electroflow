'use client';

import { useEffect, useState } from 'react';
import { performanceUtils } from '@/lib/performance';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  dns?: number;
  tcp?: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_PERFORMANCE === 'true') {
      setIsVisible(true);
    }

    // Measure Core Web Vitals
    const measurePerformance = () => {
      // First Contentful Paint
      if ('PerformanceObserver' in window) {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'largest-contentful-paint') {
              setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-input') {
              setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (entry.name === 'layout-shift' && !(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Navigation timing
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          setMetrics(prev => ({
            ...prev,
            ttfb: navigation.responseStart - navigation.requestStart,
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
          }));
        }
      }
    };

    measurePerformance();

    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const getPerformanceScore = (metric: keyof PerformanceMetrics) => {
    const value = metrics[metric];
    if (value === undefined) return 'N/A';

    switch (metric) {
      case 'fcp':
        return value < 1800 ? '🟢 Good' : value < 3000 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'lcp':
        return value < 2500 ? '🟢 Good' : value < 4000 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'fid':
        return value < 100 ? '🟢 Good' : value < 300 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'cls':
        return value < 0.1 ? '🟢 Good' : value < 0.25 ? '🟡 Needs Improvement' : '🔴 Poor';
      case 'ttfb':
        return value < 800 ? '🟢 Good' : value < 1800 ? '🟡 Needs Improvement' : '🔴 Poor';
      default:
        return `${value.toFixed(2)}ms`;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2 text-green-400">Performance Monitor</div>
      <div className="space-y-1">
        <div>FCP: {getPerformanceScore('fcp')}</div>
        <div>LCP: {getPerformanceScore('lcp')}</div>
        <div>FID: {getPerformanceScore('fid')}</div>
        <div>CLS: {getPerformanceScore('cls')}</div>
        <div>TTFB: {getPerformanceScore('ttfb')}</div>
        <div>DNS: {getPerformanceScore('dns')}</div>
        <div>TCP: {getPerformanceScore('tcp')}</div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-400 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
