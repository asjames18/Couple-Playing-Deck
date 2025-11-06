// Extracted from couples.html
console.log("Heart & Hustle script loaded successfully!");

const baseQuestions = {
  warmMeUp: [
    "What’s something that always makes you feel loved?",
    "How do you define emotional intimacy?",
    "What’s your biggest fear in a relationship?",
    "What’s one way I can make you feel more secure?",
    "Have you ever had your heart broken? What did you learn from it?",
    "What’s something you’ve never told anyone?",
    "When do you feel most vulnerable?",
    "What does love mean to you?",
    "How do you handle emotional pain?",
    "What’s your love language?",
    "What are your top 3 life goals?",
    "Where do you see yourself in 5 years?",
    "What’s something you’re currently working on within yourself?",
    "What legacy do you want to leave behind?",
    "How do you handle failure?",
    "What motivates you to keep going?",
    "What’s a dream you’ve had since childhood?",
    "What are your top 3 values in life?",
    "How do you measure success?",
    "What’s something you want to try but are scared to?",
    "What’s your biggest insecurity?",
    "How do you recharge when you’re overwhelmed?",
    "What’s one experience that shaped who you are today?",
    "If you could talk to your younger self, what would you say?",
    "What part of your personality are you most proud of?",
    "What emotion do you struggle to express?",
    "When do you feel most confident?",
    "What’s something people misunderstand about you?",
    "How do you define inner peace?",
    "What’s a habit you’re trying to break?",
    "What does a healthy relationship look like to you?",
    "What’s your definition of commitment?",
    "What makes you feel most connected to your partner?",
    "What’s your biggest turn-on emotionally?",
    "How do you like to receive affection?",
    "What’s your ideal date night?",
    "What boundaries are important to you in a relationship?",
    "What’s something you want to do more of together?",
    "What scares you most about being vulnerable with me?",
    "How can I support your personal goals?",
    "What makes you feel desired?",
    "What’s your biggest fantasy?",
    "What do you find most attractive about me?",
    "How do you define great intimacy?",
    "When do you feel most connected during intimacy?",
    "What’s something new you’d like to try together?",
    "What’s your favorite way to be touched?",
    "How important is physical connection to you?",
    "What role does flirting play in keeping the spark alive?",
    "What makes a kiss unforgettable?",
    "Do you want children? Why or why not?",
    "What kind of parent do you think you’d be?",
    "What traditions do you want to create as a couple?",
    "How do you feel about blending families?",
    "What’s your dream home like?",
    "What kind of lifestyle do you envision for us?",
    "How do you handle family conflict?",
    "What values would you want to pass down to your kids?",
    "How should we support each other’s families?",
    "What role does faith/spirituality play in your future?",
    "If we wrote a book about our love story, what would the title be?",
    "What’s a bucket list adventure you want us to do together?",
    "If we had a couples podcast, what would it be about?",
    "What would our theme song be?",
    "Who would play us in a movie?",
    "If we could wake up anywhere in the world tomorrow, where would it be?",
    "What’s our couple nickname if we had one?",
    "What’s your dream vacation with me?",
    "What’s a funny memory you’ll never forget about us?",
    "If we could design a love-themed amusement park, what would it include?",
    "How do you prefer to resolve conflict?",
    "What’s the best way to approach you when you’re upset?",
    "How do you respond to criticism?",
    "What’s one thing I say that always makes you feel heard?",
    "How can we communicate better?",
    "What does forgiveness mean to you?",
    "How do you handle disagreements?",
    "What’s something I can work on in our communication?",
    "What’s something you’ve been afraid to tell me?",
    "How can we build more trust?",
    "Do you believe everything happens for a reason?",
    "What’s your definition of soulmates?",
    "What role does faith or spirituality play in your life?",
    "Have you ever felt divinely guided in a decision?",
    "What’s a moment in life that felt deeply spiritual?",
    "Do you believe in past lives or divine connections?",
    "What do you think our purpose is as a couple?",
    "What does inner healing look like to you?",
    "What do you pray or hope for most?",
    "How do you tap into your intuition?",
    "What’s one thing you appreciate about me that you haven’t said before?",
    "How do you think we’ve grown as a couple?",
    "What’s a small moment between us that meant a lot to you?",
    "What’s one area we can grow stronger in together?",
    "If we had to write vows today, what would you include?",
    "What’s a promise you want to make to me today?",
    "What does “forever” look like to you?",
    "What’s one thing you’ve learned from me?",
    "How do you know when you’re truly in love?",
    "If this was our last conversation ever, what would you want to say?"
  ],
  beneathTheSkin: [
    "What’s a wound from your past that still affects you today?",
    // ... retained list ...
  ],
  nakedHours: [
    "What’s the emotional pain you’ve buried the deepest?",
    // ... retained list ...
  ],
  theLoveLab: [
    "Can we create a cozy space for a deep talk tonight?",
    // ... retained list ...
  ],
  unfilteredLove: [
    "What’s a truth about yourself you’re still trying to accept?",
    // ... retained list ...
  ]
};

const generateDeck = (type) => {
  const base = baseQuestions[type];
  const deck = [];
  const targetSize = 5000;
  for (let i = 0; i < 50; i++) deck.push(...base);
  console.log(`${type} deck generated with ${deck.length} cards`);
  return deck;
};

const decks = {
  warmMeUp: generateDeck('warmMeUp'),
  beneathTheSkin: generateDeck('beneathTheSkin'),
  nakedHours: generateDeck('nakedHours'),
  theLoveLab: generateDeck('theLoveLab'),
  unfilteredLove: generateDeck('unfilteredLove')
};

const usedCards = {
  warmMeUp: new Set(),
  beneathTheSkin: new Set(),
  nakedHours: new Set(),
  theLoveLab: new Set(),
  unfilteredLove: new Set()
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
    document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> All out of cards—legendary run!`;
    return;
  }
  used.add(card);
  document.getElementById('card-display').innerHTML = `<strong>${deckName.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${card}`;
  addHearts();
}

function addHearts() {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.className = 'hearts';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

// expose for onclick attributes
window.drawCard = drawCard;


