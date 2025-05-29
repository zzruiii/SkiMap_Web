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
        .white-mountain {
          position: absolute;
          bottom: 0; /* 贴合底部 */
          left: 39.06%;
          width: 45.12%;
          height: auto;
          z-index: 4;
          transform-origin: bottom left;
          transform: translateY(-8vh); /* 向上移动来覆盖蓝色山脉 */
        }
        
        .main-title {
          font-size: 48px;
        }
        
        .france-title {
          font-size: 36px;
        }
        
        @media (min-width: 1200px) {
          .white-mountain {
            transform: translateY(-12vh);
          }
        }
        
        @media (min-width: 1600px) {
          .white-mountain {
            transform: translateY(-15vh);
          }
        }
        
        @media (max-width: 768px) {
          .white-mountain {
            transform: translateY(-5vh);
          }
          .main-title {
            font-size: 32px;
          }
          .france-title {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .white-mountain {
            transform: translateY(-3vh);
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

      {/* 山脉层次 - 根据Figma精确数据重建，底部贴合 */}
      <div className="absolute inset-0">
        {/* 背景山脉 - 深蓝色 (#0B1748) - Vector 1 */}
        <img 
          src={mountain1} 
          alt="背景山"
          className="absolute w-full h-auto object-cover"
          style={{ 
            zIndex: 1,
            bottom: '0', // 贴合底部
            left: '-0.39%', // x: -5/1280 = -0.39%
            width: '100.51%', // width: 1286.5/1280 = 100.51%
            height: 'auto',
            transformOrigin: 'bottom left'
          }}
        />
        
        {/* 主要蓝色山脉 (#4579CC) - Vector 2 */}
        <img 
          src={mountain2} 
          alt="主山脉"
          className="absolute h-auto object-cover"
          style={{ 
            zIndex: 2,
            bottom: '0', // 贴合底部
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
            bottom: '0', // 贴合底部
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
          className="white-mountain"
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
          A map GUIDE for your winter skiing vocation
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
      </div>

      {/* 滚动提示 */}
      <ScrollIndicator text="Scroll down to explore the map" />
    </div>
  );
};

export default HomePage; 