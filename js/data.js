export const inventory = [];
export const pickaxes = [];

export const fitems = {
  oresdrop: {
    stonePart: { name: "Кусочок камня", src: "src/res/resources/StonePart.png" },
    coal: { name: "Вугілля", src:"src/res/resources/Coal.png"},
    ironPart: { name: "Частина залізної руди", src:"src/res/resources/IronPart.png" },
    oldPickaxeBlade: { name: "Старе лезо кірки", src:"src/res/tools/OldPickaxeBlade.png" },
    nickelPart: { name: "Частина нікельної руди", src:"src/res/resources/NickelPart.png" },
    goldPart: { name: "Частина золотої руди", src:"src/res/resources/GoldPart.png" },
    goldShard: { name: "Золоті осколки", src:"src/res/resources/GoldShard.png" },
    citrine: { name: "Кусочок цитрину", src:"src/res/resources/Citrine.png" },
    citrineCrystal: { name: "Цитриновий самоцвіт", src:"src/res/resources/CitrineCrystal.png" },
  },
  resources: {
    stoneBrick: { name: "Оброблена кам'яна пластина", src: "src/res/resources/StoneBrick.png"},
    fortifiedStoneBrick: { name: "Укріплена кам'яна пластина", src: "src/res/resources/FortifiedStoneBrick.png"},
    ironIngot: { name: "Залізний злиток", src:"src/res/resources/IronIngot.png" },
    nickelIngot: { name: "Нікельний злиток", src:"src/res/resources/NickelIngot.png" },
    goldIngot: { name: "Золотий злиток", src:"src/res/resources/GoldIngot.png" },
    rope: { name: "Мотузка", src:"src/res/resources/Rope.png" },
    furnaceHeaterComponent: { name: "Механізм нагрівання", src:"src/res/tools/FurnaceHeaterComponent.png" },
    clayForm: { name: "Глиняна форма", src:"src/res/resources/ClayForm.png" },
    pickaxeBladeClayForm: { name: "Глиняна форма [Лезо кірки]", src:"src/res/resources/PickaxeBladeClayForm.png" },
  },
  toolsres: {
    stonePickaxeHandle: { name: "Кам'яна ручка кірки", src: "src/res/tools/StonePickaxeHandle.png" },
    stonePickaxeBlade: { name: "Кам'яне лезо кірки", src: "src/res/tools/StonePickaxeBlade.png" },
    stoneHammer: { name: "Кам'яний молот", src: "src/res/tools/StoneHammer.png" },
    fortifiedStonePickaxeHandle: { name: "Укріплена кам'яна ручка кірки", src: "src/res/tools/FortifiedStonePickaxeHandle.png" },
    portableFurnace: { name: "Портативна плавильня", src:"src/res/tools/PortableFurnace.png" },
    sharpener: { name: "Точило", src:"src/res/tools/Sharpener.png" },
    accurateTool: { name: "Точний інструмент", src:"src/res/tools/AccurateTool.png" },
    ironPickaxeBlade: { name: "Залізне лезо кірки", src:"src/res/tools/IronPickaxeBlade.png" },
    enhancedPickaxeHandle: { name: "Підсилена ручка кірки", src:"src/res/tools/EnhancedPickaxeHandle.png" },
    goldenPickaxeTip: { name: "Золотий кінчик кірки", src:"src/res/tools/GoldenPickaxeTip.png" },
    nickelPickaxeTip: { name: "Нікельний кінчик кірки", src:"src/res/tools/NickelPickaxeTip.png" },

  },
  tools: {
    hand: { 
      name: "Рука", src:"src/res/tools/Hand.png",
      pickaxe: {
        desc: "Неперевершений інструмент. Не потребує крафту. Не потребує ремонту. Просто бий. Вона у тебе вже є — користай з розумом, воїн.",
        value: 0.5,
        maxdurability: Infinity,
        durability: Infinity,
        power: 0
      }
    },
    fortifiedHand: { 
      name: "Укріплена Рука", src:"src/res/tools/FortifiedHand.png",
      pickaxe: {
        desc: "Кам’яний 'привіт'. Після нього мало хто відповість.",
        value: 0.7,
        maxdurability: Infinity,
        durability: Infinity,
        power: 1
      }
    },
    stonePickaxe: { 
      name: "Кам'яна кірка", src:"src/res/tools/StonePickaxe.png",
      pickaxe: {
        desc: "Після руки — це як мерс після велосипеда. Не ідеал, але вже не соромно.",
        value: 1.4,
        maxdurability: 60,
        durability: 60,
        power: 2
      }
    },
    oldPickaxe: { 
      name: "Стара кірка", src:"src/res/tools/OldPickaxe.png",
      pickaxe: {
        desc: "Колись ця кірка слугувала досвідченому шахтарю. Тепер вона — лише бліда тінь своїх кращих часів.",
        value: 2,
        maxdurability: 95,
        durability: 95,
        power: 2
      }
    },
    ironPickaxe: { 
      name: "Залізна кірка", src:"src/res/tools/IronPickaxe.png",
      pickaxe: {
        desc: "Не просто залізна, а залізна з характером – копай, як бос!",
        value: 3.2,
        maxdurability: 120,
        durability: 120,
        power: 3
      }
    },
    ironPickaxeGTip: { 
      name: "Залізна кірка", src:"src/res/tools/IronPickaxeGTip.png",
      pickaxe: {
        desc: "Не просто залізна, а залізна з характером – копай, як бос!",
        value: 4,
        maxdurability: 120,
        durability: 110,
        power: 3
      }
    },
    ironPickaxeNTip: { 
      name: "Залізна кірка", src:"src/res/tools/IronPickaxeNTip.png",
      pickaxe: {
        desc: "Не просто залізна, а залізна з характером – копай, як бос!",
        value: 3.2,
        maxdurability: 175,
        durability: 165,
        power: 3
      }
    },
  },
}


