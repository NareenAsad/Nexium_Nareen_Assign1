// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Toaster } from 'sonner';
import ClientLayout from '@/components/ClientLayout';
import StarBackground from '@/components/StarBackground'; // ✅ Import star animation

export const metadata: Metadata = {
  title: 'Quote Generator',
  description: 'Inspiring quotes tailored to your interests.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <FavoritesProvider>
          <Toaster richColors position="top-center" />
          <StarBackground />
          <ClientLayout>{children}</ClientLayout>
        </FavoritesProvider>
      </body>
    </html>
  );
}
