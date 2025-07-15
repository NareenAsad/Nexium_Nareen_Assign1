'use client';

import MainNavbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <MainNavbar />
      <main className="px-4 container mx-auto flex-grow pt-24 pb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
