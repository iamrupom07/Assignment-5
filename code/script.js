const state = { hearts:0, coins:100, copyCount:0, history:[] };

// ---------- DOM ----------
const heartCount = document.querySelector('#heartCount');
const coinCount  = document.querySelector('#coinCount');
const copyCount  = document.querySelector('#copyCount');
const cardGrid   = document.querySelector('#cardGrid');
const historyList= document.querySelector('#historyList');
const clearHistoryBtn = document.querySelector('#clearHistoryBtn');

function renderNav(){
  heartCount.textContent = state.hearts;
  coinCount.textContent  = state.coins;
  copyCount.textContent  = state.copyCount;
}

