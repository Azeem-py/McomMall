'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import Image from 'next/image';

// --- Type Definitions ---

type Review = {
  id: string;
  author: string;
  avatarUrl: string;
  listingId: string;
  listingName: string;
  rating: number;
  content: string;
  date: string;
};

type ReviewCardProps = {
  review: Review;
};

type ListingFilterProps = {
  listings: { id: string; name: string }[];
  selectedListing: string;
  setSelectedListing: (listingId: string) => void;
};

// --- Mock Data ---

const reviewsData: Review[] = [
  {
    id: '1',
    author: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/150?u=jane_doe',
    listingId: 'listing1',
    listingName: 'Modern Apartment',
    rating: 5,
    content:
      'Absolutely stunning apartment with a great view. The host was very accommodating and the location is perfect. Highly recommended!',
    date: 'August 5, 2025',
  },
  {
    id: '2',
    author: 'John Smith',
    avatarUrl: 'https://i.pravatar.cc/150?u=john_smith',
    listingId: 'listing2',
    listingName: 'Cozy Cottage',
    rating: 4,
    content:
      'A very charming and cozy place. It was clean and had all the amenities we needed. The garden is beautiful. Would stay again.',
    date: 'July 28, 2025',
  },
  {
    id: '3',
    author: 'Emily White',
    avatarUrl: 'https://i.pravatar.cc/150?u=emily_white',
    listingId: 'listing1',
    listingName: 'Modern Apartment',
    rating: 4,
    content:
      'Great location and a very stylish space. The check-in process was smooth. Lost one star because the Wi-Fi was a bit slow at times.',
    date: 'July 15, 2025',
  },
  {
    id: '4',
    author: 'Michael Brown',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael_brown',
    listingId: 'listing3',
    listingName: 'Beachfront Villa',
    rating: 5,
    content:
      "Paradise on earth! Waking up to the sound of the waves was incredible. The villa is spacious, clean, and luxurious. Can't wait to come back.",
    date: 'August 10, 2025',
  },
];

const allListings = [
  { id: 'all', name: 'All Listings' },
  { id: 'listing1', name: 'Modern Apartment' },
  { id: 'listing2', name: 'Cozy Cottage' },
  { id: 'listing3', name: 'Beachfront Villa' },
];

// --- Reusable UI Components ---

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
        }`}
      />
    ))}
  </div>
);

const ListingFilter: React.FC<ListingFilterProps> = ({
  listings,
  selectedListing,
  setSelectedListing,
}) => (
  <div className="relative">
    <select
      value={selectedListing}
      onChange={e => setSelectedListing(e.target.value)}
      className="h-10 w-full cursor-pointer appearance-none rounded-md border border-slate-300 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
    >
      {listings.map(listing => (
        <option key={listing.id} value={listing.id}>
          {listing.name}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
  </div>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="border-b border-slate-200 bg-white p-6 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <Image
          src={review.avatarUrl}
          alt={review.author}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-semibold text-slate-800">{review.author}</h4>
              <p className="text-xs text-slate-500">
                review for{' '}
                <span className="font-medium text-slate-600">
                  {review.listingName}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <StarRating rating={review.rating} />
              <p className="text-xs text-slate-400">{review.date}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {review.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function ReviewsPage() {
  const [selectedListing, setSelectedListing] = useState('all');

  const filteredReviews = useMemo(() => {
    if (selectedListing === 'all') {
      return reviewsData;
    }
    return reviewsData.filter(review => review.listingId === selectedListing);
  }, [selectedListing]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-10">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold text-slate-800">Reviews</h1>
          <p className="text-sm text-slate-500">Home &gt; Dashboard</p>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold text-slate-700">
              Visitor Reviews
            </h2>
            <div className="w-full sm:w-auto sm:max-w-xs">
              <ListingFilter
                listings={allListings}
                selectedListing={selectedListing}
                setSelectedListing={setSelectedListing}
              />
            </div>
          </div>

          {filteredReviews.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500">
                You don&apos;t have any reviews for this listing.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
