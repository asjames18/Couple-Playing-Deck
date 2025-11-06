// Extracted from friends.html
console.log("Friend Connections script loaded successfully!");

const baseQuestions = window.friendsBaseQuestions;

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
  mindMeld: generateDeck('mindMeld'),
  realOnesOnly: generateDeck('realOnesOnly'),
  vibesAndChaos: generateDeck('vibesAndChaos'),
  circleTight: generateDeck('circleTight')
};

const usedCards = {
  mindMeld: new Set(),
  realOnesOnly: new Set(),
  vibesAndChaos: new Set(),
  circleTight: new Set()
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
    document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> All out of cards—squad goals achieved!`;
    return;
  }
  used.add(card);
  document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${card}`;
  addBubbles();
}

function addBubbles() {
  for (let i = 0; i < 5; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubbles';
    bubble.innerHTML = '💬';
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 4000);
  }
}

window.drawCard = drawCard;


