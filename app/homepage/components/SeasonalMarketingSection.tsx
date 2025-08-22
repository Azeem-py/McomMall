'use client';

import React from 'react';
import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';

interface SeasonCardProps {
  season: string;
  description: string;
  imageUrl: string;
  bgColor: string; // Tailwind CSS class for background color
  textColor: string; // Tailwind CSS class for text color
}

const SeasonCard: React.FC<SeasonCardProps> = ({
  season,
  description,
  imageUrl,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex justify-between h-full flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={`${season} marketing`}
          fill
          className="object-cover"
        />
      </div>
      <div
        className={`flex-grow flex flex-col justify-between p-6 ${bgColor} ${textColor}`}
      >
        <h3 className="text-2xl font-bold">{season}</h3>
        <p className="mt-3 text-base font-light leading-relaxed">
          {description}
        </p>
        <div className="mt-6 flex justify-end">
          <ArrowRightCircle className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export function SeasonalMarketingSection() {
  const seasonsData = [
    {
      season: 'Spring',
      description:
        'Capitalize on the themes of renewal and growth. Launch fresh campaigns focused on outdoor activities, spring cleaning, and holidays like Easter to engage an optimistic and active audience.',
      imageUrl:
        'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=1287&auto=format&fit=crop',
      bgColor: 'bg-cyan-600',
      textColor: 'text-white',
    },
    {
      season: 'Summer',
      description:
        'Align your brand with the energy of summer. Focus on travel, holidays, and major outdoor events. Leverage vibrant visuals and limited-time offers to capture the attention of consumers on the go.',
      imageUrl:
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1470&auto=format&fit=crop',
      bgColor: 'bg-pink-600',
      textColor: 'text-white',
    },
    {
      season: 'Autumn',
      description:
        'Tap into the "back-to-routine" mindset. This is the ideal time for educational content, cozy product showcases, and early holiday promotions for Thanksgiving and Black Friday.',
      imageUrl:
        'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1470&auto=format&fit=crop',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
    },
    {
      season: 'Winter',
      description:
        "Dominate the peak sales season. Craft compelling campaigns for Christmas, New Year's, and Valentine's Day. Emphasize gifting, celebration, and heartfelt messaging to drive conversions.",
      imageUrl:
        'https://images.unsplash.com/photo-1489674267075-236b8de78299?q=80&w=1333&auto=format&fit=crop',
      bgColor: 'bg-green-700',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            4 SEASONAL MARKETING PERIODS
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Harness the power of the calendar to create timely, relevant, and
            impactful marketing campaigns. By aligning your strategy with the
            distinct mindsets and behaviors of each season, you can unlock new
            growth opportunities and forge a deeper connection with your target
            audience.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {seasonsData.map(season => (
            <SeasonCard
              key={season.season}
              season={season.season}
              description={season.description}
              imageUrl={season.imageUrl}
              bgColor={season.bgColor}
              textColor={season.textColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
