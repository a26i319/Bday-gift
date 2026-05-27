// ===== Q&A MODULE =====
// Mix of multiple choice + type-in
// After each answer: a "me too!" fun fact slides in
// Question 10 transitions into asking her out

const questions = [
  {
    id: 0,
    type: 'choice',
    emoji: '🎨',
    question: "What's your favorite color?",
    choices: ['Pink 💗', 'Blue 💙', 'Purple 💜', 'Yellow 💛'],
    funFact: "Mine is blue 💙 — maybe that's why I like you so much lol"
  },
  {
    id: 1,
    type: 'choice',
    emoji: '🌙',
    question: 'Are you a morning person or night owl?',
    choices: ['Early Bird 🌅', 'Night Owl 🦉', 'Depends on the day 😴', 'I literally never sleep 👀'],
    funFact: "I'm a night owl too 🦉 — best conversations happen past midnight ngl"
  },
  {
    id: 2,
    type: 'type',
    emoji: '🍜',
    question: 'What\'s your go-to comfort food when you\'re having a bad day?',
    placeholder: 'Type your answer here...',
    funFact: "Mine is ramen 🍜 — simple, warm, never disappoints. kinda like a good person 👀"
  },
  {
    id: 3,
    type: 'choice',
    emoji: '🎬',
    question: 'Pick a movie genre for movie night!',
    choices: ['Romance 💕', 'Comedy 😂', 'Horror 👻', 'Animation 🎞️'],
    funFact: "I'd pick romance or comedy 😄 — life's too short for sad movies... unless we're watching together 👀"
  },
  {
    id: 4,
    type: 'choice',
    emoji: '✈️',
    question: 'Dream travel destination?',
    choices: ['Paris 🗼', 'Tokyo 🗾', 'Maldives 🏝️', 'New York 🗽'],
    funFact: "Tokyo is my dream too 🗾 — imagine exploring it together though 👀✨"
  },
  {
    id: 5,
    type: 'type',
    emoji: '💬',
    question: 'What\'s one thing that always makes you smile no matter what?',
    placeholder: 'Tell me...',
    funFact: "For me it's random good morning texts from someone I care about 💙 small things hit different"
  },
  {
    id: 6,
    type: 'choice',
    emoji: '💫',
    question: 'Your love language?',
    choices: ['Quality Time ⏰', 'Words of Affirmation 💌', 'Acts of Service 🤝', 'Physical Touch 🤗'],
    funFact: "Mine is quality time ⏰ — I just love being around people I genuinely like. no phones, just vibes 💙"
  },
  {
    id: 7,
    type: 'choice',
    emoji: '🌸',
    question: 'On a perfect day off, you would be...',
    choices: ['Out exploring somewhere 🗺️', 'Home, cozy & doing nothing 🛋️', 'With friends having fun 🎉', 'Somewhere quiet in nature 🌿'],
    funFact: "I'd be home being cozy OR out exploring — depends who I'm with honestly 😌"
  },
  {
    id: 8,
    type: 'type',
    emoji: '🤔',
    question: "Okay real talk — what's your honest first impression of me? 👀",
    placeholder: "Be honest, I can take it 😅",
    funFact: "My first impression of you? Genuinely thought you were really cool. Still do. Maybe even more now 💙"
  },
  {
    id: 9,
    type: 'askout',
    emoji: '💌',
    question: "Last question... and it's a big one 👀",
    funFact: ''
  }
];

let currentQuestion = 0;
let answers = [];

// ===== INIT =====
function initQA() {
  currentQuestion = 0;
  answers = [];
  renderQuestion();
}

