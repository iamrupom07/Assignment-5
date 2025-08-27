const CALL_COST = 20;

const cards = [
  { id: 1, name: 'National Emergency Number', subtitle: 'National Emergency', number: '999', badge: 'All', icon: './assets/emergency.png' },
  { id: 2, name: 'Police Helpline Number', subtitle: 'Police', number: '999', badge: 'Police', icon: './assets/police.png' },
  { id: 3, name: 'Fire Service Number', subtitle: 'Fire Service', number: '999', badge: 'Fire', icon: './assets/fire-service.png' },
  { id: 4, name: 'Ambulance Service', subtitle: 'Ambulance', number: '1994-999999', badge: 'Health', icon: './assets/ambulance.png' },
  { id: 5, name: 'Women & Child Helpline', subtitle: 'Women & Child Helpline', number: '109', badge: 'Help', icon: './assets/emergency.png' },
  { id: 6, name: 'Anti-Corruption Helpline', subtitle: 'Anti-Corruption', number: '106', badge: 'Govt.', icon: './assets/logo-dark.png' },
  { id: 7, name: 'Electricity Helpline', subtitle: 'Electricity Outage', number: '16216', badge: 'Electricity', icon: './assets/logo-dark.png' },
  { id: 8, name: 'Brac Helpline', subtitle: 'Brac', number: '16465', badge: 'NGO', icon: './assets/brac.png' },
  { id: 9, name: 'Bangladesh Railway Helpline', subtitle: 'Bangladesh Railway', number: '163', badge: 'Travel', icon: './assets/Bangladesh-Railway.png' }
];

const state = {
  hearts: 0,
  coins: 100,
  copyCount: 0,
  history: []
};

const heartCount = document.querySelector('#heartCount');
const coinCount = document.querySelector('#coinCount');
const copyCount = document.querySelector('#copyCount');
const cardGrid = document.querySelector('#cardGrid');
const historyList = document.querySelector('#historyList');
const clearHistoryBtn = document.querySelector('#clearHistoryBtn');

function renderNav() {
  heartCount.textContent = state.hearts;
  coinCount.textContent = state.coins;
  copyCount.textContent = state.copyCount;
}

function cardHTML(c) {
  return `
    <article class="card" data-card data-id="${c.id}" data-name="${c.name}" data-number="${c.number}">
      <div class="card-top">
        <div class="card-id">
          <img class="card-ico" src="${c.icon}" alt="${c.name}"/>
          <div class="card-titles">
            <h3>${c.name}</h3>
            <p>${c.subtitle}</p>
          </div>
        </div>
        <button class="heart-btn" title="Like" data-action="like">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
        </button>
      </div>
      <div class="card-num">${c.number}</div>
      <div class="badges"><span class="badge">${c.badge}</span></div>
      <div class="card-actions">
        <button class="btn btn-outline" data-action="copy">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 4.5v12a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 3 16.5v-12A2.25 2.25 0 0 1 5.25 2.25h9A2.25 2.25 0 0 1 16.5 4.5Z"/>
            <path d="M18.75 6.75h.75A2.25 2.25 0 0 1 21.75 9v12A2.25 2.25 0 0 1 19.5 23.25h-9A2.25 2.25 0 0 1 8.25 21v-.75"/>
          </svg>
          Copy
        </button>
        <button class="btn btn-success call-btn" data-action="call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v.75a2.25 2.25 0 0 1-.659 1.591l-1.02 1.02a.75.75 0 0 0 0 1.06l6.708 6.708a.75.75 0 0 0 1.06 0l1.02-1.02A2.25 2.25 0 0 1 16.5 15h.75a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H18a15.75 15.75 0 0 1-15.75-15.75v-.75Z"/>
          </svg>
          Call
        </button>
      </div>
    </article>
  `;
}

function renderCards() {
  cardGrid.innerHTML = cards.map(cardHTML).join('');
  updateCallButtons();
}

function renderHistory() {
  historyList.innerHTML = state.history.map(h => `
    <li class="h-row">
      <div>
        <div class="h-title">${h.name}</div>
        <div class="h-sub">${h.number}</div>
      </div>
      <div class="h-time">${h.time}</div>
    </li>
  `).join('');
}

function nowLocal() {
  return new Date().toLocaleTimeString('en-BD', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}


function updateCallButtons() {
  const insufficient = state.coins < CALL_COST;
  document.querySelectorAll('.call-btn').forEach(btn => {
    btn.classList.toggle('is-disabled', insufficient);
    btn.setAttribute('aria-disabled', insufficient ? 'true' : 'false');
    btn.title = insufficient ? 'Not enough coins to place a call' : 'Call';
  });
}

function handleLike() {
  state.hearts += 1;
  renderNav();
}

async function handleCopy(number) {
  if (!number) return alert('No number to copy');
  try {
    await copyToClipboard(number);
    state.copyCount += 1;
    renderNav();
    alert('Copied: ' + number);
  } catch {
    alert('Copy failed. Check browser permission.');
  }
}

function handleCall(name, number) {
  if (state.coins < CALL_COST) {
    alert('Your coins are over. Please recharge.');
    return;
  }
  alert(`Calling ${name} — ${number}`);
  state.coins -= CALL_COST;
  renderNav();
  updateCallButtons();
  state.history.unshift({ name, number, time: nowLocal() });
  renderHistory();
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const card = btn.closest('[data-card]');
  const name = card?.getAttribute('data-name');
  const number = card?.getAttribute('data-number');
  const action = btn.getAttribute('data-action');

  if (action === 'like') handleLike();
  if (action === 'copy') handleCopy(number);
  if (action === 'call') handleCall(name, number);
});

clearHistoryBtn.addEventListener('click', () => {
  state.history = [];
  renderHistory();
});

renderNav();
renderCards();
renderHistory();
