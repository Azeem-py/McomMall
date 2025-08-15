import { motion } from 'framer-motion';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import TrialInfo from './TrialInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingTier, TableFeature, FeatureGroup } from '../types/index';

const coBrandedTiers: PricingTier[] = [
  {
    name: 'Standard',
    price: '£300 / year',
    primaryFeatures: [
      'All PAYG Benefits – Full access without seasonal limitation.',
      'Customisable Rewards & Loyalty Program – Internal loyalty program setup (Visit-based, Spend-based, Referral-based, Seasonal campaigns).',
      'White-Label Branding – Loyalty cards, eGift cards, and marketing materials in own brand (logo, colours, fonts).',
      'Multiple QR Codes – For multiple branches, departments, or partner locations.',
      'Cross-Selling Network Access – Ability to sell and promote other business owners’ products via your own loyalty system.',
    ],
    secondaryFeatures: [
      'Full Dashboard Access – Advanced analytics, customer insights, loyalty performance, eGift & eCard management.',
      'eGift Card Creation & Sale – Pre-purchased cards (physical or digital) with QR codes, audio/video attachments, and SaaS resale options.',
      'Integration with MCOMECARD – Load rewards, cashback, and promotions directly onto the consumer’s card.',
      'Run Independent Campaigns – Marketing and advertising with or without 247GBS support.',
      'Product & Service Sales Rights – Sell 247GBS products/services independently or as a licensed sales agent.',
    ],
    accent: 'teal',
  },
  {
    name: 'Pro',
    price: '£600 / year',
    inherits: 'Standard',
    primaryFeatures: [
      'Priority Marketing Campaigns – Access to 247GBS traffic leads and campaign packages.',
      'Advanced Stock Audit Integration – AI-powered DealMachine integration for excess stock promotions.',
      'Hyper-Local Partnerships – Ability to partner with local stalls, events, and services for joint loyalty programs.',
    ],
    accent: 'purple',
  },
  {
    name: 'Plus',
    price: '£900 / year',
    inherits: 'Pro',
    primaryFeatures: [
      'All Features Activated – No restrictions.',
      'Hyper Local Hub Partnership Eligibility – Bid to run physical MCOM Hyper Local Support Hubs.',
      'Complete Automation – Seasonal preset campaigns (Winter, Spring, Summer, Autumn) auto-activated.',
    ],
    secondaryFeatures: [
      'National & Regional Campaign Control – Lead and manage campaigns in assigned territories.',
      'Unlimited Consumer Rewards – No cap on loyalty members or rewards given.',
      'AI & BOT Marketing Automation – Seasonal templates, predictive consumer offers, automated upsell campaigns.',
    ],
    accent: 'yellow',
  },
];

const coBrandedPlans = ['Standard', 'Pro', 'Plus'];

