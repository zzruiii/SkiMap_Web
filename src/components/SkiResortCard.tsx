import React from 'react';
import { motion } from 'framer-motion';
import { SkiResort } from '../types/SkiResort';
// 导入新的SVG图标
import routeIcon from '../assets/route.svg';
import skiGuyIcon from '../assets/ski_guy.svg';

interface SkiResortCardProps {
  resort: SkiResort;
  position: { x: number; y: number };
}

const SkiResortCard: React.FC<SkiResortCardProps> = ({ resort, position }) => {
  // Route图标组件 - 替换第一行的山峰图标
  const RouteIcon = () => (
    <img 
      src={routeIcon} 
      alt="Route" 
      width="16" 
      height="16"
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 滑雪者图标组件 - 替换第二行的距离图标
  const SkiGuyIcon = () => (
    <img 
      src={skiGuyIcon} 
      alt="Ski Guy" 
      width="16" 
      height="16"
      style={{ width: '16px', height: '16px' }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ duration: 0.25, ease: "circOut" }}
      className="absolute z-50 pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -130%)'
      }}
    >
      {/* 卡片主体 - 完全自适应宽度和高度，最小尺寸173x55px */}
      <div 
        className="relative border border-white/50 rounded-[10px] backdrop-blur-[3px] px-3 py-2"
        style={{
          minWidth: '173px',
          minHeight: '55px',
          background: 'rgba(203, 224, 253, 0.6)',
        }}
      >
        {/* 上半部分：route图标 + 滑雪场名称 + 距离信息 */}
        <div className="flex items-center justify-between mb-2" style={{ minHeight: '20px' }}>
          {/* 左侧：route图标 + 滑雪场名称 */}
          <div className="flex items-center gap-2">
            <div style={{ width: '16px', height: '16px', flexShrink: 0 }}>
              <RouteIcon />
            </div>
            <div
              className="font-bold text-black whitespace-nowrap"
              style={{
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '17px',
                fontWeight: 700
              }}
            >
              {resort.name}
            </div>
          </div>
          
          {/* 右侧：距离信息 */}
          <div
            className="text-black whitespace-nowrap ml-4"
            style={{
              fontSize: '14px',
              fontFamily: 'Jersey 25, sans-serif',
              lineHeight: '14px',
              fontWeight: 400,
              flexShrink: 0
            }}
          >
            {resort.length}
          </div>
        </div>

        {/* 下半部分：滑雪者图标 + 推荐水平（支持换行） */}
        <div className="flex items-start gap-2">
          <div style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '1px' }}>
            <SkiGuyIcon />
          </div>
          <div
            className="text-black leading-tight"
            style={{
              fontSize: '14px',
              fontFamily: 'Jersey 25, sans-serif',
              lineHeight: '16px',
              fontWeight: 400,
              maxWidth: '200px', // 限制最大宽度，超出后自动换行
              wordBreak: 'break-word',
              flex: 1
            }}
          >
            {resort.suitableFor}
          </div>
        </div>
      </div>

      {/* 指向箭头 - 保持原有的三角形指示器 */}
      <div 
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[95%]"
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid rgba(203, 224, 253, 0.6)',
        }}
      />
    </motion.div>
  );
};

export default SkiResortCard; 