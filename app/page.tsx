'use client';

import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlanVacation from '@/components/PlanVacation';
import PopularCategories from '@/components/PopularCategories';
import TrendingListings from '@/components/TrendingListings';
import UserReviews from '@/components/UserReviews';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <PopularCategories />
      <TrendingListings />
      <UserReviews />
      <PlanVacation />
      <BlogSection />
      <Footer />
    </>
  );
}
