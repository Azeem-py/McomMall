'use client';

import { Review } from '@/service/listings/types';
import { ReviewCard } from './ReviewCard';

// Skeleton loader component for the reviews tab
const ReviewsSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start space-x-4 animate-pulse">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component for the reviews tab content
export const ReviewsTabContent = ({
  reviews,
  isLoading,
}: {
  reviews: Review[] | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <ReviewsSkeleton />;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">This business doesn&apos;t have any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};
