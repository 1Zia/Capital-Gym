import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  /** Semantic HTML element rendered as the wrapper. Defaults to 'span'. */
  as?: React.ElementType;
  /** Alias for `as` — accepts h1–h4 for convenience. Overrides `as` when provided. */
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  mode?: 'chars' | 'words';
  delay?: number;
  stagger?: number;
  className?: string;
}

/**
 * KineticText — animated character or word reveal on scroll entry.
 *
 * Each character/word slides up from behind an overflow-hidden clip with a
 * staggered delay. All motion respects `prefers-reduced-motion`.
 *
 * Space characters are rendered as text nodes (non-breaking space) so that
 * the element's text content is accessible to screen readers and test queries.
 */
export function KineticText({
  text,
  as: asProp = 'span',
  level,
  mode = 'chars',
  delay = 0,
  stagger,
  className = '',
}: KineticTextProps) {
  const Tag = (level ?? asProp) as React.ElementType;
  const shouldReduce = useReducedMotion();
  const actualStagger = stagger ?? (mode === 'words' ? 0.07 : 0.025);

  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span
              className="overflow-hidden inline-block leading-none"
              style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
            >
              <motion.span
                className="inline-block"
                initial={shouldReduce ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: shouldReduce ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: shouldReduce ? 0 : delay + i * actualStagger,
                }}
              >
                {word}
              </motion.span>
            </span>
            {/* Non-breaking space preserves word gap in the a11y text content tree */}
            {i < words.length - 1 && (
              <span className="inline-block overflow-hidden" style={{ width: '0.3em' }}>
                {'\u00a0'}
              </span>
            )}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  // chars mode
  const chars = text.split('');
  let animIndex = 0;

  return (
    <Tag className={className}>
      {chars.map((char, i) => {
        if (char === ' ') {
          // Non-breaking space keeps the space in the a11y text content tree.
          return (
            <span key={i} className="inline-block overflow-hidden" style={{ width: '0.3em' }}>
              {'\u00a0'}
            </span>
          );
        }
        const idx = animIndex++;
        return (
          <span
            key={i}
            className="overflow-hidden inline-block leading-none"
            style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
          >
            <motion.span
              className="inline-block"
              initial={shouldReduce ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: shouldReduce ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduce ? 0 : delay + idx * actualStagger,
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
