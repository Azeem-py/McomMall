// src/components/BusinessTrustSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Star, PackageSearch } from 'lucide-react';

export function BusinessTrustSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const; // Added for consistency

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  } as const; // FIX: Added 'as const' to solve the error

  return (
    <div className="bg-white py-20 sm:py-24">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-16 px-6 lg:grid-cols-2 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Left Column: Image */}
        <motion.div
          className="relative h-[500px] w-full overflow-hidden rounded-3xl"
          variants={itemVariants}
        >
          <Image
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop"
            alt="Customer engaging with a business on their phone"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right Column: Content */}
        <div className="text-left">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={itemVariants}
          >
            Establish trust and help customers get to know your business
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={itemVariants}
          >
            Go beyond a simple listing. Our platform provides powerful tools
            designed to build customer confidence and drive operational
            excellence, turning first-time visitors into loyal advocates.
          </motion.p>

          <motion.dl
            className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            variants={itemVariants}
          >
            {/* Feature 1: Reward & Loyalty Program */}
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <Star className="absolute left-1 top-1 h-5 w-5 text-red-500" />
                Reward & Loyalty Program
              </dt>
              <dd className="inline">
                {' '}
                - Cultivate lasting relationships by rewarding repeat business.
                Implement a seamless, digital loyalty program that incentivizes
                customers and provides valuable insights into their purchasing
                habits.
              </dd>
            </div>

            {/* Feature 2: Stock Audit & Spare Capacity */}
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <PackageSearch className="absolute left-1 top-1 h-5 w-5 text-red-500" />
                Stock Audit & Spare Capacity
              </dt>
              <dd className="inline">
                {' '}
                - Enhance your operational efficiency. Our tools allow you to
                manage inventory levels with precision and broadcast your spare
                capacity to attract new customers and maximize profitability.
              </dd>
            </div>

            {/* Feature 3: Verified Listing */}
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-red-500" />
                Verified Free Listing
              </dt>
              <dd className="inline">
                {' '}
                - Gain immediate credibility. A verified listing shows customers
                that your business is legitimate, active, and ready to engage,
                helping you stand out from the competition.
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>
    </div>
  );
}
