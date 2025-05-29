import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isTransitioning) return;

      if (e.deltaY > 0 && currentPage === 0) {
        // 向下滚动到地图页面
        setIsTransitioning(true);
        setCurrentPage(1);
        setTimeout(() => setIsTransitioning(false), 2000); // 增加转场时间
      } else if (e.deltaY < 0 && currentPage === 1) {
        // 向上滚动回首页
        setIsTransitioning(true);
        setCurrentPage(0);
        setTimeout(() => setIsTransitioning(false), 2000);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentPage, isTransitioning]);

  // 山脉到La Plagne位置的动画变体
  const mountainTransition = {
    initial: { scale: 1, x: 0, y: 0 },
    shrinkToLaPlagne: { 
      scale: 0.025, // 更精确的缩放比例
      x: '22vw',   // 移动到La Plagne的x位置 (55.1% - 50% = 5.1% * 4.3 ≈ 22vw)
      y: '-15vh',  // 移动到La Plagne的y位置 (34.6% - 50% = -15.4% ≈ -15vh)
      transition: { 
        duration: 1.8, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2
      }
    },
    expandFromLaPlagne: { 
      scale: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 1.5, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 0 ? (
          <motion.div
            key="homepage"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, delay: 1.4 }
            }}
            className="relative w-full h-full"
          >
            <HomePage />
            
            {/* 山脉缩小动画覆盖层 */}
            {isTransitioning && (
              <motion.div
                className="fixed inset-0 z-50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* 地图背景渐入层 */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('/src/assets/france-map-detail.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                >
                  {/* 地图背景的蓝色渐变覆盖 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1748] via-[#122360] to-[#1A327A] opacity-80" />
                </motion.div>
                
                {/* 缩小的山脉 - 目标La Plagne */}
                <motion.div
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100vw',
                    height: '100vh'
                  }}
                  variants={mountainTransition}
                  initial="initial"
                  animate="shrinkToLaPlagne"
                >
                  {/* 复制首页的山脉结构用于动画 */}
                  <div className="relative w-full h-full">
                    {/* 背景山脉 - 渐隐 */}
                    <motion.div 
                      className="absolute bottom-0 w-full"
                      style={{
                        height: '78%',
                        background: 'linear-gradient(to top, #0B1748 0%, #0B1748 100%)',
                        clipPath: 'polygon(0% 100%, 0% 45%, 15% 35%, 25% 40%, 35% 30%, 45% 35%, 55% 25%, 65% 30%, 75% 20%, 85% 25%, 95% 15%, 100% 20%, 100% 100%)'
                      }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    
                    {/* 主要蓝色山脉 (#4579CC) - 这是会变成La Plagne图标的山脉 */}
                    <motion.div 
                      className="absolute bottom-0 w-full"
                      style={{
                        height: '65%',
                        background: 'linear-gradient(to top, #4579CC 0%, #4579CC 100%)',
                        clipPath: 'polygon(0% 100%, 0% 60%, 12% 50%, 22% 55%, 32% 45%, 42% 50%, 52% 40%, 62% 45%, 72% 35%, 82% 40%, 92% 30%, 100% 35%, 100% 100%)'
                      }}
                      animate={{
                        filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1.1)']
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 1.0,
                        repeat: 1
                      }}
                    />
                    
                    {/* 深蓝色山脉 - 渐隐 */}
                    <motion.div 
                      className="absolute bottom-0 w-full"
                      style={{
                        height: '32%',
                        background: 'linear-gradient(to top, #293F88 0%, #293F88 100%)',
                        clipPath: 'polygon(0% 100%, 0% 70%, 10% 60%, 20% 65%, 30% 55%, 40% 60%, 50% 50%, 60% 55%, 70% 45%, 80% 50%, 90% 40%, 100% 45%, 100% 100%)'
                      }}
                      animate={{ opacity: [1, 0.2] }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                    
                    {/* 白色前景山脉 - 渐隐 */}
                    <motion.div 
                      className="absolute w-[45.5%] h-[35%] bg-white"
                      style={{
                        bottom: '12.2%',
                        left: '38.8%',
                        marginLeft: '-0.5%',
                        clipPath: 'polygon(0% 100%, 0% 45%, 15% 35%, 25% 40%, 35% 30%, 45% 35%, 55% 25%, 65% 30%, 75% 20%, 85% 25%, 95% 15%, 100% 20%, 100% 100%)'
                      }}
                      animate={{ opacity: [1, 0.1] }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    />
                  </div>
                </motion.div>

                {/* 其他滑雪场图标渐入层 */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  {/* 这里会显示除了La Plagne之外的其他滑雪场图标的占位符 */}
                  <div className="absolute inset-0 opacity-60">
                    {/* 模拟其他图标的渐入效果 */}
                    {[
                      { x: 54.5, y: 22.0, color: '#00D3FF' }, // Chamonix
                      { x: 49.8, y: 38.1, color: '#4A4BDF' }, // Courchevel  
                      { x: 53.4, y: 39.5, color: '#4C3FE5' }, // Méribel
                      { x: 60.8, y: 34.4, color: '#4774CF' }, // Tignes
                      { x: 62.9, y: 34.6, color: '#4866D5' }, // Val d'Isère
                    ].map((icon, index) => (
                      <motion.div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${icon.x}%`,
                          top: `${icon.y}%`,
                          width: '6px',
                          height: '6px',
                          backgroundColor: icon.color,
                          borderRadius: '50%',
                          boxShadow: `0 0 8px ${icon.color}66`
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1.2 + index * 0.1,
                          ease: 'backOut'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* 标题文字渐入 */}
                <motion.div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center z-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <h1 className="text-3xl font-bold text-white mb-2 font-inria">
                    Ski Resorts
                  </h1>
                  <p className="text-base text-blue-100 font-inria">
                    Discover the best skiing destinations across France
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="mappage"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.4, delay: 0.2 }
            }}
            exit={{ opacity: 0 }}
          >
            <MapPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 