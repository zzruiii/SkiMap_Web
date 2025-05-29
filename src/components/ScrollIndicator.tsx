import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  text?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ text = "Scroll down to explore" }) => {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-50"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* 滚动图标 */}
      <div className="w-8 h-12 border-2 border-white rounded-full mb-2 relative bg-black bg-opacity-20 backdrop-blur-sm">
        <motion.div
          className="w-1.5 h-3 bg-white rounded-full absolute"
          style={{ 
            left: '50%', 
            top: '50%', 
            marginLeft: '-3px', // w-1.5 = 6px, 所以 -3px 来居中
            marginTop: '-8px'   // 从 -6px 调整到 -8px，让竖条稍微向上
          }}
          animate={{ y: [0, -10, 0] }} // 与外层鼠标动画保持一致
          transition={{
            duration: 2, // 与外层动画时长保持一致
            repeat: Infinity,
            ease: 'easeInOut', // 与外层动画缓动保持一致
          }}
        />
      </div>
      
      {/* 向下箭头 */}
      <motion.svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        className="text-white mb-2"
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      >
        <path
          d="M2 2L12 12L22 2"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      
      <p className="text-sm font-inria font-medium text-white text-center opacity-90">
        {text}
      </p>
    </motion.div>
  );
};

export default ScrollIndicator; 