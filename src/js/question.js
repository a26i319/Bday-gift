// ===== Q&A MODULE =====
// Mix of multiple choice + type-in
// Answers saved to Anthropic API (persistent storage)
// After YES: calendar for date picking → email sent

const questions = [
  {
    id: 0,
    type: 'choice',
    emoji: '🎨',
    question: "What kind of vibe do you like the most?",
    choices: ['Cozy & quiet 🧸', 'Fun & chaotic 😂', 'Calm & peaceful 🌿', 'Depends on the day 😌'],
    funFact: "I love Fun & chaotic 😂 — life's too short to be serious all the time. But I also love cozy nights in 🧸"
  },
  {
    id: 1,
    type: 'choice',
    emoji: '🌙',
    question: 'What do you usually do when you finally get some free time?',
    choices: ['Watch Something', 'Listen to Music', 'Sleep 😴', 'Go Somewhere'],
    funFact: "I usually listen to music or watch something 🎶📺 — but if I'm with someone I like, I just wanna chill and vibe 😌"
  },
  {
    id: 2,
    type: 'type',
    emoji: '🍜',
    question: "What's your go-to comfort food when you're having a bad day?",
    placeholder: 'Type your answer here...',
    funFact: "Mine is pizza and monster energy 😅 — because sometimes you just need a little pick-me-up"
  },
  {
    id: 3,
    type: 'choice',
    emoji: '🎬',
    question: 'If we had nothing to do for a few hours, what sounds the most fun?',
    choices: ['Watch a movie 🎬', 'Go somewhere random 🚶‍♀️', 'Play games 🎮', 'Just talk ☕'],
    funFact: "For me I would play games that I like but if my special someone is with me, I just wanna listen everything that she wants to say"
  },
  {
    id: 4,
    type: 'choice',
    emoji: '✈️',
    question: 'If you could randomly travel somewhere tomorrow, where would you go?',
    choices: ['Somewhere in Japan 🇯🇵', 'Another country 🌏', 'Somewhere with a beach 🏝️', 'Somewhere quiet & pretty 🌿'],
    funFact: "I wanna travel to somewhere quiet & pretty 🌿 — just to chill and vibing"
  },
  {
    id: 5,
    type: 'type',
    emoji: '💬',
    question: "What's one thing that always makes you smile no matter what?",
    placeholder: 'Tell me...',
    funFact: "For me , I just need to see my special someone smile and I will be happy for the rest of the day 💙"
  },
  {
    id: 6,
    type: 'choice',
    emoji: '💫',
    question: 'What makes you feel appreciated the most?',
    choices: ['Someone remembering little things 🫶', 'Spending time together ⏰', 'Getting a small surprise 🎁', 'Someone helping you out 🤝'],
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
    question: "What's something you think I'd be surprisingly good at?",
    placeholder: "Be honest, I can take it 😅",
    funFact: "But for me , you are already good at everything you do and about your maturity and your personality. I think you are good at everything you do and I really admire you for that 💙"
  },
  {
    id: 9,
    type: 'askout',
    emoji: '💌',
    question: "Last question... and this one is different 👀",
    funFact: ''
  }
];

let currentQuestion = 0;
let answers = [];

