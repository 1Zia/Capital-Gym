import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  proximityZone?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  proximityZone = 60,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{
        padding: proximityZone,
        margin: -proximityZone,
        display: 'inline-block',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div ref={buttonRef}>
        <motion.div style={{ x: springX, y: springY }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
