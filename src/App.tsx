import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import MapChartPage from './components/MapChartPage';

// 右侧滚动指示器组件 - 只显示两个页面
const ScrollProgress = ({ currentSection }: { 
  currentSection: number;
}) => {
  const sections = ['Home', 'Map']; // 只有两个页面
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {/* 滚动条背景 */}
      <div className="w-1 h-20 bg-white bg-opacity-20 rounded-full relative backdrop-blur-sm">
        {/* 滚动进度指示器 */}
        <motion.div
          className="w-1 bg-white rounded-full absolute left-0"
          animate={{
            height: `${((currentSection + 1) / 2) * 100}%`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      
      {/* 节点指示器 */}
      <div className="flex flex-col space-y-6 absolute inset-0">
        {sections.map((section, index) => (
          <div
            key={section}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              if (index === 0) {
                // 点击Home，滚动到首页
                const element = document.getElementById('section-0');
                element?.scrollIntoView({ behavior: 'smooth' });
              } else {
                // 点击Map，滚动到地图页
                const element = document.getElementById('section-1');
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {/* 节点圆点 */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-white relative ${
                index === currentSection ? 'bg-white' : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={{
                backgroundColor: index === currentSection ? '#ffffff' : 'transparent',
                borderColor: '#ffffff'
              }}
              transition={{ duration: 0.2 }}
            >
              {/* 发光效果 */}
              {index === currentSection && (
                <motion.div
                  className="absolute inset-0 w-3 h-3 bg-white rounded-full"
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(255,255,255,0.7)', '0 0 0 8px rgba(255,255,255,0)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              )}
            </motion.div>
            
            {/* 标签 */}
            <motion.span
              className="text-white text-sm font-inria font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black bg-opacity-50 px-2 py-1 rounded backdrop-blur-sm"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {section}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mapInternalScroll, setMapInternalScroll] = useState(0); // 地图页内部滚动进度
  const [isTransitioning, setIsTransitioning] = useState(false); // 添加过渡状态
  const [transitionProgress, setTransitionProgress] = useState(0); // 添加过渡进度状态
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingToSection = useRef(false);
  const accumulatedScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      const exactProgress = scrollTop / sectionHeight;
      setScrollProgress(exactProgress);
      
      // 计算过渡进度（0到1之间的切换进度）
      const transitionPoint = 0.5; // 切换点
      const transitionRange = 0.3; // 过渡范围
      
      if (exactProgress >= transitionPoint - transitionRange && exactProgress <= transitionPoint + transitionRange) {
        // 在过渡区域内
        setIsTransitioning(true);
        const progressInRange = (exactProgress - (transitionPoint - transitionRange)) / (2 * transitionRange);
        setTransitionProgress(Math.max(0, Math.min(1, progressInRange)));
      } else {
        setIsTransitioning(false);
        setTransitionProgress(exactProgress < transitionPoint ? 0 : 1);
      }
      
      // 页面切换逻辑：基于过渡进度平滑切换
      if (exactProgress < transitionPoint) {
        if (currentSection !== 0) {
          setCurrentSection(0);
          setMapInternalScroll(0);
        }
      } else {
        if (currentSection !== 1) {
          setCurrentSection(1);
        }
        
        // 当在地图页时，计算内部滚动进度
        const mapProgress = Math.max(0, exactProgress - 1.0);
        setMapInternalScroll(mapProgress);
      }
    };

    // 处理滚动事件，实现停留在地图页的逻辑
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || isScrollingToSection.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentProgress = scrollTop / sectionHeight;
      
      // 如果在地图页面 (progress >= 1.0)
      if (currentProgress >= 1.0) {
        e.preventDefault();
        
        // 累积滚动量 - 降低敏感度，需要更多滚轮输入
        accumulatedScroll.current += e.deltaY * 0.0008; // 从0.0015降低到0.0008
        
        // 限制滚动范围：-1.2 到 1.2
        // -1.2 对应返回首页，0 到 1.2 对应地图页内部滚动
        accumulatedScroll.current = Math.max(-1.2, Math.min(1.2, accumulatedScroll.current));
        
        if (accumulatedScroll.current < -0.6) {
          // 向上滚动足够多，返回首页 - 提高阈值从-0.2到-0.6
          isScrollingToSection.current = true;
          setIsTransitioning(true); // 开始过渡
          // 使用渐进式状态更新，而不是立即切换
          const element = document.getElementById('section-0');
          element?.scrollIntoView({ behavior: 'smooth' });
          
          // 延迟状态更新，让滚动动画先开始
          setTimeout(() => {
            setCurrentSection(0);
            setMapInternalScroll(0);
          }, 150);
          
          setTimeout(() => {
            isScrollingToSection.current = false;
            setIsTransitioning(false); // 结束过渡
            setTransitionProgress(0);
            accumulatedScroll.current = 0;
          }, 800); // 缩短重置时间，让过渡更快
        } else if (accumulatedScroll.current < -0.3) {
          // 在-0.6到-0.3之间，给用户视觉反馈，但不触发页面切换
          setIsTransitioning(true);
          const feedbackProgress = 1 - Math.abs(accumulatedScroll.current + 0.3) / 0.3;
          setTransitionProgress(feedbackProgress * 0.3); // 只给一点反馈
        } else {
          // 重置过渡状态
          setIsTransitioning(false);
          setTransitionProgress(1);
          // 在地图页内部滚动
          setMapInternalScroll(Math.max(0, accumulatedScroll.current));
        }
      } else {
        // 在首页，允许正常滚动到地图页
        accumulatedScroll.current = 0;
        setTransitionProgress(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentSection]);

  // 处理键盘导航 - 简化为两个页面
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      if (e.key === 'ArrowDown' && currentSection === 0) {
        // 从首页到地图页
        isScrollingToSection.current = true;
        setIsTransitioning(true);
        const element = document.getElementById('section-1');
        element?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isScrollingToSection.current = false;
          setIsTransitioning(false);
        }, 800);
      } else if (e.key === 'ArrowUp' && currentSection === 1) {
        // 从地图页到首页
        isScrollingToSection.current = true;
        setIsTransitioning(true);
        const element = document.getElementById('section-0');
        element?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isScrollingToSection.current = false;
          setIsTransitioning(false);
          setTransitionProgress(0);
          accumulatedScroll.current = 0;
        }, 800);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  // 计算每个页面的最终透明度和变换
  const getPageTransform = (pageIndex: number) => {
    if (!isTransitioning) {
      // 非过渡状态，只显示当前页面
      return {
        opacity: currentSection === pageIndex ? 1 : 0,
        scale: 1, // 移除scale变化，保持稳定
        y: 0, // 移除y位移，避免内部元素抖动
        filter: 'blur(0px)' // 移除blur效果，避免渲染抖动
      };
    } else {
      // 过渡状态，主要使用透明度切换，最小化其他变换
      if (pageIndex === 0) {
        // 首页 - 主要使用透明度过渡
        return {
          opacity: Math.max(0, 1 - transitionProgress * 1.3),
          scale: 1 - transitionProgress * 0.015, // 大幅减少scale变化
          y: -transitionProgress * 8, // 大幅减少y位移
          filter: 'blur(0px)' // 完全移除blur
        };
      } else {
        // 地图页 - 主要使用透明度过渡
        return {
          opacity: Math.max(0, transitionProgress * 1.3 - 0.3),
          scale: 0.985 + transitionProgress * 0.015, // 大幅减少scale变化
          y: (1 - transitionProgress) * 8, // 大幅减少y位移
          filter: 'blur(0px)' // 完全移除blur
        };
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 滚动容器 */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden scroll-container"
        style={{
          scrollBehavior: 'smooth',
          // 自定义滚动条样式
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.3) transparent'
        }}
      >
        {/* 自定义滚动条样式 */}
        <style>{`
          .scroll-container::-webkit-scrollbar {
            width: 8px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 4px;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 4px;
            transition: background 0.2s ease;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.5);
          }
        `}</style>

        {/* 第一页 - 首页 */}
        <section
          id="section-0"
          className="w-full h-screen flex-shrink-0"
        >
          <motion.div
            className="w-full h-full"
            animate={getPageTransform(0)}
            transition={{ 
              duration: 0.5, // 缩短动画时长
              ease: [0.23, 1, 0.32, 1], // 更平滑的缓动曲线
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 },
              y: { duration: 0.5 }
              // 移除filter动画配置
            }}
          >
            <HomePage isActive={currentSection === 0} />
          </motion.div>
        </section>

        {/* 第二页 - 地图页（固定高度，不再是200vh） */}
        <section
          id="section-1"
          className="w-full h-screen flex-shrink-0"
        >
          <motion.div
            className="w-full h-full"
            animate={getPageTransform(1)}
            transition={{ 
              duration: 0.5, // 缩短动画时长
              ease: [0.23, 1, 0.32, 1], // 更平滑的缓动曲线
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 },
              y: { duration: 0.5 }
              // 移除filter动画配置
            }}
          >
            <MapChartPage 
              isActive={currentSection === 1} 
              scrollProgress={scrollProgress}
              mapInternalScroll={mapInternalScroll}
            />
          </motion.div>
        </section>
      </div>

      {/* 右侧滚动进度指示器 */}
      <ScrollProgress currentSection={currentSection} />
    </div>
  );
}

export default App; 