import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label }) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Extract number from string, e.g. "2500+" -> 2500, "24/7" -> 24
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 100;
  const suffix = value.replace(String(target), '');
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 rounded-2xl glass-panel glow-gold/5 text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-brand-gold font-sans tracking-tight mb-2">
        {value.includes('/') ? value : `${count}${suffix}`}
      </div>
      <div className="text-sm font-medium uppercase tracking-widest text-brand-textSecondary">
        {label}
      </div>
    </div>
  );
};
