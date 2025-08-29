'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUpDown, X, HelpCircle, Plus } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
  { value: 'vintage-tee', label: 'Vintage T-Shirt' },
  { value: 'classic-hoodie', label: 'Classic Hoodie' },
  { value: 'coffee-mug', label: 'Coffee Mug' },
  { value: 'skate-deck', label: 'Skateboard Deck' },
  { value: 'beanie-hat', label: 'Beanie Hat' },
];

const MOCK_CATEGORIES = [
  { value: 'clearance', label: 'Clearance' },
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'best-sellers', label: 'Best Sellers' },
  { value: 'accessories', label: 'Accessories' },
];

// --- TYPESCRIPT INTERFACES ---
interface FormData {
  activeTab: 'giftCard' | 'linkedProducts' | 'advanced';
  giftCardAmounts: number[];
  allowCustomAmounts: boolean;
  minAmount: number;
  maxAmount: number;
  ignoreCoupons: boolean;
  defaultAmount: number;
  isPhysicalCard: boolean;
  expiresInDays: number;
  emailDesign: string;
  enableBonus: boolean;
  bonuses: { buy: number; get: number }[];
  isCumulative: boolean;
  bonusReceiver: string;
  redemptionRestrictions: boolean;
  includedProducts: string[];
  excludedProducts: string[];
  includedCategories: string[];
  excludedCategories: string[];
  excludeTax: boolean;
  excludeShipping: boolean;
}

// --- UI COMPONENTS (SHADCN/UI REPLACEMENTS) ---
// In a real project, you would import these from your shadcn/ui library.
// For this self-contained example, we'll create basic functional equivalents.

