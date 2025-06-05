import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import ChartPage from './components/ChartPage';

// 右侧滚动指示器组件
const ScrollProgress = ({ currentSection }: { currentSection: number }) => {
  const sections = ['Home', 'Map', 'Chart'];
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {/* 滚动条背景 */}
      <div className="w-1 h-32 bg-white bg-opacity-20 rounded-full relative backdrop-blur-sm">
        {/* 滚动进度指示器 */}
        <motion.div
          className="w-1 bg-white rounded-full absolute left-0"
          animate={{
            height: `${((currentSection + 1) / 3) * 100}%`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      
      {/* 节点指示器 */}
      <div className="flex flex-col space-y-8 absolute inset-0">
        {sections.map((section, index) => (
          <div
            key={section}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              const element = document.getElementById(`section-${index}`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* 节点圆点 */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-white relative ${
                currentSection === index ? 'bg-white' : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={{
                backgroundColor: currentSection === index ? '#ffffff' : 'transparent',
                borderColor: '#ffffff'
              }}
              transition={{ duration: 0.2 }}
            >
              {/* 发光效果 */}
              {currentSection === index && (
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / sectionHeight);
      
      if (newSection !== currentSection && newSection >= 0 && newSection <= 2) {
        setCurrentSection(newSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSection]);

  // 处理键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSection < 2) {
        const nextSection = document.getElementById(`section-${currentSection + 1}`);
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        const prevSection = document.getElementById(`section-${currentSection - 1}`);
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 滚动容器 */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-container"
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
          className="w-full h-screen snap-start snap-always flex-shrink-0"
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 0 ? 1 : 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <HomePage isActive={currentSection === 0} />
          </motion.div>
        </section>

        {/* 第二页 - 地图页 */}
        <section
          id="section-1"
          className="w-full h-screen snap-start snap-always flex-shrink-0"
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 1 ? 1 : 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <MapPage isActive={currentSection === 1} />
          </motion.div>
        </section>

        {/* 第三页 - 图表页 */}
        <section
          id="section-2"
          className="w-full h-screen snap-start snap-always flex-shrink-0"
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 2 ? 1 : 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <ChartPage isActive={currentSection === 2} />
          </motion.div>
        </section>
      </div>

      {/* 右侧滚动进度指示器 */}
      <ScrollProgress currentSection={currentSection} />
    </div>
  );
}

export default App; 