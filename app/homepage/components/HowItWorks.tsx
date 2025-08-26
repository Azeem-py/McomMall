'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Star, MessageSquareText } from 'lucide-react';

// SVG component for the abstract background shape
const AbstractShape = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute inset-0 w-full h-full text-black ${className}`}
    fill="currentColor"
  >
    <path
      d="M48.9,-64.6C63.2,-55.8,74.5,-40.4,79.9,-23.5C85.3,-6.6,84.7,11.8,77.5,27.5C70.3,43.2,56.5,56.2,40.9,64.9C25.3,73.6,7.9,78,-10.2,79.1C-28.3,80.2,-47.1,78,-59.9,68.2C-72.7,58.4,-79.5,41,-81.4,23.6C-83.4,6.2,-80.5,-11.2,-72.1,-25.5C-63.7,-39.8,-49.8,-51,-35.8,-60.1C-21.8,-69.2,-7.7,-76.2,8.1,-79.1C23.9,-82,41.5,-81.1,48.9,-64.6Z"
      transform="translate(100 100) scale(0.9)"
    />
  </svg>
);

// SVG component for the connecting arrow
const ConnectingArrow = () => (
  <svg
    width="100"
    height="30"
    viewBox="0 0 100 30"
    className="absolute top-1/2 -right-12 -translate-y-1/2 text-indigo-400 hidden lg:block"
  >
    <path
      d="M0 15 Q 50 -15 100 15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeDasharray="5,5"
    />
    <path
      d="M95 10 L 100 15 L 95 20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// Main data for the steps
const steps = [
  {
    icon: <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />,
    title: 'Choose A Category',
    description:
      'Select a category that best suits your interest. Use filters to customize your search and to find exactly what you want.',
  },
  {
    icon: (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          F
        </div>
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
          M
        </div>
      </div>
    ),
    title: 'Find What You Want',
    description:
      "Once you've settled on a business, learn more about it, read reviews and find its location so that you can reach it in no time!",
  },
  {
    icon: (
      <div className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg -rotate-6">
        <MessageSquareText className="w-5 h-5" />
        <span>hey there!</span>
      </div>
    ),
    title: 'Go Out & Explore',
    description:
      'The only thing left to do now is to go out, explore and have fun! Meet new friends and experience the city like a true local!',
  },
];

// Main component
const HowItWorks = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-white font-sans py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          How <span className="text-orange-600">McomMall</span> Work For You
        </motion.h2>

        {/* Steps Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center relative"
              variants={itemVariants}
            >
              {/* Connecting arrow for larger screens */}
              {index < steps.length - 1 && <ConnectingArrow />}

              {/* Icon with abstract background */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <AbstractShape />
                  <div className="relative z-10">{step.icon}</div>
                </motion.div>
              </div>

              {/* Step Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {index + 1}. {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
