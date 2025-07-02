'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import QuoteGenerator from '@/components/QuoteGenerator';
import router from 'next/router';

export default function HomePage() {
  const [loading, setLoading] = useState(true); // Track hydration

  useEffect(() => {
    // Wait until window is available
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) {
        router.replace('/sign-in');
      } else {
        setLoading(false); // Show page content only if authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return null; // Or a loading spinner
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navbar />
      <div className="pt-13">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ignite thought. Inspire action.
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover inspiring quotes tailored to your interests. Select a topic and let wisdom guide your day.
            </p>
          </div>
          <QuoteGenerator />
        </div>
      </div>
    </div>
  );
}
