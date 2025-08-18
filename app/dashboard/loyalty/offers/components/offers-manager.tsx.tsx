'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Edit, Copy, Trash2, Award } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// TypeScript Types
type OfferStatus = 'Active' | 'Inactive';
type CouponType =
  | 'Fixed cart discount'
  | 'Percentage discount'
  | 'Free product(s)'
  | 'Bonus points';

export type Offer = {
  id: number;
  status: OfferStatus;
  category: string;
  offerName: string;
  description: string;
  points: number;
  couponType: CouponType;
  couponDetails: string;
  beginDate: string | null;
  endDate: string | null;
  claimed: number;
  redeemed: number;
};

// Mock Data
const initialOffers: Offer[] = [
  {
    id: 1,
    status: 'Active',
    category: 'Uncategorized',
    offerName: 'Save $1',
    description: 'On your total purchase',
    points: 1000,
    couponType: 'Fixed cart discount',
    couponDetails: '$1.00',
    beginDate: null,
    endDate: null,
    claimed: 0,
    redeemed: 2,
  },
  {
    id: 2,
    status: 'Active',
    category: 'Uncategorized',
    offerName: 'Save $5',
    description: 'On your total purchase',
    points: 5000,
    couponType: 'Fixed cart discount',
    couponDetails: '$5.00',
    beginDate: null,
    endDate: null,
    claimed: 0,
    redeemed: 1,
  },
  {
    id: 3,
    status: 'Active',
    category: 'Appetizers',
    offerName: 'Free Soft Drink',
    description: 'any flavor',
    points: 1500,
    couponType: 'Free product(s)',
    couponDetails: '1 item',
    beginDate: '2025-09-01',
    endDate: '2025-09-30',
    claimed: 10,
    redeemed: 5,
  },
  {
    id: 4,
    status: 'Inactive',
    category: 'Beverages',
    offerName: '10% Off All Drinks',
    description: 'Valid on all beverages',
    points: 800,
    couponType: 'Percentage discount',
    couponDetails: '10%',
    beginDate: null,
    endDate: null,
    claimed: 25,
    redeemed: 20,
  },
  {
    id: 5,
    status: 'Active',
    category: 'Uncategorized',
    offerName: 'Save $15',
    description: 'On your total purchase',
    points: 15000,
    couponType: 'Fixed cart discount',
    couponDetails: '$15.00',
    beginDate: null,
    endDate: null,
    claimed: 0,
    redeemed: 0,
  },
];

// Default state for the form
const defaultFormState = {
  isActive: true,
  name: '1 Free Soft Drink',
  description: 'any flavor',
  points: 1500,
  category: 'Appetizers',
  terms: '',
  image: 'award_dark',
  beginDate: '',
  endDate: '',
  couponType: 'Free product(s)' as CouponType,
};

