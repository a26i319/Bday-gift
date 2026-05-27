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
    if (id === 'screen-gifts') startGiftsScreen();
    if (id === 'screen-photo-gallery') initPhotoGallery();
    if (id === 'screen-letter') initLetterHearts();
    if (id === 'screen-disclaimer') initDisclaimerScreen();
    if (id === 'screen-video') setupVideoScreen();
    if (id === 'screen-qa') { initQA(); initQASparkles(); }
    if (id === 'screen-date-picker') { initDatePicker(); initDPHearts(); }
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

function initPhotoGallery() {
  // Initialize gallery frame click handlers
  document.querySelectorAll('.collage-frame').forEach((frame, i) => {
    frame.removeEventListener('click', handleFrameClick);
    frame.addEventListener('click', handleFrameClick);
  });
}

function handleFrameClick(e) {
  const index = parseInt(e.currentTarget.dataset.index);
  openPhotoModal(index);
}



// MUSIC CONTROL
let musicPlaying = false;
const audio = document.getElementById('bg-music');
audio.volume = 0.25;

function toggleMusic() {
  if (musicPlaying) {
    audio.pause();
    document.getElementById('music-btn').textContent = '🔇';
    musicPlaying = false;
  } else {
    audio.play().catch(() => showToast('Tap again to play music 🎵'));
    document.getElementById('music-btn').textContent = '🎵';
    musicPlaying = true;
  }
}

document.addEventListener('click', () => {
  if (!musicPlaying) {
    audio.play().then(() => {
      musicPlaying = true;
      document.getElementById('music-btn').textContent = '🎵';
    }).catch(() => {});
  }
}, { once: true });

let noCount = 0;
function clickNo(){
  noCount++;
  if (noCount === 1) {
    goTo('screen-dare');

  }else{
    noCount = 0;
    goTo('screen-superdare');
  }
}

// GIFTS
const giftMessages = [
  '🎂 Opening the cake room... make a wish!!',
  '📸 Gift 2: Opening our memory collage...',
  '🌟 Gift 3: A promise to always make you smile, no matter what 🌟'
];

let visitedGifts = new Set();

function openGift(idx) {
  const box = document.getElementById('box-' + idx);
  if (box.classList.contains('opened')) return;
  box.classList.add('opened');
  visitedGifts.add(idx);
  if (idx === 0) {
    setTimeout(() => goTo('screen-cake'), 400);
    return;
  }
  if (idx === 1) {
    setTimeout(() => goTo('screen-photo-gallery'), 600);
    return;
  }
  if (idx === 2) {
  setTimeout(() => goTo('screen-letter'), 400);
  return;
}
const reveal = document.getElementById('gift-reveal');
reveal.textContent = giftMessages[idx];
reveal.classList.add('visible');
}

function startGiftsScreen() {
  document.getElementById('gifts-title').textContent = '';
  const subtitle = document.getElementById('gifts-subtitle');
  subtitle.classList.remove('visible');
  const boxes = document.getElementById('gift-boxes');
  boxes.classList.remove('slide-up');
  const reveal = document.getElementById('gift-reveal');
  reveal.classList.remove('visible');
  document.querySelectorAll('.gift-box').forEach((b, idx) => {
    if (visitedGifts.has(idx)) {
      b.classList.add('opened');
    } else {
      b.classList.remove('opened');
    }
  });

  if (visitedGifts.size === 3) {
    setTimeout(() => {
      document.getElementById('gifts-next-btn').classList.add('visible');
    }, 300);
  } else {
    document.getElementById('gifts-next-btn').classList.remove('visible');
  }

  const title = '🎁 Gift for you';
  let i = 0;
  const titleEl = document.getElementById('gifts-title');
  titleEl.textContent = '';
  const typeInterval = setInterval(() => {
    titleEl.textContent += title[i];
    i++;
    if (i >= title.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        subtitle.textContent = 'click any gift to open 🎀';
        subtitle.classList.add('visible');
        setTimeout(() => boxes.classList.add('slide-up'), 300);
      }, 300);
    }
  }, 80);
}

// CAKE
let candlesBlown = false;

