'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/sign-in');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">MindFlare</Link>
        <div className="flex items-center space-x-6">
          <Link href="/favorites" className="text-white font-bold hover:text-blue-300 transition">Favorites</Link>
          
          {/* Logout link styled like a button */}
          <button
            onClick={handleLogout}
            className="text-white font-bold hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
