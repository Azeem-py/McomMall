'use client';

import { motion, Variants } from 'framer-motion'; // Corrected import
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const participationData = [
  {
    type: 'Business Owner',
    title: 'Grow Your Business',
    description:
      'Reach thousands of new customers, increase your sales, and build lasting loyalty in your local community. Our platform makes it easy to get started.',
    imageUrl:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1287&auto=format&fit=crop',
    imageAlt:
      'Business owner interacting with a customer at a payment terminal',
    buttonText: 'Register Your Business',
  },
  {
    type: 'Consumer',
    title: 'Discover Your Community',
    description:
      'Find unique local shops, enjoy exclusive deals, and support the businesses that make your neighborhood a great place to live. Join for free today!',
    imageUrl:
      'https://images.unsplash.com/photo-1543088243-53874ba595a0?q=80&w=1287&auto=format&fit=crop',
    imageAlt: 'Happy customer shopping at a local market',
    buttonText: 'Start Exploring',
  },
];

// Framer Motion animation variants with explicit typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const ParticipationSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Slanted Divider for large screens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-10%] z-10 hidden h-[120%] w-px -translate-x-1/2 rotate-[15deg] bg-slate-300 lg:block"
          />

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-8">
            {participationData.map((item, index) => (
              <motion.div key={item.type} variants={itemVariants}>
                <Card className="h-full transform overflow-hidden rounded-2xl border-none bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <CardHeader>
                    <div className="relative mb-4 h-60 w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-800">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 pt-1 text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="group mt-2 w-full bg-orange-600 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-md">
                      {item.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Horizontal Divider for mobile screens */}
                {index === 0 && (
                  <div
                    aria-hidden="true"
                    className="mx-auto my-12 h-px w-1/4 bg-slate-300 lg:hidden"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
