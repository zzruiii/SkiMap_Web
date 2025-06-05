import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skiResorts, SkiResort } from '../types/SkiResort';
import skiMapSvg from '../assets/111_ski.svg';
import { bluebirdData } from '../data/bluebirdData';

interface ChartPageProps {
  isActive: boolean;
}

const ChartPage: React.FC<ChartPageProps> = ({ isActive }) => {
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  
  // 处理月份变化
  const handleMonthChange = (month: string) => {
    console.log('Changing month from', selectedMonth, 'to', month);
    setSelectedMonth(month);
  };
  
  // 处理周数变化
  const handleWeekChange = (week: string) => {
    console.log('Changing week from', selectedWeek, 'to', week);
    setSelectedWeek(week);
  };
  
  // 监听选中状态变化
  useEffect(() => {
    console.log('Current selection:', selectedMonth, selectedWeek);
    const monthData = (bluebirdData as any)[selectedMonth];
    if (monthData && monthData[selectedWeek]) {
      console.log('Data available for current selection');
    } else {
      console.log('No data available for current selection');
    }
  }, [selectedMonth, selectedWeek]);
  
  // 添加调试日志
  useEffect(() => {
    console.log('ChartPage isActive:', isActive);
  }, [isActive]);
  
  // 按照从北到南排序滑雪场（y坐标从小到大）
  const sortedResorts = [...skiResorts].sort((a, b) => a.position.y - b.position.y);
  
  // 获取当前数据 - 需要通过名称映射找到对应的数据
  const getCurrentResortData = (resort: SkiResort) => {
    const monthData = (bluebirdData as any)[selectedMonth];
    if (!monthData || !monthData[selectedWeek]) {
      return 0;
    }
    
    const weekData = monthData[selectedWeek];
    
    // 直接在数据中查找匹配的滑雪场名称
    if (weekData[resort.name] !== undefined) {
      return weekData[resort.name];
    }
    
    // 尝试处理一些名称差异
    const nameVariants = [
      resort.name,
      resort.name.replace(/['']/g, "'"), // 处理引号差异
      resort.name.replace(/['']/g, "\'"), // 处理另一种引号
    ];
    
    for (const variant of nameVariants) {
      if (weekData[variant] !== undefined) {
        return weekData[variant];
      }
    }
    
    // 如果找不到匹配的数据，输出调试信息
    console.log(`No data found for resort: ${resort.name}, available keys:`, Object.keys(weekData));
    return 0;
  };
  
  // 获取所有当前数据值用于计算最大值

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 保持第二页的地图背景层 - 继承第二页的完整背景样式 */}
      <div className="w-screen h-screen bg-gradient-to-br from-[#0B1748] via-[#122360] to-[#1A327A] relative overflow-hidden">
        {/* 背景装饰层 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M50%200H30L0%2050L30%2080H50L80%2050L50%200Z%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        {/* 地图背景 - 与第二页完全相同的地图背景 */}
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
          {/* 地图坐标系统 - 与第二页相同 */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute inset-0 opacity-0 pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 城市标签 - 使用相对位置 */}
            <text x="75" y="15" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Geneva</text>
            <text x="15" y="45" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Lyon</text>
            <text x="80" y="65" fontSize="0.8" fill="#FFFFFF" opacity="0.8" fontFamily="Inter, sans-serif">✈ Turin</text>
          </svg>

          {/* 保持第二页的小山图标 - 显示所有滑雪场图标 */}
          <div className="absolute inset-0 w-full h-full">
            {skiResorts.map((resort) => (
              <motion.div
                key={resort.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${resort.position.x}%`,
                  top: `${resort.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-60"
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
            ))}
          </div>
        </div>
      </div>
      
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute top-4 md:top-6 left-4 md:left-6 z-20 text-left"
      >
        <h1 
          className="text-3xl md:text-4xl font-bold mb-2 font-inria" 
          style={{ 
            color: '#293F88 !important',
            textShadow: 'none !important',
            WebkitTextStroke: 'none !important',
            filter: 'none !important'
          }}
        >
          Bluebird Days Statistics
        </h1>
        <p 
          className="text-base md:text-lg max-w-md font-inria" 
          style={{ 
            color: '#293F88 !important',
            textShadow: 'none !important',
            WebkitTextStroke: 'none !important',
            filter: 'none !important'
          }}
        >
          Clear sky days per week across French ski resorts
        </p>
      </motion.div>

      {/* 返回地图页面提示 - 页面正上方居中显示 */}
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

      {/* 主要内容区域 - 进一步向上平移 */}
      {isActive && (
        <div className="absolute inset-0 flex flex-col pt-8 pb-8 pr-8">
          {/* 图表容器 - 固定在右上角 */}
          <div className="flex justify-end mb-4">
            <motion.div
              className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
              style={{ 
                width: '410px',
                padding: '20px'
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center mb-4 text-lg font-semibold" style={{ color: '#4579CC' }}>
                Bluebird Days - {selectedMonth} {selectedWeek}
              </div>
              
              {/* 显示所有滑雪场的图表 - 去除滚动条 */}
              <div className="space-y-2">
                {sortedResorts.map((resort) => {
                const value = getCurrentResortData(resort);
                  const barWidth = (value / 7) * 200;
                
                return (
                  <motion.div
                      key={resort.id} 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + sortedResorts.indexOf(resort) * 0.05 }}
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
                        <div className="text-xs" style={{ color: '#4579CC' }}>{resort.name}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                    <motion.div
                          className="h-4 rounded"
                      style={{
                        backgroundColor: resort.color,
                            width: `${barWidth}px`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}px` }}
                          transition={{ duration: 0.6, delay: 0.2 + sortedResorts.indexOf(resort) * 0.03 }}
                        />
                        {/* 小圆点动画 */}
                    <motion.div
                          key={`${resort.id}-${selectedMonth}-${selectedWeek}`}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#4579CC' }}
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
                        <div className="text-xs w-8 flex-shrink-0" style={{ color: '#4579CC' }}>{value.toFixed(1)}</div>
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
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-col space-y-4">
                {/* 月份选择器 */}
                <div className="flex items-center space-x-4">
                  <span className="font-inria text-sm min-w-[50px]" style={{ color: '#4579CC', opacity: 0.8 }}>Month:</span>
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
                        style={{
                          color: selectedMonth === month ? '#4579CC' : '#4579CC'
                        }}
                      >
                        {month.slice(0, 3)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 周选择器 */}
                <div className="flex items-center space-x-4">
                  <span className="font-inria text-sm min-w-[50px]" style={{ color: '#4579CC', opacity: 0.8 }}>Week:</span>
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
                        style={{
                          color: selectedWeek === week ? '#4579CC' : '#4579CC'
                        }}
                      >
                        {week}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartPage;