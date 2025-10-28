import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { BorrowedProvider } from '@/context/BorrowedContext';


import Sidebar from '@/components/Sidebar';
import HorizontalNavbar from '@/components/HorizontalNavbar';
import MobileNavbar from '@/components/MobileNavbar';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} main-background text-white`}>
        <AuthProvider>
          <BorrowedProvider>
            <WishlistProvider>
              <CartProvider>

                <Sidebar />
                <HorizontalNavbar />
                <MobileNavbar />
                <main className="p-8 pt-24 md:pt-24 lg:pt-8 lg:ml-20">
                  {children}
                </main>
              </CartProvider>
            </WishlistProvider>
          </BorrowedProvider>
        </AuthProvider>
      </body>
    </html>
  );
}