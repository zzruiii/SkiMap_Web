import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skiResorts, SkiResort } from '../types/SkiResort';

// CSV数据解析函数
const parseCSVData = async () => {
  try {
    // 使用import.meta.env.BASE_URL动态构建路径
    // public目录的文件会被复制到dist根目录，不是assets子目录
    const csvUrl = `${import.meta.env.BASE_URL}00bluebird_day.csv`;
    console.log('Attempting to fetch CSV from:', csvUrl);
    console.log('Base URL:', import.meta.env.BASE_URL);
    
    const response = await fetch(csvUrl);
    console.log('Fetch response status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV text length:', csvText.length);
    console.log('First 200 characters of CSV:', csvText.substring(0, 200));
    
    const lines = csvText.split('\n').filter(line => line.trim());
    console.log('Total CSV lines:', lines.length);
    
    // 跳过标题行（前3行）
    const dataLines = lines.slice(3);
    console.log('Data lines after skipping headers:', dataLines.length);
    
    const data: {[month: string]: {[week: string]: {[resortName: string]: number}}} = {};
    
    // 初始化数据结构 - 注意CSV中包含了November
    const months = ['November', 'December', 'January', 'February', 'March', 'April'];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
    months.forEach(month => {
      data[month] = {};
      weeks.forEach(week => {
        data[month][week] = {};
      });
    });
    
    // 解析每行数据
    dataLines.forEach((line) => {
      const columns = line.split(',');
      if (columns.length > 1 && columns[0].trim()) {
        const resortName = columns[0].trim();
        
        // 跳过空白行
        if (!resortName || columns.length < 25) return;
        
        console.log(`Processing resort: ${resortName}, columns: ${columns.length}`);
        
        // Nov: columns 1-4, Dec: columns 5-8, Jan: columns 9-12, Feb: columns 13-16, Mar: columns 17-20, Apr: columns 21-24
        const monthIndexes = {
          'November': { start: 1, end: 4 },
          'December': { start: 5, end: 8 },
          'January': { start: 9, end: 12 },
          'February': { start: 13, end: 16 },
          'March': { start: 17, end: 20 },
          'April': { start: 21, end: 24 }
        };
        
        Object.entries(monthIndexes).forEach(([month, indexes]) => {
          for (let i = 0; i < 4; i++) {
            const columnIndex = indexes.start + i;
            const value = parseFloat(columns[columnIndex]?.trim() || '0');
            const week = `Week ${i + 1}`;
            
            if (!isNaN(value)) {
              data[month][week][resortName] = value;
            }
          }
        });
      }
    });
    
    console.log('Successfully parsed CSV data');
    console.log('Available months:', Object.keys(data));
    console.log('Sample data for November Week 1:', Object.keys(data['November']['Week 1']).slice(0, 5));
    
    return data;
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    console.log('Falling back to random data generation');
    // 如果解析失败，返回随机数据作为后备
    return generateRandomData(skiResorts);
  }
};

// 生成随机蓝鸟天数数据（临时使用）
const generateRandomData = (resorts: SkiResort[]) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const months = ['January', 'February', 'March', 'April', 'December'];
  
  const data: {[month: string]: {[week: string]: {[resortId: string]: number}}} = {};
  
  months.forEach(month => {
    data[month] = {};
    weeks.forEach(week => {
      data[month][week] = {};
      resorts.forEach(resort => {
        // 生成0.1-7.0的随机数据点
        data[month][week][resort.id] = parseFloat((Math.random() * 6.9 + 0.1).toFixed(1));
      });
    });
  });
  
  return data;
};

