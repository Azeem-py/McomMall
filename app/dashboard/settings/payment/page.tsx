import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Banknote, ChevronDown, AlertCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: string;
  provider: string;
  accountNumber: string;
}

interface PaymentMethodItemProps {
  method: PaymentMethod;
}

const InfoAlert = ({ message }: { message: string }) => (
  <div className="mb-6 flex items-start space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
    <p className="text-sm text-blue-700 dark:text-blue-300">{message}</p>
  </div>
);

const PaymentMethodItem = ({ method }: PaymentMethodItemProps) => (
  <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Banknote className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-card-foreground">
          {method.type} - {method.provider}
        </p>
        <p className="text-sm text-muted-foreground">
          **** **** **** {method.accountNumber.slice(-4)}
        </p>
      </div>
    </div>
    <Button variant="destructive">Manage</Button>
  </div>
);

const StoreDashboardPage: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'Bank Transfer',
      provider: 'nequiji - asfsdfds',
      accountNumber: '...3432',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        {/* --- Header --- */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Store Dashboard
            </h1>
            <nav className="text-sm text-muted-foreground">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Dashboard
              </span>
            </nav>
          </div>
        </header>

        <main>
          {/* --- Payment Method Card --- */}
          <Card className="mb-8 w-full overflow-hidden shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoAlert message="These are the withdraw methods available for you. Please update your payment information below to submit withdraw requests and get your store payments seamlessly." />

              {/* --- Payment Methods List Card --- */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center">
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Add Payment Method
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Select a Method</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Bank Transfer</DropdownMenuItem>
                      <DropdownMenuItem>PayPal</DropdownMenuItem>
                      <DropdownMenuItem>Stripe</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {paymentMethods.map((method: PaymentMethod) => (
                      <PaymentMethodItem key={method.id} method={method} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StoreDashboardPage;
