import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skiResorts, SkiResort } from '../types/SkiResort';
import SkiResortCard from './SkiResortCard';
import skiMapSvg from '../assets/00ski_map.svg';

interface MapPageProps {
  isActive: boolean;
}

// 区域限制的雪花组件 - 仅在地图右侧显示
const RegionalSnowflake: React.FC<{
  delay: number;
  duration: number;
  size: number;
  left: number;
  rightBoundary: number;
}> = ({ delay, duration, size, left, rightBoundary }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 生成随机的水平摆动幅度，但限制在右侧区域内
  const swayAmount = Math.random() * 20 + 10; // 较小的摆动幅度，适合区域限制
  
  // 确保雪花只在右侧区域显示（rightBoundary以右）
  const adjustedLeft = rightBoundary + (left * (100 - rightBoundary) / 100);
  
  return (
    <motion.div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${adjustedLeft}%`,
        top: `-${size + 100}px`,
        opacity: 0.75 + Math.random() * 0.25,
        boxShadow: '0 0 6px rgba(255, 255, 255, 0.3)',
        zIndex: 5,
      }}
      animate={{
        y: [0, windowHeight + size + 100],
        x: [0, swayAmount, -swayAmount/2, swayAmount, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: 'linear',
        x: {
          duration: duration * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }}
    />
  );
};

const MapPage: React.FC<MapPageProps> = ({ isActive }) => {
  const [hoveredResort, setHoveredResort] = useState<SkiResort | null>(null);
  const [regionalSnowflakes, setRegionalSnowflakes] = useState<Array<{
    id: number;
    delay: number;
    duration: number;
    size: number;
    left: number;
  }>>([]);

  // 生成右侧区域的雪花
  useEffect(() => {
    const generateRegionalSnowflakes = () => {
      const flakes = [];
      
      // 在右侧区域（意大利部分）生成雪花，数量适中
      for (let i = 0; i < 25; i++) {
        let size;
        const sizeRandom = Math.random();
        
        if (sizeRandom < 0.1) {
          // 10% 大雪花 (24px)
          size = 24;
        } else if (sizeRandom < 0.3) {
          // 20% 中雪花 (18px)
          size = 18;
        } else {
          // 70% 小雪花 (12px)
          size = 12;
        }
        
        flakes.push({
          id: i,
          delay: (i / 25) * 15 + Math.random() * 3,
          duration: 10 + Math.random() * 8, // 10-18秒
          size: size,
          left: Math.random() * 100, // 这个会被RegionalSnowflake调整到右侧区域
        });
      }
      setRegionalSnowflakes(flakes);
    };

    generateRegionalSnowflakes();
  }, []);

  // 山形图标SVG - 使用新的icon.svg模板
  const MountainIcon = ({ resort, isHovered }: { resort: SkiResort; isHovered: boolean }) => (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${resort.position.x}%`,
        top: `${resort.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
      whileHover={{ scale: 1.3 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHoveredResort(resort)}
      onMouseLeave={() => setHoveredResort(null)}
    >
      {/* 使用新的SVG图标模板 - 基于Figma精确规格 */}
      <svg
        width="23"
        height="25"
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isHovered ? 'filter brightness-125' : ''}`}
        style={{
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none'
        }}
      >
        {/* Vector 6 - 主要山峰路径，使用滑雪场的特定颜色 */}
        <path 
          d="M1.90625 19.7651L0.414062 24.9427H22.9316C22.1612 22.7554 20.4745 18.2977 19.8911 17.9654C19.3077 17.6332 17.1274 14.2461 16.1101 12.5941C15.8184 13.0371 15.7016 13.0161 15.5155 12.4556C15.3933 12.0878 14.5656 9.62226 14.1467 8.46862C14.0831 8.29326 13.8214 8.10868 13.3838 7.49955C12.9462 6.89043 12.5049 5.50605 12.3516 4.7308C12.0412 3.71559 11.3979 1.57996 11.3082 1.15911C11.2184 0.738261 11.0314 0.83609 10.9492 0.937611C10.4892 1.75901 9.52204 3.46825 9.33356 3.73405C9.14507 3.99985 8.87356 4.10322 8.76136 4.12167C8.07697 5.49682 6.57132 8.4963 6.02381 9.49305C5.4763 10.4898 4.74105 11.1082 4.44186 11.2927L1.90625 19.7651Z" 
          fill={resort.color}
        />
        {/* Vector 7 - 阴影山峰路径，固定使用Figma中的颜色#293F88 */}
        <path 
          d="M10.4034 7.74862L11.1534 1.07617C10.8362 1.45455 10.1012 2.41066 9.69819 3.20803C9.29522 4.00541 8.85867 4.24166 8.69077 4.26012C8.13855 5.31221 6.89308 7.72647 6.32893 8.96683C5.76477 10.2072 4.76929 10.9326 4.37005 11.1818L0.351562 24.942H8.69077L9.69819 19.5985L11.7354 14.8087L10.4034 7.74862Z" 
          fill="#293F88"
        />
        {/* Vector 8 - 雪峰高光路径，固定使用白色#FEFFFF */}
        <path 
          d="M11.2678 10.4274C10.9434 11.0241 10.5394 10.4919 10.378 10.1512L9.96123 9.65399L9.28543 8.71481L8.29425 8.02424L7.60718 6.36686L8.73352 4.10177C8.77482 4.10177 9.17057 3.90162 9.28543 3.71505C10.1527 2.30628 10.3404 1.81827 10.9299 0.897504C11.0651 0.686371 11.1066 0.642652 11.2678 1.008C11.5306 1.60366 12.0828 3.78667 12.3716 4.87522C12.9798 7.16792 13.4529 7.66514 13.8696 8.02424C14.1832 8.29438 14.6168 9.76448 14.7482 10.1512L15.2438 11.5324L15.7281 12.9135C16.0097 12.9135 15.9731 12.2707 16.235 12.7201C16.5729 13.3002 17.9921 15.6482 18.6679 16.4769L20.1096 18.1619C20.1096 18.1619 20.7741 18.7972 20.5826 19.3773C20.3912 19.9574 19.7356 18.0624 19.5464 17.9961C19.314 17.9147 18.8859 17.3266 18.6039 16.9393L18.589 16.9188C18.3074 16.5321 17.4852 17.1122 17.136 16.8083C16.7869 16.5045 16.8657 15.9797 16.28 15.9797C15.8115 15.9797 15.6267 15.7587 15.5929 15.6482C15.4803 15.0221 15.2258 13.6649 15.1086 13.245C14.9622 12.7201 14.5117 12.5544 14.6018 13.7698C14.6739 14.7421 14.1437 14.3775 13.8696 14.0737L11.876 9.12916C11.8084 9.31331 11.5922 9.83078 11.2678 10.4274Z" 
          fill="#FEFFFF"
        />
      </svg>
      
      {/* 发光效果 */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${resort.color}33 0%, transparent 60%)`,
            transform: 'scale(2.5)',
            zIndex: -1
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );

  return (
    // 背景调整为Figma中的深蓝色调 - 完全占满屏幕，无任何边距
    <div className="w-screen h-screen bg-gradient-to-br from-[#0B1748] via-[#122360] to-[#1A327A] relative overflow-hidden">
      {/* 背景装饰层 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M50%200H30L0%2050L30%2080H50L80%2050L50%200Z%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      
      {/* 页面标题 - 移动到页面左上角显示 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute top-4 md:top-6 left-4 md:left-6 z-20 text-left"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-inria" style={{ color: '#293F88' }}>
          Ski Resorts
        </h1>
        <p className="text-base md:text-lg max-w-md font-inria" style={{ color: '#293F88' }}>
          Discover the best skiing destinations across France
        </p>
      </motion.div>

      {/* 地图容器 - 完全占满整个视窗，从顶部开始 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute inset-0 w-full h-full"
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* 地图背景 - 优化尺寸和比例 */}
        <div 
          className="w-full h-full relative overflow-hidden"
          style={{
            backgroundImage: `url('${skiMapSvg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            minWidth: '100vw'
          }}
        >
          {/* 地图坐标系统 - 调整viewBox以更好地适配全屏比例 */}
          <svg
            viewBox="0 0 100 100" // 使用百分比坐标系统，更容易适配不同屏幕比例
            className="w-full h-full absolute inset-0 opacity-0 pointer-events-none"
            preserveAspectRatio="xMidYMid slice" // 保持纵横比并填满容器
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 城市标签 - 使用相对位置 */}
            <text x="75" y="15" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Geneva</text>
            <text x="15" y="45" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Lyon</text>
            <text x="80" y="65" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Turin</text>
          </svg>

          {/* 滑雪场图标层 */}
          <div className="absolute inset-0 w-full h-full">
            {skiResorts.map((resort) => (
              <MountainIcon
                key={resort.id}
                resort={resort}
                isHovered={hoveredResort?.id === resort.id}
              />
            ))}
          </div>

          {/* 右侧区域雪花动画层 - 仅在法国边境线东侧显示 */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {regionalSnowflakes.map((flake) => (
              <RegionalSnowflake
                key={flake.id}
                delay={flake.delay}
                duration={flake.duration}
                size={flake.size}
                left={flake.left}
                rightBoundary={75} // 法国边境线大约在75%位置，右侧25%为意大利地区
              />
            ))}
          </div>

          {/* 悬浮卡片层 */}
          <AnimatePresence>
            {hoveredResort && (
              <div className="absolute inset-0">
                <SkiResortCard
                  resort={hoveredResort}
                  position={hoveredResort.position}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 返回首页提示 - 调整为页面正上方居中显示 */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -3, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.9 },
            y: {
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
          className="fixed top-2 left-1/2 transform -translate-x-1/2 md:top-4 flex flex-col items-center z-50"
        >
          <motion.svg
            width="18"
            height="10"
            viewBox="0 0 24 16"
            fill="none"
            className="mb-1"
            style={{ color: '#293F88' }}
          >
            <path
              d="M22 14L12 4L2 14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <p className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap">
            Scroll up to return
          </p>
        </motion.div>
      )}

      {/* 向下探索提示 - 页面下方中央显示 */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [0, 3, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 1.1 },
            y: {
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
          className="fixed bottom-2 left-1/2 transform -translate-x-1/2 md:bottom-4 flex flex-col items-center z-50"
        >
          <p className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full mb-1 whitespace-nowrap">
            Scroll down to explore blue bird days
          </p>
          <motion.svg
            width="18"
            height="10"
            viewBox="0 0 24 16"
            fill="none"
            style={{ color: '#293F88' }}
          >
            <path
              d="M2 2L12 12L22 2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
};

export default MapPage; 