// ===== RENDER =====
function renderQuestion() {
  const container = document.getElementById('qa-card-container');
  const nav = document.getElementById('qa-nav-row');
  const q = questions[currentQuestion];

  updateProgress();

  // Hide nav for special types
  if (nav) {
    nav.style.display = (q.type === 'askout') ? 'none' : 'flex';
  }

  let inputHTML = '';

  if (q.type === 'choice') {
    inputHTML = `<div class="qa-choices">`;
    q.choices.forEach((choice, i) => {
      const sel = answers[currentQuestion] === choice ? ' selected' : '';
      inputHTML += `<button class="qa-choice${sel}" onclick="selectChoice('${escStr(choice)}')">${choice}</button>`;
    });
    inputHTML += `</div>`;

  } else if (q.type === 'type') {
    const saved = answers[currentQuestion] || '';
    inputHTML = `
      <div class="qa-type-wrap">
        <textarea
          class="qa-textarea"
          id="qa-textarea"
          placeholder="${q.placeholder}"
          maxlength="200"
          oninput="onTypeInput(this)"
        >${saved}</textarea>
        <div class="qa-char-count" id="qa-char-count">${saved.length}/200</div>
        <button class="qa-submit-btn" id="qa-submit-btn" onclick="submitTyped()" ${saved ? '' : 'disabled'}>
          Submit ✓
        </button>
      </div>
    `;

  } else if (q.type === 'askout') {
    inputHTML = `
      <div class="askout-wrap" id="askout-wrap">
        <div class="askout-reveal" id="askout-reveal"></div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="qa-card" id="qa-card">
      <div class="qa-emoji">${q.emoji}</div>
      <div class="qa-question-number">Question ${currentQuestion + 1} of ${questions.length}</div>
      <div class="qa-question-text">${q.question}</div>
      ${inputHTML}
    </div>
    <div class="qa-funfact-bubble" id="qa-funfact" style="display:none;"></div>
  `;

  // Animate entrance
  requestAnimationFrame(() => {
    const card = document.getElementById('qa-card');
    if (card) card.classList.add('qa-card-enter');
  });

  updateNavButtons();

  // If askout, start the special sequence
  if (q.type === 'askout') {
    setTimeout(() => startAskOut(), 600);
  }

  // Re-show funfact if going back
  if (answers[currentQuestion] !== undefined && q.type !== 'askout') {
    setTimeout(() => showFunFact(currentQuestion), 400);
  }
}

// ===== MULTIPLE CHOICE =====
function selectChoice(choice) {
  answers[currentQuestion] = choice;
  document.querySelectorAll('.qa-choice').forEach(btn => {
    btn.classList.toggle('selected', btn.textContent.trim() === choice);
  });
  updateNavButtons();
  showFunFact(currentQuestion);
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) advanceQuestion();
  }, 1800);
}

// ===== TYPE INPUT =====
function onTypeInput(el) {
  const len = el.value.length;
  const countEl = document.getElementById('qa-char-count');
  const submitBtn = document.getElementById('qa-submit-btn');
  if (countEl) countEl.textContent = `${len}/200`;
  if (submitBtn) submitBtn.disabled = len === 0;
}

function submitTyped() {
  const ta = document.getElementById('qa-textarea');
  if (!ta || !ta.value.trim()) return;
  answers[currentQuestion] = ta.value.trim();
  ta.disabled = true;
  document.getElementById('qa-submit-btn').disabled = true;
  document.getElementById('qa-submit-btn').textContent = '✓ Saved!';
  showFunFact(currentQuestion);
  updateNavButtons();
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) advanceQuestion();
  }, 2000);
}

// ===== SHOW FUN FACT =====
function showFunFact(idx) {
  const q = questions[idx];
  if (!q.funFact) return;
  const bubble = document.getElementById('qa-funfact');
  if (!bubble) return;
  bubble.textContent = '💙 ' + q.funFact;
  bubble.style.display = 'block';
  requestAnimationFrame(() => bubble.classList.add('qa-funfact-show'));
}

