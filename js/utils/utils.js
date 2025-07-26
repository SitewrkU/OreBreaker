import { StoneClick } from "../main.js";
const StoneImg = document.querySelector(".stone-img");
StoneImg.addEventListener("click", handleStoneInteraction);
let currentAnim;
let animToggle = false;
let keyPressed = false;


const breakSounds = [
  new Audio('src/sounds/stone-kick.mp3'),
  new Audio('src/sounds/stone-kick2.mp3'),
];
function playSound() {
  const sound = breakSounds[Math.floor(Math.random() * breakSounds.length)];
  sound.currentTime = 0;
  sound.play();
}

function handleStoneInteraction() {
  playSound();

  const nextAnim = animToggle ? 'break2' : 'break';
  animToggle = !animToggle;

  if (currentAnim) {
    StoneImg.classList.remove(currentAnim);
    void StoneImg.offsetWidth; 
  }
  StoneImg.classList.add(nextAnim);
  currentAnim = nextAnim;

  StoneClick();
}

StoneImg.addEventListener("animationend", () => {
  if (currentAnim) {
    StoneImg.classList.remove(currentAnim);
    currentAnim = '';
  }
});




const keys = {};
const used = {};

["KeyZ", "KeyX"].forEach(code => {
  keys[code] = false;
  used[code] = false;
});

document.addEventListener("keydown", (e) => {
  if ((e.code === "KeyZ" || e.code === "KeyX") && !used[e.code]) {
    keys[e.code] = true;
    used[e.code] = true;
    handleStoneInteraction();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyZ" || e.code === "KeyX") {
    keys[e.code] = false;
    used[e.code] = false;
  }
});



//scroller
document.querySelectorAll('.xScroller').forEach(el => {
  el.addEventListener('wheel', e => {
    if (e.deltaY) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, { passive: false });
});