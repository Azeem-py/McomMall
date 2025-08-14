// app/pricing/page.tsx

'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { PricingCard } from './components/PricingCard';
import { ComparisonTable } from './components/ComparisonTable';
import type { PlanCardData, PlanSummary, FeatureCategory } from './types';


const cardPlans: PlanCardData[] = [
  {
    planName: 'PAY-AS-YOU-GO',
    price: 'Seasonal (90/180/270 days)',
    description:
      'Basic access to the MCOM ecosystem with seasonal benefits for lean or seasonal operations.',
    isFeatured: false,
    features: [
      'External Evergreen Reward QR (1 code)',
      'Directory listing & marketing exposure',
      'Limited MCOM Wallet access',
      'Seasonal campaign participation',
      'Spare capacity & stock audit tool',
      'Basic consumer rewards (Evergreen)',
      '7/15/21-day credit-earning challenges',
      'Limited referral credits',
      'Limited Smart Money solutions',
    ],
  },
  {
    planName: 'Co-Branded Standard',
    price: 'Let’s talk',
    description:
      'Core co-branded access with your branding and full ecosystem benefits.',
    isFeatured: false,
    features: [
      'All PAYG benefits (no seasonal limits)',
      'Customisable rewards & loyalty',
      'White-label branding (cards & eGift)',
      'Multiple QR codes',
      'Cross-selling network access',
      'Full dashboard & analytics',
      'eGift creation & sale',
      'Integrates with MCOMECARD',
      'Run independent campaigns',
      'Product & service sales rights',
    ],
  },
  {
    planName: 'Co-Branded Pro',
    price: 'Let’s talk',
    description:
      'Everything in Standard plus priority marketing and advanced AI tools.',
    isFeatured: true,
    features: [
      'Priority marketing campaigns',
      'AI DealMachine stock audit integration',
      'Hyper-local partnerships',
      'All Standard features included',
    ],
  },
  {
    planName: 'Co-Branded Plus',
    price: 'Let’s talk',
    description:
      'Full access, complete automation, and regional campaign control.',
    isFeatured: false,
    features: [
      'All features activated',
      'Hyper Local Hub partnership eligibility',
      'Complete seasonal automation',
      'National & regional campaign control',
      'Unlimited consumer rewards',
      'AI & BOT marketing automation',
    ],
  },
];

const plansForTable: PlanSummary[] = [
  { id: 'payg', name: 'PAYG' },
  { id: 'standard', name: 'Co-Branded Standard' },
  { id: 'pro', name: 'Co-Branded Pro', isFeatured: true },
  { id: 'plus', name: 'Co-Branded Plus' },
];

