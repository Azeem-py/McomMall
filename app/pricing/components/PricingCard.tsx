'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface PricingCardProps {
  planName: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export function PricingCard({
  planName,
  price,
  description,
  features,
  isFeatured = false,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="h-full"
    >
      <Card
        className={[
          'h-full rounded-2xl border bg-white',
          isFeatured
            ? 'border-sky-600 shadow-[0_8px_36px_rgba(2,132,199,0.25)]'
            : 'shadow-sm',
        ].join(' ')}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">{planName}</span>
            {isFeatured && (
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                Popular
              </span>
            )}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-slate-900">
              {price}
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {features.map(f => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <Check className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className={
              isFeatured ? 'w-full bg-sky-600 hover:bg-sky-700' : 'w-full'
            }
            variant={isFeatured ? 'default' : 'secondary'}
          >
            {planName.includes('PAY') ? 'Get started' : 'Book a demo'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
