'use client';

import { usePathname } from 'next/navigation';
import AuthNavbar from './AuthNavbar';
import MainNavbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {isAuthPage ? <AuthNavbar /> : <MainNavbar />}
      <main className={`px-4 container mx-auto flex-grow ${isAuthPage ? 'pt-10' : 'pt-24'} pb-10`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
