// src/components/LoyaltyProgramSection.tsx

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, Star, Users } from 'lucide-react';

export function LoyaltyProgramSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress within the targetRef element
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Transform the scroll progress (0 to 1) into a height value for the line
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <div ref={targetRef} className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-12">
          {/* Left Column: Image */}
          <div className="lg:col-span-5">
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer receiving a loyalty reward"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle Column: Animated Line */}
          <div className="hidden lg:flex lg:col-span-1 lg:justify-center">
            <div className="relative h-full w-1 bg-gray-200 rounded-full">
              <motion.div
                className="absolute top-0 left-0 w-full bg-emerald-500 rounded-full"
                style={{ height: lineHeight }}
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6">
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Forge Lasting Connections with a Premier Loyalty Program
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Transform casual buyers into lifelong brand advocates. Our
                Reward & Loyalty Program is engineered to foster deep-rooted
                customer relationships by acknowledging and rewarding their
                continued patronage in meaningful ways.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <Gift className="absolute left-1 top-1 h-5 w-5 text-emerald-600" />
                    Tiered Rewards System.
                  </dt>
                  <dd className="inline">
                    {' '}
                    Motivate repeat purchases with escalating rewards. Customers
                    unlock exclusive perks and benefits as they engage more with
                    your brand.
                  </dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <Star className="absolute left-1 top-1 h-5 w-5 text-emerald-600" />
                    Personalized Offers.
                  </dt>
                  <dd className="inline">
                    {' '}
                    Leverage customer data to deliver tailor-made promotions
                    that resonate on a personal level, increasing conversion and
                    satisfaction.
                  </dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <Users className="absolute left-1 top-1 h-5 w-5 text-emerald-600" />
                    Seamless Integration.
                  </dt>
                  <dd className="inline">
                    {' '}
                    Our program integrates smoothly with your existing
                    point-of-sale and e-commerce platforms for a frictionless
                    customer experience.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
