'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/dashboard" className="text-white font-bold text-2xl">
          MindFlare
        </Link>

        <div className="flex items-center space-x-6">
          {!isDashboard && (
            <Link
              href="/favorites"
              className="text-white font-bold hover:text-blue-300 transition"
            >
              Favorites
            </Link>
          )}

          {isDashboard && (
            <>
              <Link
                href="https://github.com/NareenAsad/Nexium_Nareen_Assign1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/nareen-asad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition flex items-center space-x-2"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
