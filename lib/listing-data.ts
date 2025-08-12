// app/data/mock-data.ts

// Define the types for our data
export type Amenity = 'wifi' | 'parking' | 'power' | 'transmission';

export type Listing = {
  id: number;
  title: string;
  category: string;
  categoryTag: string;
  location: string;
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  lat: number;
  lng: number;
  amenities: Amenity[];
  featured?: boolean;
};

// The actual list of items
export const listings: Listing[] = [
  {
    id: 1,
    title: 'George Burton - Life Coach',
    category: 'Coaching',
    categoryTag: 'Business Coach, Coaching',
    location: 'Ocean Avenue, New York',
    priceDisplay: 'Starts from $100.00',
    rating: 5.0,
    reviewCount: 9,
    imageUrl: '/images/coach.jpg', // Make sure you have these images in /public/images
    lat: 40.7128,
    lng: -74.006,
    amenities: ['wifi', 'parking'],
    featured: true,
  },
  {
    id: 2,
    title: 'Sports Car',
    category: 'Cars',
    categoryTag: 'Cars, For Rent',
    location: 'Suffolk County, New York',
    priceDisplay: 'Starts from $20.00 per hour',
    rating: 4.3,
    reviewCount: 2,
    imageUrl: '/images/car.jpg',
    lat: 40.8448,
    lng: -73.1368,
    amenities: ['power', 'transmission'],
  },
  {
    id: 3,
    title: "George's Barber Shop",
    category: 'Services',
    categoryTag: 'Barber, Services',
    location: 'Auburndale, Queens, NY',
    priceDisplay: '$12.00 - $40.00',
    rating: 4.9,
    reviewCount: 3,
    imageUrl: '/images/barber.jpg',
    lat: 40.7583,
    lng: -73.7915,
    amenities: ['wifi', 'parking', 'power'],
  },
];

// Data for the category filter bar
export const categories = [
  { name: 'All', icon: 'LayoutGrid' },
  { name: 'Apartments', icon: 'Home' },
  { name: 'Cars', icon: 'Car' },
  { name: 'Classifieds', icon: 'Tag' },
  { name: 'Coaching', icon: 'Users' },
  { name: 'Eat & Drink', icon: 'Utensils' },
];
