// Moved script from real-talk-cards.html
// Keep existing game logic; import shared helpers if needed later

// All 80 questions organized by category
export const allCards = window.allCardsData;

let currentDeck = [];
let drawnCards = [];
let currentCategory = 'all';
let cardHistory = [];
let currentCardIndex = -1;
let usedCardsSet = new Set();
let wildCard = {
  icon: '🎲',
  category: 'Wild Card',
  question: 'WILD CARD\n\nAsk anyone a question from any deck!',
  footer: 'Use anytime',
  type: 'wild-card'
};

function initGame() { resetGame(); }

function resetGame() {
  currentDeck = [];
  drawnCards = [];
  cardHistory = [];
  currentCardIndex = -1;
  usedCardsSet.clear();
  currentDeck.push({ ...wildCard, categoryKey: 'wild' });
  Object.keys(allCards).forEach((categoryKey) => {
    allCards[categoryKey].forEach((card) => {
      currentDeck.push({ ...card, categoryKey });
    });
  });
  shuffleDeck();
  updateStats();
  updateNavigationButtons();
  showEmptyState();
}

function getCardId(card) {
  if (card.type === 'wild-card') return 'wild-card';
  return `${card.categoryKey || card.category}-${card.question}`;
}

function shuffleDeck() {
  for (let i = currentDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
  }
}

function getAvailableCards() {
  if (currentCategory === 'all') return currentDeck;
  return currentDeck.filter((card) => {
    if (card.type === 'wild-card') return true;
    return card.categoryKey === currentCategory;
  });
}

function drawCard() {
  const availableCards = getAvailableCards();
  if (availableCards.length === 0) {
    alert('No more cards available in this category! Try another category or reset the game.');
    return;
  }
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  const drawnCard = availableCards[randomIndex];
  const deckIndex = currentDeck.findIndex(
    (card) => card === drawnCard || (card.categoryKey === drawnCard.categoryKey && card.question === drawnCard.question)
  );
  if (deckIndex !== -1) {
    currentDeck.splice(deckIndex, 1);
    drawnCards.push(drawnCard);
  }
  if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
    usedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
  }
  if (currentCardIndex < cardHistory.length - 1) {
    cardHistory = cardHistory.slice(0, currentCardIndex + 1);
  }
  cardHistory.push({ ...drawnCard });
  currentCardIndex = cardHistory.length - 1;
  displayCard(drawnCard);
  updateStats();
  updateNavigationButtons();
}

function nextCard() {
  if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
    usedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
  }
  if (currentCardIndex >= cardHistory.length - 1) {
    drawCard();
  } else {
    currentCardIndex++;
    displayCard(cardHistory[currentCardIndex]);
    updateNavigationButtons();
  }
}

function previousCard() {
  if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
    usedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
  }
  if (currentCardIndex > 0) {
    currentCardIndex--;
    displayCard(cardHistory[currentCardIndex]);
    updateNavigationButtons();
  }
}

function displayCard(card) {
  const cardDisplay = document.getElementById('cardDisplay');
  const emptyState = document.getElementById('emptyState');
  const cardNavigation = document.getElementById('cardNavigation');
  emptyState.style.display = 'none';
  cardDisplay.style.display = 'flex';
  if (cardNavigation) cardNavigation.style.display = 'flex';
  let cardClass = '';
  if (card.type === 'wild-card') cardClass = 'wild-card';
  else cardClass = card.categoryKey;
  const cardId = getCardId(card);
  const isUsed = usedCardsSet.has(cardId);
  const isCurrentCard = currentCardIndex >= 0 && cardHistory[currentCardIndex] && getCardId(cardHistory[currentCardIndex]) === cardId;
  if (isUsed) {
    cardClass += ' used';
    if (isCurrentCard) cardClass += ' current-used';
  } else {
    cardClass += ' new';
  }
  cardDisplay.className = `card-display ${cardClass} flip-enter`;
  document.getElementById('cardIcon').textContent = card.icon;
  document.getElementById('cardCategory').textContent = card.category;
  document.getElementById('cardQuestion').textContent = card.question;
  document.getElementById('cardFooter').innerHTML = `${card.footer} • Tap card for next`;
  if (card.type === 'wild-card') {
    document.getElementById('cardQuestion').innerHTML = `
      <div class="wild-card-icon">${card.icon}</div>
      <div style="font-size: 1.2rem; font-weight: 600;">${card.question}</div>
    `;
  }
  setTimeout(() => { cardDisplay.classList.remove('flip-enter'); }, 500);
  setTimeout(() => { cardDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
}

function updateNavigationButtons() {
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (backBtn) backBtn.disabled = currentCardIndex <= 0;
  if (nextBtn) {
    const availableCards = getAvailableCards();
    const hasNext = currentCardIndex < cardHistory.length - 1 || availableCards.length > 0;
    nextBtn.disabled = !hasNext;
  }
}

function showEmptyState() {
  document.getElementById('cardDisplay').style.display = 'none';
  document.getElementById('emptyState').style.display = 'block';
  const cardNavigation = document.getElementById('cardNavigation');
  if (cardNavigation) cardNavigation.style.display = 'none';
}

function updateStats() {
  const availableCards = getAvailableCards();
  const remaining = availableCards.length;
  const drawn = drawnCards.length;
  document.getElementById('remainingCount').textContent = remaining;
  document.getElementById('drawnCount').textContent = drawn;
}

// Wire events
function wireEvents() {
  document.getElementById('drawCardBtn').addEventListener('click', drawCard);
  document.getElementById('shuffleBtn').addEventListener('click', () => { shuffleDeck(); alert('Deck shuffled!'); });
  document.getElementById('resetBtn').addEventListener('click', () => { if (confirm('Are you sure you want to reset the game? All progress will be lost.')) resetGame(); });
  const categorySelect = document.getElementById('categorySelect');
  categorySelect.addEventListener('change', (e) => { currentCategory = e.target.value; updateStats(); updateNavigationButtons(); });
  const cardDisplay = document.getElementById('cardDisplay');
  cardDisplay.addEventListener('click', nextCard);
  const backBtn = document.getElementById('backBtn');
  backBtn.addEventListener('click', (e) => { e.stopPropagation(); previousCard(); });
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextCard(); });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); if (cardHistory.length === 0) drawCard(); else nextCard(); }
    if (e.code === 'ArrowLeft' && e.target === document.body) { e.preventDefault(); previousCard(); }
    if (e.code === 'ArrowRight' && e.target === document.body) { e.preventDefault(); nextCard(); }
  });
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  wireEvents();
  initGame();
});


