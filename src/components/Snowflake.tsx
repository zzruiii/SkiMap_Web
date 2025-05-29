import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  left: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({ delay, duration, size, left }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 生成随机的水平摆动幅度
  const swayAmount = Math.random() * 40 + 15; // 15-55px的摆动幅度
  
  return (
    <motion.div
      className="fixed bg-white rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `-${size + 200}px`, // 固定在页面顶部外部
        opacity: 0.85 + Math.random() * 0.15,
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
        zIndex: 1000,
      }}
      animate={{
        y: [0, windowHeight + size + 200], // 从当前位置（页面外）飘落到底部外
        x: [0, swayAmount, -swayAmount, swayAmount, 0], // 水平摆动
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: 'linear',
        x: {
          duration: duration * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }}
    />
  );
};

export default Snowflake; 