import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { MagneticButton } from '@/components/magnetic-button';

export function WhatsAppButton() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <MagneticButton strength={0.5} proximityZone={48}>
        <a
          href="https://wa.me/923175441707"
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center"
          data-testid="btn-floating-whatsapp"
        >
          {!reducedMotion && (
            <motion.div
              className="absolute inset-0 bg-[#25D366] rounded-full opacity-60"
              animate={{ scale: [1, 1.65, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.div
            className="relative bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            animate={reducedMotion ? {} : { scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={reducedMotion ? {} : { scale: 1.15 }}
          >
            <FaWhatsapp size={32} />
          </motion.div>
        </a>
      </MagneticButton>
    </div>
  );
}
