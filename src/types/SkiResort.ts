export interface SkiResort {
  id: string;
  name: string;
  length: string;
  suitableFor: string;
  color: string;
  position: {
    x: number; // 在地图上的x坐标百分比
    y: number; // 在地图上的y坐标百分比
  };
}

export const skiResorts: SkiResort[] = [
  // 根据CSV颜色代码正确匹配滑雪场信息到对应位置
  
  // 位置 x: 51.9, y: 14.4 - 颜色 #02F8F4 对应 Avoriaz
  {
    id: 'avoriaz',
    name: 'Avoriaz',
    length: '78 km',
    suitableFor: 'families, intermediates, snowboarding',
    color: '#02F8F4',
    position: { x: 51.9, y: 14.4 }
  },
  // 位置 x: 50.8, y: 14.8 - 颜色 #02FEF3 对应 Morzine
  {
    id: 'morzine',
    name: 'Morzine',
    length: '120 km',
    suitableFor: 'beginners, intermediates',
    color: '#02FEF3',
    position: { x: 50.8, y: 14.8 }
  },
  // 位置 x: 49.8, y: 15.9 - 颜色 #01EDF7 对应 Les Gets
  {
    id: 'les-gets',
    name: 'Les Gets',
    length: '120 km',
    suitableFor: 'families, intermediates',
    color: '#01EDF7',
    position: { x: 49.8, y: 15.9 }
  },
  // 位置 x: 49.8, y: 19.3 - 颜色 #00E2F9 对应 Les Carroz
  {
    id: 'les-carroz',
    name: 'Les Carroz',
    length: '28 km',
    suitableFor: 'intermediates, advanced',
    color: '#00E2F9',
    position: { x: 49.8, y: 19.3 }
  },
  // 位置 x: 51.4, y: 19.6 - 颜色 #00DDFB 对应 Flaine
  {
    id: 'flaine',
    name: 'Flaine',
    length: '265 km',
    suitableFor: 'versatile',
    color: '#00DDFB',
    position: { x: 51.4, y: 19.6 }
  },
  // 位置 x: 56.0, y: 20.7 - 颜色 #00D8FD 对应 Les Houches
  {
    id: 'les-houches',
    name: 'Les Houches',
    length: '55 km',
    suitableFor: 'intermediates, advanced',
    color: '#00D8FD',
    position: { x: 56.0, y: 20.7 }
  },
  // 位置 x: 54.5, y: 22.0 - 颜色 #00D3FF 对应 Chamonix
  {
    id: 'chamonix',
    name: 'Chamonix',
    length: '155 km',
    suitableFor: 'advanced, off-piste',
    color: '#00D3FF',
    position: { x: 54.5, y: 22.0 }
  },
  // 位置 x: 52.6, y: 22.3 - 颜色 #04CBFC 对应 Saint Gervais les Bains
  {
    id: 'saint-gervais',
    name: 'Saint Gervais les Bains',
    length: '65 km',
    suitableFor: 'beginners, intermediates, advanced',
    color: '#04CBFC',
    position: { x: 52.6, y: 22.3 }
  },
  // 位置 x: 46.1, y: 23.9 - 颜色 #0CC1F6 对应 La Clusaz
  {
    id: 'la-clusaz',
    name: 'La Clusaz',
    length: '132 km',
    suitableFor: 'versatile',
    color: '#0CC1F6',
    position: { x: 46.1, y: 23.9 }
  },
  // 位置 x: 50.0, y: 27.7 - 颜色 #23A5E6 对应 Les Saisies
  {
    id: 'les-saisies',
    name: 'Les Saisies',
    length: '77 km',
    suitableFor: 'beginners, intermediates',
    color: '#23A5E6',
    position: { x: 50.0, y: 27.7 }
  },
  // 位置 x: 58.0, y: 29.7 - 颜色 #2A9ADF 对应 La Rosière
  {
    id: 'la-rosiere',
    name: 'La Rosière',
    length: '152 km',
    suitableFor: 'intermediates, advanced',
    color: '#2A9ADF',
    position: { x: 58.0, y: 29.7 }
  },
  // 位置 x: 57.9, y: 31.8 - 颜色 #3A87D4 对应 Les Arcs
  {
    id: 'les-arcs',
    name: 'Les Arcs',
    length: '200 km',
    suitableFor: 'intermediates, advanced',
    color: '#3A87D4',
    position: { x: 57.9, y: 31.8 }
  },
  // 位置 x: 55.1, y: 34.6 - 颜色 #4579CC 对应 La Plagne
  {
    id: 'la-plagne',
    name: 'La Plagne',
    length: '225 km',
    suitableFor: 'intermediates, families',
    color: '#4579CC',
    position: { x: 55.1, y: 34.6 }
  },
  // 位置 x: 60.8, y: 34.4 - 颜色 #4774CF 对应 Tignes
  {
    id: 'tignes',
    name: 'Tignes',
    length: '300 km',
    suitableFor: 'versatile',
    color: '#4774CF',
    position: { x: 60.8, y: 34.4 }
  },
  // 位置 x: 62.9, y: 34.6 - 颜色 #4866D5 对应 Val d'Isère
  {
    id: 'val-disere',
    name: "Val d'Isère",
    length: '300 km',
    suitableFor: 'versatile',
    color: '#4866D5',
    position: { x: 62.9, y: 34.6 }
  },
  // 位置 x: 54.4, y: 37.8 - 颜色 #4959DA 对应 St Martin de Belleville
  {
    id: 'st-martin-belleville',
    name: 'St Martin de Belleville',
    length: '100 km',
    suitableFor: 'intermediates, families',
    color: '#4959DA',
    position: { x: 54.4, y: 37.8 }
  },
  // 位置 x: 53.4, y: 39.5 - 颜色 #4C3FE5 对应 Méribel
  {
    id: 'meribel',
    name: 'Méribel',
    length: '150 km',
    suitableFor: 'versatile',
    color: '#4C3FE5',
    position: { x: 53.4, y: 39.5 }
  },
  // 位置 x: 51.8, y: 40.5 - 颜色 #4D31EA 对应 Valmorel
  {
    id: 'valmorel',
    name: 'Valmorel',
    length: '165 km',
    suitableFor: 'intermediates, families',
    color: '#4D31EA',
    position: { x: 51.8, y: 40.5 }
  },
  // 位置 x: 49.8, y: 38.1 - 颜色 #4A4BDF 对应 Courchevel
  {
    id: 'courchevel',
    name: 'Courchevel',
    length: '150 km',
    suitableFor: 'versatile',
    color: '#4A4BDF',
    position: { x: 49.8, y: 38.1 }
  },
  // 位置 x: 60.9, y: 41.6 - 颜色 #4F25EF 对应 Val Thorens
  {
    id: 'val-thorens',
    name: 'Val Thorens',
    length: '150 km',
    suitableFor: 'versatile',
    color: '#4F25EF',
    position: { x: 60.9, y: 41.6 }
  },
  // 位置 x: 53.2, y: 42.4 - 颜色 #5118F5 对应 Val Cenis
  {
    id: 'val-cenis',
    name: 'Val Cenis',
    length: '100 km',
    suitableFor: 'intermediates, families',
    color: '#5118F5',
    position: { x: 53.2, y: 42.4 }
  },
  // 位置 x: 54.8, y: 43.5 - 颜色 #520BFA 对应 Les Menuires
  {
    id: 'les-menuires',
    name: 'Les Menuires',
    length: '160 km',
    suitableFor: 'intermediates, families',
    color: '#520BFA',
    position: { x: 54.8, y: 43.5 }
  },
  // 位置 x: 42.3, y: 53.1 - 颜色 #5D00FF 对应 Vaujany
  {
    id: 'vaujany',
    name: 'Vaujany',
    length: '249 km',
    suitableFor: 'families, beginners, experts',
    color: '#5D00FF',
    position: { x: 42.3, y: 53.1 }
  },
  // 位置 x: 42.6, y: 56.0 - 颜色 #6501FF 对应 Alpe d'Huez
  {
    id: 'alpe-dhuez',
    name: "Alpe d'Huez",
    length: '250 km',
    suitableFor: 'versatile',
    color: '#6501FF',
    position: { x: 42.6, y: 56.0 }
  },
  // 位置 x: 44.8, y: 58.9 - 颜色 #7601FF 对应 Les Deux Alpes
  {
    id: 'les-deux-alpes',
    name: 'Les Deux Alpes',
    length: '225 km',
    suitableFor: 'versatile',
    color: '#7601FF',
    position: { x: 44.8, y: 58.9 }
  },
  // 位置 x: 57.9, y: 59.4 - 颜色 #7E00FF 对应 Serre Chevalier
  {
    id: 'serre-chevalier',
    name: 'Serre Chevalier',
    length: '250 km',
    suitableFor: 'intermediates, advanced',
    color: '#7E00FF',
    position: { x: 57.9, y: 59.4 }
  },
  // 位置 x: 62.3, y: 56.6 - 颜色 #6D00FF 对应 Montgenèvre
  {
    id: 'montgenevre',
    name: 'Montgenèvre',
    length: '100 km',
    suitableFor: 'intermediates, advanced',
    color: '#6D00FF',
    position: { x: 62.3, y: 56.6 }
  },
  // 位置 x: 63.6, y: 71.8 - 颜色 #8700FF 对应 Risoul
  {
    id: 'risoul',
    name: 'Risoul',
    length: '185 km',
    suitableFor: 'intermediates, advanced',
    color: '#8700FF',
    position: { x: 63.6, y: 71.8 }
  },
  // 位置 x: 63.0, y: 80.5 - 颜色 #8F00FF 对应 Les Orres
  {
    id: 'les-orres',
    name: 'Les Orres',
    length: '63 km',
    suitableFor: 'beginners, intermediates',
    color: '#8F00FF',
    position: { x: 63.0, y: 80.5 }
  },
  // 位置 x: 58.5, y: 75.2 - 颜色 #9700FF 对应 Isola 2000
  {
    id: 'isola-2000',
    name: 'Isola 2000',
    length: '120 km',
    suitableFor: 'intermediates, families',
    color: '#9700FF',
    position: { x: 58.5, y: 75.2 }
  }
]; 