// 滑雪场名称映射（CSV中的名称到我们系统中的名称）
const resortNameMapping: {[csvName: string]: string} = {
  'Chamonix': 'Chamonix',
  'Courchevel': 'Courchevel',
  'La Plagne': 'La Plagne',
  'Méribel': 'Méribel',
  'Tignes': 'Tignes',
  'Val d\'Isère': "Val d'Isère",
  'Val Thorens': 'Val Thorens',
  'Les Arcs': 'Les Arcs',
  'Avoriaz': 'Avoriaz',
  'Les Menuires': 'Les Menuires',
  'Morzine': 'Morzine',
  'Les Deux Alpes': 'Les Deux Alpes',
  'Serre Chevalier': 'Serre Chevalier',
  'Alpe d\'Huez': "Alpe d'Huez",
  'Flaine': 'Flaine',
  'La Clusaz': 'La Clusaz',
  'La Rosière': 'La Rosière',
  'Montgenèvre': 'Montgenèvre',
  'Val Cenis': 'Val Cenis',
  'St Martin de Belleville': 'St Martin de Belleville',
  'Isola 2000': 'Isola 2000',
  'Risoul': 'Risoul',
  'Valmorel': 'Valmorel',
  'Les Gets': 'Les Gets',
  'Vaujany': 'Vaujany',
  'Les Saisies': 'Les Saisies',
  'Les Houches': 'Les Houches',
  'Saint Gervais les Bains': 'Saint Gervais les Bains',
  'Les Carroz': 'Les Carroz',
  'Les Orres': 'Les Orres'
};

