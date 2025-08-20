import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  BookOpen,
  Plus,
  List,
  Wallet,
  ShoppingCart,
  UserStar,
  Bookmark,
  BanknoteArrowDown,
  ShoppingBag,
  SquareDashedKanban,
  Settings,
  LucideIcon,
  UserPen,
  LogOut,
  Megaphone,
} from 'lucide-react';

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  subMenu?: SubMenuItem[];
}

// Export the menu item arrays
export const mainMenuItems: MenuItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'My Bookings', href: '/dashboard/my-bookings', icon: Calendar },
  { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { title: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    icon: BookOpen,
    subMenu: [
      { title: 'Calendar View', href: '/dashboard/bookings/calendar' },
      { title: 'QR Scanner', href: '/dashboard/bookings/qr-scanner' },
      { title: 'Pending', href: '/dashboard/bookings/pending' },
      { title: 'Approved', href: '/dashboard/bookings/approved' },
      { title: 'Cancelled', href: '/dashboard/bookings/cancelled' },
    ],
  },
];

export const listingMenuItems: MenuItem[] = [
  { title: 'Add listing', href: '/dashboard/add-listing', icon: Plus },
  { title: 'My Bookings', href: '/dashboard/my-bookings', icon: Calendar },
  { title: 'Ad Campaign', href: '/dashboard/ad-campaign', icon: Megaphone },
  {
    title: 'My listings',
    href: '/dashboard/my-listings',
    icon: List,
    subMenu: [
      { title: 'Active', href: '/dashboard/my-listings/active' },
      { title: 'Pending', href: '/dashboard/my-listings/pending' },
      { title: 'Expired', href: '/dashboard/my-listings/expired' },
    ],
  },
  { title: 'Coupons', href: '/dashboard/coupons', icon: ShoppingCart },
  { title: 'Reviews', href: '/dashboard/reviews', icon: UserStar },
  { title: 'Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark }, // Typo corrected: "Boomarks" -> "Bookmarks"
];

export const storeMenuItems: MenuItem[] = [
  { title: 'Dashboard', href: '/dashboard/store', icon: LayoutDashboard },
  {
    title: 'Products',
    href: '/dashboard/store/products',
    icon: SquareDashedKanban,
  },
  { title: 'Orders', href: '/dashboard/store/orders', icon: ShoppingBag },
  {
    title: 'Withdraw',
    href: '/dashboard/store/withdraw',
    icon: BanknoteArrowDown,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    subMenu: [
      { title: 'Store', href: '/dashboard/settings' },
      { title: 'Payment', href: '/dashboard/settings/payment' },
    ],
  },
];

export const businessCategories = [
  {
    title: 'Building and trades',
    items: ['Plumbers', 'Electricians', 'Builders', 'Roofers'],
  },
  {
    title: 'Health and beauty',
    items: ['Hairdressers', 'Nail salons', 'Spas'],
  },
  { title: 'Food and drink', items: ['Restaurants', 'Cafes', 'Bars'] },
  {
    title: 'Education and training',
    items: ['Tutors', 'Courses', 'Workshops'],
  },
];

export const accountMenuItems: MenuItem[] = [
  { title: 'My Profile', href: '/dashboard/my-profile', icon: UserPen },
  { title: 'Logout', href: '/', icon: LogOut },
];

export const pluginMenuItems: MenuItem[] = [
  {
    title: 'Loyalty & Reward',
    href: '/dashboard/loyalty',
    icon: Settings,
    subMenu: [
      { title: 'Dashboard', href: '/dashboard/loyalty' },
      { title: 'Members', href: '/dashboard/loyalty/members' },
      { title: 'Promotion', href: '/dashboard/loyalty/promotion' },
      { title: 'Offers', href: '/dashboard/loyalty/offers' },
      { title: 'Settings', href: '/dashboard/loyalty/settings' },
    ],
  },
  {
    title: 'Gift Card',
    href: '/dashboard/gift-card',
    icon: Settings,
    subMenu: [
      { title: 'Dashboard', href: '/dashboard/gift-card' },
      { title: 'Admin', href: '/dashboard/gift-card/admin' },
      { title: 'Check Balance', href: '/dashboard/gift-card/check-balance' },
      { title: 'Offers', href: '/dashboard/loyalty/offers' },
      { title: 'Settings', href: '/dashboard/gift-card/settings' },
    ],
  },
];
