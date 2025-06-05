import React, { useEffect, useState } from 'react';
import Snowflake from './Snowflake';
import ScrollIndicator from './ScrollIndicator';
// 导入新的山脉SVG资源
import mountainSvg from '../assets/00mountain.svg';

interface HomePageProps {
  isActive: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isActive: _isActive }) => {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number;
    delay: number;
    duration: number;
    size: number;
    left: number;
  }>>([]);

  useEffect(() => {
    // 生成随机雪花 - 根据Figma原型图的三种尺寸
    const generateSnowflakes = () => {
      const flakes = [];
      
      // 根据Figma原型图的雪花分布，生成三种尺寸的雪花
      for (let i = 0; i < 60; i++) { // 减少到60个雪花，避免过于密集
        let size;
        const sizeRandom = Math.random();
        
        if (sizeRandom < 0.15) {
          // 15% 大雪花 (35px)
          size = 35;
        } else if (sizeRandom < 0.35) {
          // 20% 中雪花 (33px)
          size = 33;
        } else {
          // 65% 小雪花 (16px)
          size = 16;
        }
        
        flakes.push({
          id: i,
          delay: (i / 60) * 20 + Math.random() * 5, // 均匀分布延迟，避免集中生成
          duration: 8 + Math.random() * 6, // 8-14秒
          size: size,
          left: Math.random() * 100, // 覆盖整个屏幕宽度
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 添加响应式样式 */}
      <style>{`
        .blue-mountain {
          position: absolute;
          bottom: 0;
          left: 13.79%;
          width: 78.52%;
          height: auto;
          z-index: 2;
          transform-origin: bottom left;
        }
        
        .main-title {
          font-size: 48px;
        }
        
        .france-title {
          font-size: 36px;
        }
        
        @media (min-width: 1200px) {
          .blue-mountain {
            width: 78.52%;
          }
        }
        
        @media (min-width: 1600px) {
          .blue-mountain {
            width: 78.52%;
          }
        }
        
        @media (max-width: 768px) {
          .blue-mountain {
            left: 10%;
            width: 85%;
          }
          .main-title {
            font-size: 32px;
          }
          .france-title {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .blue-mountain {
            left: 5%;
            width: 90%;
          }
          .main-title {
            font-size: 24px;
          }
          .france-title {
            font-size: 18px;
          }
        }
      `}</style>
      
      {/* 渐变背景 */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #E3F0FF 0%, #D5DBF3 49.54%, #EEEDFB 100%)'
        }}
      />

      {/* 新的山脉 - 使用00mountain.svg，按照Figma精确比例 */}
      <div className="absolute inset-0">
        <img 
          src={mountainSvg} 
          alt="山脉"
          className="blue-mountain"
        />
      </div>

      {/* 雪花动画 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
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
      <div className="absolute inset-0 text-center px-4" style={{ zIndex: 20 }}>
        {/* 副标题 - 根据Figma: x:176, y:398, width:928, height:58, fontSize:48px */}
        <h2 
          className="font-inria font-bold text-ski-text main-title"
          style={{
            position: 'absolute',
            top: '47.8%', // 398/832 = 47.8%
            left: '13.75%', // 176/1280 = 13.75%
            width: '72.5%', // 928/1280 = 72.5%
            lineHeight: '1.199',
            textAlign: 'center'
          }}
        >
          A MAP GUIDE FOR YOUR WINTER SKIING VACATION
        </h2>
        
        {/* 主标题 France - 根据Figma: x:583, y:486, width:106, height:43, fontSize:36px */}
        <h1 
          className="font-inria font-bold text-ski-text france-title"
          style={{
            position: 'absolute',
            top: '58.4%', // 486/832 = 58.4%
            left: '45.5%', // 583/1280 = 45.5%
            width: '8.3%', // 106/1280 = 8.3%
            lineHeight: '1.199',
            textAlign: 'center'
          }}
        >
          France
        </h1>
        
        {/* 滚动提示 - 移到内容区域内 */}
        <ScrollIndicator text="Scroll down to explore the map" />
      </div>
    </div>
  );
};

export default HomePage; 