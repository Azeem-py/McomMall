'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

// --- Type Definitions ---

type Coupon = {
  id: string;
  code: string;
  type: 'Percentage discount' | 'Fixed product discount';
  amount: number;
  usage: number;
  limit: number | 'infinity';
  expiryDate: string | null;
};

type CouponRowProps = {
  coupon: Coupon;
};

// --- Mock Data ---

const couponsData: Coupon[] = [
  {
    id: '1',
    code: 'CCC20246',
    type: 'Percentage discount',
    amount: 10,
    usage: 0,
    limit: 'infinity',
    expiryDate: 'December 31, 2024',
  },
  {
    id: '2',
    code: 'Discount summer',
    type: 'Fixed product discount',
    amount: 100,
    usage: 0,
    limit: 3,
    expiryDate: null,
  },
  {
    id: '3',
    code: 'Fanswaves',
    type: 'Percentage discount',
    amount: 10,
    usage: 0,
    limit: 'infinity',
    expiryDate: 'April 6, 2025',
  },
  {
    id: '4',
    code: 'Niño12',
    type: 'Fixed product discount',
    amount: 20,
    usage: 0,
    limit: 1,
    expiryDate: null,
  },
  {
    id: '5',
    code: 'TopBR',
    type: 'Percentage discount',
    amount: 5,
    usage: 0,
    limit: 1,
    expiryDate: 'December 31, 2024',
  },
  {
    id: '6',
    code: 'UC10',
    type: 'Percentage discount',
    amount: 25,
    usage: 0,
    limit: 1,
    expiryDate: 'October 28, 2024',
  },
  {
    id: '7',
    code: 'Welcome',
    type: 'Percentage discount',
    amount: 10,
    usage: 0,
    limit: 'infinity',
    expiryDate: null,
  },
];

// --- Reusable UI Components ---

const ActionButton: React.FC<{
  children: React.ReactNode;
  variant: 'edit' | 'delete';
  onClick: () => void;
}> = ({ children, variant, onClick }) => {
  const baseClasses =
    'flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white transition-transform duration-200 ease-in-out hover:scale-105';
  const variants = {
    edit: 'bg-green-500 hover:bg-green-600',
    delete: 'bg-red-500 hover:bg-red-600',
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const CouponRow: React.FC<CouponRowProps> = ({ coupon }) => {
  const rowVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const formatLimit = (limit: number | 'infinity') =>
    limit === 'infinity' ? '∞' : limit;

  return (
    <motion.tr
      variants={rowVariants}
      className="border-b border-slate-200 bg-white"
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="inline-block rounded-md border-2 border-dashed border-green-400 bg-green-50 px-3 py-1.5 font-mono text-sm font-medium text-green-800">
          {coupon.code}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
        {coupon.type}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
        {coupon.amount}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
        {coupon.usage} / {formatLimit(coupon.limit)}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
        {coupon.expiryDate || '—'}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-2">
          <ActionButton
            variant="edit"
            onClick={() => alert(`Editing ${coupon.code}`)}
          >
            <Edit className="h-3 w-3" />
            <span>Edit</span>
          </ActionButton>
          <ActionButton
            variant="delete"
            onClick={() => alert(`Deleting ${coupon.code}`)}
          >
            <Trash2 className="h-3 w-3" />
            <span>Delete</span>
          </ActionButton>
        </div>
      </td>
    </motion.tr>
  );
};

// --- Main Page Component ---

export default function CouponsPage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold text-slate-800">Coupons</h1>
          <p className="text-sm text-slate-500">Home &gt; Dashboard</p>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    'Code',
                    'Coupon Type',
                    'Coupon Amount',
                    'Usage/Limit',
                    'Expiry date',
                    'Actions',
                  ].map(header => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-slate-200"
              >
                {couponsData.map(coupon => (
                  <CouponRow key={coupon.id} coupon={coupon} />
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>

        <footer className="mt-8 flex justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add New Coupon</span>
          </motion.button>
        </footer>
      </main>
    </div>
  );
}
