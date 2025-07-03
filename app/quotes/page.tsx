'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import QuoteGenerator from '@/components/QuoteGenerator';

export default function QuotesPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/sign-in');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [router]);

  if (loading) return null; // or a spinner

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto">
          <QuoteGenerator />
        </div>
      </div>
    </div>
  );
}
