'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Review } from '@/service/listings/types';

// StarRating component to display the rating
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

// ReviewCard component to display a single review
export const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongReview = review.text.length > 250;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="border-t py-6">
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={review.profile_photo_url} alt={review.author_name} />
          <AvatarFallback>{getInitials(review.author_name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">{review.author_name}</h4>
              <p className="text-sm text-gray-500">{review.relative_time_description}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              {isLongReview && !isExpanded
                ? `${review.text.substring(0, 250)}...`
                : review.text}
            </p>
            {isLongReview && (
              <Button variant="link" onClick={toggleExpanded} className="px-0">
                {isExpanded ? 'Show less' : 'Show more'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