// ===== ADVANCE =====
function advanceQuestion() {
  const card = document.getElementById('qa-card');
  const bubble = document.getElementById('qa-funfact');
  if (card) card.classList.add('qa-card-exit-left');
  if (bubble) bubble.classList.remove('qa-funfact-show');
  setTimeout(() => {
    currentQuestion++;
    renderQuestion();
  }, 320);
}

function nextQuestion() {
  if (currentQuestion >= questions.length - 1) return;
  if (answers[currentQuestion] === undefined) return;
  advanceQuestion();
}

function prevQuestion() {
  if (currentQuestion <= 0) return;
  const card = document.getElementById('qa-card');
  const bubble = document.getElementById('qa-funfact');
  if (card) card.classList.add('qa-card-exit-right');
  if (bubble) bubble.classList.remove('qa-funfact-show');
  setTimeout(() => {
    currentQuestion--;
    renderQuestion();
  }, 320);
}

// ===== ASK OUT SEQUENCE =====
function startAskOut() {
  const wrap = document.getElementById('askout-wrap');
  const reveal = document.getElementById('askout-reveal');
  if (!wrap || !reveal) return;

  // Build the ask-out UI step by step
  const lines = [
    { delay: 0,    text: "Okay so... I've been building up to this 😅", cls: 'askout-line' },
    { delay: 1200, text: "We've only known each other 4 months...", cls: 'askout-line' },
    { delay: 2600, text: "But honestly you've been on my mind a lot 💙", cls: 'askout-line' },
    { delay: 4000, text: "So I just wanted to ask you something...", cls: 'askout-line big' },
  ];

  lines.forEach(({ delay, text, cls }) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = cls;
      p.textContent = text;
      reveal.appendChild(p);
      requestAnimationFrame(() => p.classList.add('visible'));
    }, delay);
  });

  // Show YES/NO buttons
  setTimeout(() => {
    const btnWrap = document.createElement('div');
    btnWrap.className = 'askout-question-wrap';
    btnWrap.innerHTML = `
      <div class="askout-big-question">Would you go on a date with me? 🥺💙</div>
      <div class="askout-buttons">
        <button class="askout-yes" onclick="answerAskOut(true)">Yes 💙</button>
        <button class="askout-no" id="askout-no-btn" onclick="answerAskOut(false)">No 😅</button>
      </div>
    `;
    reveal.appendChild(btnWrap);
    requestAnimationFrame(() => btnWrap.classList.add('visible'));
  }, 5600);
}

let noEscapeCount = 0;

function answerAskOut(yes) {
  if (yes) {
    // Save answer
    answers[9] = 'YES 💙';
    saveAnswers();

    const reveal = document.getElementById('askout-reveal');
    reveal.innerHTML = `
      <div class="askout-yes-response">
        <div class="askout-yes-emoji">🎉💙🎉</div>
        <div class="askout-yes-text">YESSS!! okay okay okay 😭💙</div>
        <div class="askout-yes-sub">I'm literally so happy rn you have no idea</div>
        <div class="askout-yes-sub">We'll talk about the details soon 🥺💙</div>
        <button class="qa-results-btn" onclick="goTo('screen-letter')" style="margin-top:20px;">
          Read my letter 💌
        </button>
      </div>
    `;
    requestAnimationFrame(() => {
      document.querySelector('.askout-yes-response').classList.add('visible');
    });
    launchHearts();

  } else {
    // NO button runs away
    noEscapeCount++;
    const noBtn = document.getElementById('askout-no-btn');
    if (!noBtn) return;

    if (noEscapeCount >= 3) {
      noBtn.style.display = 'none';
      const msg = document.createElement('div');
      msg.className = 'askout-no-msg';
      msg.textContent = "The no button gave up 😭 just say yes please 🥺";
      noBtn.parentElement.appendChild(msg);
      return;
    }

    // Move the NO button to a random position
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
    noBtn.style.zIndex = '9999';

    const msgs = ["Nope 🏃", "Try again 😂", "Are you sure?? 👀"];
    noBtn.textContent = msgs[noEscapeCount - 1] || "Run!! 🏃";
  }
}

