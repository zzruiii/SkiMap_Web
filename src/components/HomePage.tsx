import React, { useEffect, useState } from 'react';
import Snowflake from './Snowflake';
import ScrollIndicator from './ScrollIndicator';
// 导入SVG资源
import mountain1 from '../assets/mountain-1.svg';
import mountain2 from '../assets/mountain-2.svg';
import mountain3 from '../assets/mountain-3.svg';
import mountain4 from '../assets/mountain-4.svg';

const HomePage: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number;
    delay: number;
    duration: number;
    size: number;
    left: number;
  }>>([]);

  useEffect(() => {
    // 生成随机雪花
    const generateSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4, // 3-7秒
          size: 4 + Math.random() * 8, // 4-12px
          left: Math.random() * 100,
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 渐变背景 */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #E3F0FF 0%, #D5DBF3 49.54%, #EEEDFB 100%)'
        }}
      />

      {/* 山脉层次 - 根据Figma精确数据重建 */}
      <div className="absolute inset-0">
        {/* 背景山脉 - 深蓝色 (#0B1748) - Vector 1 */}
        <img 
          src={mountain1} 
          alt="背景山"
          className="absolute w-full h-auto object-cover"
          style={{ 
            zIndex: 1,
            bottom: '0',
            left: '-0.39%', // x: -5/1280 = -0.39%
            width: '100.51%', // width: 1286.5/1280 = 100.51%
            height: 'auto'
          }}
        />
        
        {/* 主要蓝色山脉 (#4579CC) - Vector 2 */}
        <img 
          src={mountain2} 
          alt="主山脉"
          className="absolute h-auto object-cover"
          style={{ 
            zIndex: 2,
            bottom: '0',
            left: '13.91%', // x: 178/1280 = 13.91%
            width: '78.4%', // width: 1003.5/1280 = 78.4%
            height: 'auto',
            transformOrigin: 'bottom left'
          }}
        />
        
        {/* 深蓝山脉 (#293F88) - Vector 4 */}
        <img 
          src={mountain3} 
          alt="左侧山"
          className="absolute h-auto object-cover"
          style={{ 
            zIndex: 3,
            bottom: '0',
            left: '13.79%', // x: 176.5/1280 = 13.79%
            width: '39.73%', // width: 508.5/1280 = 39.73%
            height: 'auto',
            transformOrigin: 'bottom left'
          }}
        />
        
        {/* 白色前景山脉 (#FEFFFF) - Vector 3 */}
        <img 
          src={mountain4} 
          alt="白色前景"
          className="absolute h-auto object-cover"
          style={{ 
            zIndex: 4,
            bottom: '12.2%', // 计算：(832-730.49)/832 = 12.2% 从底部向上
            left: '39.06%', // x: 500/1280 = 39.06%
            width: '45.12%', // width: 577.54/1280 = 45.12%
            height: 'auto',
            transformOrigin: 'bottom left'
          }}
        />
      </div>

      {/* 雪花动画 */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            delay={flake.delay}
            duration={flake.duration}
            size={flake.size}
            left={flake.left}
          />
        ))}
      </div>

      {/* 主要内容 - 根据Figma精确位置 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ zIndex: 20 }}>
        <div className="transform translate-y-8 md:translate-y-12">
          {/* 副标题在上 - y: 398 */}
          <h2 className="font-inria font-bold text-3xl md:text-4xl lg:text-5xl text-ski-text mb-4 md:mb-6 leading-tight max-w-4xl">
            A map GUIDE for your winter skiing vocation
          </h2>
          
          {/* 主标题在下 - y: 486 */}
          <h1 className="font-inria font-bold text-3xl md:text-4xl lg:text-5xl text-ski-text">
            France
          </h1>
        </div>
      </div>

      {/* 滚动提示 */}
      <ScrollIndicator />
    </div>
  );
};

export default HomePage; 