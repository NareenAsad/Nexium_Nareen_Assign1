'use client';

import Navbar from '@/components/Navbar';
import QuoteGenerator from '@/components/QuoteGenerator';

export default function QuotesPage() {
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
