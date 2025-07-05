import * as data from './data.js';
import { inventory, pickaxes } from './data.js';
const StoneImg = document.querySelector(".stone-img");
const OreName = document.querySelector(".ore-name");
const ProgressBar = document.getElementById("stoneProgress");
const ProgrsIndicate = document.querySelector(".progress-indicate");
const ShowPowerSpan = document.getElementById("powerToDestroySpan");
const SkipButton = document.querySelector(".skip-button");
const dropList = document.querySelector(".drop-list");

const craftWindow = document.getElementById("craft-window");
const craftTitle = document.getElementById("craft-title");
const craftRecipe = document.getElementById("craft-recipe");

const pickaxeContainer = document.getElementById("pickaxelabel");

let canSkipOre = false;

let CurrentOre = null; //Використовується для інших функцій яким потрібно знати точну руду. Наприклад генерація дропу
let CurrentRecipe = null; 
let CurrentPickaxe = structuredClone(data.items.stonePickaxe);
let clicks = 0;


let lastDropList = [];
function noDropSet(){
  lastDropList = [];
  lastDropList.push({
    name: "nodrop",
  });
  RenderDropList()
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
console.log(MineType)


//КІНЕЦЬ НАЛАШТУВАНЬ -----------------------------------------



export function StoneClick(gendrop = true){

  if (!CurrentPickaxe || !CurrentPickaxe.pickaxe) {
    console.warn("Де твій існтрумент? 👋");
    pickaxeContainer.classList.add('noPickaxe')
    setTimeout(() => {  pickaxeContainer.classList.remove('noPickaxe');  }, 200);
    return;
  }

  health -= CurrentPickaxe.pickaxe.value;
  updateProgress();
  if (health <= 0) {
    if(CurrentPickaxe.pickaxe.power >= CurrentOre.powerToDestr){
      if(gendrop){
        OreDrop(CurrentOre);
      }
    }else{
      noDropSet();
    }
    GenerateOre();
  }
}


//Генерація руди
function GenerateOre(){
  GenerateOreRNG(true);

  CurrentPickaxe.pickaxe.durability--;
  if(CurrentPickaxe.pickaxe.durability <= 0){
    CurrentPickaxe = null;
    RenderCurrPickaxe();
  }

  canSkipOre = true;
  SkipButton.classList.add('Skippable');
}

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
      ShowPowerSpan.classList.toggle('candestroy', CurrentPickaxe.pickaxe.power >= ore.powerToDestr);

      maxHealth = ore.health;
      health = maxHealth;
      updateProgress();

      console.log(inventory);
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
  RenderDropList();
  updateInventory();
  UpdateCraftListColors(CurrentRecipe);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}







