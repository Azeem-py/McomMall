'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { XCircle } from 'lucide-react';
import Image from 'next/image';

// --- Type Definitions ---

type Bookmark = {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
};

type BookmarkCardProps = {
  bookmark: Bookmark;
  onRemove: (id: string) => void;
};

// --- Mock Data ---

const initialBookmarks: Bookmark[] = [
  {
    id: '1',
    title: "Florist's Shop",
    location: 'Long Island, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2086&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Private Bedroom in Manhattan',
    location: 'Manhattan, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1560185893-a55de8537e49?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Sunny Loft with a View',
    location: 'Brooklyn, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop',
  },
];

// --- Reusable UI Components ---

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onRemove }) => {
  const cardVariants: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0"
    >
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg md:h-24 md:w-24">
          <Image
            src={bookmark.imageUrl}
            alt={bookmark.title}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{bookmark.title}</h3>
          <p className="text-sm text-slate-500">{bookmark.location}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(bookmark.id)}
        className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-800"
      >
        <XCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Remove</span>
      </button>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(currentBookmarks => currentBookmarks.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-10">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold text-slate-800">Bookmarks</h1>
          <p className="text-sm text-slate-500">Home &gt; Dashboard</p>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-lg font-semibold text-slate-700">
              Bookmarked Listings
            </h2>
          </div>

          <div>
            <AnimatePresence>
              {bookmarks.length > 0 ? (
                bookmarks.map(bookmark => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onRemove={handleRemoveBookmark}
                  />
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-slate-500">
                    You don&apos;t have any bookmarked listings.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
