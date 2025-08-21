'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PaymentConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  listingId: string | null;
  isTrial: boolean;
}

export function PaymentConfirmationDialog({
  isOpen,
  onClose,
  planName,
  planPrice,
  listingId,
  isTrial,
}: PaymentConfirmationDialogProps) {
  const router = useRouter();

  const handlePayment = () => {
    // Simulate payment
    setTimeout(() => {
      router.push('/listings/claim/success');
    }, 1000);
  };

  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace('£', '').split(' ')[0]);
  };

  const numericPrice = getPriceAsNumber(planPrice);
  const total = isTrial ? 1 : 1 + numericPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Purchase</DialogTitle>
          <DialogDescription>
            {isTrial
              ? `You are starting a trial for the ${planName} plan. You will be charged a £1 verification fee now. The plan price will be deferred until after the trial period.`
              : `You are purchasing the ${planName} plan. You will be charged a £1 verification fee plus the plan price.`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between">
            <span>Verification Fee:</span>
            <span>£1.00</span>
          </div>
          {!isTrial && (
            <div className="flex justify-between">
              <span>{planName} Price:</span>
              <span>{planPrice}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>Pay Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
