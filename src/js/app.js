// BUBBLES====
(function initBubbles() {
  const bc = document.getElementById('bubbles');
  if (!bc) return;
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 20 + Math.random() * 60;
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${10 + Math.random()*16}s;
      animation-delay:${Math.random()*12}s;
    `;
    bc.appendChild(b);
  }
})();

const CORRECT = '2004';
let entered = '';

function pressKey(k) {
  if (entered.length >= 4) return;
  entered += k;
  updateDisplay();
  if (entered.length === 4) {
    setTimeout(() => checkPasscode(), 350);
  }
}
