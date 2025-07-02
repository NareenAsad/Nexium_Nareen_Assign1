'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">MindFlare</Link>
        <div className="flex items-center space-x-6">
          
          <Link href="/favorites" className="text-white hover:text-blue-300 transition">Favorites</Link>
          <Link href="/" className="text-white hover:text-blue-300 transition">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
