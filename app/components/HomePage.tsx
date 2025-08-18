import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  ArrowRight,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Utensils,
  Home,
  Sofa,
  Mountain,
  GraduationCap,
  Car,
  BedDouble,
  ShoppingBag,
  Dumbbell,
  Sparkles as LucideSparkles,
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- Helper Components ---
const ScrollAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

// --- Mock Data ---
const backgroundImages = [
  'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1920&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1626081062126-d3b192c1fcb0?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1920&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1676630444903-163fe485c5d1?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const categories = [
  { name: 'Restaurant', listings: 2, icon: <Utensils size={40} /> },
  { name: 'Real Estate', listings: 2, icon: <Home size={40} /> },
  { name: 'Rent', listings: 3, icon: <Sofa size={40} /> },
  { name: 'Place', listings: 1, icon: <Mountain size={40} /> },
  { name: 'Education', listings: 3, icon: <GraduationCap size={40} /> },
  { name: 'Car', listings: 2, icon: <Car size={40} /> },
  { name: 'Hotel', listings: 5, icon: <BedDouble size={40} /> },
  { name: 'Shopping', listings: 8, icon: <ShoppingBag size={40} /> },
  { name: 'Fitness', listings: 4, icon: <Dumbbell size={40} /> },
  { name: 'Beauty', listings: 6, icon: <LucideSparkles size={40} /> },
];

const allFeaturedAds = [
  {
    title: 'Fashionable Sunglass',
    location: 'California, Cape May',
    date: 'January 21, 2024',
    seller: 'adlinet',
    category: 'Others',
    price: '$150.00',
    image:
      'https://images.unsplash.com/photo-1577803645773-f144005fb2d6?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'The Bungalow',
    location: 'California, Cape May',
    date: 'August 21, 2024',
    seller: 'adlinet',
    category: 'Restaurant',
    price: '$2,525.00',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Albuquerque NM',
    location: 'California, Cape May',
    date: 'August 21, 2024',
    seller: 'adlinet',
    category: 'Place',
    price: '$156,245.00',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Pizza Point',
    location: 'California, Cape May',
    date: 'August 21, 2024',
    seller: 'adlinet',
    category: 'Restaurant',
    price: '$300.00',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Modern Apartment',
    location: 'New York, NY',
    date: 'July 15, 2024',
    seller: 'cityhomes',
    category: 'Real Estate',
    price: '$2,500,000.00',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Cozy Cafe',
    location: 'Paris, France',
    date: 'June 02, 2024',
    seller: 'pariseats',
    category: 'Restaurant',
    price: '$500.00',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Lakeside Cabin',
    location: 'Lake Tahoe, CA',
    date: 'September 05, 2024',
    seller: 'getaways',
    category: 'Place',
    price: '$450,000.00',
    image:
      'https://images.unsplash.com/photo-1559708937-56a01c883a80?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Vintage Leather Jacket',
    location: 'Brooklyn, NY',
    date: 'August 10, 2024',
    seller: 'retrofinds',
    category: 'Others',
    price: '$250.00',
    image:
      'https://images.unsplash.com/photo-1591047139829-d916b02ea942?q=80&w=300&auto-format&fit=crop',
  },
];

const popularLocations = [
  {
    name: 'Retro Room',
    location: 'New York Upper West Side',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=100&h=100&fit=crop',
    bgColor: 'bg-orange-100',
  },
  {
    name: 'The Old Tavern',
    location: 'Little Italy, New York',
    rating: 3,
    image:
      'https://images.unsplash.com/photo-1574966771232-a7cc4c913745?w=100&h=100&fit=crop',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Old Masters Art',
    location: 'New York Upper East Side',
    rating: 3,
    image:
      'https://images.unsplash.com/photo-1531904773987-09d31976a446?w=100&h=100&fit=crop',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Chez Michel',
    location: 'New York SoHo',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&h=100&fit=crop',
    bgColor: 'bg-red-100',
  },
  {
    name: 'Bloom Field',
    location: 'New York Upper West Side',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop',
    bgColor: 'bg-pink-100',
  },
  {
    name: 'Nature Getaway',
    location: 'Chelsea New York',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop',
    bgColor: 'bg-purple-100',
  },
];

const blogPosts = [
  {
    title: 'How To Find Best Food Restaurant In Adlin',
    category: 'Listing',
    date: '16 Nov, 2022',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Best Winter Collection In AdlinIn 2022',
    category: 'Collection',
    date: '16 Nov, 2022',
    image:
      'https://images.unsplash.com/photo-1572804013427-4d714e280592?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Best Watch Listed In 2022',
    category: 'Listing',
    date: '16 Nov, 2022',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto-format&fit=crop',
  },
  {
    title: 'Best Racing Car Listed In 2022',
    category: 'Listing',
    date: '16 Nov, 2022',
    image:
      'https://images.unsplash.com/photo-1553440569-99424e1bf07c?q=80&w=300&auto-format&fit=crop',
  },
];

