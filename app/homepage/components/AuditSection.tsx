// src/components/AuditSection.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart, PackageCheck, Wrench } from 'lucide-react';

// --- Data for each audit tab (Adjusted for Light Theme) ---
const auditTabsData = [
  {
    id: 'stock',
    label: 'Stock Audit',
    Icon: PackageCheck,
    title: 'Comprehensive Stock Auditing',
    description:
      'Gain complete clarity on your inventory. Our stock audit process identifies discrepancies, reduces carrying costs, and optimizes stock levels to ensure you have the right products available at the right time, preventing both overstocking and stockouts.',
    videoId: 'h532_y-e-bE',
    buttonText: 'Optimize Your Inventory',
    themeColor: 'text-cyan-600', // Darker for contrast on white
    underlineColor: 'bg-cyan-500',
    buttonClasses: 'bg-cyan-600 hover:bg-cyan-700',
  },
  {
    id: 'capacity',
    label: 'Spare Capacity',
    Icon: BarChart,
    title: 'Unlock Your Spare Capacity',
    description:
      "Don't let potential go to waste. We analyze your operations to identify and quantify spare capacity in your workforce, machinery, and processes. Turn idle resources into profitable opportunities for growth and increased output.",
    videoId: 'g_TTaP_za6c',
    buttonText: 'Maximize Operational Efficiency',
    themeColor: 'text-fuchsia-600', // Darker for contrast
    underlineColor: 'bg-fuchsia-500',
    buttonClasses: 'bg-fuchsia-600 hover:bg-fuchsia-700',
  },
  {
    id: 'solutions',
    label: 'Recommended Solutions',
    Icon: Wrench,
    title: 'Actionable, Data-Driven Solutions',
    description:
      'Receive more than just data—get a roadmap to success. Based on our comprehensive audit, we provide clear, prioritized, and practical solutions to address challenges, streamline operations, and drive sustainable growth for your business.',
    videoId: 'Qp3_j4wVp9M',
    buttonText: 'Implement Strategic Solutions',
    themeColor: 'text-orange-600', // Darker for contrast
    underlineColor: 'bg-orange-500',
    buttonClasses: 'bg-orange-600 hover:bg-orange-700',
  },
];

// --- Reusable Video Player ---
const VideoPlayer = ({ videoId }: { videoId: string }) => (
  <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-black shadow-lg">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="h-full w-full"
    ></iframe>
  </div>
);

// --- Audit Calculator Component (Light Theme) ---
const AuditCalculator = () => {
  const [cost, setCost] = useState(5000);
  const [inefficiency, setInefficiency] = useState(15);
  const [potentialSavings, setPotentialSavings] = useState(0);

  const calculateSavings = (e: React.FormEvent) => {
    e.preventDefault();
    const savings = (cost * inefficiency) / 100;
    setPotentialSavings(savings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-8"
    >
      <h4 className="text-center text-2xl font-bold text-slate-800">
        Estimate Your Potential Savings
      </h4>
      <form
        onSubmit={calculateSavings}
        className="mt-6 grid grid-cols-1 items-end gap-6 sm:grid-cols-3"
      >
        <div>
          <label
            htmlFor="monthly-cost"
            className="block text-sm font-medium text-slate-600"
          >
            Monthly Operational Cost ($)
          </label>
          <input
            type="number"
            id="monthly-cost"
            value={cost}
            onChange={e => setCost(Number(e.target.value))}
            className="mt-2 block w-full rounded-md border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label
            htmlFor="inefficiency"
            className="block text-sm font-medium text-slate-600"
          >
            Estimated Inefficiency (%)
          </label>
          <input
            type="number"
            id="inefficiency"
            value={inefficiency}
            onChange={e => setInefficiency(Number(e.target.value))}
            className="mt-2 block w-full rounded-md border-slate-300 bg-white p-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-slate-800 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
        >
          Calculate
        </button>
      </form>
      {potentialSavings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-lg bg-white p-4 text-center"
        >
          <p className="text-lg text-slate-600">
            You could be saving up to
            <span className="mx-2 text-2xl font-bold text-cyan-600">
              ${potentialSavings.toLocaleString()}
            </span>
            per month!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Main Section Component (Light Theme) ---
export function AuditSection() {
  const [activeTab, setActiveTab] = useState(auditTabsData[0].id);
  const activeTabData = auditTabsData.find(tab => tab.id === activeTab);

  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {"Unlock Your Business's Full Potential"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our specialized audits provide deep insights into your operations,
            helping you identify hidden opportunities, reduce waste, and build a
            foundation for unstoppable growth.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-16 flex justify-center border-b border-slate-200">
          <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-8">
            {auditTabsData.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-t-md px-3 py-4 text-sm font-bold transition-colors duration-300 sm:px-4 sm:text-base ${
                  activeTab === tab.id
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <tab.Icon
                  className={`h-5 w-5 ${
                    activeTab === tab.id ? tab.themeColor : ''
                  }`}
                />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-audit-underline"
                    className={`absolute inset-x-0 bottom-0 h-1 ${tab.underlineColor}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mx-auto mt-16 min-h-[450px] max-w-6xl">
          <AnimatePresence mode="wait">
            {activeTabData && (
              <motion.div
                key={activeTabData.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
              >
                <div className="order-2 lg:order-1">
                  <h3
                    className={`text-4xl font-bold leading-tight tracking-tight sm:text-5xl ${activeTabData.themeColor}`}
                  >
                    {activeTabData.title}
                  </h3>
                  <p className="mt-6 text-xl leading-relaxed text-slate-600">
                    {activeTabData.description}
                  </p>
                  <a
                    href="#"
                    className={`mt-10 inline-flex items-center gap-3 rounded-full px-10 py-4 text-xl font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 ${activeTabData.buttonClasses}`}
                  >
                    <span>{activeTabData.buttonText}</span>
                    <ArrowRight className="h-6 w-6" />
                  </a>
                </div>
                <div className="order-1 lg:order-2">
                  <VideoPlayer videoId={activeTabData.videoId} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Audit Calculator */}
        <AuditCalculator />
      </div>
    </div>
  );
}
