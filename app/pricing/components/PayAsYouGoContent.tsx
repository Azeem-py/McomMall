import { motion } from 'framer-motion';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import TrialInfo from './TrialInfo';
import { PricingTier, TableFeature, FeatureGroup } from '../types/index';

const paygTiers: PricingTier[] = [
  {
    name: '90 Days',
    price: '£90',
    primaryFeatures: [
      'Basic Access to MCOM Ecosystem – Limited to services in the purchased seasonal package (Winter, Spring, Summer, or Autumn).',
      'External Evergreen Reward Programme QR Code – One QR code for the main store; additional codes can be purchased for other branches or partner locations.',
      'Directory Listing – Business listed on 247GBS Business Directories & MCOM Lead Traffic Hub (after claim & verification).',
      'MCOM Wallet Access – Limited features for payment acceptance & reward credits.',
      'Seasonal Campaign Participation – Eligible to join network-wide promotions during your active 30-day season.',
    ],
    secondaryFeatures: [
      'Spare Capacity & Stock Audit Tool – Can be used to identify excess stock and create simple offers.',
      'Basic Consumer Rewards – Offer rewards via the Evergreen Programme (managed by 247GBS, not customisable).',
      '7-day, 15-day, or 21-day Challenges – Option to earn credits to reduce future subscription costs.',
      'Referral Credits – Limited ability to refer other businesses and earn credits.',
      'Access to Smart Money Solutions – Basic package (VoIP, POS devices, Elavon payment solutions).',
      'Marketing Exposure – Inclusion in seasonal directory promotions for the active quarter.',
    ],
    accent: 'teal',
  },
  {
    name: '180 Days',
    price: '£150',
    inherits: '90 Days',
    primaryFeatures: [
      'Coverage for two seasonal packages (e.g., Winter + Spring).',
      'Extended marketing exposure in seasonal directory promotions across two seasons.',
    ],
    accent: 'purple',
  },
  {
    name: '270 Days',
    price: '£240',
    inherits: '180 Days',
    primaryFeatures: [
      'Coverage for three seasonal packages (e.g., Winter + Spring + Summer).',
      'Extended marketing exposure in seasonal directory promotions across three seasons.',
    ],
    accent: 'yellow',
  },
];

const paygPlans = ['90 Days', '180 Days', '270 Days'];

const paygFeatures: TableFeature[] = [
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
    availability: [false, true, true],
    tooltip: 'Access to basic loyalty card templates.',
  },
  {
    name: 'Cashback Rate Configuration',
    availability: [false, true, true],
    tooltip: 'Customize cashback rates for customers.',
  },
  {
    name: 'Bonus Offers for Spare Stock',
    availability: [false, true, true],
    tooltip: 'Create offers from excess stock.',
  },
  {
    name: 'Stock Audit Tool (Basic)',
    availability: [false, true, true],
    tooltip: 'Tool to audit and manage stock levels.',
  },
  {
    name: 'MCOM Deals (Basic Publishing)',
    availability: [false, false, true],
    tooltip: 'Publish basic deals on the MCOM platform.',
  },
  {
    name: 'MCOM SocialBio Profile',
    availability: [false, false, true],
    tooltip: 'Create a social bio profile for marketing.',
  },
  {
    name: 'Videogram (QR-linked Video Cards)',
    availability: [false, false, true],
    tooltip: 'Link videos to QR codes on cards.',
  },
  {
    name: 'Reward Program Integration (Internal)',
    availability: [false, false, false],
    tooltip: 'Integrate internal reward systems.',
  },
  {
    name: 'Cross-Sell with Other Business Owners',
    availability: [false, false, false],
    tooltip: 'Enable cross-selling with other businesses.',
  },
  {
    name: 'Marketing Campaign Builder (Basic)',
    availability: [false, false, false],
    tooltip: 'Basic tool for creating marketing campaigns.',
  },
  {
    name: '247 GBS Co-Branded Partner Branding',
    availability: [false, false, false],
    tooltip: 'Branding as a 247 GBS partner.',
  },
  {
    name: 'Marketing Campaign Builder (Advanced)',
    availability: [false, false, false],
    tooltip: 'Advanced campaign creation tools.',
  },
  {
    name: 'Full Loyalty CardX Customisation',
    availability: [false, false, false],
    tooltip: 'Full customization of loyalty cards.',
  },
  {
    name: 'Advanced Analytics & Insights',
    availability: [false, false, false],
    tooltip: 'Detailed customer insights and performance metrics.',
  },
  {
    name: 'Internal Reward + Loyalty Management',
    availability: [false, false, false],
    tooltip: 'Manage internal rewards and loyalty.',
  },
  {
    name: 'MCOM Co-Branded Marketing Traffic Package',
    availability: [false, false, false],
    tooltip: 'Access to co-branded marketing traffic.',
  },
  {
    name: 'Dedicated Account Support',
    availability: [false, false, false],
    tooltip: 'Dedicated support for your account.',
  },
  {
    name: 'Hyper Local Hub Partnership Eligibility',
    availability: [false, false, false],
    tooltip: 'Eligibility for local hub partnerships.',
  },
  {
    name: 'Advanced Stock Audit & Spare Capacity Monetisation',
    availability: [false, false, false],
    tooltip: 'Advanced tools for stock and monetization.',
  },
  {
    name: 'Full MCOM Product Suite Access (All Features)',
    availability: [false, false, false],
    tooltip: 'Access to all MCOM features.',
  },
  {
    name: 'DealMachine AI for Performance Tracking',
    availability: [false, false, false],
    tooltip: 'AI-powered tool for tracking and optimizing performance.',
  },
  {
    name: 'Seasonal Campaigns (Spring/Summer/Autumn/Winter)',
    availability: [false, false, false],
    tooltip: 'Run campaigns for each season.',
  },
  {
    name: 'White Label Branding (eGift, Loyalty, Dashboard)',
    availability: [false, false, false],
    tooltip: 'White-label branding for various tools.',
  },
  {
    name: 'VistaPrint Integration for Physical Cards',
    availability: [false, false, false],
    tooltip: 'Integrate with VistaPrint for physical cards.',
  },
];

const paygFeatureGroups: FeatureGroup[] = [
  { name: 'Core Access', features: paygFeatures.slice(0, 6) },
  { name: 'Loyalty Tools', features: paygFeatures.slice(6, 10) },
  { name: 'Engagement Tools', features: paygFeatures.slice(10, 13) },
  { name: 'Advanced Integration', features: paygFeatures.slice(13, 17) },
  { name: 'Marketing Advanced', features: paygFeatures.slice(17, 22) },
  { name: 'Support and Partnerships', features: paygFeatures.slice(22, 24) },
  { name: 'Premium Features', features: paygFeatures.slice(24) },
];

export default function PayAsYouGoContent() {
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
        Pay As You Go Pricing
      </h1>
      <section className="flex flex-col items-center">
        <TrialInfo />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 h-fit">
        {paygTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <PricingCard
              tier={
                tier as PricingTier & { accent: 'teal' | 'purple' | 'yellow' }
              }
              isPayg={true}
            />
          </motion.div>
        ))}
      </div>
      <ComparisonTable
        plans={paygPlans}
        featureGroups={paygFeatureGroups}
        accentHeaders={['teal-500', 'purple-500', 'yellow-500']}
      />
    </motion.div>
  );
}