// --- SVG Components ---
const SwirlArrow = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 132 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -bottom-8 right-0 md:-bottom-4 md:right-16 w-20 md:w-32 text-white"
  >
    <motion.path
      d="M130.5 1C112.5 1.5 98.5 10.3333 94 16C82.9924 32.2217 93.5 45 111.5 45C118.667 45 125.6 42.8 130 39.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
    />
    <motion.path
      d="M1 56.5C13.5 54.1667 31.8 45.5 39.5 35C50.5 19.5 36 6.5 22.5 1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
    />
  </svg>
);

const McomMallLogo = ({ className = '' }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 10 L 25 25 L 40 10 L 40 40 L 25 25 L 10 40 Z"
      stroke="#f58220"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M10 10 L 25 25 L 40 10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

const HowItWorksGraphic = ({ step }: { step: number }) => {
  const content = () => {
    switch (step) {
      case 1:
        return <Star className="text-yellow-400" fill="yellow" size={60} />;
      case 2:
        return (
          <div className="flex gap-2 items-center">
            <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              F
            </span>
            <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              C
            </span>
            <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              .
            </span>
            <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              M
            </span>
          </div>
        );
      case 3:
        return (
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
            hey there
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <path
          d="M189.3,99.9c0,44.2-39.7,80-88.7,80S11.9,144.1,11.9,99.9S51.6,20,100.6,20S189.3,55.7,189.3,99.9Z"
          transform="matrix(0.95, 0.3, -0.3, 0.95, 10, -25)"
          fill="#111827"
        />
      </svg>
      <div className="relative z-10">{content()}</div>
    </div>
  );
};

const DashedArrow = () => (
  <svg
    width="100"
    height="30"
    viewBox="0 0 119 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hidden lg:block"
  >
    <path
      d="M1 29.5C22.8333 17.6667 61.4 -9.5 118 10"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="5 5"
    />
  </svg>
);

// --- Main App Component ---
export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeAdFilter, setActiveAdFilter] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const backgroundImages = [
    'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1920&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1626081062126-d3b192c1fcb0?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1920&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1676630444903-163fe485c5d1?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % backgroundImages.length
      );
    }, 2000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // Effect for back to top button visibility
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.pageYOffset > 400) {
        setShowBackToTop(true);
      } else if (showBackToTop && window.pageYOffset <= 400) {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showBackToTop]);

  // Filtered ads based on the active tab
  const filteredAds =
    activeAdFilter === 'All'
      ? allFeaturedAds
      : allFeaturedAds.filter(ad => ad.category === activeAdFilter);

  // Carousel scroll functions
  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleSearch = () => {
    let query = searchQuery;
    if (location) {
      query = `${searchQuery} in ${location}`;
    }
    router.push(`/listings?queryText=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-[#fafafa] font-sans relative">
      <main>
        {/* --- Hero Section with Animated Background --- */}
        <section className="relative h-[60vh] md:h-[70vh] w-full text-white overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find The Best Amenity In <br /> Your Neighbourhood
              <SwirlArrow />
            </motion.h1>

            <motion.div
              className="mt-12 bg-white rounded-lg p-2 md:p-4 w-full max-w-3xl flex flex-col md:flex-row items-center gap-2 md:gap-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-full md:w-auto flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-2">
                <Search className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Type what are you looking for..."
                  className="w-full bg-transparent focus:outline-none text-black"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="w-full md:w-auto flex-1 flex items-center p-2">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Enter Location (e.g. Canasa)"
                  className="w-full bg-transparent focus:outline-none text-black"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <motion.button
                className="bg-[#f58220] text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
              >
                Search Now <ArrowRight size={20} />
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-4 text-sm text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="font-semibold">
                Car, Pet, Place, Education, Restaurant,{' '}
              </span>
              <a href="#" className="underline hover:text-orange-300">
                View All
              </a>
            </motion.div>
          </div>
        </section>

        {/* --- Categories Section --- */}
        <ScrollAnimatedSection>
          <div className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <a
                href="#"
                className="text-[#f58220] font-semibold hover:underline"
              >
                Browse All Different 45+ Categories &rarr;
              </a>
            </div>
            <div className="relative flex items-center">
              <button
                onClick={() => handleScroll(-300)}
                className="absolute -left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
              >
                <ChevronLeft />
              </button>
              <div
                ref={scrollContainerRef}
                className="flex items-center justify-start gap-4 md:gap-8 overflow-x-auto pb-4 no-scrollbar"
              >
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 flex-shrink-0 text-center w-28"
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-300 transition-all cursor-pointer">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.listings} Listings
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleScroll(300)}
                className="absolute -right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* --- Featured Ads Section --- */}
        <ScrollAnimatedSection>
          <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-4">
              Featured Ads
            </h2>
            <div className="flex justify-center gap-4 mb-8">
              {['All', 'Place', 'Restaurant', 'Real Estate', 'Others'].map(
                tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveAdFilter(tab)}
                    className={`py-2 px-5 rounded-lg font-semibold transition-colors ${
                      activeAdFilter === tab
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              <AnimatePresence>
                {filteredAds.map((ad, index) => (
                  <motion.div
                    key={ad.title}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row gap-4 p-4 hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full sm:w-1/3 h-48 sm:h-full object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl mb-2">{ad.title}</h3>
                          <button className="text-gray-400 hover:text-red-500">
                            <Heart />
                          </button>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-1">
                          <MapPin size={16} className="mr-2" /> {ad.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <span className="mr-4">🕒 {ad.date}</span>
                          <span>👤 {ad.seller}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                          {ad.category}
                        </span>
                        <span className="font-bold text-lg text-gray-800">
                          {ad.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* --- Most Popular Location Section --- */}
        <ScrollAnimatedSection>
          <div className="py-20 px-4 md:px-8 lg:px-16">
            <h2 className="text-4xl font-bold text-center mb-12">
              Most Popular Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {popularLocations.map((loc, index) => (
                <div
                  key={index}
                  className={`${loc.bgColor} p-6 rounded-2xl flex items-center gap-6 hover:scale-105 hover:shadow-lg transition-transform`}
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-xl">{loc.name}</h3>
                    <p className="text-gray-700">{loc.location}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < loc.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="#"
                className="text-gray-600 font-semibold hover:underline"
              >
                Browse All Different{' '}
                <span className="text-red-500">45+ Categories</span>
              </a>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* --- How It Works Section --- */}
        <ScrollAnimatedSection>
          <div className="py-20 px-4 md:px-8 lg:px-16">
            <h2 className="text-4xl font-bold text-center mb-16">
              How McomMall Works For You
            </h2>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <HowItWorksGraphic step={1} />
                <h3 className="text-2xl font-bold mt-6 mb-2">
                  1. Choose A Category
                </h3>
                <p className="max-w-xs text-gray-600">
                  Select a category that best suits your interest. Use filters
                  to customize your search and to find exactly what you want.
                </p>
              </div>
              <DashedArrow />
              <div className="flex flex-col items-center text-center">
                <HowItWorksGraphic step={2} />
                <h3 className="text-2xl font-bold mt-6 mb-2">
                  2. Find What You Want
                </h3>
                <p className="max-w-xs text-gray-600">
                  Once you&apos;ve settled on a business, learn more about it,
                  read reviews and find its location so that you can reach it in
                  no time!
                </p>
              </div>
              <DashedArrow />
              <div className="flex flex-col items-center text-center">
                <HowItWorksGraphic step={3} />
                <h3 className="text-2xl font-bold mt-6 mb-2">
                  3. Go Out & Explore
                </h3>
                <p className="max-w-xs text-gray-600">
                  The only thing left to do now is to go out, explore and have
                  fun! Meet new friends and experience the city like a true
                  local!
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimatedSection>

        {/* --- Our Latest Blog Post Section --- */}
        <ScrollAnimatedSection>
          <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Latest Blog Post
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-gray-500 text-sm font-semibold">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg mt-2 mb-4 h-14">
                      {post.title}
                    </h3>
                    <a
                      href="#"
                      className="text-[#f58220] font-semibold hover:underline"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimatedSection>
      </main>

      {/* --- Footer Section --- */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: McomMall Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <McomMallLogo />
              <span className="text-2xl font-bold">McomMall</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-[#f58220]" />
                <span>Call Us: +(323) 750-1234</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-[#f58220]" />
                <span>Address: +7011 Vermont Ave, Los Angeles, CA 90044</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-[#f58220]" />
                <span>Mail Us: hello@mcommall.com</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Popular Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Our FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Add Listing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58220] transition-colors">
                  Author Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Follow Us On</h3>
            <p className="mb-4 text-sm">
              Once you&apos;ve settled on a business, learn more about it.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-slate-700 p-2 rounded-full hover:bg-[#f58220] text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-slate-700 p-2 rounded-full hover:bg-[#f58220] text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-slate-700 p-2 rounded-full hover:bg-[#f58220] text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-slate-700 p-2 rounded-full hover:bg-[#f58220] text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Back to Top Button --- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#f58220] text-white p-3 rounded-full shadow-lg z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
