import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { BorrowedProvider } from '@/context/BorrowedContext';

import Sidebar from '@/components/Sidebar';
import HorizontalNavbar from '@/components/HorizontalNavbar';
import MobileNavbar from '@/components/MobileNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Library',
  description: 'Library Borrowing System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <BorrowedProvider>
            <WishlistProvider>
              <Sidebar />
              <HorizontalNavbar />
              <MobileNavbar />
              <main className="p-8 pt-24 md:pt-24 lg:pt-8 lg:ml-20">
                {children}
              </main>
            </WishlistProvider>
          </BorrowedProvider>
        </AuthProvider>
      </body>
    </html>
  );
}