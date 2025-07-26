import { dom } from '../../utils/dom.js'
import * as shopData from './shopdata.js'
import { inventory, pickaxes } from '../../data.js';
import { updateInventory, updatePickaxesList } from '../../render.js';

const sellSound = new Audio('../../src/sounds/shop/shop-sell.mp3');
const buySound = new Audio('../../src/sounds/shop/shop-buy.mp3');
let Coins = 0;

//Рендер предметів для продажу
export function RenderSells() {
  const container = dom.sellList;
  container.innerHTML = ''; 

  shopData.Sell.forEach(item => {
    const ItemEl = document.createElement('div');
    ItemEl.classList.add('sell-item');
    ItemEl.dataset.item = item.name;
    container.appendChild(ItemEl);

    const findResAmount = inventory.find(invitem => invitem.name === item.name);  
    const resAmount = findResAmount ? findResAmount.amount : 0;

    ItemEl.innerHTML = `   
      <div class="sell-item-info">
        <img src="${item.src}">
        <p>x${resAmount}</p>
        <p>+${item.price}$</p>
      </div>
      <button class="sell-button"><i class="icon-ok"></i></button>
    `;

    const sellbtn = ItemEl.querySelector('.sell-button');
    const match = inventory.find(invitem => invitem.name === item.name && invitem.amount > 0);    
    sellbtn.classList.toggle('cansell', !!match);
  });

  const sellItems = container.querySelectorAll(".sell-button");
  sellItems.forEach(card => {
    card.addEventListener("click", () => SellItem(card));
  });
}


export function SellItem(card){
  const coinsSpan = dom.coinsSpan;
  const sellEl = card.closest('.sell-item');
  let name = sellEl.dataset.item;

  const DataItem = shopData.Sell.find(el => el.name === name);
  const invItem = inventory.find(inv => inv.name === name && inv.amount > 0);
  if(!DataItem || !invItem){
    console.warn("Go Fuck Yourself – В тебе немає такого ресурсу в інветарі / немає такого продажу");
    return;
  }

  sellSound.currentTime = 0; 
  sellSound.play();
  invItem.amount--;
  Coins = +(Coins + DataItem.price).toFixed(2);
  coinsSpan.textContent = `${Coins}`;

  if (invItem.amount <= 0) {
    const index = inventory.indexOf(invItem);
    if (index > -1) inventory.splice(index, 1);
  }

  updateInventory();

}




//Рендер предметів для покупки
export function RenderBuys() {
  const container = dom.buyList;
  container.innerHTML = ''; 

  shopData.Buy.forEach(item => {
    const ItemEl = document.createElement('div');
    ItemEl.classList.add('buy-item');
    ItemEl.dataset.item = item.id;
    container.appendChild(ItemEl);

    ItemEl.innerHTML = ` 
      <p>${item.name}</p>  
      <img src="${item.src}">
      <p>x${item.buycount}</p>
      <p>-${item.price}$</p>
      <button class="buy-button">Придбати</button>
    `;
  });

  const sellItems = container.querySelectorAll(".buy-button");
  sellItems.forEach(card => {
    card.addEventListener("click", () => BuyItem(card));
  });
}


export function BuyItem(card){
  console.log(Coins);
  const coinsSpan = dom.coinsSpan;
  const buyEl = card.closest('.buy-item');
  let id = buyEl.dataset.item;

  const DataItem = shopData.Buy.find(el => el.id === id);

  if (!DataItem) {
    console.warn("Item not found in data");
    return;}

  if(Coins < DataItem.price){
    console.warn("No money😂 OR no item found in data")
    return;
  }

  Coins = +(Coins - DataItem.price).toFixed(2);
  coinsSpan.textContent = `${Coins}`;


  if(DataItem.pickaxe){
    pickaxes.push({
      name: DataItem.name,
      src: DataItem.src,
      pickaxe: structuredClone(DataItem.pickaxe),
      amount: 1
    });
  }else{
    const itemExist = inventory.find(item => item.name === DataItem.name); 
    if (itemExist) {
      itemExist.amount += DataItem.buycount;
    } else {
      inventory.push({
        name: DataItem.name,
        src: DataItem.src,
        amount: DataItem.buycount
      });
    }
  }

  buySound.currentTime = 0; 
  buySound.play();

  updateInventory();
  updatePickaxesList();
}
