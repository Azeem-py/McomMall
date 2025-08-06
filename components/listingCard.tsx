import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { CircleCheck } from 'lucide-react';

interface ListingCardProps {
  imageUrl: string;
  name: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  name,
  location,
  category,
  price,
  rating,
  reviews,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex h-64 min-w-full max-w-2xl">
      <div className="relative w-2/5 h-full">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 w-3/5 flex flex-col justify-between">
        <div>
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {category}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2 text-xs font-semibold">
            Featured
          </span>
          <h3 className="text-lg font-bold mt-2 mb-1 text-gray-800 flex gap-1">
            {name}{' '}
            <span className="text-green-700">
              <CircleCheck />
            </span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">{location}</p>
          <div className="flex justify-between items-center">
            <Rating rating={rating} reviews={reviews} />
            <span className="text-sm text-green-700 font-semibold">
              Starts from ${price}.00 per day
            </span>
          </div>
        </div>
        <div className="flex gap-2 text-lg text-gray-600">
          <span>📷</span>
          <span>❤️</span>
          <span>🏠</span>
          <span>📶</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
