// lib/menu-items.ts

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
  LucideIcon, // Import the type for the icon
} from 'lucide-react';

// Define a reusable type for menu items
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
  { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
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
    href: '/dashboard/store/settings',
    icon: Settings,
    subMenu: [
      { title: 'Store', href: '/dashboard/store/settings' },
      { title: 'Payment', href: '/dashboard/store/settings/payment' },
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
