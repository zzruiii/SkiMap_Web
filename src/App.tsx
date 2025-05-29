import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import ChartPage from './components/ChartPage';

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        // 向下滚动
        if (currentPage === 0) {
          setCurrentPage(1);
        } else if (currentPage === 1) {
          setCurrentPage(2);
        }
      } else if (e.deltaY < 0) {
        // 向上滚动
        if (currentPage === 2) {
          setCurrentPage(1);
        } else if (currentPage === 1) {
          setCurrentPage(0);
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentPage]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 0 ? (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <HomePage />
          </motion.div>
        ) : currentPage === 1 ? (
          <motion.div
            key="mappage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MapPage />
          </motion.div>
        ) : (
          <motion.div
            key="chartpage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 