// Main Component
export function OffersManager() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<number | null>(null);
  const [formState, setFormState] =
    useState<typeof defaultFormState>(defaultFormState);

  const handleFormChange = (
    field: keyof typeof defaultFormState,
    value: unknown
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Form validation and submission simulation
  const handleSaveOffer = () => {
    // Basic validation
    if (!formState.name || !formState.points || formState.points <= 0) {
      alert('Please provide a valid Name and Points value.');
      return;
    }

    const newOffer: Offer = {
      id: Math.max(...offers.map(p => p.id), 0) + 1,
      status: formState.isActive ? 'Active' : 'Inactive',
      category: formState.category,
      offerName: formState.name,
      description: formState.description,
      points: Number(formState.points),
      couponType: formState.couponType,
      couponDetails: 'Details here', // Placeholder for simplicity
      beginDate: formState.beginDate || null,
      endDate: formState.endDate || null,
      claimed: 0,
      redeemed: 0,
    };

    setOffers(prev => [newOffer, ...prev]);
    setCreateModalOpen(false);
    // Note: In a real app, you might not reset the form to defaults, but it's useful for this demo
    // setFormState(defaultFormState);
  };

  // Delete logic
  const handleDeleteOffer = () => {
    if (offerToDelete === null) return;
    setOffers(prev => prev.filter(p => p.id !== offerToDelete));
    setDeleteAlertOpen(false);
    setOfferToDelete(null);
  };

  const openDeleteConfirmation = (id: number) => {
    setOfferToDelete(id);
    setDeleteAlertOpen(true);
  };

  // Memoized values for filters and displayed data
  const categories = useMemo(
    () => ['all', ...new Set(initialOffers.map(o => o.category))],
    [initialOffers]
  );
  const filteredOffers = useMemo(() => {
    if (categoryFilter === 'all') return offers;
    return offers.filter(o => o.category === categoryFilter);
  }, [offers, categoryFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <p className="text-gray-600 mb-4">
        Offers are a great way to reward your customers for their loyalty. You
        can create as many offers as you want and set the number of points
        required to redeem them.
      </p>
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-900 hover:bg-blue-950"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Create Offer
        </Button>
        <div className="flex items-center gap-2">
          <Label htmlFor="category-filter">Filter by category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter" className="w-[180px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Offers Table */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-600">
              <TableRow className="hover:bg-orange-600">
                <TableHead className="text-white font-bold">Status</TableHead>
                <TableHead className="text-white font-bold">Category</TableHead>
                <TableHead className="text-white font-bold">
                  Offer name
                </TableHead>
                <TableHead className="text-white font-bold">
                  Description
                </TableHead>
                <TableHead className="text-white font-bold">Points</TableHead>
                <TableHead className="text-white font-bold">Coupon</TableHead>
                <TableHead className="text-white font-bold">
                  Begin / end dates
                </TableHead>
                <TableHead className="text-white font-bold">
                  Claimed / Redeemed
                </TableHead>
                <TableHead className="text-white font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredOffers.map(offer => (
                  <motion.tr
                    key={offer.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="odd:bg-white even:bg-yellow-50/50 hover:bg-gray-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${
                            offer.status === 'Active'
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                          }`}
                        ></span>
                        {offer.status}
                      </div>
                    </TableCell>
                    <TableCell>{offer.category}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {offer.offerName}
                      </a>
                    </TableCell>
                    <TableCell>{offer.description}</TableCell>
                    <TableCell>{offer.points.toLocaleString()}</TableCell>
                    <TableCell>
                      {offer.couponType}
                      <br />
                      <span className="text-xs text-gray-500">
                        {offer.couponDetails}
                      </span>
                    </TableCell>
                    <TableCell>
                      {offer.beginDate || 'N/A'} - {offer.endDate || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {offer.claimed} / {offer.redeemed}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-1" /> Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteConfirmation(offer.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Offer Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="w-full md:min-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create a New Offer</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-6 -mr-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
            {/* Left Column: Form */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formState.isActive}
                  onCheckedChange={checked =>
                    handleFormChange('isActive', !!checked)
                  }
                />
                <Label htmlFor="isActive">Offer is active</Label>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={e => handleFormChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formState.description}
                  onChange={e =>
                    handleFormChange('description', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={formState.points}
                  onChange={e =>
                    handleFormChange('points', Number(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formState.category}
                  onValueChange={value => handleFormChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appetizers">Appetizers</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="terms">Terms and conditions</Label>
                <Textarea
                  id="terms"
                  value={formState.terms}
                  onChange={e => handleFormChange('terms', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="beginDate">Begin date</Label>
                  <Input
                    id="beginDate"
                    type="date"
                    value={formState.beginDate}
                    onChange={e =>
                      handleFormChange('beginDate', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formState.endDate}
                    onChange={e => handleFormChange('endDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Reward Coupon Type */}
              <div>
                <Label className="text-lg font-semibold">
                  Reward coupon type
                </Label>
                <RadioGroup
                  value={formState.couponType}
                  onValueChange={(value: CouponType) =>
                    handleFormChange('couponType', value)
                  }
                  className="mt-2 grid grid-cols-2 gap-4"
                >
                  {[
                    'Fixed cart discount',
                    'Percentage discount',
                    'Free product(s)',
                    'Bonus points',
                  ].map(type => (
                    <div key={type}>
                      <RadioGroupItem
                        value={type}
                        id={type}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type}
                        className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                      >
                        {type}
                        <span className="text-sm text-muted-foreground mt-2">
                          {type === 'Fixed cart discount' &&
                            'Apply a fixed total discount to the entire cart.'}
                          {type === 'Percentage discount' &&
                            'Apply a percentage discount to the entire cart.'}
                          {type === 'Free product(s)' &&
                            'Offer one or more products for free.'}
                          {type === 'Bonus points' &&
                            "Adds points to the customer's account."}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {/* Right Column: Preview */}
            <div className="md:col-span-1">
              <div className="sticky top-0 rounded-lg border bg-gray-50 p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Award className="h-10 w-10 text-gray-700" />
                  <h3 className="text-xl font-bold">
                    {formState.name || 'Offer Name'}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {formState.description || 'Offer Description'}
                  </p>
                </div>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                  Claim for{' '}
                  {formState.points ? formState.points.toLocaleString() : '...'}
                </Button>
                <p className="mt-4 text-xs text-gray-400 italic">
                  This is only a preview.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveOffer}>Save Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              offer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOfferToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOffer}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