export const items = {
  ...fitems.oresdrop,
  ...fitems.resources,
  ...fitems.toolsres,
  ...fitems.tools,
};




export const Mines = [
  {name: 'Стандартна шахта', bgColor:'#1f1716',
    ores: [
      {
        name: 'Камінь',
        chance: 40,
        health: 20,
        powerToDestr: 1,
        rarity: 'Default',
        src: 'src/ores/Stone.png',
        drop: [
          {
            ...items.stonePart,
            chance: [
              {minCount: 2, maxCount: 6, dropChance: 100}
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
        chance: 20,
        health: 35,
        powerToDestr: 1,
        rarity: 'Default',
        src: 'src/ores/CoalOre.png',
        drop: [
          {
            ...items.coal,
            chance: [
              {minCount: 3, maxCount: 7, dropChance: 100}
            ]
          },
          {
            ...items.stonePart,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 70}
            ]
          },
        ]
      },
      {
        name: 'Залізна руда',
        chance: 20,
        health: 50,
        rarity: 'Default',
        powerToDestr: 2,
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
              {minCount: 1, maxCount: 3, dropChance: 70}
            ]
          },
        ]
      },
      {
        name: 'Нікельна руда',
        chance: 10,
        health: 45,
        rarity: 'Default',
        powerToDestr: 2,
        src: 'src/ores/NickelOre.png',
        drop: [
          {
            ...items.nickelPart,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 100}
            ],
          },
          {
            ...items.stonePart,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 70}
            ]
          },
        ]
      },
      {
        name: 'Золота руда',
        chance: 8,
        health: 100,
        powerToDestr: 3,
        rarity: 'Rare',
        src: 'src/ores/GoldOre.png',
        drop: [
          {
            ...items.goldPart,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 100}
            ],
          },
          {
            ...items.goldShard,
            chance: [
              {minCount: 1, maxCount: 3, dropChance: 40}
            ],
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
    id: "sharpener",
    ...items.sharpener,
    ingredients: [
      { ...items.stoneBrick, amount: 3, remove: true },
      { ...items.fortifiedStoneBrick, amount: 1, remove: true },
      { ...items.ironPart, amount: 10, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "stonePickaxeHandle",
    ...items.stonePickaxeHandle,
    ingredients: [
      { ...items.stoneBrick, amount: 3, remove: true },
      { ...items.ironPart, amount: 3, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "fortifiedStonePickaxeHandle",
    ...items.fortifiedStonePickaxeHandle,
    ingredients: [
      { ...items.nickelPart, amount: 8, remove: true },
      { ...items.stonePickaxeHandle, amount: 1, remove: true },
      { ...items.stoneBrick, amount: 2, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
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
      { ...items.stonePickaxeBlade, amount: 1, remove: true },
      { ...items.stonePickaxeHandle, amount: 1, remove: true },
      { ...items.rope, amount: 3, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "oldPickaxe",
    ...items.oldPickaxe,
    ingredients: [
      { ...items.stonePart, amount: 3, remove: true },
      { ...items.fortifiedStonePickaxeHandle, amount: 1, remove: true },
      { ...items.oldPickaxeBlade, amount: 1, remove: true },
      { ...items.rope, amount: 3, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "fortifiedHand",
    ...items.fortifiedHand,
    ingredients: [
      { ...items.hand, amount: 1, remove: true },
      { ...items.stoneBrick, amount: 5, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "portableFurnace",
    ...items.portableFurnace,
    ingredients: [
      { ...items.stoneBrick, amount: 8, remove: true },
      { ...items.fortifiedStoneBrick, amount: 3, remove: true },
      { ...items.furnaceHeaterComponent, amount: 1, remove: true },
      { ...items.coal, amount: 35, remove: true },
      { ...items.ironPart, amount: 10, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "ironIngot",
    ...items.ironIngot,
    ingredients: [
      { ...items.ironPart, amount: 5, remove: true },
      { ...items.coal, amount: 2, remove: true },
      { ...items.portableFurnace, amount: 1, remove: false },
    ]
  },
  {
    id: "nickelIngot",
    ...items.nickelIngot,
    ingredients: [
      { ...items.nickelPart, amount: 5, remove: true },
      { ...items.coal, amount: 2, remove: true },
      { ...items.portableFurnace, amount: 1, remove: false },
    ]
  },
  {
    id: "goldIngot",
    ...items.goldIngot,
    ingredients: [
      { ...items.goldPart, amount: 5, remove: true },
      { ...items.coal, amount: 2, remove: true },
      { ...items.portableFurnace, amount: 1, remove: false },
    ]
  },
  {
    id: "accurateTool",
    ...items.accurateTool,
    ingredients: [
      { ...items.ironIngot, amount: 2, remove: true },
      { ...items.fortifiedStoneBrick, amount: 1, remove: true },
      { ...items.sharpener, amount: 1, remove: false },
      { ...items.stoneHammer, amount: 1, remove: false },
      { ...items.portableFurnace, amount: 1, remove: false },
    ]
  },
  {
    id: "pickaxeBladeClayForm",
    ...items.pickaxeBladeClayForm,
    ingredients: [
      { ...items.stonePickaxeBlade, amount: 1, remove: true },
      { ...items.clayForm, amount: 1, remove: true },
    ]
  },
  {
    id: "ironPickaxeBlade",
    ...items.ironPickaxeBlade,
    ingredients: [
      { ...items.pickaxeBladeClayForm, amount: 1, remove: false },
      { ...items.ironIngot, amount: 5, remove: true },
      { ...items.sharpener, amount: 1, remove: false },
      { ...items.portableFurnace, amount: 1, remove: false },
    ]
  },
  {
    id: "enhancedPickaxeHandle",
    ...items.enhancedPickaxeHandle,
    ingredients: [
      { ...items.fortifiedStonePickaxeHandle, amount: 1, remove: true },
      { ...items.ironIngot, amount: 2, remove: true },
      { ...items.nickelIngot, amount: 1, remove: true },
      { ...items.fortifiedStoneBrick, amount: 2, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "ironPickaxe",
    ...items.ironPickaxe,
    ingredients: [
      { ...items.ironPickaxeBlade, amount: 1, remove: true },
      { ...items.enhancedPickaxeHandle, amount: 1, remove: true },
      { ...items.stoneHammer, amount: 1, remove: false },
    ]
  },
  {
    id: "goldenPickaxeTip",
    ...items.goldenPickaxeTip,
    ingredients: [
      { ...items.goldIngot, amount: 2, remove: true },
      { ...items.goldShard, amount: 1, remove: true },
      { ...items.accurateTool, amount: 1, remove: false },
    ]
  },
  {
    id: "nickelPickaxeTip",
    ...items.nickelPickaxeTip,
    ingredients: [
      { ...items.nickelIngot, amount: 3, remove: true },
      { ...items.fortifiedStoneBrick, amount: 1, remove: true },
      { ...items.accurateTool, amount: 1, remove: false },
    ]
  },
];


export const altCraftsArr = [
  {
    parentId: "ironPickaxe",
    altcrafts: [
    {
      id: "ironPickaxeGTip",
      ...items.ironPickaxeGTip,
      ingredients: [
        { ...items.goldenPickaxeTip, amount: 1, remove: true },
        { ...items.ironPickaxe, amount: 1, remove: true },
        { ...items.ironIngot, amount: 2, remove: true },
      ]
    },
    {
      id: "ironPickaxeNTip",
      ...items.ironPickaxeNTip,
      ingredients: [
        { ...items.nickelPickaxeTip, amount: 1, remove: true },
        { ...items.ironPickaxe, amount: 1, remove: true },
        { ...items.ironIngot, amount: 2, remove: true },
      ]
    },
    ]
  },
  {
    parentId: "stoneBrick",
    altcrafts: [
    {
      id: "fortifiedStoneBrick",
      ...items.fortifiedStoneBrick,
      ingredients: [
        { ...items.stoneBrick, amount: 3, remove: true },
        { ...items.ironPart, amount: 5, remove: true },
        { ...items.stoneHammer, amount: 1, remove: false },
      ]
    },
    ]
  },
]