const categories: FeatureCategory[] = [
  {
    id: 'access-branding',
    label: 'Access & Branding',
    features: [
      {
        id: 'mcom-access',
        name: 'MCOM ecosystem access',
        tooltip:
          'General access to platform services. PAYG is limited to the purchased seasonal package.',
        values: {
          payg: 'Seasonal (limited)',
          standard: 'Full',
          pro: 'Full',
          plus: 'Full',
        },
      },
      {
        id: 'white-label',
        name: 'White-label branding',
        tooltip:
          'Brand the loyalty experience (cards, eGifts, collateral) with your logo, colours, and fonts.',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'qr-codes',
        name: 'QR codes',
        tooltip:
          'External Evergreen QR for PAYG (1 code). Co-Branded tiers support multiple QR codes by branch/department.',
        values: {
          payg: '1 code',
          standard: 'Multiple',
          pro: 'Multiple',
          plus: 'Multiple',
        },
      },
    ],
  },
  {
    id: 'loyalty-rewards',
    label: 'Loyalty & Rewards',
    features: [
      {
        id: 'basic-rewards',
        name: 'Basic consumer rewards',
        tooltip: 'Evergreen programme by 247GBS. Not customisable under PAYG.',
        values: {
          payg: true,
          standard: 'Custom',
          pro: 'Custom',
          plus: 'Unlimited',
        },
      },
      {
        id: 'custom-program',
        name: 'Customisable loyalty programme',
        tooltip:
          'Configure visit-based, spend-based, referral-based, and seasonal campaigns.',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'unlimited-rewards',
        name: 'Unlimited rewards capacity',
        tooltip: 'No cap on loyalty members or rewards issued.',
        values: { payg: false, standard: false, pro: false, plus: true },
      },
    ],
  },
  {
    id: 'campaigns-marketing',
    label: 'Campaigns & Marketing',
    features: [
      {
        id: 'seasonal-campaigns',
        name: 'Seasonal campaign participation',
        values: {
          payg: 'Eligible',
          standard: 'Included',
          pro: 'Included',
          plus: 'Automated',
        },
      },
      {
        id: 'independent-campaigns',
        name: 'Run independent campaigns',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'priority-marketing',
        name: 'Priority marketing campaigns',
        values: { payg: false, standard: false, pro: true, plus: true },
      },
      {
        id: 'ai-bot',
        name: 'AI & BOT marketing automation',
        values: { payg: false, standard: false, pro: false, plus: true },
      },
      {
        id: 'national-control',
        name: 'National/Regional campaign control',
        values: { payg: false, standard: false, pro: false, plus: true },
      },
    ],
  },
  {
    id: 'tools-integrations',
    label: 'Tools & Integrations',
    features: [
      {
        id: 'wallet',
        name: 'MCOM Wallet access',
        values: {
          payg: 'Limited',
          standard: 'Full',
          pro: 'Full',
          plus: 'Full',
        },
      },
      {
        id: 'stock-audit',
        name: 'Spare capacity & stock audit',
        values: {
          payg: 'Basic',
          standard: 'Basic',
          pro: 'AI (DealMachine)',
          plus: 'AI (DealMachine)',
        },
      },
      {
        id: 'mcomecard',
        name: 'Integration with MCOMECARD',
        tooltip:
          'Load rewards, cashback and promotions directly onto the consumer’s MCOMECARD.',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'egift',
        name: 'eGift card creation & sale',
        tooltip:
          'Create physical/digital eGifts with QR, audio/video attachments, and SaaS resell options.',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
    ],
  },
  {
    id: 'network-sales',
    label: 'Network & Sales Rights',
    features: [
      {
        id: 'cross-selling',
        name: 'Cross-selling network access',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'sales-rights',
        name: '247GBS product/service sales rights',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'hyper-local',
        name: 'Hyper-local partnerships',
        values: { payg: false, standard: false, pro: true, plus: true },
      },
      {
        id: 'hub-eligibility',
        name: 'Hyper Local Hub partnership eligibility',
        values: { payg: false, standard: false, pro: false, plus: true },
      },
    ],
  },
  {
    id: 'admin-analytics',
    label: 'Administration & Analytics',
    features: [
      {
        id: 'dashboard',
        name: 'Full dashboard & analytics',
        values: { payg: false, standard: true, pro: true, plus: true },
      },
      {
        id: 'challenges',
        name: '7/15/21-day challenges (credit earning)',
        values: { payg: true, standard: true, pro: true, plus: true },
      },
    ],
  },
  {
    id: 'support-credits',
    label: 'Support & Credits',
    features: [
      {
        id: 'referrals',
        name: 'Referral credits',
        values: {
          payg: 'Limited',
          standard: 'Standard',
          pro: 'Priority',
          plus: 'Priority',
        },
      },
      {
        id: 'directories',
        name: 'Directory listing & seasonal exposure',
        values: { payg: true, standard: true, pro: true, plus: true },
      },
      {
        id: 'smart-money',
        name: 'Smart Money solutions (VoIP/POS/Elavon)',
        values: {
          payg: 'Limited',
          standard: 'Full',
          pro: 'Full',
          plus: 'Full',
        },
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="relative">
      {/* Subtle blue gradient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-sky-50 via-white to-white" />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Pricing & Plans
          </h1>
          <p className="mt-3 text-slate-600">
            Explore PAYG and Co-Branded tiers. Pick the access level that
            matches your goals.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cardPlans.map(p => (
            <PricingCard
              key={p.planName}
              planName={p.planName}
              price={p.price}
              description={p.description}
              features={p.features}
              isFeatured={p.isFeatured}
            />
          ))}
        </div>

        {/* Sales callout */}
        <div className="mt-10 rounded-2xl border bg-sky-50/50 p-6 text-slate-800">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-sky-700" />
              <div>
                <p className="font-semibold">Enterprise or Multi-region?</p>
                <p className="text-sm text-slate-600">
                  Talk to us about tailored pricing, SLAs and onboarding.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Contact sales
            </a>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14">
          <ComparisonTable plans={plansForTable} categories={categories} />
        </div>
      </section>
    </div>
  );
}
