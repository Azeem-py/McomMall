'use client';

import { MenuContent } from './MenuContent';

const SideMenu = () => {
  return (
    <aside className="w-full h-full p-4 overflow-y-auto bg-gray-100 rounded-2xl">
      <MenuContent />
    </aside>
  );
};

export default SideMenu;