// 小山图标组件
const MountainChartIcon: React.FC<{ resort: SkiResort; index: number; totalResorts: number }> = ({ resort, index, totalResorts }) => (
  <motion.div
    className="flex flex-col items-center justify-center"
    style={{ 
      minWidth: '32px', 
      maxWidth: '45px',
      width: `${100 / totalResorts}%`,
      height: '90px' // 从120px减少到90px，让整体更紧凑
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
  >
    {/* 小山图标 */}
    <svg
      width="16"
      height="18"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-1"
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

    {/* 滑雪场名称 - 45度倾斜，移到图标下方 */}
    <span 
      className="text-xs text-white font-inria text-center opacity-80 whitespace-nowrap"
      style={{
        transform: 'rotate(-45deg)',
        transformOrigin: 'center center',
        fontSize: '9px',
        width: '55px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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

const ChartPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [chartData, setChartData] = useState<{[month: string]: {[week: string]: {[resortName: string]: number}}} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // 加载CSV数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await parseCSVData();
        setChartData(data);
        console.log('Data loaded successfully, available months:', Object.keys(data));
      } catch (error) {
        console.error('Failed to load chart data:', error);
        // 使用随机数据作为后备
        setChartData(generateRandomData(skiResorts));
      }
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // 监听选中状态变化
  useEffect(() => {
    console.log('Current selection:', selectedMonth, selectedWeek);
    if (chartData && chartData[selectedMonth] && chartData[selectedMonth][selectedWeek]) {
      console.log('Data available for current selection');
    } else {
      console.log('No data available for current selection');
    }
  }, [selectedMonth, selectedWeek, chartData]);
  
  // 按照从北到南排序滑雪场（y坐标从小到大）
  const sortedResorts = [...skiResorts].sort((a, b) => a.position.y - b.position.y);
  
  // 获取当前数据 - 需要通过名称映射找到对应的数据
  const getCurrentResortData = (resort: SkiResort) => {
    if (!chartData || !chartData[selectedMonth] || !chartData[selectedMonth][selectedWeek]) {
      return 0;
    }
    
    const weekData = chartData[selectedMonth][selectedWeek];
    
    // 直接在CSV数据中查找匹配的滑雪场名称
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
    
    // 如果还是找不到，尝试通过映射表查找
    const csvName = Object.keys(resortNameMapping).find(csvKey => 
      resortNameMapping[csvKey] === resort.name
    );
    
    if (csvName && weekData[csvName] !== undefined) {
      return weekData[csvName];
    }
    
    // 如果找不到匹配的数据，输出调试信息
    console.log(`No data found for resort: ${resort.name}, available keys:`, Object.keys(weekData));
    return 0;
  };
  
  // 获取所有当前数据值用于计算最大值
  const chartHeight = 300; // 图表高度

  // 如果数据还在加载中，显示加载状态
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-[#0B1748] via-[#122360] to-[#1A327A] relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="text-white text-xl font-inria"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading bluebird data...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 地图背景层 */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}ski_map.svg')`,
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

      {/* 主要内容区域 - 减少顶部间距，为图表预留更多空间 */}
      <div className="flex flex-col h-full pt-20 p-6">
        {/* 图表区域 - 占据更多空间 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* 控制器区域 - 移动到图表容器上方，紧贴图表 */}
          <div className="flex flex-col items-center space-y-3 mb-4">
            {/* 时间选择器 */}
            <TimeSelector
              selectedMonth={selectedMonth}
              selectedWeek={selectedWeek}
              onMonthChange={handleMonthChange}
              onWeekChange={handleWeekChange}
            />

            {/* 当前选择显示 */}
            <motion.div
              key={`${selectedMonth}-${selectedWeek}-display`}
              className="text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-white/80 font-inria text-base">
                Showing data for: <span className="text-white font-bold">{selectedMonth} - {selectedWeek}</span>
              </p>
            </motion.div>
          </div>

          {/* 图表容器 */}
          <motion.div
            className="relative bg-white/8 backdrop-blur-md rounded-2xl border border-white/15"
            style={{ 
              width: '95%', 
              maxWidth: '1800px', 
              height: chartHeight + 150,
              padding: '50px 60px 24px 48px'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Y轴标签 - 移动到Y轴刻度上方 */}
            <motion.div
              className="absolute left-0"
              style={{ 
                top: `${50 - 43}px` // 调整后的top值 - 一个刻度间距
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-white font-inria text-sm opacity-80 pl-4">Days/Week</span>
            </motion.div>

            {/* Y轴刻度 */}
            <div className="absolute left-0 top-12 flex flex-col justify-between text-white/60 text-xs" style={{ height: chartHeight }}>
              {[7, 6, 5, 4, 3, 2, 1, 0].map((value) => (
                <div key={value} className="font-inria pl-4">
                  {value}
                </div>
              ))}
            </div>

            {/* 网格线 */}
            <div className="absolute left-12 right-6 top-12" style={{ height: chartHeight }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                <div
                  key={value}
                  className="absolute w-full border-t border-white/10"
                  style={{ 
                    bottom: `${(value / 7) * 100}%`,
                    opacity: value === 0 ? 0.4 : 0.2 // 0刻度线更明显
                  }}
                />
              ))}
            </div>

            {/* 图表内容 */}
            <div 
              key={`${selectedMonth}-${selectedWeek}`}
              className="absolute left-12 right-6 top-12 flex justify-between"
              style={{ 
                height: chartHeight
              }}
            >
              {sortedResorts.map((resort, index) => {
                const value = getCurrentResortData(resort);
                const barHeight = (value / 7) * chartHeight;
                
                return (
                  <motion.div
                    key={`${resort.id}-${selectedMonth}-${selectedWeek}`}
                    className="flex flex-col items-center relative"
                    style={{ 
                      width: `${100 / sortedResorts.length}%`,
                      minWidth: '32px',
                      maxWidth: '45px',
                      height: `${chartHeight}px`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    {/* 数据值显示 */}
                    <motion.div
                      key={`value-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="text-white text-xs font-inria opacity-80 absolute"
                      style={{
                        bottom: `${barHeight + 15}px`
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + index * 0.02 }}
                    >
                      {value.toFixed(1)}
                    </motion.div>

                    {/* 白色数据点 */}
                    <motion.div
                      key={`dot-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="w-3 h-3 bg-white rounded-full shadow-lg absolute"
                      style={{
                        bottom: `${barHeight + 5}px`
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

                    {/* 柱状图 - 从底部开始 */}
                    <motion.div
                      key={`bar-${resort.id}-${selectedMonth}-${selectedWeek}`}
                      className="absolute bottom-0 rounded-t-md"
                      style={{
                        width: '20px',
                        height: `${barHeight}px`,
                        backgroundColor: resort.color,
                        boxShadow: `0 0 20px ${resort.color}40`,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}px` }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.05 + index * 0.02,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* 底部滑雪场图标排列 - 移动到图表容器内部 */}
            <motion.div
              className="absolute left-12 right-6 flex justify-center items-end"
              style={{ bottom: '10px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div 
                className="flex justify-between items-end w-full"
              >
                {sortedResorts.map((resort, index) => (
                  <MountainChartIcon
                    key={resort.id}
                    resort={resort}
                    index={index}
                    totalResorts={sortedResorts.length}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;