//Рендери ------------------------------------------------------------------------------
//РЕНДЕР МИНУЛОГО ДРОПУ
function RenderDropList() {
  dropList.innerHTML = "";

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
//РЕНДЕР ІНВЕНТАРЯ 
function updateInventory() {
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
}
//Рендер Крафтів ---------------------------------------------------
function RenderCrafts() {
  const container = document.getElementById('crafts-list');
  container.innerHTML = ''; 

  data.Crafts.forEach(item => {
    const CraftEl = document.createElement('div');
    CraftEl.classList.add('craft-item');
    CraftEl.dataset.item = item.id;
    container.appendChild(CraftEl);

    CraftEl.innerHTML = `   
      <img src="${item.src}">
    `;
  });

  const craftItems = document.querySelectorAll(".craft-item");
  craftItems.forEach(card => {
    card.addEventListener("click", () => UseCraft(card));
  });
}
//РЕНДЕР СПИСКУ КІРОК 
function updatePickaxesList() {
    const inventoryElement = document.getElementById('pickaxeslist');
    inventoryElement.innerHTML = ''; 
    pickaxes.forEach((item, index) => {
        const PickaxeItem = document.createElement('div');
        PickaxeItem.classList.add('pickaxe-item');
        PickaxeItem.dataset.name = item.name;
        inventoryElement.appendChild(PickaxeItem);

        PickaxeItem.innerHTML = `   
            <img src="${item.src}">
            <div class="info">
              <p class="name">${item.name}</p>
              <p class="desc">${item.pickaxe.desc}</p>
              <p class="durability"><i class="icon-heart"></i>${item.pickaxe.durability}/${item.pickaxe.maxdurability}</p>
              <p class="value"><i class="icon-pickaxe"></i>${item.pickaxe.value}</p>
              <p class="power"><i class="icon-chart"></i>${item.pickaxe.power}</p>
            </div>
            
        `;

        PickaxeItem.onclick = () => moveToContainer(index);
    });
}






//ПРОПУСТИТИ РУДУ
SkipButton.addEventListener("click", () => {
  if(canSkipOre){
    canSkipOre = false;
    SkipButton.classList.remove('Skippable');
    GenerateOreRNG(false);

    //Очистити ласт дроп якщо скіп
    noDropSet();
    
  }else{
    console.log('динаху');
  }
});



//Показ крафту по натиску на карточку
function UseCraft(card){
  const craftBtn = document.getElementById('craft-button');
  const itemKey = card.dataset.item;
  const recipe = data.Crafts.find(craft => craft.id === itemKey);
  CurrentRecipe = recipe; //Збереження для інших функцій

  craftTitle.textContent = recipe.name;
  craftRecipe.innerHTML = '';

  recipe.ingredients.forEach(ing => {
    const p = document.createElement("p");

    const invItem = inventory.find(item => item.name === ing.name);
    if (!invItem || invItem.amount < ing.amount) {
      p.style.color = '#ce2e2e';
    }else{
      p.style.color = '#87ff77';  
    }

    p.textContent = `${ing.name} ×${ing.amount}`;
    
    craftRecipe.appendChild(p);
    const img = document.createElement("img");
    img.src = `${ing.src}`;
    p.appendChild(img);
  });

  craftWindow.classList.remove("hidden");
  craftBtn.onclick = () => Craft(recipe);
}



function UpdateCraftListColors(recipe) {
  const ingredientElements = craftRecipe.querySelectorAll('p');
  ingredientElements.forEach((p, index) => {
    const ing = recipe.ingredients[index];
    if (!ing) return; // безпечний гвард

    const invItem = inventory.find(item => item.name === ing.name);

    if (!invItem || invItem.amount < ing.amount) {
      p.style.color = '#ce2e2e';
    } else {
      p.style.color = '#87ff77';
    }
  });
}




//КРАФТ ПРЕДМЕТІВ ------------------------------------------------------
function Craft(recipe) {
  let success = true;

  // Перевірка чи є всі інгредієнти
  for (const ing of recipe.ingredients) {
    const invItem = inventory.find(item => item.name === ing.name);

    if (!invItem || invItem.amount < ing.amount) {
      success = false;
      break;
    }
  }

  if (!success) {
    craftRecipe.classList.remove('Err');
    void craftRecipe.offsetWidth; 
    craftRecipe.classList.add('Err');
    setTimeout(() => {  craftRecipe.classList.remove('Err');  }, 200);
    return;
  }

  // Віднімання інгредієнтів
  for (const ing of recipe.ingredients) {
    const invItem = inventory.find(item => item.name === ing.name);
    if(ing.remove){
      invItem.amount -= ing.amount;
    }
    if (invItem.amount <= 0) {
      const index = inventory.indexOf(invItem);
      if (index > -1) inventory.splice(index, 1);
    }
  }

  // Додання до інвентаря предмету
  if(recipe.pickaxe){
    pickaxes.push({
      name: recipe.name,
      src: recipe.src,
      pickaxe: JSON.parse(JSON.stringify(recipe.pickaxe)),
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
  UpdateCraftListColors(CurrentRecipe);
  updatePickaxesList();
}




//КІРКИ -------------------------------------------------------------------------------
function RenderCurrPickaxe() {
  pickaxeContainer.innerHTML = '';
  if (CurrentPickaxe) {
    const el = document.createElement('div');
    el.className = 'curr-pickaxe';
    el.innerHTML = `
      <img src="${CurrentPickaxe.src}" alt="${CurrentPickaxe.name}">
    `;
    el.onclick = () => removeFromContainer();
    pickaxeContainer.appendChild(el);
  }
}

//Закинути кірку в основний слот
function moveToContainer(index) {
  if (CurrentPickaxe) return; // зайнято!
  CurrentPickaxe = pickaxes.splice(index, 1)[0];
  updatePickaxesList();
  RenderCurrPickaxe();
  ShowPowerSpan.textContent = CurrentOre.powerToDestr;
  ShowPowerSpan.classList.toggle('candestroy', CurrentPickaxe.pickaxe.power >= CurrentOre.powerToDestr);
}

//Прибрати кірку з основ. слота
function removeFromContainer() {
  pickaxes.push(CurrentPickaxe);
  CurrentPickaxe = null;
  updatePickaxesList();
  RenderCurrPickaxe();
}


//пуш деф кірки в інвентарь(кірок), ну руки
pickaxes.push({
  name: data.items.hand.name,
  src: data.items.hand.src,
  pickaxe: data.items.hand.pickaxe,
  amount: 1
});

GenerateOre();
RenderCrafts();
RenderCurrPickaxe()
updatePickaxesList();