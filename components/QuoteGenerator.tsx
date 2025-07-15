'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import QuoteCard from './QuoteCard';
import { useFavorites, Quote } from '../context/FavoritesContext';
import quotesData from '../data/quotes.json';

const QuoteGenerator: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [displayedQuotes, setDisplayedQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const topics = [
    { value: 'motivation', label: 'Motivation' },
    { value: 'success', label: 'Success' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'perseverance', label: 'Perseverance' },
    { value: 'happiness', label: 'Happiness' },
    { value: 'wisdom', label: 'Wisdom' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'creativity', label: 'Creativity' },
    { value: 'courage', label: 'Courage' },
    { value: 'growth', label: 'Growth' },
  ];

  const generateQuotes = () => {
    if (!selectedTopic) return;

    setIsLoading(true);

    setTimeout(() => {
      const filteredQuotes = quotesData.filter(
        (quote: Quote) => quote.category === selectedTopic
      );

      const shuffled = [...filteredQuotes].sort(() => 0.5 - Math.random());
      const selectedQuotes = shuffled.slice(0, 3);

      setDisplayedQuotes(selectedQuotes);
      setIsLoading(false);
    }, 800);
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    setDisplayedQuotes([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20 shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1">
            <label
              htmlFor="topic-select"
              className="block text-white text-lg font-semibold mb-3"
            >
              Choose Your Topic
            </label>
            <Select value={selectedTopic} onValueChange={handleTopicChange}>
              <SelectTrigger className="w-full h-12 text-lg bg-white/90 border-white/30 focus:border-blue-400 text-black">
                <SelectValue placeholder="Select a topic for inspiration..." />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {topics.map((topic) => (
                  <SelectItem key={topic.value} value={topic.value}>
                    {topic.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={generateQuotes}
              disabled={!selectedTopic || isLoading}
              className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Generating...' : 'Generate Quotes'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center space-x-2 text-white text-xl">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Finding the perfect quotes for you...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quotes Display */}
      <AnimatePresence mode="wait">
        {displayedQuotes.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white text-center mb-8 capitalize"
            >
              {selectedTopic} Quotes
            </motion.h2>

            <div className="grid gap-6 md:gap-8">
              {displayedQuotes.map((quote, index) => (
                <QuoteCard
                  key={quote.id}
                  id={quote.id}
                  text={quote.text}
                  author={quote.author}
                  category={quote.category}
                  index={index}
                  isFavorite={isFavorite(quote.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-8"
            >
              <Button
                onClick={generateQuotes}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Get New Quotes
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {displayedQuotes.length === 0 && !isLoading && selectedTopic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-white/70 text-lg">
            Click "Generate Quotes" to discover inspiring {selectedTopic} quotes!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuoteGenerator;
