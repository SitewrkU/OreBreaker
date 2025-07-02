export const inventory = [];
export const pickaxes = [];

export const items = {
  stonePart: { 
    name: "Кусочок камня", src: "src/res/StonePart.png" },
  stoneBrick: { 
    name: "Оброблений камень", src: "src/res/StoneBrick.png",},
  stonePickaxeHandle: { 
    name: "Кам'яна ручка кірки", src: "src/res/StonePickaxeHandle.png" },
  stonePickaxeBlade: { 
    name: "Кам'яне лезо кірки", src: "src/res/StonePickaxeBlade.png" },
  stoneHammer: { 
    name: "Кам'яний молот", src: "src/res/StoneHammer.png" },
  coal: { 
    name: "Вугілля", src:"src/res/Coal.png"},
  oldPickaxeBlade: { 
    name: "Старе лезо кірки", src:"src/res/OldPickaxeBlade.png" },
  ironPart: { 
    name: "Частина залізної руди", src:"src/res/IronPart.png" },
  goldPart: { 
    name: "Частина золотої руди", src:"src/res/GoldPart.png" },
  goldShard: { 
    name: "Золоті осколки", src:"src/res/GoldShard.png" },
  citrine: { 
    name: "Кусочок цитрину", src:"src/res/Citrine.png" },
  citrineCrystal: { 
    name: "Цитриновий самоцвіт", src:"src/res/CitrineCrystal.png" },
  hand: { 
    name: "Рука", src:"src/res/Hand.png",
    pickaxe: {
      desc: "Неперевершений інструмент. Не потребує крафту. Не потребує ремонту. Просто бий. Вона у тебе вже є — користай з розумом, воїн.",
      value: 0.4,
      maxdurability: Infinity,
      durability: Infinity,
      power: 0
    }
  },
  stonePickaxe: { 
    name: "Кам'яна кірка", src:"src/res/StonePickaxe.png",
    pickaxe: {
      desc: "Після руки — це як мерс після велосипеда. Не ідеал, але вже не соромно.",
      value: 8.7,
      maxdurability: 60,
      durability: 60,
      power: 2
    }
  },
};

export const Mines = [
  {name: 'Стандартна шахта', bgColor:'#1f1716',
    ores: [
      {
        name: 'Камень',
        chance: 53,
        health: 20,
        powerToDestr: 1,
        rarity: 'Default',
        src: 'src/ores/Stone.png',
        drop: [
          {
            ...items.stonePart,
            chance: [
              {minCount: 2, maxCount: 4, dropChance: 100}
            ]
          },
          {
            ...items.oldPickaxeBlade,
            chance: [
              {minCount: 1, maxCount: 1, dropChance: 1.5}
            ]
          },
        ]
      },
      {
        name: 'Вугільна руда',
        chance: 25,
        health: 35,
        powerToDestr: 1,
        rarity: 'Default',
        src: 'src/ores/CoalOre.png',
        drop: [
          {
            ...items.coal,
            chance: [
              {minCount: 2, maxCount: 5, dropChance: 100}
            ]
          },
          {
            ...items.stonePart,
            chance: [
              {minCount: 1, maxCount: 2, dropChance: 60}
            ]
          },
        ]
      },
      {
        name: 'Залізна руда',
        chance: 15,
        health: 50,
        rarity: 'Default',
        powerToDestr: 1,
        src: 'src/ores/Iron.png',
        drop: [
          {
            ...items.ironPart,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 100}
            ],
          },
          {
            ...items.stonePart,
            chance: [
              {minCount: 1, maxCount: 2, dropChance: 70}
            ]
          },
        ]
      },
      {
        name: 'Золота руда',
        chance: 5,
        health: 100,
        powerToDestr: 3,
        rarity: 'Rare',
        src: 'src/ores/GoldOre.png',
        drop: [
          {
            ...items.goldPart,
            chance: [
              {minCount: 1, maxCount: 2, dropChance: 100}
            ],
          },
          {
            ...items.goldShard,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 30}
            ],
          },
          {
            ...items.stonePart,
            chance: [
              {minCount: 1, maxCount: 2, dropChance: 70}
            ]
          },
        ]
      },
      {
        name: 'Цитринова руда',
        chance: 2,
        health: 220,
        powerToDestr: 5,
        rarity: 'Rare',
        src: 'src/ores/CitrineOre.png',
        drop: [
          {
            ...items.citrine,
            chance: [
              {minCount: 1, maxCount: 2, dropChance: 100}
            ],
          },
          {
            ...items.citrineCrystal,
            chance: [
              {minCount: 1, maxCount: 1, dropChance: 1}
            ],
          },
        ]
      },


    ]
  }
];


export const Crafts = [
  {
    id: "stoneBrick",
    ...items.stoneBrick,
    ingredients: [
      { ...items.stonePart, amount: 10, remove: true },
    ]
  },
  {
    id: "stoneHammer",
    ...items.stoneHammer,
    ingredients: [
      { ...items.stonePart, amount: 15, remove: true },
      { ...items.ironPart, amount: 5, remove: true },
      { ...items.stoneBrick, amount: 1, remove: true },
    ]
  },
  {
    id: "stonePickaxeHandle",
    ...items.stonePickaxeHandle,
    ingredients: [
      { ...items.stoneBrick, amount: 3, remove: true },
    ]
  },
  {
    id: "stonePickaxeBlade",
    ...items.stonePickaxeBlade,
    ingredients: [
      { ...items.stoneBrick, amount: 1, remove: true },
      { ...items.stonePart, amount: 15, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "stonePickaxe",
    ...items.stonePickaxe,
    ingredients: [
      { ...items.stonePickaxeHandle, amount: 1, remove: true },
      { ...items.stonePickaxeBlade, amount: 1, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
];
