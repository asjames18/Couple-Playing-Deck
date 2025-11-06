// Extracted from family.html
console.log("Family Connections script loaded successfully!");

const baseQuestions = window.familyBaseQuestions;

const generateDeck = (type) => {
  const base = baseQuestions[type];
  const deck = [];
  const targetSize = 5000;
  for (let i = 0; i < Math.ceil(targetSize / base.length); i++) deck.push(...base);
  if (deck.length > targetSize) deck.length = targetSize;
  console.log(`${type} deck generated with ${deck.length} cards`);
  return deck;
};

const decks = {
  rootsAndBranches: generateDeck('rootsAndBranches'),
  insideOut: generateDeck('insideOut'),
  usTime: generateDeck('usTime'),
  realTalk: generateDeck('realTalk')
};

const usedCards = {
  rootsAndBranches: new Set(),
  insideOut: new Set(),
  usTime: new Set(),
  realTalk: new Set()
};

function drawCard(deckName) {
  const deck = decks[deckName];
  const used = usedCards[deckName];
  let card;
  if (!deck) {
    document.getElementById('card-display').innerHTML = 'Error: Deck not found!';
    console.error(`Deck ${deckName} not initialized`);
    return;
  }
  do { card = deck[Math.floor(Math.random() * deck.length)]; } while (used.has(card) && used.size < deck.length);
  if (used.size >= deck.length) {
    document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> All out of cards—family legend status!`;
    return;
  }
  used.add(card);
  document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${card}`;
  addStars();
}

function addStars() {
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div');
    star.className = 'stars';
    star.innerHTML = '✨';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 4000);
  }
}

window.drawCard = drawCard;


