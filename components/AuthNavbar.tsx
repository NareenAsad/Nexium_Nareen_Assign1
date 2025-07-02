'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AuthNavbar = () => {
  return (
    <nav className="bg-opacity-90 backdrop-blur-md border-b border-white/10 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4 flex justify-between items-center py-6">
      <Link href="/" className="text-white font-bold text-lg">
        MindFlare
      </Link>

      <div className="flex items-center space-x-4">
        {/* Social Icons */}
        <Link
          href="https://github.com/NareenAsad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 text-xl"
        >
          <FaGithub />
        </Link>

        <Link
          href="https://linkedin.com/in/nareen-asad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 text-xl"
        >
          <FaLinkedin />
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
