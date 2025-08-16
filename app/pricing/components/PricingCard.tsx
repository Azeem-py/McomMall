import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { PricingTier } from '../types/index';

interface PricingCardProps {
  tier: PricingTier & { accent: 'teal' | 'purple' | 'yellow' };
}

export default function PricingCard({ tier }: PricingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const accentClasses = {
    teal: '',
    purple: 'border-orange-500',
    yellow: '',
  };

  const priceColor = {
    teal: 'text-teal-700',
    purple: 'text-orange-700',
    yellow: 'text-yellow-700',
  };

  const checkColor = {
    teal: 'text-black',
    purple: 'text-purple-500',
    yellow: 'text-black',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className={`flex flex-col h-full bg-white ${
          accentClasses[tier.accent]
        } border-2 shadow-md`}
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-900">
            {tier.name}
          </CardTitle>
          <h3 className={`text-3xl font-extrabold ${priceColor[tier.accent]}`}>
            {tier.price}
          </h3>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          {tier.inherits && (
            <p className="text-sm font-semibold text-gray-600">
              Everything in {tier.inherits}, plus:
            </p>
          )}
          <ul className="space-y-2">
            {tier.primaryFeatures.map(feature => (
              <li
                key={feature}
                className="flex items-start text-sm text-gray-700"
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    checkColor[tier.accent]
                  } flex-shrink-0 mt-1`}
                />
                {feature}
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 pt-4 border-t border-gray-200/80">
                  {tier.secondaryFeatures?.map(feature => (
                    <li
                      key={feature}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          checkColor[tier.accent]
                        } flex-shrink-0 mt-1`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          {tier.secondaryFeatures && tier.secondaryFeatures.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center text-sm font-semibold ${
                priceColor[tier.accent]
              }`}
            >
              {isExpanded ? 'See less features' : 'See more features'}
              {isExpanded ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
          )}
        </CardContent>
        {/* <CardFooter className="flex gap-2 ">
          <Button
            className={`w-full md:w-1/2 text-white cursor-pointer ${
              buttonColor[tier.accent]
            } `}
          >
            Pay Now
          </Button>
          <Button
            className={`w-full md:w-1/2 border bg-white cursor-pointer ${
              outlineButtonColor[tier.accent]
            }`}
          >
            Start Free Trial
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
}
