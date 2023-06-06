import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

import { getCurrentUser } from '@helpers/getCurrentUser';

import { Navbar } from '@components/navbar';
import UserMenu from '@components/navbar/UserMenu';

import ToasterProvider from '@providers/ToasterProvider';

import '@styles/globals.css';

const LoginModal = dynamic(() => import('@components/modals/LoginModal'));
const RegisterModal = dynamic(() => import('@components/modals/RegisterModal'));
const SearchModal = dynamic(() => import('@components/modals/SearchModal'));
const RentModal = dynamic(() => import('@components/modals/RentModal'));

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

const nunito = Nunito({
  subsets: ['latin'],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${nunito.className} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md`}
      >
        <ToasterProvider />

        <LoginModal />

        <RegisterModal />

        <Suspense fallback="Loading...">
          <SearchModal />
        </Suspense>

        <RentModal />

        <Navbar userMenu={<UserMenu currentUser={currentUser} />} />

        <Analytics />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
