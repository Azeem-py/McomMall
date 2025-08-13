// components/NavMenu.tsx

'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Make sure you have this utility from shadcn/ui
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { businessCategories } from '@/lib/menu-items'; // Your data import remains the same

export function NavMenu() {
  return (
    // This div hides the component on mobile and shows it on medium screens and up
    <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] lg:w-[300px]">
                <ListItem href="/home/winter" title="Winter">
                  Seasonal specials and winter collections.
                </ListItem>
                <ListItem href="/home/spring" title="Spring">
                  Fresh arrivals for the spring season.
                </ListItem>
                <ListItem href="/home/summer" title="Summer">
                  Explore our summer sales and new items.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Business Category (Mega Menu) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Business Category
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] grid-cols-2 gap-5 p-4 md:w-[600px] lg:w-[700px]">
                {businessCategories.map(category => (
                  <div key={category.title}>
                    <h3 className="mb-2.5 font-medium text-lg text-slate-900">
                      {category.title}
                    </h3>
                    <ul>
                      {category.items.map(item => (
                        <li key={item}>
                          <ListItem
                            href={`/categories/${item
                              .toLowerCase()
                              .replace(' ', '-')}`}
                            title={item}
                          >
                            {/* You can add a description here if needed */}
                          </ListItem>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Listings */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Listings
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[250px]">
                <ListItem href="/listings/claim" title="Claim Listing">
                  Find and claim your business profile.
                </ListItem>
                <ListItem href="/listings/new" title="Create New Listing">
                  Add your business to our directory.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// Reusable ListItem component for consistent styling
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
