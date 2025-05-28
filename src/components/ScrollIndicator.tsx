import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-ski-navy"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* 滚动图标 */}
      <div className="w-10 h-6 border-2 border-ski-navy rounded-full mb-2 relative">
        <motion.div
          className="w-1 h-2 bg-ski-navy rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      {/* 向下箭头 */}
      <svg
        width="20"
        height="12"
        viewBox="0 0 20 12"
        fill="none"
        className="text-ski-navy"
      >
        <path
          d="M1 1L10 10L19 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      <p className="text-sm font-inria font-medium mt-2 text-ski-navy">
        向下滚动探索
      </p>
    </motion.div>
  );
};

export default ScrollIndicator; 