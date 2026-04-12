import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  perspective?: number;
  'data-testid'?: string;
}

export function TiltCard({ children, className = '', maxAngle = 7, perspective = 900, 'data-testid': testId }: TiltCardProps) {
  const reducedMotion = useReducedMotion();
  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 22, mass: 0.4 };
  const xSpring = useSpring(xMV, springConfig);
  const ySpring = useSpring(yMV, springConfig);
  const rotateX = useTransform(ySpring, [-1, 1], [maxAngle, -maxAngle]);
  const rotateY = useTransform(xSpring, [-1, 1], [-maxAngle, maxAngle]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    xMV.set((e.clientX - rect.left) / rect.width * 2 - 1);
    yMV.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const handleMouseLeave = () => {
    xMV.set(0);
    yMV.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: perspective }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {children}
    </motion.div>
  );
}
