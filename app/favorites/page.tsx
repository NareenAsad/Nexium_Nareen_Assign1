'use client';

import FavoritesSection from '@/components/FavoritesSection';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  console.log('Favorites on page load:', favorites); // Debug

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 pt-8 px-3">
      <FavoritesSection
        favorites={favorites}
        onRemoveFromFavorites={removeFromFavorites}
        isVisible={true}
      />
    </div>
  );
}
