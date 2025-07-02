import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

interface QuoteCardProps {
  text: string;
  author: string;
  index: number;
  id: number;
  category: string;
  isFavorite?: boolean;
  onToggleFavorite?: (quote: { id: number; text: string; author: string; category: string }) => void;
  showFavoriteButton?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ 
  text, 
  author, 
  index, 
  id, 
  category, 
  isFavorite = false, 
  onToggleFavorite,
  showFavoriteButton = true 
}) => {
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite({ id, text, author, category });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 relative"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Quote className="w-8 h-8 text-blue-500 opacity-60" />
        </div>
        <div className="flex-1">
          <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">
            "{text}"
          </blockquote>
          <cite className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            — {author}
          </cite>
        </div>
        {showFavoriteButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default QuoteCard;