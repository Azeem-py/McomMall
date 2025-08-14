'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PricingNav from './components/PricingNav';
import PayAsYouGoContent from './components/PayAsYouGoContent';
import CoBrandedContent from './components/CoBrandedContent';

export default function PricingPage() {
  const [activeView, setActiveView] = useState<'payg' | 'cobranded'>('payg');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r p-4 bg-white/80 backdrop-blur-sm">
        <PricingNav
          orientation="vertical"
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <AnimatePresence mode="wait">
          {activeView === 'payg' ? (
            <motion.div
              key="payg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PayAsYouGoContent />
            </motion.div>
          ) : (
            <motion.div
              key="cobranded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <CoBrandedContent />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t p-4 bg-white/80 backdrop-blur-sm z-10">
        <PricingNav
          orientation="horizontal"
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </nav>
    </div>
  );
}
