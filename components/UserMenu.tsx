'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { UserCircle, ChevronDown, User as UserIcon, Smile, Star } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const icons = [UserCircle, UserIcon, Smile, Star];

export const UserMenu = () => {
  const { userName, logout } = useAuth();
  const RandomIcon = useMemo(() => icons[Math.floor(Math.random() * icons.length)], []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
        <RandomIcon className="w-8 h-8 text-gray-400" />
        <span className="text-white font-medium">{userName}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