function startCakeScreen() {
  candlesBlown = false;
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown'));
  document.getElementById('blow-btn').classList.remove('hidden');
  document.getElementById('wish-msg').classList.remove('visible');
  document.getElementById('wish-msg').textContent = '';
  document.getElementById('btn-back-cake').classList.add('hidden');
  document.getElementById('confetti-container').innerHTML = '';

  // spawn stars
  const sc = document.getElementById('stars-container');
  sc.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.textContent = ['✨','⭐','💫','🌟'][Math.floor(Math.random()*4)];
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${1.5+Math.random()*2}s;
      --delay:${Math.random()*2}s;
      --size:${14+Math.random()*18}px;
    `;
    sc.appendChild(s);
  }
}

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  // blow each flame one by one
  const flames = document.querySelectorAll('.flame');
  flames.forEach((f, i) => {
    setTimeout(() => {
      f.classList.add('blown');
      spawnSmoke(f);
    }, i * 120);
  });

  // after all blown
  setTimeout(() => {
    document.getElementById('blow-btn').classList.add('hidden');
    const msg = document.getElementById('wish-msg');
    msg.textContent = '🎉 Happy Birthday Shoon!!! 🎂';
    msg.classList.add('visible');
    document.getElementById('btn-back-cake').classList.remove('hidden');
    launchConfetti();
  }, flames.length * 120 + 300);
}

function spawnSmoke(flameEl) {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const smoke = document.createElement('div');
      smoke.className = 'smoke';
      smoke.textContent = '💨';
      const rect = flameEl.getBoundingClientRect();
      smoke.style.cssText = `
        left:${rect.left + window.scrollX - 10}px;
        top:${rect.top + window.scrollY - 10}px;
        position:fixed;
        z-index:999;
      `;
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1500);
    }, i * 200);
  }
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#ff97b7','#ffd700','#5bb8f5','#ff6b6b','#a8e6cf','#ffb3c6','#fff'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dur:${1.5+Math.random()*2}s;
      --delay:${Math.random()*1}s;
      --drift:${(Math.random()-0.5)*200}px;
      --r:${Math.random()>0.5?'50%':'2px'};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*14}px;
    `;
    container.appendChild(c);
  }
}

// PHOTO GALLERY

const galleryPhotos = [
  { src: './src/img/photosession/gorgerous.jpg', cap: ' Gorgeousaurus' },
  { src: './src/img/photosession/honeypie.jpg', cap: 'Prettiest Innocent Girl' },
  { src: './src/img/photosession/smile.jpg', cap: 'Prettiest Smile That Ive Ever Seen' },
  { src: './src/img/photosession/cutie.jpg', cap: 'Cutiepie' },
  { src: './src/img/photosession/pretty-girl.jpg', cap: 'Beautiful Girl Of ALL times' },
  { src: './src/img/photosession/airport.jpg', cap: 'AIRPORT!!!!!' }
];

function openModal(idx) {
  const modal = document.getElementById('gallery-modal');
  document.getElementById('modal-img').src = galleryPhotos[idx].src;
  document.getElementById('modal-cap').textContent = galleryPhotos[idx].cap;
  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('gallery-modal').classList.remove('open');
}

function initPhotoGallery() {
  const layer = document.getElementById('sparkle-layer');
  if (!layer || layer.children.length > 0) return;
  const chars = ['✨','💕','🌸','⭐','💫'];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.textContent = chars[Math.floor(Math.random()*chars.length)];
    s.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${12+Math.random()*14}px;
      opacity:${0.15+Math.random()*0.25};
      animation: starTwinkle ${2+Math.random()*3}s ease-in-out infinite ${Math.random()*3}s;
      pointer-events:none;
    `;
    layer.appendChild(s);
  }
}

// LETTER
function initLetterHearts() {
  const bg = document.getElementById('letter-hearts');
  if (!bg || bg.children.length > 0) return;
  for (let i = 0; i < 20; i++) {
    const h = document.createElement('div');
    h.className = 'letter-heart-float';
    h.textContent = '₊˚⊹♡🎂';
    h.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${14+Math.random()*22}px;
      animation-duration:${3+Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
      opacity:${0.2+Math.random()*0.35};
    `;
    bg.appendChild(h);
  }
}

// DISCLAIMER
function initDisclaimerScreen() {
  const container = document.getElementById('disclaimer-hearts');
  if (!container || container.children.length > 0) return;

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -50px;
      animation-duration: ${3 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(heart);
  }
}

// VIDEO SCREEN
function setupVideoScreen() {
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const videoPlayer = document.getElementById('video-player');

  if (bgMusic) {
    bgMusic.pause();
    musicPlaying = false;
  }

  if (musicBtn) {
    musicBtn.style.display = 'none';
  }

  if (videoPlayer) {
    videoPlayer.onended = function() {
      goTo('screen-qa-intro');
    };
    videoPlayer.play();
  }
}

function toggleAnswersSummary() {
  const body = document.getElementById('dp-answers-body');
  const icon = document.getElementById('dp-toggle-icon');
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.classList.toggle('open', !isOpen);
  // populate on first open
  if (!isOpen) {
    const stored = JSON.parse(localStorage.getItem('shoon_answers') || '{}');
    const summary = document.getElementById('dp-answers-summary');
    if (summary && stored.answers) {
      summary.innerHTML = stored.answers
        .filter(a => a.answer !== '—' && !a.question.includes('big one'))
        .map(a => `<div class="dp-answer-row"><span>${a.question}</span><strong>${a.answer}</strong></div>`)
        .join('');
    }
  }
}

function initDPHearts() {
  const bg = document.getElementById('dp-bg-hearts');
  if (!bg || bg.children.length > 0) return;
  const emojis = ['💕','🌸','✨','💗','🎀'];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('div');
    h.className = 'dp-floating-heart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${16+Math.random()*20}px;
      --dur:${3+Math.random()*4}s;
      --delay:${Math.random()*4}s;
    `;
    bg.appendChild(h);
  }
}