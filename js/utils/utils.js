import { StoneClick } from "../main.js";
const StoneImg = document.querySelector(".stone-img");
StoneImg.addEventListener("click", handleStoneInteraction);
const fsbtn = document.getElementById('fullscreen-btn');
let currentAnim;
let animToggle = false;

//Звуки ---
const breakSounds = [
  new Audio('src/sounds/stone-kick.mp3'),
  new Audio('src/sounds/stone-kick2.mp3'),
];
function playSound() {
  const sound = breakSounds[Math.floor(Math.random() * breakSounds.length)];
  sound.currentTime = 0;
  sound.play();
}

//Натиск на руду --
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


//Хоткеї для руди на Z та X
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



//scroller --
document.querySelectorAll('.xScroller').forEach(el => {
  el.addEventListener('wheel', e => {
    if (e.deltaY) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, { passive: false });
});



//Фулскрін режим --
fsbtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Помилка при вході в повноекранний режим: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});