// src/components/McomFeatureSection.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageUrl,
  bgColor,
}) => {
  const overlayVariants = {
    rest: {
      height: 'auto',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    hover: {
      height: '100%',
      transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.1 },
    },
  } as const;

  const textVariants = {
    rest: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeIn', delay: 0.2 },
    },
  } as const;

  const arrowVariants = {
    rest: { rotate: 0 },
    hover: { rotate: -45 },
  } as const;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative h-96 w-full cursor-pointer overflow-hidden rounded-lg shadow-2xl"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500"
      />

      <motion.div
        variants={overlayVariants}
        className={`absolute bottom-0 left-0 right-0 p-6 text-white backdrop-blur-sm ${bgColor}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <motion.div variants={arrowVariants}>
            <ArrowRight className="h-7 w-7 transition-transform" />
          </motion.div>
        </div>
        <motion.p variants={textVariants} className="mt-4 text-base font-light">
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export function McomFeatureSection() {
  return (
    <div className="bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            MCOM BUSINESS{' '}
            <span className="mx-2 font-light text-gray-500">|</span> MCOM
            CONSUMER
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            McomMall is a premier business listing website designed to connect
            local businesses with a vibrant community of consumers. Discover,
            review, and engage with the best services and products in your area,
            all in one seamless platform.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <InfoCard
            title="What is Mcom Business?"
            description="Mcom Business provides a powerful suite of tools for companies to list their services, manage their online presence, and connect directly with customers. Boost your visibility, gather reviews, and grow your brand with our intuitive platform."
            imageUrl="https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            bgColor="bg-lime-600/80"
          />
          <InfoCard
            title="What is Mcom Customer?"
            description="As an Mcom Customer, you gain access to a trusted directory of local businesses. Find exactly what you need, read authentic reviews from your community, and make informed decisions. Your next favorite local spot is just a click away."
            imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            bgColor="bg-fuchsia-600/80"
          />
        </div>
      </div>
    </div>
  );
}
