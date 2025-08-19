// components/Header.tsx (Updated)
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you still want these ui components
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User } from 'lucide-react';
import Auth from './auth';
import { NavMenu } from './NavMenu';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold">McomMall</span>
          </Link>

          {/* Desktop Nav - Placed in the middle for better layout */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <NavMenu />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-white hover:text-red-400"
            >
              <ShoppingCart className="w-5 h-5" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500"
              >
                0
              </Badge>
            </Button>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Auth>
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Auth>
            )}

            {/* Mobile Nav Trigger is now inside NavMenu */}
            <div className="md:hidden">
              <NavMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
