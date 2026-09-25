"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo/Logo';

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasLoaded = sessionStorage.getItem('ideatex_loaded');
    if (!hasLoaded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('ideatex_loaded', 'true');
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || !loading) return null;


  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div className="loader-content">
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Logo size={42} showText={true} />
            </div>
            <div className="loader-bar">
              <motion.div
                className="loader-progress"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  background: 'var(--gradient-brand)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
