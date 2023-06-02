import { Suspense } from 'react';

import Container from '@components/Container';
import Logo from './Logo';
import { Search } from './Search';
import { Categories } from './Categories';

type NavbarProps = {
  userMenu: React.ReactNode;
};

export const Navbar = ({ userMenu }: NavbarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />

            <Suspense fallback="Loading...">
              <Search />
            </Suspense>

            {userMenu}
          </div>
        </Container>
      </div>

      <Suspense>
        <Categories />
      </Suspense>
    </div>
  );
};
