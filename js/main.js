import * as data from './data.js';
import { inventory, pickaxes } from './data.js';
import {
  RenderDropList,
  updateInventory,
  RenderCrafts,
  updatePickaxesList,
} from './render.js';
import { RenderCurrPickaxe } from './game/pickaxes.js';
import { UpdateCraftListColors } from './game/craft.js';
import { RenderSells, RenderBuys } from './game/shop/shop.js';

const StoneImg = document.querySelector(".stone-img");
const OreName = document.querySelector(".ore-name");
const ProgressBar = document.getElementById("stoneProgress");
const ProgrsIndicate = document.querySelector(".progress-indicate");
const ShowPowerSpan = document.getElementById("powerToDestroySpan");
const SkipButton = document.querySelector(".skip-button");
const pickaxeContainer = document.getElementById("pickaxelabel");

const breakSound = new Audio('../src/sounds/pickaxe-break.mp3');
breakSound.load(); 

let canSkipOre = false;

export let CurrentOre = null; //Використовується для інших функцій яким потрібно знати точну руду. Наприклад генерація дропу
export const state = {
  CurrentPickaxe: structuredClone(data.items.stonePickaxe),
  CurrentRecipe: null,
};
let clicks = 0;


let lastDropList = [];
function noDropSet(){
  lastDropList = [];
  lastDropList.push({
    name: "nodrop",
  });
  RenderDropList(lastDropList);
}


//Міцність руди
let maxHealth = 20;
let health = maxHealth;
ProgressBar.max = maxHealth;
ProgressBar.value = health;
function updateProgress(){
  ProgrsIndicate.textContent = `${health.toFixed(1)}/${maxHealth}`;
  ProgressBar.max = maxHealth;
  ProgressBar.value = health;
}


//Змінні які колись будуть заімнені
let MineType = data.Mines[0].ores;
console.log("Тип шахти", MineType)


//КІНЕЦЬ НАЛАШТУВАНЬ -----------------------------------------



export function StoneClick(gendrop = true){
  if (!state.CurrentPickaxe || !state.CurrentPickaxe.pickaxe) {
    console.warn("Де твій існтрумент? 👋");
    pickaxeContainer.classList.add('noPickaxe')
    setTimeout(() => {  pickaxeContainer.classList.remove('noPickaxe');  }, 200);
    return;
  }

  health -= state.CurrentPickaxe.pickaxe.value;
  updateProgress();
  if (health <= 0) {
    if(state.CurrentPickaxe.pickaxe.power >= CurrentOre.powerToDestr){
      if(gendrop){
        OreDrop(CurrentOre);
      }
    }else{
      noDropSet();
    }
    GenerateOre();
  }
}


//1-ий етап в генерації руди (Розділено щоб не віднімати хп в кірки при скіпі)
function GenerateOre(){
  GenerateOreRNG();

  if(state.CurrentPickaxe){
    state.CurrentPickaxe.pickaxe.durability--;
    if(state.CurrentPickaxe.pickaxe.durability <= 0){
      breakSound.currentTime = 0; 
      breakSound.play();
      state.CurrentPickaxe = null;
      RenderCurrPickaxe();
    }
  }

  canSkipOre = true;
  SkipButton.classList.add('Skippable');
}

//Другий етап з пропуском віднімання
function GenerateOreRNG(){
  const random = Math.random() * 100;
  let sum = 0;
  
  for (let ore of MineType) {
    sum += ore.chance;
    if (random <= sum) {
      CurrentOre = ore;

      StoneImg.src = ore.src;
      OreName.textContent = ore.name
      ShowPowerSpan.textContent = ore.powerToDestr;
      ShowPowerSpan.classList.toggle(
        'candestroy',
        state.CurrentPickaxe?.pickaxe?.power >= ore.powerToDestr
      );

      maxHealth = ore.health;
      health = maxHealth;
      updateProgress();

      console.log("Інвентар:", inventory);
      break;
    }
  }
}



//Генерація дропа з руди -----------------------------------------------------------
function OreDrop(ore) {
  lastDropList = [];
  ore.drop?.forEach(drop => {
    drop.chance.forEach(chanceObj => {
      const randomRoll = Math.random() * 100;

      if (randomRoll <= chanceObj.dropChance) {
        const amount = getRandomInt(chanceObj.minCount, chanceObj.maxCount);

        // Чи є такий предмет в інвентарі
        const existing = inventory.find(item => item.name === drop.name);

        if (existing) {
          existing.amount += amount;
        } else {
          inventory.push({
            name: drop.name,
            src: drop.src,
            amount: amount
          });
        }

        lastDropList.push({
          name: drop.name,
          src: drop.src,
          amount: amount
        });
      }
    });
  });
  RenderDropList(lastDropList);
  updateInventory();
  UpdateCraftListColors(state.CurrentRecipe);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



//ПРОПУСТИТИ РУДУ
SkipButton.addEventListener("click", () => {
  if(canSkipOre){
    canSkipOre = false;
    SkipButton.classList.remove('Skippable');
    GenerateOreRNG();

    //Очистити ласт дроп якщо скіп
    noDropSet();
    
  }else{
    console.log('динаху');
  }
});


updateInventory();
GenerateOre();
RenderCrafts();
RenderCurrPickaxe();
updatePickaxesList();
RenderSells();
RenderBuys();