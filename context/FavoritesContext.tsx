'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

interface FavoritesContextType {
  favorites: Quote[];
  addToFavorites: (quote: Quote) => void;
  removeFromFavorites: (quoteId: number) => void;
  isFavorite: (quoteId: number) => boolean;
  toggleFavorite: (quote: Quote) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('quote-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('quote-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (quote: Quote) => {
    setFavorites(prev => (prev.some(f => f.id === quote.id) ? prev : [...prev, quote]));
  };

  const removeFromFavorites = (quoteId: number) => {
    setFavorites(prev => prev.filter(q => q.id !== quoteId));
  };

  const isFavorite = (quoteId: number) => favorites.some(q => q.id === quoteId);

  const toggleFavorite = (quote: Quote) => {
    isFavorite(quote.id) ? removeFromFavorites(quote.id) : addToFavorites(quote);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
