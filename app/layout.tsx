import './globals.css';
import type { Metadata } from 'next';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Toaster } from 'sonner';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Quote Generator',
  description: 'Inspiring quotes tailored to your interests.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Toaster richColors position="top-center" />
          <ClientLayout>{children}</ClientLayout>
        </FavoritesProvider>
      </body>
    </html>
  );
}
