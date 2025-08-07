import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';

export function NavMenu() {
  const businessCategories = [
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
  return (
    <Menubar className="gap-7 bg-transparent border-0">
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Winter</MenubarItem>
          <MenubarItem>Spring</MenubarItem>
          <MenubarItem>Summer</MenubarItem>
          <MenubarItem>Autumn</MenubarItem>

          {/* <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Listings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={'/claim-listing'}>Claim listing</Link>
          </MenubarItem>
          <MenubarItem>Create new listing</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Business Category</MenubarTrigger>
        <MenubarContent align="center">
          <MenubarItem className="flex justify-items-start items-start gap-5 bg-white hover:bg-white">
            {businessCategories.map((category, i) => {
              return (
                <div key={i} className=" font-normal text-gray-700">
                  <h3 className="font-medium text-lg mb-2.5">
                    {category.title}
                  </h3>
                  {category.items.map((item, i) => {
                    return (
                      <ul key={i}>
                        <li>
                          <Link href="/" className="hover:text-red-500">
                            {item}
                          </Link>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Pages</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
