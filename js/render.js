import { dom } from './utils/dom.js'
import * as data from './data.js';
import { inventory, pickaxes } from './data.js';
import { UpdateCraftListColors, UseCraft } from './game/craft.js';
import { moveToContainer } from './game/pickaxes.js';
import { RenderSells } from './game/shop/shop.js';
import { state } from './main.js';


//РЕНДЕР ІНВЕНТАРЯ 
export function updateInventory() {
  const inventoryElement = document.querySelector('.inventory');
  inventoryElement.innerHTML = ''; 

  inventory.forEach(item => {
    const OreItem = document.createElement('div');
    OreItem.classList.add('inventory-item');
    OreItem.dataset.name = item.name;
    inventoryElement.appendChild(OreItem);

    OreItem.innerHTML = `   
        <img src="${item.src}">
        <p class="item-amount">${item.amount}</p>
    `;
  });
  RenderSells();
  UpdateCraftListColors(state.CurrentRecipe);
}


//РЕНДЕР МИНУЛОГО ДРОПУ
export function RenderDropList(lastDropList) {
  const dropList = dom.dropList;
  dropList.innerHTML = '';

  if(lastDropList[0].name === "nodrop"){
    dropList.innerHTML += `<p>\\(o_o)/ [Нічого не знайдено]</p>`
    return;
  }

  lastDropList.forEach(drop => {
    dropList.innerHTML += `
      <div class="drop-item">
        <img src="${drop.src}" width="20" height="20">
        <p>x${drop.amount} ${drop.name}</p> 
      </div>
    `;
  });
}


//Рендер Крафтів 
export function RenderCrafts() {
  const container = dom.craftList;
  container.innerHTML = ''; 

  data.Crafts.forEach(item => {
    const CraftEl = document.createElement('div');
    CraftEl.classList.add('craft-item');
    CraftEl.dataset.item = item.id;
    container.appendChild(CraftEl);

    CraftEl.innerHTML = `   
      <img src="${item.src}">
    `;

    const findAltCrafts = data.altCraftsArr.find(alt => alt.parentId === item.id);
    if(findAltCrafts){
      CraftEl.innerHTML += `<p class="altcrafts-count">+${findAltCrafts.altcrafts.length}</p>`
    }
  });

  const craftItems = container.querySelectorAll(".craft-item");
  craftItems.forEach(card => {
    card.addEventListener("click", () => UseCraft(card));
  });
}


export function updatePickaxesList() {
    const inventoryElement = document.getElementById('pickaxeslist');
    inventoryElement.innerHTML = ''; 
    pickaxes.forEach((item, index) => {
        const PickaxeItem = document.createElement('div');
        PickaxeItem.classList.add('pickaxe-item');
        PickaxeItem.dataset.name = item.name;
        inventoryElement.appendChild(PickaxeItem);

        const pickaxeHpPerc = getPercent(item);

        PickaxeItem.innerHTML = `   
            <img src="${item.src}">
            <div class="info">
              <p class="name">${item.name}</p>
              <p class="desc">${item.pickaxe.desc}</p>
              <p class="durability"><i class="icon-heart"></i>${item.pickaxe.durability}/${item.pickaxe.maxdurability} (${pickaxeHpPerc.toFixed(0)}%)</p>
              <p class="value"><i class="icon-pickaxe"></i>${item.pickaxe.value}</p>
              <p class="power"><i class="icon-chart"></i>${item.pickaxe.power}</p>
            </div>  
        `;

        if(pickaxeHpPerc < 50){
          PickaxeItem.querySelector('.durability').style.color = '#dfa59bff';
        }


        PickaxeItem.onclick = () => moveToContainer(index);
    });
}

function getPercent(item) {
  let part = item.pickaxe.durability;
  let total = item.pickaxe.maxdurability;
  if (!isFinite(part) && !isFinite(total)) {
    return 100;
  }
  if (total === 0) return 0;
  return (part / total) * 100;
}
