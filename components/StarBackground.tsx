'use client';

import { motion } from 'framer-motion';

const starCount = 30;
const starPositions = Array.from({ length: starCount }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
}));

const StarBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {starPositions.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 rounded-full bg-white twinkle-star"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
