'use client';

import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Map from '@/components/map';
import PlanVacation from '@/components/PlanVacation';
import PopularCategories from '@/components/PopularCategories';
import TrendingListings from '@/components/TrendingListings';
import UserReviews from '@/components/UserReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularCategories />
      <TrendingListings />
      <UserReviews />
      <PlanVacation />
      <BlogSection />
      <Map />
      <Footer />
    </>
  );
}