const coBrandedFeatures: TableFeature[] = [
  {
    name: 'Basic Directory Listing (247 GBS / MCOM Hub)',
    availability: [true, true, true],
    tooltip: 'Lists your business on key directories for visibility.',
  },
  {
    name: 'Claim & Verify Business Listing',
    availability: [true, true, true],
    tooltip: 'Verify your business to enhance credibility.',
  },
  {
    name: 'External Evergreen Reward QR Code',
    availability: [true, true, true],
    tooltip: 'Generates a QR code for customer rewards.',
  },
  {
    name: 'Wallet Overview (Business Dashboard)',
    availability: [true, true, true],
    tooltip: 'Dashboard for managing payments and credits.',
  },
  {
    name: 'Basic eGift / eCard Setup',
    availability: [true, true, true],
    tooltip: 'Basic setup for digital gift cards.',
  },
  {
    name: 'Customer Analytics (Basic)',
    availability: [true, true, true],
    tooltip: 'Basic insights into customer behavior and trends.',
  },
  {
    name: 'Loyalty CardX (Basic Template Access)',
    availability: [true, true, true],
    tooltip: 'Access to basic loyalty card templates.',
  },
  {
    name: 'Cashback Rate Configuration',
    availability: [true, true, true],
    tooltip: 'Customize cashback rates for customers.',
  },
  {
    name: 'Bonus Offers for Spare Stock',
    availability: [true, true, true],
    tooltip: 'Create offers from excess stock.',
  },
  {
    name: 'Stock Audit Tool (Basic)',
    availability: [true, true, true],
    tooltip: 'Tool to audit and manage stock levels.',
  },
  {
    name: 'MCOM Deals (Basic Publishing)',
    availability: [true, true, true],
    tooltip: 'Publish basic deals on the MCOM platform.',
  },
  {
    name: 'MCOM SocialBio Profile',
    availability: [true, true, true],
    tooltip: 'Create a social bio profile for marketing.',
  },
  {
    name: 'Videogram (QR-linked Video Cards)',
    availability: [true, true, true],
    tooltip: 'Link videos to QR codes on cards.',
  },
  {
    name: 'Reward Program Integration (Internal)',
    availability: [true, true, true],
    tooltip: 'Integrate internal reward systems.',
  },
  {
    name: 'Cross-Sell with Other Business Owners',
    availability: [true, true, true],
    tooltip: 'Enable cross-selling with other businesses.',
  },
  {
    name: 'Marketing Campaign Builder (Basic)',
    availability: [true, true, true],
    tooltip: 'Basic tool for creating marketing campaigns.',
  },
  {
    name: '247 GBS Co-Branded Partner Branding',
    availability: [true, true, true],
    tooltip: 'Branding as a 247 GBS partner.',
  },
  {
    name: 'Marketing Campaign Builder (Advanced)',
    availability: [false, true, true],
    tooltip: 'Advanced campaign creation tools.',
  },
  {
    name: 'Full Loyalty CardX Customisation',
    availability: [false, true, true],
    tooltip: 'Full customization of loyalty cards.',
  },
  {
    name: 'Advanced Analytics & Insights',
    availability: [false, true, true],
    tooltip: 'Detailed customer insights and performance metrics.',
  },
  {
    name: 'Internal Reward + Loyalty Management',
    availability: [false, true, true],
    tooltip: 'Manage internal rewards and loyalty.',
  },
  {
    name: 'MCOM Co-Branded Marketing Traffic Package',
    availability: [false, true, true],
    tooltip: 'Access to co-branded marketing traffic.',
  },
  {
    name: 'Dedicated Account Support',
    availability: [false, true, true],
    tooltip: 'Dedicated support for your account.',
  },
  {
    name: 'Hyper Local Hub Partnership Eligibility',
    availability: [false, false, true],
    tooltip: 'Eligibility for local hub partnerships.',
  },
  {
    name: 'Advanced Stock Audit & Spare Capacity Monetisation',
    availability: [false, false, true],
    tooltip: 'Advanced tools for stock and monetization.',
  },
  {
    name: 'Full MCOM Product Suite Access (All Features)',
    availability: [false, false, true],
    tooltip: 'Access to all MCOM features.',
  },
  {
    name: 'DealMachine AI for Performance Tracking',
    availability: [false, false, true],
    tooltip: 'AI-powered tool for tracking and optimizing performance.',
  },
  {
    name: 'Seasonal Campaigns (Spring/Summer/Autumn/Winter)',
    availability: [false, false, true],
    tooltip: 'Run campaigns for each season.',
  },
  {
    name: 'White Label Branding (eGift, Loyalty, Dashboard)',
    availability: [false, false, true],
    tooltip: 'White-label branding for various tools.',
  },
  {
    name: 'VistaPrint Integration for Physical Cards',
    availability: [false, false, true],
    tooltip: 'Integrate with VistaPrint for physical cards.',
  },
];

const coBrandedFeatureGroups: FeatureGroup[] = [
  { name: 'Core Access', features: coBrandedFeatures.slice(0, 6) },
  { name: 'Loyalty Tools', features: coBrandedFeatures.slice(6, 10) },
  { name: 'Engagement Tools', features: coBrandedFeatures.slice(10, 13) },
  { name: 'Advanced Integration', features: coBrandedFeatures.slice(13, 17) },
  { name: 'Marketing Advanced', features: coBrandedFeatures.slice(17, 22) },
  {
    name: 'Support and Partnerships',
    features: coBrandedFeatures.slice(22, 24),
  },
  { name: 'Premium Features', features: coBrandedFeatures.slice(24) },
];

export default function CoBrandedContent() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900">
        Co-Branded Pricing
      </h1>
      <motion.div
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        }}
      >
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-teal-50 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-900">
              Co-Branded Model Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              The Co-Branded model requires an upfront annual platform fee of
              £365 (£1 per day). This fee is a prerequisite to unlock the tiered
              packages below.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <TrialInfo />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {coBrandedTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ delay: index * 0.1 }}
          >
            <PricingCard
              tier={
                tier as PricingTier & { accent: 'teal' | 'purple' | 'yellow' }
              }
            />
          </motion.div>
        ))}
      </div>
      <ComparisonTable
        plans={coBrandedPlans}
        featureGroups={coBrandedFeatureGroups}
        accentHeaders={['teal-500', 'purple-500', 'yellow-500']}
      />
    </motion.div>
  );
}
