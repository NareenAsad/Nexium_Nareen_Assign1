import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { FavoritesProvider } from '@/context/FavoritesContext'; // ✅ import

export const metadata: Metadata = {
  title: 'Quote Generator',
  description: 'Inspiring quotes tailored to your interests.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <Navbar />
            <main className="pt-24 px-4 container mx-auto">{children}</main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
