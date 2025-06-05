import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skiResorts, SkiResort } from "../types/SkiResort";
import { bluebirdData } from "../data/bluebirdData";
import skiMapSvg from "../assets/111_ski.svg";
import SkiResortCard from "./SkiResortCard";

interface MapChartPageProps {
  isActive: boolean;
  scrollProgress: number; // 保留用于兼容性
  mapInternalScroll: number; // 地图页内部滚动进度：0-1，控制图表显示
}

const MapChartPage: React.FC<MapChartPageProps> = ({ isActive, mapInternalScroll }) => {
  const [hoveredResort, setHoveredResort] = useState<SkiResort | null>(null);
  const [hoveredChartResort, setHoveredChartResort] = useState<SkiResort | null>(null); // 新增：跟踪图表悬停的滑雪场
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [selectedWeek, setSelectedWeek] = useState('Week 1');

  // 使用内部滚动进度来控制显示逻辑
  // 是否显示地图内容：内部滚动 < 0.6 时显示地图功能
  const showMapContent = mapInternalScroll < 0.6;
  
  // 是否显示图表内容：内部滚动 >= 0.4 时开始显示图表
  const showChartContent = mapInternalScroll >= 0.4;

  // 当重新进入图表页面时，重置时间选择为默认值
  useEffect(() => {
    if (showChartContent) {
      setSelectedMonth('November');
      setSelectedWeek('Week 1');
    }
  }, [showChartContent]);

  // 处理月份和周数变化
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };
  
  const handleWeekChange = (week: string) => {
    setSelectedWeek(week);
  };

  // 获取当前滑雪场数据
  const getCurrentResortData = (resort: SkiResort) => {
    const monthData = (bluebirdData as any)[selectedMonth];
    if (monthData && monthData[selectedWeek] && monthData[selectedWeek][resort.name] !== undefined) {
      return monthData[selectedWeek][resort.name];
    }
    return 0;
  };

  // 按照从北到南排序滑雪场（y坐标从小到大）
  const sortedResorts = [...skiResorts].sort((a, b) => a.position.y - b.position.y);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 保持地图背景 - 始终显示 */}
      <div className="w-screen h-screen bg-gradient-to-br from-[#0B1748] via-[#122360] to-[#1A327A] relative overflow-hidden">
        {/* 背景装饰层 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M50%200H30L0%2050L30%2080H50L80%2050L50%200Z%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        {/* 地图背景 */}
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
          {/* 地图坐标系统 */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute inset-0 opacity-0 pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 城市标签 */}
            <text x="75" y="15" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Geneva</text>
            <text x="15" y="45" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Lyon</text>
            <text x="80" y="65" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Turin</text>
          </svg>

          {/* 滑雪场图标层 - 始终显示 */}
          <div className="absolute inset-0 w-full h-full">
            {skiResorts.map((resort) => {
              // 检查是否应该高亮显示该滑雪场
              const shouldHighlight = hoveredChartResort && hoveredChartResort.id === resort.id;
              
              return (
                <motion.div
                  key={resort.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${resort.position.x}%`,
                    top: `${resort.position.y}%`,
                    zIndex: 10,
                    // 添加外发光效果
                    filter: shouldHighlight ? `drop-shadow(0 0 12px ${resort.color}) drop-shadow(0 0 24px ${resort.color})` : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                    // 添加GPU加速优化，减少抖动
                    willChange: 'transform',
                    transform: `translate(-50%, -50%) translate3d(0, 0, 0)`,
                    backfaceVisibility: 'hidden',
                    perspective: 1000
                  }}
                  onHoverStart={() => showMapContent && setHoveredResort(resort)}
                  onHoverEnd={() => setHoveredResort(null)}
                  whileHover={{ scale: showMapContent ? 1.2 : 1 }}
                  animate={{ 
                    scale: shouldHighlight ? 1.3 : 1,
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.23, 1, 0.32, 1] // 使用与页面动画相同的缓动函数
                  }}
                >
                  <svg
                    width="24"
                    height="27"
                    viewBox="0 0 23 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                  >
                    <path 
                      d="M1.90625 19.7651L0.414062 24.9427H22.9316C22.1612 22.7554 20.4745 18.2977 19.8911 17.9654C19.3077 17.6332 17.1274 14.2461 16.1101 12.5941C15.8184 13.0371 15.7016 13.0161 15.5155 12.4556C15.3933 12.0878 14.5656 9.62226 14.1467 8.46862C14.0831 8.29326 13.8214 8.10868 13.3838 7.49955C12.9462 6.89043 12.5049 5.50605 12.3516 4.7308C12.0412 3.71559 11.3979 1.57996 11.3082 1.15911C11.2184 0.738261 11.0314 0.83609 10.9492 0.937611C10.4892 1.75901 9.52204 3.46825 9.33356 3.73405C9.14507 3.99985 8.87356 4.10322 8.76136 4.12167C8.07697 5.49682 6.57132 8.4963 6.02381 9.49305C5.4763 10.4898 4.74105 11.1082 4.44186 11.2927L1.90625 19.7651Z" 
                      fill={resort.color}
                    />
                    <path 
                      d="M10.4034 7.74862L11.1534 1.07617C10.8362 1.45455 10.1012 2.41066 9.69819 3.20803C9.29522 4.00541 8.85867 4.24166 8.69077 4.26012C8.13855 5.31221 6.89308 7.72647 6.32893 8.96683C5.76477 10.2072 4.76929 10.9326 4.37005 11.1818L0.351562 24.942H8.69077L9.69819 19.5985L11.7354 14.8087L10.4034 7.74862Z" 
                      fill="#293F88"
                    />
                    <path 
                      d="M11.2678 10.4274C10.9434 11.0241 10.5394 10.4919 10.378 10.1512L9.96123 9.65399L9.28543 8.71481L8.29425 8.02424L7.60718 6.36686L8.73352 4.10177C8.77482 4.10177 9.17057 3.90162 9.28543 3.71505C10.1527 2.30628 10.3404 1.81827 10.9299 0.897504C11.0651 0.686371 11.1066 0.642652 11.2678 1.008C11.5306 1.60366 12.0828 3.78667 12.3716 4.87522C12.9798 7.16792 13.4529 7.66514 13.8696 8.02424C14.1832 8.29438 14.6168 9.76448 14.7482 10.1512L15.2438 11.5324L15.7281 12.9135C16.0097 12.9135 15.9731 12.2707 16.235 12.7201C16.5729 13.3002 17.9921 15.6482 18.6679 16.4769L20.1096 18.1619C20.1096 18.1619 20.7741 18.7972 20.5826 19.3773C20.3912 19.9574 19.7356 18.0624 19.5464 17.9961C19.314 17.9147 18.8859 17.3266 18.6039 16.9393L18.589 16.9188C18.3074 16.5321 17.4852 17.1122 17.136 16.8083C16.7869 16.5045 16.8657 15.9797 16.28 15.9797C15.8115 15.9797 15.6267 15.7587 15.5929 15.6482C15.4803 15.0221 15.2258 13.6649 15.1086 13.245C14.9622 12.7201 14.5117 12.5544 14.6018 13.7698C14.6739 14.7421 14.1437 14.3775 13.8696 14.0737L11.876 9.12916C11.8084 9.31331 11.5922 9.83078 11.2678 10.4274Z" 
                      fill="#FEFFFF"
                    />
                  </svg>
                </motion.div>
              );
            })}
          </div>
          
          {/* 悬浮卡片层 */}
          <AnimatePresence>
            {hoveredResort && showMapContent && (
              <div className="absolute inset-0">
                <SkiResortCard
                  resort={hoveredResort}
                  position={hoveredResort.position}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 左上角标题区域 - 动态切换 */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 text-left">
        <AnimatePresence mode="wait">
          {showMapContent && (
            <motion.div
              key="map-title"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-inria" style={{ color: '#293F88' }}>
                Ski Resorts
              </h1>
              <p className="text-base md:text-lg max-w-md font-inria" style={{ color: '#293F88' }}>
                Discover the best skiing destinations across France
              </p>
            </motion.div>
          )}
          
          {showChartContent && (
            <motion.div
              key="chart-title"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-inria" style={{ color: '#293F88' }}>
                Bluebird Days Statistics
              </h1>
              <p className="text-base md:text-lg max-w-md font-inria" style={{ color: '#293F88' }}>
                Clear sky days per week across French ski resorts
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 右侧内容区域 - 图表和时间选择器 */}
      <AnimatePresence>
        {showChartContent && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col pt-8 pb-8 pr-8"
          >
            {/* 图表容器 - 固定在右上角 */}
            <div className="flex justify-end mb-4">
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                style={{ 
                  width: '410px',
                  padding: '20px'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center mb-4 text-lg font-semibold" style={{ color: '#4579CC' }}>
                  Bluebird Days - {selectedMonth} {selectedWeek}
                </div>
                
                {/* 显示所有滑雪场的图表 */}
                <div className="space-y-2">
                  {sortedResorts.map((resort) => {
                    const value = getCurrentResortData(resort);
                    const barWidth = (value / 7) * 200;
                    const isHovered = hoveredChartResort && hoveredChartResort.id === resort.id;
                  
                    return (
                      <motion.div
                        key={resort.id} 
                        className="flex items-center space-x-2 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.4 + sortedResorts.indexOf(resort) * 0.05,
                          ease: [0.23, 1, 0.32, 1] // 使用统一的缓动函数
                        }}
                        onHoverStart={() => setHoveredChartResort(resort)}
                        onHoverEnd={() => setHoveredChartResort(null)}
                        style={{
                          // 添加整行的外发光效果
                          filter: isHovered ? `drop-shadow(0 0 8px ${resort.color})` : 'none',
                          // 添加GPU加速优化
                          willChange: 'transform',
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="flex items-center space-x-2 w-40 flex-shrink-0">
                          {/* 滑雪场图标 */}
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 23 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                            style={{
                              // 添加GPU加速优化
                              willChange: 'transform',
                              transform: 'translate3d(0, 0, 0)',
                              backfaceVisibility: 'hidden'
                            }}
                          >
                            <path 
                              d="M1.90625 19.7651L0.414062 24.9427H22.9316C22.1612 22.7554 20.4745 18.2977 19.8911 17.9654C19.3077 17.6332 17.1274 14.2461 16.1101 12.5941C15.8184 13.0371 15.7016 13.0161 15.5155 12.4556C15.3933 12.0878 14.5656 9.62226 14.1467 8.46862C14.0831 8.29326 13.8214 8.10868 13.3838 7.49955C12.9462 6.89043 12.5049 5.50605 12.3516 4.7308C12.0412 3.71559 11.3979 1.57996 11.3082 1.15911C11.2184 0.738261 11.0314 0.83609 10.9492 0.937611C10.4892 1.75901 9.52204 3.46825 9.33356 3.73405C9.14507 3.99985 8.87356 4.10322 8.76136 4.12167C8.07697 5.49682 6.57132 8.4963 6.02381 9.49305C5.4763 10.4898 4.74105 11.1082 4.44186 11.2927L1.90625 19.7651Z" 
                              fill={resort.color}
                            />
                            <path 
                              d="M10.4034 7.74862L11.1534 1.07617C10.8362 1.45455 10.1012 2.41066 9.69819 3.20803C9.29522 4.00541 8.85867 4.24166 8.69077 4.26012C8.13855 5.31221 6.89308 7.72647 6.32893 8.96683C5.76477 10.2072 4.76929 10.9326 4.37005 11.1818L0.351562 24.942H8.69077L9.69819 19.5985L11.7354 14.8087L10.4034 7.74862Z" 
                              fill="#293F88"
                            />
                            <path 
                              d="M11.2678 10.4274C10.9434 11.0241 10.5394 10.4919 10.378 10.1512L9.96123 9.65399L9.28543 8.71481L8.29425 8.02424L7.60718 6.36686L8.73352 4.10177C8.77482 4.10177 9.17057 3.90162 9.28543 3.71505C10.1527 2.30628 10.3404 1.81827 10.9299 0.897504C11.0651 0.686371 11.1066 0.642652 11.2678 1.008C11.5306 1.60366 12.0828 3.78667 12.3716 4.87522C12.9798 7.16792 13.4529 7.66514 13.8696 8.02424C14.1832 8.29438 14.6168 9.76448 14.7482 10.1512L15.2438 11.5324L15.7281 12.9135C16.0097 12.9135 15.9731 12.2707 16.235 12.7201C16.5729 13.3002 17.9921 15.6482 18.6679 16.4769L20.1096 18.1619C20.1096 18.1619 20.7741 18.7972 20.5826 19.3773C20.3912 19.9574 19.7356 18.0624 19.5464 17.9961C19.314 17.9147 18.8859 17.3266 18.6039 16.9393L18.589 16.9188C18.3074 16.5321 17.4852 17.1122 17.136 16.8083C16.7869 16.5045 16.8657 15.9797 16.28 15.9797C15.8115 15.9797 15.6267 15.7587 15.5929 15.6482C15.4803 15.0221 15.2258 13.6649 15.1086 13.245C14.9622 12.7201 14.5117 12.5544 14.6018 13.7698C14.6739 14.7421 14.1437 14.3775 13.8696 14.0737L11.876 9.12916C11.8084 9.31331 11.5922 9.83078 11.2678 10.4274Z" 
                              fill="#FEFFFF"
                            />
                          </svg>
                          <div 
                            className="text-xs" 
                            style={{ 
                              color: '#4579CC',
                              textShadow: isHovered ? `0 0 8px ${resort.color}` : 'none',
                              fontWeight: isHovered ? 'bold' : 'normal'
                            }}
                          >
                            {resort.name}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="h-4 rounded"
                            style={{
                              backgroundColor: resort.color,
                              width: `${barWidth}px`,
                              boxShadow: isHovered ? `0 0 12px ${resort.color}, 0 0 24px ${resort.color}` : 'none',
                              filter: isHovered ? 'brightness(1.2)' : 'none'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}px` }}
                            transition={{ duration: 0.6, delay: 0.2 + sortedResorts.indexOf(resort) * 0.03 }}
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                          />
                          {/* 小圆点动画 */}
                          <motion.div
                            key={`${resort.id}-${selectedMonth}-${selectedWeek}`}
                            className="w-2 h-2 rounded-full"
                            style={{ 
                              backgroundColor: '#FFFFFF',
                              boxShadow: isHovered ? `0 0 8px ${resort.color}` : 'none'
                            }}
                            initial={{ scale: 0.8, opacity: 0.7 }}
                            animate={{ 
                              scale: [0.8, 1.4, 0.9, 1.2, 1],
                              opacity: [0.7, 1, 0.5, 0.9, 1],
                              rotate: [0, 15, -10, 5, 0]
                            }}
                            transition={{ 
                              duration: 0.8, 
                              delay: 0.6,
                              ease: "easeInOut",
                              times: [0, 0.3, 0.5, 0.7, 1]
                            }}
                          />
                          <div 
                            className="text-xs w-8 flex-shrink-0" 
                            style={{ 
                              color: '#4579CC',
                              textShadow: isHovered ? `0 0 8px ${resort.color}` : 'none',
                              fontWeight: isHovered ? 'bold' : 'normal'
                            }}
                          >
                            {value.toFixed(1)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* 时间选择器 - 固定在右下角 */}
            <div className="flex justify-end">
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex flex-col space-y-4">
                  {/* 月份选择器 */}
                  <div className="flex items-center space-x-4">
                    <span className="font-inria text-sm opacity-80 min-w-[50px]" style={{ color: '#4579CC' }}>Month:</span>
                    <div className="flex space-x-2 flex-wrap">
                      {['November', 'December', 'January', 'February', 'March', 'April'].map((month) => (
                        <motion.button
                          key={month}
                          onClick={() => handleMonthChange(month)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-inria cursor-pointer select-none transition-all duration-150 ${
                            selectedMonth === month
                              ? 'bg-white text-[#4579CC] shadow-lg font-bold'
                              : 'bg-white/20 hover:bg-white/30 hover:shadow-md'
                          }`}
                          style={{ color: '#4579CC' }}
                        >
                          {month.slice(0, 3)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* 周选择器 */}
                  <div className="flex items-center space-x-4">
                    <span className="font-inria text-sm opacity-80 min-w-[50px]" style={{ color: '#4579CC' }}>Week:</span>
                    <div className="flex space-x-2 flex-wrap">
                      {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
                        <motion.button
                          key={week}
                          onClick={() => handleWeekChange(week)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-inria cursor-pointer select-none transition-all duration-150 ${
                            selectedWeek === week
                              ? 'bg-white text-[#4579CC] shadow-lg font-bold'
                              : 'bg-white/20 hover:bg-white/30 hover:shadow-md'
                          }`}
                          style={{ color: '#4579CC' }}
                        >
                          {week}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 滚动提示 */}
      {isActive && (
        <>
          {showMapContent && (
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
              <p className="text-sm font-medium text-white/90 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full mb-2 whitespace-nowrap">
                Scroll down to explore blue bird days
              </p>
              <motion.svg
                width="23"
                height="13"
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
          
          {showChartContent && (
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
              className="fixed top-2 left-1/2 transform -translate-x-1/2 md:top-4 flex flex-col items-center z-30"
            >
              <motion.svg
                width="23"
                height="13"
                viewBox="0 0 24 16"
                fill="none"
                className="mb-2"
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
              <p className="text-sm font-medium text-white/90 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full whitespace-nowrap">
                Scroll up to return
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MapChartPage; 