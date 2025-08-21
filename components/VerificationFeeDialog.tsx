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
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface VerificationFeeDialogProps {
  listingId: string;
}

export function VerificationFeeDialog({ listingId }: VerificationFeeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/pricing?listing_id=${listingId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 cursor-pointer"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Not Verified - Claim with Mcom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim Your Listing</DialogTitle>
          <DialogDescription>
            To verify your listing, you&apos;ll be charged a one-time fee of £1.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
