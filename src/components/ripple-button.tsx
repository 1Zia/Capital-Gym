import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RippleEntry {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
}

export function RippleButton({
  children,
  onClick,
  rippleColor = 'rgba(255,255,255,0.3)',
  className = '',
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<RippleEntry[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!reducedMotion && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {!reducedMotion && ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0, 0.8, 1] }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