const variantClasses: Record<string, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};
const sizeClasses: Record<string, string> = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3 rounded-md',
  icon: 'h-10 w-10',
};

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className}`}>{children}</div>;

const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:focus:ring-blue-400 ${
      props.className ?? ''
    }`}
  />
);

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}
const Checkbox = ({ id, checked, onChange, children }: CheckboxProps) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  </div>
);

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ children, value, onChange }: SelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
  >
    {children}
  </select>
);

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}
const Tooltip = ({ children, content }: TooltipProps) => (
  <div className="relative flex items-center group">
    {children}
    <div className="absolute bottom-full mb-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      {content}
    </div>
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}
const Badge = ({ children, onRemove, className = '' }: BadgeProps) => (
  <div
    className={`inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-sm font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 ${className}`}
  >
    {children}
    {onRemove && (
      <button
        onClick={onRemove}
        className="ml-1.5 flex-shrink-0 rounded-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

interface FormRowProps {
  label: React.ReactNode;
  tooltip?: React.ReactNode;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}
const FormRow = ({
  label,
  tooltip,
  children,
  htmlFor,
  className = '',
}: FormRowProps) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-3 items-center gap-2 md:gap-4 ${className}`}
  >
    <div className="flex items-center space-x-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      {tooltip && (
        <Tooltip content={tooltip}>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </Tooltip>
      )}
    </div>
    <div className="md:col-span-2">{children}</div>
  </div>
);

interface MultiSelectProps {
  placeholder: string;
  options: { value: string; label: string }[];
  selected: string[];
  onSelect: (val: string) => void;
  onRemove: (val: string) => void;
}
const MultiSelect = ({
  placeholder,
  options,
  selected,
  onSelect,
  onRemove,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const availableOptions = options.filter(opt => !selected.includes(opt.value));

  return (
    <div className="relative">
      <div className="flex min-h-10 w-full flex-wrap gap-2 rounded-md border border-gray-300 bg-white p-2 text-sm dark:bg-gray-800 dark:border-gray-600">
        {selected.map(value => {
          const option = options.find(opt => opt.value === value);
          return (
            <Badge key={value} onRemove={() => onRemove(value)}>
              {option?.label || value}
            </Badge>
          );
        })}
        <div className="relative flex-grow">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left flex justify-between items-center"
          >
            <span className="text-gray-500">{placeholder}</span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <ul className="max-h-60 overflow-auto p-1">
            {availableOptions.length > 0 ? (
              availableOptions.map(option => (
                <li
                  key={option.value}
                  onClick={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500">No options left</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function GiftCardPage() {
  const [formData, setFormData] = useState<FormData>({
    activeTab: 'giftCard',
    giftCardAmounts: [10, 25, 50, 100, 250],
    allowCustomAmounts: true,
    minAmount: 5,
    maxAmount: 1000,
    ignoreCoupons: true,
    defaultAmount: 25,
    isPhysicalCard: false,
    expiresInDays: 1825,
    emailDesign: 'happy-birthday',
    enableBonus: true,
    bonuses: [
      { buy: 50, get: 5 },
      { buy: 100, get: 15 },
    ],
    isCumulative: false,
    bonusReceiver: 'purchasing-customer',
    redemptionRestrictions: true,
    includedProducts: [],
    excludedProducts: [],
    includedCategories: ['clearance'],
    excludedCategories: [],
    excludeTax: true,
    excludeShipping: true,
  });

  const [newAmount, setNewAmount] = useState('');

  const handleStateChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addGiftCardAmount = () => {
    const amount = parseInt(newAmount, 10);
    if (
      !isNaN(amount) &&
      amount > 0 &&
      !formData.giftCardAmounts.includes(amount)
    ) {
      handleStateChange(
        'giftCardAmounts',
        [...formData.giftCardAmounts, amount].sort((a, b) => a - b)
      );
      setNewAmount('');
    }
  };

  const removeGiftCardAmount = (amount: number) => {
    handleStateChange(
      'giftCardAmounts',
      formData.giftCardAmounts.filter(a => a !== amount)
    );
  };

  const addBonus = () => {
    // In a real app, this would open a modal to input buy/get amounts.
    // For this mock, we'll add a predefined bonus.
    const newBonus = { buy: 75, get: 10 };
    if (!formData.bonuses.some(b => b.buy === newBonus.buy)) {
      handleStateChange('bonuses', [...formData.bonuses, newBonus]);
    }
  };

  const removeBonus = (index: number) => {
    handleStateChange(
      'bonuses',
      formData.bonuses.filter((_, i) => i !== index)
    );
  };

  const renderContent = () => {
    switch (formData.activeTab) {
      case 'giftCard':
        return renderGiftCardSettings();
      case 'advanced':
        return renderAdvancedSettings();
      case 'linkedProducts':
        return (
          <CardContent>
            <p className="text-center text-gray-500">
              Linked Products settings would be displayed here.
            </p>
          </CardContent>
        );
      default:
        return null;
    }
  };

  const renderGiftCardSettings = () => (
    <CardContent className="space-y-6">
      <FormRow label="Gift card amounts (£)">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="number"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGiftCardAmount()}
            placeholder="Amount"
            className="w-24"
          />
          <Button onClick={addGiftCardAmount} size="sm">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <AnimatePresence>
            {formData.giftCardAmounts.map(amount => (
              <motion.div
                key={amount}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Badge onRemove={() => removeGiftCardAmount(amount)}>
                  £{amount}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </FormRow>

      <FormRow label="Allow custom amounts">
        <Checkbox
          id="custom-amounts"
          checked={formData.allowCustomAmounts}
          onChange={e =>
            handleStateChange('allowCustomAmounts', e.target.checked)
          }
        >
          Allow custom amounts
        </Checkbox>
      </FormRow>

      <FormRow
        label="Minimum amount (£)"
        tooltip="The minimum amount for a custom gift card."
      >
        <Input
          id="min-amount"
          type="number"
          value={formData.minAmount}
          onChange={e => handleStateChange('minAmount', Number(e.target.value))}
        />
      </FormRow>

      <FormRow
        label="Maximum amount (£)"
        tooltip="The maximum amount for a custom gift card."
      >
        <Input
          id="max-amount"
          type="number"
          value={formData.maxAmount}
          onChange={e => handleStateChange('maxAmount', Number(e.target.value))}
        />
      </FormRow>

      <FormRow label="Ignore coupons">
        <Checkbox
          id="ignore-coupons"
          checked={formData.ignoreCoupons}
          onChange={e => handleStateChange('ignoreCoupons', e.target.checked)}
        >
          Ignore coupons
        </Checkbox>
      </FormRow>

      <FormRow
        label="Default amount"
        tooltip="The default amount selected on the product page."
      >
        <Input
          id="default-amount"
          type="number"
          value={formData.defaultAmount}
          onChange={e =>
            handleStateChange('defaultAmount', Number(e.target.value))
          }
        />
      </FormRow>

      <FormRow label="Physical gift card?">
        <Checkbox
          id="physical-card"
          checked={formData.isPhysicalCard}
          onChange={e => handleStateChange('isPhysicalCard', e.target.checked)}
        >
          Physical gift card?
        </Checkbox>
      </FormRow>

      <FormRow
        label="Expires in X days"
        tooltip="The number of days after the purchase date when the gift card will expire. If blank, the gift card will not expire."
      >
        <Input
          id="expires"
          type="number"
          value={formData.expiresInDays}
          onChange={e =>
            handleStateChange('expiresInDays', Number(e.target.value))
          }
        />
      </FormRow>
    </CardContent>
  );

  const renderAdvancedSettings = () => (
    <CardContent className="space-y-8">
      {/* Email Design Section */}
      <div className="space-y-4">
        <FormRow
          label="Email Design"
          tooltip="Select the email template for this gift card."
        >
          <Select
            value={formData.emailDesign}
            onChange={e => handleStateChange('emailDesign', e.target.value)}
          >
            <option value="happy-birthday">Happy Birthday</option>
            <option value="generic-holiday">Generic Holiday</option>
            <option value="thank-you">Thank You</option>
          </Select>
        </FormRow>
        <div className="md:col-start-2 md:col-span-2">
          <Button variant="secondary">Launch the Gift Card Designer</Button>
        </div>
      </div>

      {/* Bonus Gift Cards Section */}
      <div className="space-y-4 border-t pt-6 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="enable-bonus"
            checked={formData.enableBonus}
            onChange={e => handleStateChange('enableBonus', e.target.checked)}
          >
            Enable bonus gift cards?
          </Checkbox>
          <div className="grid gap-1.5">
            <label htmlFor="enable-bonus" className="font-medium">
              Enable bonus gift cards?
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Offering a bonus for purchasing gift cards is a great way to
              incentivise customers. For example: Buy a £25 gift card, get a £5
              bonus card!
            </p>
          </div>
        </div>
        {formData.enableBonus && (
          <div className="md:col-start-2 md:col-span-2 space-y-4 pl-6">
            <Button onClick={addBonus} variant="secondary">
              <Plus className="mr-2 h-4 w-4" /> Add a bonus amount
            </Button>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {formData.bonuses.map((bonus, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge onRemove={() => removeBonus(index)}>
                      Buy a £{bonus.buy} gift card, get a £{bonus.get} bonus
                      card
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="cumulative"
                checked={formData.isCumulative}
                onChange={e =>
                  handleStateChange('isCumulative', e.target.checked)
                }
              >
                Cumulative bonus
              </Checkbox>
              <div className="grid gap-1.5">
                <label htmlFor="cumulative" className="font-medium">
                  Cumulative bonus
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  When checked, customer can purchase multiple gift cards to
                  trigger the bonus. Otherwise, exact amount must be purchased
                  to trigger bonus.
                </p>
              </div>
            </div>
            <FormRow label="Who will receive the bonus gift card?">
              <Select
                value={formData.bonusReceiver}
                onChange={e =>
                  handleStateChange('bonusReceiver', e.target.value)
                }
              >
                <option value="purchasing-customer">
                  The purchasing customer
                </option>
                <option value="gift-card-recipient">
                  The gift card recipient
                </option>
              </Select>
            </FormRow>
          </div>
        )}
      </div>

      {/* Redemption Restrictions Section */}
      <div className="space-y-4 border-t pt-6 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="redemption-restrictions"
            checked={formData.redemptionRestrictions}
            onChange={e =>
              handleStateChange('redemptionRestrictions', e.target.checked)
            }
          >
            Redemption restrictions?
          </Checkbox>
          <div className="grid gap-1.5">
            <label htmlFor="redemption-restrictions" className="font-medium">
              Redemption restrictions?
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Specify which products can be purchased using this gift card. Can
              also be set at the Variation level.
            </p>
          </div>
        </div>
        {formData.redemptionRestrictions && (
          <div className="space-y-4 pl-6">
            <FormRow
              label="Products"
              tooltip="Only these products can be purchased."
            >
              <MultiSelect
                placeholder="Search for a product..."
                options={MOCK_PRODUCTS}
                selected={formData.includedProducts}
                onSelect={val =>
                  handleStateChange('includedProducts', [
                    ...formData.includedProducts,
                    val,
                  ])
                }
                onRemove={val =>
                  handleStateChange(
                    'includedProducts',
                    formData.includedProducts.filter(p => p !== val)
                  )
                }
              />
            </FormRow>
            <FormRow
              label="Exclude products"
              tooltip="These products cannot be purchased."
            >
              <MultiSelect
                placeholder="Search for a product..."
                options={MOCK_PRODUCTS}
                selected={formData.excludedProducts}
                onSelect={val =>
                  handleStateChange('excludedProducts', [
                    ...formData.excludedProducts,
                    val,
                  ])
                }
                onRemove={val =>
                  handleStateChange(
                    'excludedProducts',
                    formData.excludedProducts.filter(p => p !== val)
                  )
                }
              />
            </FormRow>
            <FormRow
              label="Product categories"
              tooltip="Only products in these categories can be purchased."
            >
              <MultiSelect
                placeholder="Select categories..."
                options={MOCK_CATEGORIES}
                selected={formData.includedCategories}
                onSelect={val =>
                  handleStateChange('includedCategories', [
                    ...formData.includedCategories,
                    val,
                  ])
                }
                onRemove={val =>
                  handleStateChange(
                    'includedCategories',
                    formData.includedCategories.filter(p => p !== val)
                  )
                }
              />
            </FormRow>
            <FormRow
              label="Exclude categories"
              tooltip="Products in these categories cannot be purchased."
            >
              <MultiSelect
                placeholder="No categories"
                options={MOCK_CATEGORIES}
                selected={formData.excludedCategories}
                onSelect={val =>
                  handleStateChange('excludedCategories', [
                    ...formData.excludedCategories,
                    val,
                  ])
                }
                onRemove={val =>
                  handleStateChange(
                    'excludedCategories',
                    formData.excludedCategories.filter(p => p !== val)
                  )
                }
              />
            </FormRow>
            <FormRow label="Exclude tax">
              <Checkbox
                id="exclude-tax"
                checked={formData.excludeTax}
                onChange={e =>
                  handleStateChange('excludeTax', e.target.checked)
                }
              >
                Exclude tax
              </Checkbox>
            </FormRow>
            <FormRow label="Exclude Shipping">
              <Checkbox
                id="exclude-shipping"
                checked={formData.excludeShipping}
                onChange={e =>
                  handleStateChange('excludeShipping', e.target.checked)
                }
              >
                Exclude Shipping
              </Checkbox>
            </FormRow>
          </div>
        )}
      </div>
    </CardContent>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product data
          </h1>
          <Select value="pw-gift-card" onChange={() => {}}>
            <option value="pw-gift-card">PW Gift Card</option>
            <option value="simple-product">Simple Product</option>
          </Select>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 xl:w-1/5">
            <Card>
              <nav className="p-2 space-y-1">
                {[
                  { id: 'giftCard', label: 'Gift Card' },
                  { id: 'linkedProducts', label: 'Linked Products' },
                  { id: 'advanced', label: 'Advanced' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      handleStateChange(
                        'activeTab',
                        tab.id as 'giftCard' | 'linkedProducts' | 'advanced'
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Card>{renderContent()}</Card>
          </main>
        </div>
      </div>
    </div>
  );
}
