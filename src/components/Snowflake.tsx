import React from 'react';
import { motion } from 'framer-motion';

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  left: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({ delay, duration, size, left }) => {
  return (
    <motion.div
      className="absolute bg-white rounded-full opacity-80"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
      }}
      initial={{ y: -100, x: 0 }}
      animate={{
        y: window.innerHeight + 100,
        x: Math.random() * 100 - 50, // 随机水平漂移
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

export default Snowflake; 