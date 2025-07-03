'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const isDashboard = pathname === '/dashboard';
  const isQuotesPage = pathname === '/quotes';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/dashboard" className="text-white font-bold text-2xl">MindFlare</Link>

        <div className="flex items-center space-x-6">
          {/* Show welcome message only on dashboard */}
          {isDashboard && user && (
            <span className="text-white hidden sm:inline-block">
              Welcome, {user.displayName || user.email} 👋
            </span>
          )}

          {/* Show Favorites only outside dashboard */}
          {!isDashboard && (
            <Link href="/favorites" className="text-white font-bold hover:text-blue-300 transition">
              Favorites
            </Link>
          )}

          {/* Logout button */}
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
