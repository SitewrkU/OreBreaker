import { dom } from '../utils/dom.js'
import * as data from '../data.js';
import { inventory, pickaxes } from '../data.js';
import {
  updateInventory,
  updatePickaxesList,
} from '../render.js';
import { state } from '../main.js';

export function UseCraft(card, isAlt = false){
  const craftWindow = dom.craftWindow;
  const craftRecipe = dom.craftRecipe;
  const craftTitle = document.getElementById("craft-title");
  const craftBtn = document.getElementById('craft-button');

  const itemKey = card.dataset.item;
  const recipe = isAlt
    ? findInAltCrafts(itemKey)
    : data.Crafts.find(craft => craft.id === itemKey);
  if (!recipe) {
    console.warn("Рецепт не знайдено:", itemKey);
    return;
  }

  state.CurrentRecipe = recipe;
  craftTitle.textContent = recipe.name;
  craftRecipe.innerHTML = '';

  recipe.ingredients.forEach(ing => {
    const p = document.createElement("p");
    const img = document.createElement("img");
    img.src = `${ing.src}`;

    if(ing.remove == false){
      p.innerHTML = `<i class="icon-wrench"></i> ${ing.name} ×${ing.amount}`;
    }else{
      p.textContent = `${ing.name} ×${ing.amount}`;
    }

    craftRecipe.appendChild(p);
    p.appendChild(img);
  });

  //Інформація про кірки
  if(recipe.pickaxe){
    RenderPickaxeInfo(recipe.pickaxe);
  }else{
    dom.craftPickaxeWindow.style.display = "none";
  }

  //Додаткові крафти до основного
  if(!isAlt){
    const findAltCrafts = data.altCraftsArr.find(alt => alt.parentId === state.CurrentRecipe.id);
    if(findAltCrafts){ 
      console.log(`Додаткові крафти до ${state.CurrentRecipe.name}:`, findAltCrafts.altcrafts);
      RenderALTCrafts(findAltCrafts.altcrafts);
    }else{
      dom.altCraftList.style.display = "none";
    }
  }

  craftWindow.classList.remove("hidden");
  craftBtn.onclick = () => Craft(recipe);
  UpdateCraftListColors(recipe);
}




//UTILS -------------------------------------------------------
export function RenderALTCrafts(altcrafts) {
  const container = dom.altCraftList;
  container.style.display = 'flex';
  container.innerHTML = ''; 

  altcrafts.forEach(item => {
    const CraftEl = document.createElement('div');
    CraftEl.classList.add('altcraft-item');
    CraftEl.dataset.item = item.id;
    container.appendChild(CraftEl);

    CraftEl.innerHTML = `   
      <img src="${item.src}">
    `;
  });

  const altcraftItems = container.querySelectorAll(".altcraft-item");
  altcraftItems.forEach(card => {
    card.addEventListener("click", () => UseCraft(card, true));
  });
}


function findInAltCrafts(itemId) {
  for (const group of data.altCraftsArr) {
    const found = group.altcrafts.find(alt => alt.id === itemId);
    if (found) return found;
  }
  return null;
}


function RenderPickaxeInfo(pickaxeInfo){
  const Container = dom.craftPickaxeWindow;
  Container.classList.remove("hidden");
  Container.style.display = "flex";

  Container.innerHTML = `
    <p><i class="icon-heart"></i>${pickaxeInfo.maxdurability}</p>
    <p><i class="icon-pickaxe"></i>${pickaxeInfo.value}</p>
    <p><i class="icon-chart"></i>${pickaxeInfo.power}</p>
  `;
}


export function UpdateCraftListColors(recipe) {
  const craftRecipe = dom.craftRecipe;
  const ingredientElements = craftRecipe.querySelectorAll('p');

  ingredientElements.forEach((p, index) => {
    const ing = recipe.ingredients[index];
    if (!ing) return; // фрі гвард

    const invAmount = inventory.find(item => item.name === ing.name)?.amount || 0;

    let pickaxeAmount = 0;

    // Якщо кірка перевірка на міцність
    if (ing.pickaxe) {
      pickaxeAmount = pickaxes.filter(pick => {
        return pick.name === ing.name &&
               pick.pickaxe &&
               pick.pickaxe.durability >= pick.pickaxe.maxdurability / 2;
      }).length;
    } else {
      pickaxeAmount = pickaxes.filter(pick => pick.name === ing.name).length;
    }
    const totalAmount = invAmount + pickaxeAmount;

    if(totalAmount >= ing.amount){
      p.style.color = '#48d335ff';
    }else{
      p.style.color = '#7a3636ff';
    }
  });
}




//КРАФТ ПРЕДМЕТІВ ------------------------------------------------------
export function Craft(recipe) {
  const craftWindow = dom.craftWindow;
  const craftRecipe = dom.craftRecipe;
  let success = true;
  const itemsToRemove = [];

  // Перевірка чи є всі інгредієнти
  for (const ing of recipe.ingredients) {
    const invItem = inventory.find(item => item.name === ing.name);
    const pickItem = pickaxes.find(pick => pick.name === ing.name);

    let isPickaxeValid = true;
    if (ing.pickaxe && pickItem) {
      const p = pickItem.pickaxe;
      if (!p || p.durability < p.maxdurability / 2) {
        isPickaxeValid = false;
        console.warn("Yeban, v tebe kirka govno!!");
        
      }
    }

    const totalAmount = (invItem?.amount || 0) + ((pickItem && isPickaxeValid) ? 1 : 0);
    if (totalAmount < ing.amount) {
      success = false;
      break;
    }
    itemsToRemove.push({ ing, invItem, pickItem });
  }


  if (!success) {
    craftRecipe.classList.remove('Err');
    void craftRecipe.offsetWidth; 
    craftRecipe.classList.add('Err');
    setTimeout(() => {  craftRecipe.classList.remove('Err');  }, 200);
    return;
  }

  // Віднімання інгредієнтів
  for (const { ing, invItem, pickItem } of itemsToRemove) {
    if (!ing.remove) continue;
    let toRemove = ing.amount;

    // З inventory
    if (invItem) {
      const removeAmount = Math.min(invItem.amount, toRemove);
      invItem.amount -= removeAmount;
      toRemove -= removeAmount;

      if (invItem.amount <= 0) {
        const index = inventory.indexOf(invItem);
        if (index > -1) inventory.splice(index, 1);
      }
    }

    // З pickaxes
    if (toRemove > 0 && pickItem) {
      const index = pickaxes.indexOf(pickItem);
      if (index > -1) pickaxes.splice(index, 1);
    }
  }

  // Додання до інвентаря предмету
  if(recipe.pickaxe){
    pickaxes.push({
      name: recipe.name,
      src: recipe.src,
      pickaxe: structuredClone(recipe.pickaxe),
      amount: 1
    });
  }else{
    const itemExist = inventory.find(item => item.name === recipe.name); //Перевірка чи такий предемет вже є, якщо так то додоти до нього
    if (itemExist) {
      itemExist.amount++;
    } else {
      inventory.push({
        name: recipe.name,
        src: recipe.src,
        amount: 1
      });
    }
  }

  craftWindow.classList.remove('Good');
  void craftWindow.offsetWidth; 
  craftWindow.classList.add('Good');
  setTimeout(() => {  craftWindow.classList.remove('Good');  }, 200);
  
  updateInventory();
  UpdateCraftListColors(state.CurrentRecipe);
  updatePickaxesList();
}
