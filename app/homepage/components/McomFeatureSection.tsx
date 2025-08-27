// src/components/McomFeatureSection.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Building, ShoppingBag, Users } from 'lucide-react';

// --- Reusable Video Player Component ---
const VideoPlayer = ({ videoId }: { videoId: string }) => (
  <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-700 bg-black shadow-2xl">
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

// --- Business Content Component ---
const BusinessContent = () => (
  <motion.div
    key="business"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    className="mt-16 space-y-16"
  >
    {/* Product Seller Section */}
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <div className="mb-4 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-lime-400" />
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Are you a Product Seller?
          </h3>
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          Showcase your products to a ready-to-buy audience. With Mcom Business,
          you get a virtual storefront to list your entire catalog, manage
          inventory, and process orders seamlessly. Reach more customers and
          watch your sales grow.
        </p>
      </div>
      <div className="order-1 md:order-2">
        <VideoPlayer videoId="wT345_g7g3I" />
      </div>
    </div>

    {/* Service Provider Section */}
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <VideoPlayer videoId="bK_3d1eAgHM" />
      </div>
      <div>
        <div className="mb-4 flex items-center gap-3">
          <Building className="h-8 w-8 text-lime-400" />
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Are you a Service Provider?
          </h3>
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          From consulting to craftsmanship, Mcom Business is your platform to
          shine. List your services, manage bookings with our intuitive tools,
          and build a stellar reputation with customer reviews. We connect you
          with clients seeking your expertise.
        </p>
      </div>
    </div>
  </motion.div>
);

// --- Consumer Content Component ---
const ConsumerContent = () => (
  <motion.div
    key="consumer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    className="mt-16"
  >
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <Users className="h-8 w-8 text-fuchsia-400" />
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {" What's in it for You?"}
          </h3>
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          As an Mcom Consumer, you unlock a universe of local possibilities.
          Effortlessly find trusted product sellers and service providers in
          your area. Read authentic reviews, compare options, and connect with
          the best businesses around. Your next favorite local gem is just a
          click away!
        </p>
      </div>
      <div>
        <VideoPlayer videoId="Yq_xWpXF2AY" />
      </div>
    </div>
  </motion.div>
);

// --- Main Feature Section Component ---
export function McomFeatureSection() {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'MCOM BUSINESS' },
    { id: 'consumer', label: 'MCOM CONSUMER' },
  ];

  return (
    <div className="bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-6 text-lg leading-8 text-gray-300">
            McomMall is a premier business listing website designed to connect
            local businesses with a vibrant community of consumers. Discover,
            review, and engage with the best services and products in your area,
            all in one seamless platform.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-12 flex justify-center border-b border-slate-700">
          <div className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-t-md px-4 py-3 text-sm md:text-2xl font-bold transition-colors duration-300 sm:px-6 sm:text-base ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className={`absolute inset-x-0 bottom-0 h-1 ${
                      tab.id === 'business' ? 'bg-lime-500' : 'bg-fuchsia-500'
                    }`}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {activeTab === 'business' ? (
              <BusinessContent />
            ) : (
              <ConsumerContent />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
