'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Step 1: Listen for auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);

        // Step 2: Load favorites from Firestore
        const docRef = doc(db, 'favorites', user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavorites(docSnap.data().quotes || []);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Step 3: Save favorites to Firestore
  const saveFavorites = async (updatedFavorites: Quote[]) => {
    if (!userEmail) return;
    const docRef = doc(db, 'favorites', userEmail);
    await setDoc(docRef, { quotes: updatedFavorites });
  };

  const addToFavorites = (quote: Quote) => {
    setFavorites((prev) => {
      const updated = prev.some((q) => q.id === quote.id) ? prev : [...prev, quote];
      saveFavorites(updated);
      return updated;
    });
  };

  const removeFromFavorites = (quoteId: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((q) => q.id !== quoteId);
      saveFavorites(updated);
      return updated;
    });
  };

  const isFavorite = (quoteId: number) => favorites.some((q) => q.id === quoteId);

  const toggleFavorite = (quote: Quote) => {
    isFavorite(quote.id) ? removeFromFavorites(quote.id) : addToFavorites(quote);
  };

  if (loading) return null;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
