import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import QuoteCard from './QuoteCard';
import { Quote } from '../context/FavoritesContext';

interface FavoritesSectionProps {
  favorites: Quote[];
  onRemoveFromFavorites: (quoteId: number) => void;
  isVisible: boolean;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  favorites, 
  onRemoveFromFavorites, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-red-400 fill-current" />
            <h2 className="text-3xl font-bold text-white">Your Favorite Quotes</h2>
          </div>
          
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Heart className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg mb-2">No favorite quotes yet</p>
              <p className="text-white/50">Start adding quotes to your favorites by clicking the heart icon!</p>
            </motion.div>
          ) : (
            <>
              <p className="text-white/80 text-center mb-8">
                You have {favorites.length} favorite quote{favorites.length !== 1 ? 's' : ''}
              </p>
              
              <div className="space-y-6">
                {favorites.map((quote, index) => (
                  <div key={quote.id} className="relative">
                    <QuoteCard
                      id={quote.id}
                      text={quote.text}
                      author={quote.author}
                      category={quote.category}
                      index={index}
                      showFavoriteButton={false}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveFromFavorites(quote.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-300"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FavoritesSection;