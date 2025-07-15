'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);

  const handleFlip = (index: number) => {
    setFlippedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <Navbar />
      <div className="container mx-auto pt-10 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to MindFlare</h1>
          <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Fuel your mind. Spark your day.
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            MindFlare delivers daily inspiration tailored to your mood. Just pick a topic and we’ll handle the rest — one quote at a time.
          </p>
          <Link href="/quotes">
            <Button className="mt-6 bg-blue-900 text-white hover:bg-blue-800">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const isFlipped = flippedIndexes.includes(index);
            return (
              <div
                key={index}
                className="relative [perspective:1000px] cursor-pointer"
                onClick={() => handleFlip(index)}
              >
                <div
                  className={`relative h-40 w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front */}
                  <div
                    className={`absolute w-full h-full rounded-xl p-6 shadow-xl ${step.frontBg} [backface-visibility:hidden] flex items-center justify-center text-center`}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p>{step.frontText}</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className={`absolute w-full h-full rounded-xl p-6 shadow-xl ${step.backBg} [backface-visibility:hidden] rotate-y-180 flex items-center justify-center text-center`}
                  >
                    <p>{step.backText}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    title: 'Step 1: Choose a Topic',
    frontText: 'Pick a category that fits your mindset or goals.',
    backText: 'Your topic guides the quotes you’ll receive — choose what moves you.',
    frontBg: 'bg-indigo-800 text-white',
    backBg: 'bg-indigo-800 text-white',
  },
  {
    title: 'Step 2: Generate Quotes',
    frontText: "Click 'Generate' to receive 3 inspiring quotes instantly.",
    backText: 'Our algorithm handpicks motivational quotes to keep you going.',
    frontBg: 'bg-indigo-800 text-white',
    backBg: 'bg-indigo-800 text-white',
  },
  {
    title: 'Step 3: Save Your Favorites',
    frontText: 'Keep your favorite quotes for future inspiration.',
    backText: 'All saved quotes are stored in your personal list for daily boosts.',
    frontBg: 'bg-indigo-800 text-white',
    backBg: 'bg-indigo-800 text-white',
  },
];
