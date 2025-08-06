'use client';

import Link from 'next/link';
import { Twitter, Linkedin, MessageCircle, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-semibold">McomMall</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Find the best places around you with our comprehensive directory
              platform.
            </p>
          </div>

          {/* Office Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Office</h4>
            <div className="space-y-2 text-gray-300">
              <p>12345 Little Lonsdale St, Melbourne</p>
              <p>Phone: (123) 123-456</p>
              <p>E-Mail: office@mcommall.com</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} McomMall. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
