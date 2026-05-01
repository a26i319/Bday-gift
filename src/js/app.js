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

function clearLast() {
    entered = entered.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
  for (let i = 0; i < 4; i++) {
    const slot = document.getElementById('dot-' + i);
    if (i < entered.length) {
      slot.textContent = entered[i];
      slot.classList.add('filled', 'pop-anim');
      setTimeout(() => slot.classList.remove('pop-anim'), 250);
    } else {
      slot.textContent = '✱';
      slot.classList.remove('filled');
    }
  }
}

function checkPasscode() {
    const msg = document.getElementById('pc-msg');
    const nextBtn = document.getElementById('pc-next');
    if (entered === CORRECT) {
         if (msg) msg.textContent = '💖 Welcome!';
         // Show the NEXT button with a pop animation
    if (nextBtn) nextBtn.classList.add('visible');

    }else {
            if (msg) msg.textContent = '❌ Wrong passcode, try again!';
            const display = document.getElementById('passcode-display');
            display.classList.add('shake');
    setTimeout(() => {
      display.classList.remove('shake');
      entered = '';
      updateDisplay();
      if (msg) msg.textContent = '';
    }, 1400);
    }
}
// NAVIGATION
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  setTimeout(() => {
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    if (id === 'screen-miss') setupKissBackground();
    // Reset passcode state when going back to start
    if (id === 'screen-passcode') {
      entered = '';
      updateDisplay();
      const msg = document.getElementById('pc-msg');
      if (msg) msg.textContent = '';
      const nextBtn = document.getElementById('pc-next');
      if (nextBtn) nextBtn.classList.remove('visible');
    }
  }, 50);
}