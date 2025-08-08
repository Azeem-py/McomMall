import { NavMenu } from '@/components/NavMenu';
import Link from 'next/link';
import SideMenu from './component/SideMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-screen h-screen overflow-hidden">
      <div className=" w-[18rem] bg-[#F6F6F6] px-3 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-3xl font-semibold">McomMall</span>
        </Link>
        <SideMenu />
      </div>
      <div className="w-4/5">
        <NavMenu />
        <div className="p-5 overflow-auto max-h-[calc(100vh-5rem)]">
          {children}
        </div>
      </div>
    </section>
  );
}