// ===== EMAILJS CONFIG =====
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_nitcegq';   
const EMAILJS_TEMPLATE_ID = 'template_7v11hhb';  
const EMAILJS_PUBLIC_KEY  = 'ZxdBy48kNc6x9aS70';   
const MY_EMAIL            = 'thureinminhtun347@gmail.com'; 

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

  if (nav) {
    nav.style.display = (q.type === 'askout') ? 'none' : 'flex';
  }

  let inputHTML = '';

  if (q.type === 'choice') {
    inputHTML = `<div class="qa-choices">`;
    q.choices.forEach((choice) => {
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

  requestAnimationFrame(() => {
    const card = document.getElementById('qa-card');
    if (card) card.classList.add('qa-card-enter');
  });

  updateNavButtons();

  if (q.type === 'askout') {
    setTimeout(() => startAskOut(), 600);
  }

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
  bubble.textContent = '💙' + q.funFact;
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
  noEscapeCount = 0; // ✅ Bug 3 fix: reset on each entry

  const lines = [
    { delay: 0,    text: "Okay so... I've been building up to this 😅", cls: 'askout-line' },
    { delay: 1200, text: "I've been asked you out lately and got rejected but still you are my favorite person and I really like you", cls: 'askout-line' },
    { delay: 2600, text: "And lately you've been on my mind a lot ", cls: 'askout-line' },
    { delay: 4000, text: "So I just wanted to ask you something... but You can stop here if you want but if you wanna see something special...", cls: 'askout-line big' },
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

  setTimeout(() => {
    const btnWrap = document.createElement('div');
    btnWrap.className = 'askout-question-wrap';
    btnWrap.innerHTML = `
      <div class="askout-big-question">Would you go on a date with me? 💕</div>
      <div class="askout-buttons">
        <button class="askout-yes" onclick="answerAskOut(true)">Yes!! 💗</button>
        <button class="askout-no" id="askout-no-btn" onclick="answerAskOut(false)">No</button>
      </div>
    `;
    reveal.appendChild(btnWrap);
    requestAnimationFrame(() => btnWrap.classList.add('visible'));
  }, 5600);
}

let noEscapeCount = 0;

function answerAskOut(yes) {
  if (yes) {
    answers[9] = 'YES 💗';

    // Save answers to localStorage + show date picker
    saveAnswersLocally();

    const reveal = document.getElementById('askout-reveal');
    reveal.innerHTML = `
      <div class="askout-yes-response">
        <div class="askout-yes-emoji">💗</div>
        <div class="askout-yes-text">She said YES!! 🎉</div>
        <div class="askout-yes-sub">Now pick a date for us! 🗓️</div>
        <button class="qa-results-btn" onclick="goTo('screen-date-picker')" style="margin-top:20px;">
          Pick Our Date 💕
        </button>
      </div>
    `;
    requestAnimationFrame(() => {
      document.querySelector('.askout-yes-response').classList.add('visible');
    });
    launchHearts();

  } else {
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

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
    noBtn.style.zIndex = '9999';

    const msgs = ["Nope!! 😂", "Try again 😂", "Are you sure?? 👀"];
    noBtn.textContent = msgs[noEscapeCount - 1] || "Nuh Huh!!";
  }
}

// ===== HEARTS BURST =====
function launchHearts() {
  const emojis = ['ʚ♡ɞ','💕','✨','💗','⋆｡˚ ⊹ ࣪ ˖ ᥫ᭡','(つ≧▽≦)つ','🌸'];
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

// ===== SAVE LOCALLY =====
function saveAnswersLocally() {
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

// ===== DATE PICKER INIT =====
let selectedDateStr = '';

function initDatePicker() {
  renderCalendar(new Date());

  // Show stored answers summary
  const summary = document.getElementById('dp-answers-summary');
  if (summary) {
    const stored = JSON.parse(localStorage.getItem('shoon_answers') || '{}');
    if (stored.answers) {
      summary.innerHTML = stored.answers
        .filter(a => a.answer !== '—' && !a.question.includes('big one'))
        .map(a => `<div class="dp-answer-row"><span>${a.question}</span><strong>${a.answer}</strong></div>`)
        .join('');
    }
  }
}

let calYear, calMonth;

function renderCalendar(date) {
  calYear  = date.getFullYear();
  calMonth = date.getMonth();

  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  document.getElementById('cal-month-label').textContent = `${months[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const today = new Date();
  today.setHours(0,0,0,0);

  let html = `
    <div class="cal-grid-header">
      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
      <span>Thu</span><span>Fri</span><span>Sat</span>
    </div>
    <div class="cal-grid-days">
  `;

  // empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-day cal-empty"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(calYear, calMonth, d);
    const isPast = thisDate < today;
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isSelected = dateStr === selectedDateStr;

    html += `<div
      class="cal-day${isPast ? ' cal-past' : ' cal-future'}${isSelected ? ' cal-selected' : ''}"
      ${!isPast ? `onclick="pickDate('${dateStr}', '${months[calMonth]} ${d}, ${calYear}')"` : ''}
    >${d}</div>`;
  }

  html += `</div>`;
  document.getElementById('cal-grid').innerHTML = html;
}

function calPrevMonth() {
  renderCalendar(new Date(calYear, calMonth - 1, 1));
}
function calNextMonth() {
  renderCalendar(new Date(calYear, calMonth + 1, 1));
}

function pickDate(dateStr, readableDate) {
  selectedDateStr = dateStr;
  document.getElementById('dp-selected-label').textContent = `📅 Selected: ${readableDate}`;
  document.getElementById('dp-send-btn').disabled = false;
  // re-render to show selection
  renderCalendar(new Date(calYear, calMonth, 1));
}

// ===== SEND EMAIL VIA EMAILJS =====
async function sendDateEmail() {
  if (!selectedDateStr) return;

  const btn = document.getElementById('dp-send-btn');
  btn.disabled = true;
  btn.textContent = '💌 Sending...';

  const stored = JSON.parse(localStorage.getItem('shoon_answers') || '{}');
  const answersText = (stored.answers || [])
    .filter(a => a.answer !== '—')
    .map(a => `• ${a.question}\n  → ${a.answer}`)
    .join('\n\n');

  const templateParams = {
    to_email:    MY_EMAIL,
    reply_to:    MY_EMAIL,
    date_chosen: selectedDateStr,
    saved_at:    stored.savedAt || new Date().toLocaleString(),
    answers:     answersText || 'No answers recorded',
    subject:     `💕 She said YES! Date chosen: ${selectedDateStr}`
  };

  try {
    // ✅ EmailJS v4 correct usage: init with object, then send with 3 args
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    showDateSuccess(true);
  } catch (err) {
    console.error('Email error:', err);
    console.error('Error details:', JSON.stringify(err));
    btn.disabled = false;
    btn.textContent = '❌ Failed — try again';
    setTimeout(() => { btn.textContent = '💌 Send to Him'; btn.disabled = false; }, 2000);
  }
}

function showDateSuccess(emailSent) {
  const screen = document.getElementById('dp-picker-wrap');
  const success = document.getElementById('dp-success');
  if (screen) screen.style.display = 'none';
  if (success) {
    success.style.display = 'flex';
    success.querySelector('.dp-success-date').textContent = selectedDateStr;
    if (!emailSent) {
      success.querySelector('.dp-success-note').textContent =
        '(Configure EmailJS credentials to send real emails 💌)';
    }
  }
  launchHearts();

  // Also save date to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('shoon_answers') || '{}');
    stored.dateChosen = selectedDateStr;
    localStorage.setItem('shoon_answers', JSON.stringify(stored));
  } catch(e) {}
}

// ===== RESULTS (fallback) =====
function showQAResults() {
  saveAnswersLocally();
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
  html += `<button class="qa-results-btn" onclick="goTo('screen-date-picker')">Pick Our Date 💕</button>`;
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