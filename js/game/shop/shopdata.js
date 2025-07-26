import { items } from "../../data.js";


export const Sell = [
  {
    ...items.stonePart,
    price: 0.01,
  },
  {
    ...items.coal,
    price: 0.02,
  },
  {
    ...items.nickelPart,
    price: 0.05,
  },
  {
    ...items.goldPart,
    price: 0.1,
  },
  {
    ...items.goldShard,
    price: 0.3,
  },
  {
    ...items.citrine,
    price: 2.5,
  },
  {
    ...items.nickelIngot,
    price: 0.4,
  },
];


export const Buy = [
  {
    id: 'rope',
    ...items.rope,
    price: 0.5,
    buycount: 6,
  },
  {
    id: 'furnaceHeaterComponent',
    ...items.furnaceHeaterComponent,
    price: 1.8,
    buycount: 1,
  },
  {
    id: 'clayForm',
    ...items.clayForm,
    price: 0.8,
    buycount: 1,
  },
]
