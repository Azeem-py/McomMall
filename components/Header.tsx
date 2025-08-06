'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, ShoppingCart, User } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Auth from './auth';
import { NavMenu } from './NavMenu';

export default function Header() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold">McomMall</span>
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-red-400 bg-transparent">
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Home Sample 1
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Home Sample 2
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-red-400 bg-transparent">
                    Listings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          List Layout
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Grid Layout
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-red-400 bg-transparent">
                    Bussiness Category
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Dashboard
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          My Bookings
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-red-400 bg-transparent">
                    Pages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Blog
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          Contact
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav> */}

          <NavMenu />

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
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

            {/* Sign In */}
            <Auth>
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Auth>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-white"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>Listings</DropdownMenuItem>
                <DropdownMenuItem>User Panel</DropdownMenuItem>
                <DropdownMenuItem>Pages</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
