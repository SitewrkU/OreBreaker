import { dom } from '../utils/dom.js'
import * as data from '../data.js';
import { inventory, pickaxes } from '../data.js';
import { CurrentOre, state } from '../main.js';
import { updatePickaxesList } from '../render.js';
import { UpdateCraftListColors } from './craft.js';

export function RenderCurrPickaxe() {
  const pickaxeContainer = dom.pickaxeContainer;
  pickaxeContainer.innerHTML = '';
  if (state.CurrentPickaxe) {
    const el = document.createElement('div');
    el.className = 'curr-pickaxe';
    el.innerHTML = `
      <img src="${state.CurrentPickaxe.src}" alt="${state.CurrentPickaxe.name}">
    `;
    el.onclick = () => removeFromContainer();
    pickaxeContainer.appendChild(el);
  }
}



//Закинути кірку в основний слот
export function moveToContainer(index) {
  const ShowPowerSpan = dom.ShowPowerSpan;
  if (state.CurrentPickaxe) return; // зайнято!
  state.CurrentPickaxe = pickaxes.splice(index, 1)[0];
  updatePickaxesList();
  RenderCurrPickaxe();
  UpdateCraftListColors(state.CurrentRecipe);
  ShowPowerSpan.textContent = CurrentOre.powerToDestr;
  ShowPowerSpan.classList.toggle('candestroy', state.CurrentPickaxe.pickaxe.power >= CurrentOre.powerToDestr);
}

//Прибрати кірку з основ. слота
function removeFromContainer() {
  pickaxes.push(state.CurrentPickaxe);
  state.CurrentPickaxe = null;
  updatePickaxesList();
  RenderCurrPickaxe();
  UpdateCraftListColors(state.CurrentRecipe);
}


//пуш деф кірки в інвентарь(кірок), ну руки
pickaxes.push({
  name: data.items.hand.name,
  src: data.items.hand.src,
  pickaxe: structuredClone(data.items.hand.pickaxe),
  amount: 1
});

inventory.push({
  name: data.items.stonePart.name,
  src: data.items.stonePart.src,
  amount: 25
});

console.log("Кірки:", pickaxes)