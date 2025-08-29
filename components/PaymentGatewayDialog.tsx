'use client';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import dynamic from 'next/dynamic';
import { useRecordPayment } from '@/service/payments/hook';
import {
  PaymentGateway,
  PlanType,
  PaygOption,
} from '@/service/payments/types';

const stripePromise = loadStripe(
  'pk_test_51RyiHq7EcmCfbEvlg70VZQdMUXMWKfFVfOctc73nAzdllQcdH41v4sdX8dyPBGWnM91uHheLoih73OnOeQOOecGO00o5ZZ6oTr'
);

const PayPalButtonWrapper = dynamic(
  () => import('./PayPalButtonWrapper'),
  { ssr: false }
);

interface PaymentGatewayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  listingId: string | null;
  isTrial: boolean;
  isPayg?: boolean;
}

function CheckoutForm({
  onSuccess,
  isTrial,
  planName,
  planPrice,
}: {
  onSuccess: (paymentGateway: PaymentGateway) => void;
  isTrial: boolean;
  planName: string;
  planPrice: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace('£', '').split(' ')[0]);
  };

  const numericPrice = getPriceAsNumber(planPrice);
  const amount = isTrial ? 100 : (1 + numericPrice) * 100; // amount in cents

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      // In a real application, you would create a PaymentIntent on the server
      // and use the client secret to confirm the payment on the client.
      // For this simulation, we'll just assume the payment is successful.
      console.log('Simulating Stripe payment for amount:', amount);
      setTimeout(() => {
        onSuccess(PaymentGateway.STRIPE);
        setProcessing(false);
      }, 1000);
    } else {
      setError('Card details not found.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <Button type="submit" disabled={!stripe || processing} className="mt-4 w-full">
        {processing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

function PaymentGatewayDialogComponent({
  isOpen,
  onClose,
  planName,
  planPrice,
  listingId,
  isTrial,
  isPayg,
}: PaymentGatewayDialogProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const { mutate: recordPayment } = useRecordPayment();

  const getPaygOption = (name: string): PaygOption | undefined => {
    if (name.includes('90')) return PaygOption.NINETY_DAYS;
    if (name.includes('180')) return PaygOption.ONE_EIGHTY_DAYS;
    if (name.includes('270')) return PaygOption.TWO_SEVENTY_DAYS;
    return undefined;
  };

  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace('£', '').split(' ')[0]);
  };

  const handleSuccess = (paymentGateway: PaymentGateway) => {
    const numericPrice = getPriceAsNumber(planPrice);
    const amountValue = isTrial ? 1 : 1 + numericPrice;
    const amount = amountValue.toFixed(2);

    recordPayment({
      amount,
      planType: isPayg ? PlanType.PAYG : PlanType.CO_BRANDED,
      paygOption: isPayg ? getPaygOption(planName) : undefined,
      isTrial,
      paymentGateway,
    });
    router.push('/dashboard/my-listings');
  };

  const numericPrice = getPriceAsNumber(planPrice);
  const total = isTrial ? 1 : 1 + numericPrice;
  const paypalAmount = isTrial ? '1.00' : (1 + numericPrice).toFixed(2);

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

        <RadioGroup
          defaultValue="stripe"
          onValueChange={setPaymentMethod}
          className="my-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stripe" id="stripe" />
            <Label htmlFor="stripe">Pay with Card (Stripe)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">Pay with PayPal</Label>
          </div>
        </RadioGroup>

        {paymentMethod === 'stripe' && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              onSuccess={handleSuccess}
              isTrial={isTrial}
              planName={planName}
              planPrice={planPrice}
            />
          </Elements>
        )}

        {paymentMethod === 'paypal' && (
          <PayPalButtonWrapper
            paypalAmount={paypalAmount}
            handleSuccess={() => handleSuccess(PaymentGateway.PAYPAL)}
          />
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentGatewayDialog(props: PaymentGatewayDialogProps) {
  return <PaymentGatewayDialogComponent {...props} />;
}
