'use client';

import CategoryFilter from '@/components/CategoryFilter';
import ListingCard from '@/components/listingCard';
import dynamic from 'next/dynamic';
import React from 'react';

const MapComponent = dynamic(() => import('@/components/map'), { ssr: false });

interface Listing {
  imageUrl: string;
  name: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
}

const Page = () => {
  const dummyData: Listing[] = [
    {
      imageUrl:
        'https://listeo.pro/wp-content/uploads/2021/10/4002886-520x397.jpg',
      name: 'George Burton - Life Coach',
      location: 'Ocean Avenue, New York',
      category: 'Business Coach, Coaching, Life Coach',
      price: 100,
      rating: 3.8,
      reviews: 38,
    },
    {
      imageUrl:
        'https://listeo.pro/wp-content/uploads/2021/10/4002886-520x397.jpg',
      name: 'Jane Doe - Career Coach',
      location: 'Main Street, Los Angeles',
      category: 'Career Coaching',
      price: 120,
      rating: 4.2,
      reviews: 25,
    },
    {
      imageUrl:
        'https://listeo.pro/wp-content/uploads/2021/10/4002886-520x397.jpg',
      name: 'John Smith - Fitness Coach',
      location: 'Park Avenue, Chicago',
      category: 'Fitness Coach, Coaching',
      price: 80,
      rating: 4.5,
      reviews: 15,
    },
  ];

  return (
    <div className="flex w-screen h-[calc(100vh-64px)]">
      <section className="h-full w-full overflow-auto py-3 px-1">
        <CategoryFilter />
        {dummyData.map((item, index) => (
          <div key={index} className="mb-5">
            <ListingCard
              imageUrl={item.imageUrl}
              name={item.name}
              location={item.location}
              category={item.category}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
            />
          </div>
        ))}
      </section>
      <section className="overflow-auto h-full w-full">
        <MapComponent />
      </section>
      {/* <section className="border border-black">section 2</section> */}
    </div>
  );
};

export default Page;
