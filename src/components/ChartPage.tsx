import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skiResorts, SkiResort } from '../types/SkiResort';
import skiMapSvg from '../assets/00ski_map.svg';
import { bluebirdData } from '../data/bluebirdData';

interface ChartPageProps {
  isActive: boolean;
}

// 小山图标组件 - 修改为水平布局
const MountainChartIcon: React.FC<{ resort: SkiResort; index: number; totalResorts: number }> = ({ resort, index, totalResorts }) => (
  <motion.div
    className="flex items-center justify-start"
    style={{ 
      height: `calc(100% / ${totalResorts})`, // 使用计算高度确保均匀分布
      width: '100%',
      minHeight: '24px', // 减少最小高度
      maxHeight: '32px' // 减少最大高度
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
  >
    {/* 小山图标 */}
    <svg
      width="14" // 减少图标大小
      height="16" // 减少图标大小
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-1.5 flex-shrink-0" // 减少右边距
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

    {/* 滑雪场名称 - 水平显示，不旋转 */}
    <span 
      className="text-xs text-white font-inria opacity-80 whitespace-nowrap text-left"
      style={{
        fontSize: '8px' // 减少字体大小
      }}
    >
      {resort.name}
    </span>
  </motion.div>
);

// 时间选择器组件
const TimeSelector: React.FC<{
  selectedMonth: string;
  selectedWeek: string;
  onMonthChange: (month: string) => void;
  onWeekChange: (week: string) => void;
}> = ({ selectedMonth, selectedWeek, onMonthChange, onWeekChange }) => {
  const months = ['November', 'December', 'January', 'February', 'March', 'April'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <motion.div
      className="flex flex-col items-center space-y-3 z-10 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* 月份选择器 */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-inria text-sm opacity-80 min-w-[50px]">Month:</span>
        <div className="flex space-x-2 flex-wrap justify-center">
          {months.map((month) => (
            <motion.button
              key={month}
              onClick={() => {
                console.log('Month clicked:', month); // 调试日志
                onMonthChange(month);
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              animate={{ 
                backgroundColor: selectedMonth === month ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                color: selectedMonth === month ? '#4579CC' : '#ffffff'
              }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-1.5 rounded-lg text-sm font-inria cursor-pointer select-none ${
                selectedMonth === month
                  ? 'shadow-lg font-bold'
                  : 'hover:shadow-md'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              {month.slice(0, 3)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 周选择器 */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-inria text-sm opacity-80 min-w-[50px]">Week:</span>
        <div className="flex space-x-2 flex-wrap justify-center">
          {weeks.map((week) => (
            <motion.button
              key={week}
              onClick={() => {
                console.log('Week clicked:', week); // 调试日志
                onWeekChange(week);
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              animate={{ 
                backgroundColor: selectedWeek === week ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                color: selectedWeek === week ? '#4579CC' : '#ffffff'
              }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-1.5 rounded-lg text-sm font-inria cursor-pointer select-none ${
                selectedWeek === week
                  ? 'shadow-lg font-bold'
                  : 'hover:shadow-md'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              {week}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
  const chartHeight = 220; // 减少图表高度从300到220

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 地图背景层 */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${skiMapSvg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* 深蓝色渐变覆盖层 - 调整透明度以显示地图 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1748]/85 via-[#122360]/80 to-[#1A327A]/85" />
      
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M50%200H30L0%2050L30%2080H50L80%2050L50%200Z%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      {/* 页面标题 - 独立容器，固定在左上角 */}
      <motion.div
        className="absolute top-4 md:top-6 left-4 md:left-6 z-20 text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-inria drop-shadow-lg">
          Bluebird Days Statistics
        </h1>
        <p className="text-base md:text-lg text-blue-100 font-inria opacity-90 max-w-md drop-shadow-md">
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
            width="18"
            height="10"
            viewBox="0 0 24 16"
            fill="none"
            className="mb-1"
            style={{ color: '#FFFFFF' }}
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

      {/* 主要内容区域 - 减少顶部间距，为图表预留更多空间 */}
      <div className="flex flex-col h-full pt-12 p-4"> {/* 进一步减少间距 */}
        {/* 图表区域 - 占据更多空间 */}
        <div className="flex-1 flex flex-col items-end justify-start pt-2"> {/* 减少顶部间距 */}
          {/* 图表容器 - 调整尺寸和定位，适配实际内容 */}
          <motion.div
            className="relative bg-white/8 backdrop-blur-md rounded-2xl border border-white/15"
            style={{ 
              width: `${chartHeight + 190}px`, // 减少宽度，使容器更紧凑
              height: chartHeight + 570,
              padding: '15px 30px 25px 15px', // 增加底部内边距
              marginRight: '0px', // 确保贴近右边缘
              marginTop: '-10px' // 向上平移20像素
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* X轴标签 - 调整位置 */}
            <motion.div
              className="absolute bottom-0"
              style={{ 
                left: `${120 + chartHeight/2 - 30}px`, // 调整居中位置
                bottom: '5px' // 调整底部位置
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-white font-inria text-sm opacity-80">Days/Week</span>
            </motion.div>

            {/* X轴刻度 */}
            <div className="absolute bottom-7 flex justify-between text-white/60 text-xs" 
                 style={{ 
                   left: '120px', 
                   width: chartHeight + 'px'
                 }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                <div key={value} className="font-inria text-center" style={{ minWidth: '20px' }}>
                  {value}
                </div>
              ))}
            </div>

            {/* 网格线 - 垂直线 */}
            <div className="absolute top-4 bottom-7" style={{ left: '120px', width: chartHeight }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                <div
                  key={value}
                  className="absolute h-full border-l border-white/10"
                  style={{ 
                    left: `${(value / 7) * 100}%`,
                    opacity: value === 0 ? 0.4 : 0.2 // 0刻度线更明显
                  }}
                />
              ))}
            </div>

            {/* Y轴滑雪场图标排列 - 左侧垂直排列 */}
            <motion.div
              className="absolute top-4 flex flex-col"
              style={{ 
                left: '8px', 
                height: chartHeight + 20, // 增加高度以适应更多滑雪场
                width: '105px', // 进一步减少宽度
                justifyContent: 'space-between' // 确保均匀分布
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {sortedResorts.map((resort, index) => (
                <MountainChartIcon
                  key={resort.id}
                  resort={resort}
                  index={index}
                  totalResorts={sortedResorts.length}
                />
              ))}
            </motion.div>

            {/* 图表内容 - 水平条形图 */}
            <div 
              key={`${selectedMonth}-${selectedWeek}`}
              className="absolute top-4 flex flex-col"
              style={{ 
                left: '120px', // 调整左侧位置
                width: chartHeight,
                height: chartHeight + 20, // 增加高度以适应更多滑雪场
                justifyContent: 'space-between' // 确保与左侧图标对齐
              }}
            >
              {sortedResorts.map((resort, index) => {
                const value = getCurrentResortData(resort);
                const barWidth = (value / 7) * chartHeight;
                
                return (
                  <motion.div
                    key={`${resort.id}-${selectedMonth}-${selectedWeek}`}
                    className="flex items-center relative"
                    style={{ 
                      height: `calc(100% / ${sortedResorts.length})`, // 使用与图标相同的高度计算
                      minHeight: '24px', // 减少最小高度
                      maxHeight: '32px', // 减少最大高度
                      width: `${chartHeight}px`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    {/* 水平柱状图 - 从左边开始 */}
                    <motion.div
                      key={`bar-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="absolute left-0 rounded-r-md"
                      style={{
                        height: '16px', // 减少条形图高度
                        width: `${barWidth}px`,
                        backgroundColor: resort.color,
                        boxShadow: `0 0 20px ${resort.color}40`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}px` }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.05 + index * 0.02,
                        ease: "easeOut"
                      }}
                    />

                    {/* 白色数据点 */}
                    <motion.div
                      key={`dot-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="w-2.5 h-2.5 bg-white rounded-full shadow-lg absolute" // 减少数据点大小
                      style={{
                        left: `${barWidth + 4}px`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.15 + index * 0.02,
                        type: "spring",
                        stiffness: 400 
                      }}
                    />

                    {/* 数据值显示 */}
                    <motion.div
                      key={`value-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="text-white text-xs font-inria opacity-80 absolute"
                      style={{
                        left: `${barWidth + 15}px`, // 减少间距
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '10px' // 减少字体大小
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + index * 0.02 }}
                    >
                      {value.toFixed(1)}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* 控制器区域 - 移至主容器底部，确保在图表外 */}
        <div className="flex flex-col items-end space-y-2 pb-4 pr-4"> {/* 右对齐并添加底部和右侧间距 */}
          {/* 时间选择器 */}
          <TimeSelector
            selectedMonth={selectedMonth}
            selectedWeek={selectedWeek}
            onMonthChange={handleMonthChange}
            onWeekChange={handleWeekChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;