// ===== HEARTS BURST =====
function launchHearts() {
  const emojis = ['💙','💕','✨','💗','🎉','💫','🌸'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.cssText = `
        position:fixed;
        left:${Math.random()*100}vw;
        bottom:0;
        font-size:${20+Math.random()*24}px;
        animation: qaHeartRise ${1.5+Math.random()*2}s ease forwards;
        pointer-events:none;
        z-index:9999;
      `;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 3500);
    }, i * 80);
  }
}

// ===== SAVE TO LOCALSTORAGE =====
function saveAnswers() {
  const data = {
    savedAt: new Date().toLocaleString(),
    answers: questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] !== undefined ? answers[i] : '—'
    }))
  };
  try {
    localStorage.setItem('shoon_answers', JSON.stringify(data));
  } catch(e) {}
}

// ===== RESULTS =====
function showQAResults() {
  saveAnswers();
  const container = document.getElementById('qa-card-container');
  const nav = document.getElementById('qa-nav-row');
  if (nav) nav.style.display = 'none';

  let html = '<div class="qa-results" id="qa-results">';
  html += '<div class="qa-results-title">✨ Your Answers ✨</div>';
  html += '<div class="qa-results-grid">';
  questions.forEach((q, i) => {
    if (q.type === 'askout') return;
    const ans = answers[i] !== undefined ? answers[i] : '—';
    html += `
      <div class="qa-result-item" style="animation-delay:${i*0.08}s">
        <span class="qa-result-emoji">${q.emoji}</span>
        <span class="qa-result-answer">${ans}</span>
      </div>
    `;
  });
  html += '</div>';
  html += `<div class="qa-results-msg">Now I know you a little better 💗</div>`;
  html += `<button class="qa-results-btn" onclick="goTo('screen-letter')">Read My Letter 💌</button>`;
  html += '</div>';
  container.innerHTML = html;

  requestAnimationFrame(() => {
    const r = document.getElementById('qa-results');
    if (r) r.classList.add('qa-results-enter');
  });
}

// ===== PROGRESS =====
function updateProgress() {
  const fill = document.getElementById('qa-progress-fill');
  const label = document.getElementById('qa-progress-label');
  if (fill) fill.style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
  if (label) label.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// ===== NAV BUTTONS =====
function updateNavButtons() {
  const prevBtn = document.getElementById('qa-prev-btn');
  const nextBtn = document.getElementById('qa-next-btn');
  const finishBtn = document.getElementById('qa-finish-btn');
  const q = questions[currentQuestion];

  if (prevBtn) {
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.style.opacity = currentQuestion === 0 ? '0.4' : '1';
  }

  if (nextBtn && finishBtn) {
    const isLast = currentQuestion === questions.length - 1;
    const hasAnswer = answers[currentQuestion] !== undefined;
    nextBtn.style.display = isLast ? 'none' : 'inline-flex';
    nextBtn.disabled = !hasAnswer;
    nextBtn.style.opacity = hasAnswer ? '1' : '0.4';
    finishBtn.style.display = (isLast && hasAnswer && q.type !== 'askout') ? 'inline-flex' : 'none';
  }
}

// ===== SPARKLES =====
function initQASparkles() {
  const layer = document.getElementById('qa-sparkle-layer');
  if (!layer || layer.children.length > 0) return;
  const emojis = ['💗','✨','🌸','💫','🎀','⭐','🫧'];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('div');
    s.className = 'qa-sparkle';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      font-size:${10+Math.random()*16}px;
      animation-duration:${2.5+Math.random()*3}s;
      animation-delay:${Math.random()*3}s;
      opacity:${0.12+Math.random()*0.2};
    `;
    layer.appendChild(s);
  }
}

// ===== HELPER =====
function escStr(str) {
  return str.replace(/'/g, "\\'");
}
