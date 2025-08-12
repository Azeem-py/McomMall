// components/NavMenu.tsx

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';
import { businessCategories } from '@/lib/menu-items'; // Import the data

export function NavMenu() {
  return (
    // This div hides the component on mobile and shows it on medium screens and up
    <div className="hidden md:flex">
      <Menubar className="gap-7 bg-transparent border-0 h-[5rem] rounded-none md:pl-4">
        {/* Home */}
        <MenubarMenu>
          <MenubarTrigger>Home</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Winter</MenubarItem>
            <MenubarItem>Spring</MenubarItem>
            <MenubarItem>Summer</MenubarItem>
            <MenubarItem>Autumn</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Listings */}
        <MenubarMenu>
          <MenubarTrigger>Listings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href={'/listings'}>Claim listing</Link>
            </MenubarItem>
            <MenubarItem>Create new listing</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Business Category */}
        <MenubarMenu>
          <MenubarTrigger>Business Category</MenubarTrigger>
          <MenubarContent align="center">
            <MenubarItem className="flex justify-items-start items-start gap-5 bg-white hover:bg-white focus:bg-white">
              {businessCategories.map((category, i) => (
                <div key={i} className="font-normal text-gray-700">
                  <h3 className="font-medium text-lg mb-2.5">
                    {category.title}
                  </h3>
                  {category.items.map((item, j) => (
                    <ul key={j}>
                      <li>
                        <Link href="/" className="hover:text-red-500">
                          {item}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Pages */}
        <MenubarMenu>
          <MenubarTrigger>Pages</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
