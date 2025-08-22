'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GoogleLogo from '@/app/components/GoogleLogo';

interface GoogleVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export const GoogleVerificationModal: React.FC<
  GoogleVerificationModalProps
> = ({ isOpen, onClose, onContinue }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-center">
            Authenticate with Google
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            {
              " You'll be redirected to Google to authenticate and verify your business. Please select the Gmail account you registered your business with."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-6 pt-4">
          <Button
            onClick={onContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg"
          >
            <GoogleLogo className="mr-3 h-6 w-6" />
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
