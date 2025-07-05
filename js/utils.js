import { StoneClick } from "./main.js";
const StoneImg = document.querySelector(".stone-img");
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

StoneImg.addEventListener("click", handleStoneInteraction);

document.addEventListener("keydown", (event) => {
  if ((event.code === "KeyZ" || event.code === "KeyX") && !keyPressed) {
    keyPressed = true;
    handleStoneInteraction();
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyZ" || event.code === "KeyX") {
    keyPressed = false;
  }
});


StoneImg.addEventListener("animationend", () => {
  if (currentAnim) {
    StoneImg.classList.remove(currentAnim);
    currentAnim = '';
  }
});





//scroller
document.getElementById('crafts-list').addEventListener('wheel', e => {
  if (e.deltaY) {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  }
}, { passive: false });


window.addEventListener('load', function () {
    if (window.innerWidth < 635) {
      
      window.location.href = "pages/smallscreen.html";
    }
});