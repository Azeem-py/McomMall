// components/ParticipationSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Data for the two sections (no changes here)
const participationData = [
  {
    type: 'Business Owner',
    title: 'Grow Your Business',
    description:
      'Reach thousands of new customers, increase your sales, and build lasting loyalty in your local community.',
    imageUrl:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1287&auto=format&fit=crop',
    imageAlt:
      'Business owner interacting with a customer at a payment terminal',
    buttonText: 'Register Your Business',
    // We add the clip-path class directly here for easier mapping
    clipPathClass: 'lg:[clip-path:polygon(0_0,_100%_0,_90%_100%,_0_100%)]',
  },
  {
    type: 'Consumer',
    title: 'Discover Your Community',
    description:
      'Find unique local shops, enjoy exclusive deals, and support the businesses that make your neighborhood great.',
    imageUrl:
      'https://images.unsplash.com/photo-1529209076408-5a115ec9f1c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Happy customer shopping at a local market',
    buttonText: 'Start Exploring',
    clipPathClass: 'lg:[clip-path:polygon(10%_0,_100%_0,_100%_100%,_0_100%)]',
  },
];

// Simplified animation for a simultaneous fade-in
const sectionVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const ParticipationSection = () => {
  return (
    <section className="w-full bg-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {participationData.map(item => (
          <motion.div
            key={item.type}
            className={`relative group w-full h-[85vh] overflow-hidden ${item.clipPathClass}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={sectionVariants}
          >
            {/* Full-bleed Image */}
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            {/* Content overlaid on top */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white md:p-12">
              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-slate-200">
                {item.description}
              </p>
              <Button
                size="lg"
                className="group mt-8 w-fit bg-orange-600 px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-md"
              >
                {item.buttonText}
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
