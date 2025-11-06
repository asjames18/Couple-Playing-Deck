// Extracted from kids.html
// Assumes js/kids-questions.js defines discussionQuestions

let currentActivity = null;

const activityCards = document.querySelectorAll('.activity-card');
const promptText = document.getElementById('promptText');
const nextButton = document.getElementById('nextButton');
const floatingElements = document.getElementById('floatingElements');

function createFloatingElements() {
  const symbols = ['❤️', '🌟', '🌈', '👨‍👩‍👧‍👦', '🏠', '🎨', '📚', '🎮'];
  symbols.forEach((symbol, index) => {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = symbol;
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.animationDelay = `${index * 1.5}s`;
    floatingElements.appendChild(element);
  });
}

activityCards.forEach((card) => {
  card.addEventListener('click', () => {
    const activity = card.dataset.activity;
    currentActivity = activity;
    activityCards.forEach((c) => (c.style.opacity = '0.5'));
    card.style.opacity = '1';
    const randomPrompt = discussionQuestions[activity][Math.floor(Math.random() * discussionQuestions[activity].length)];
    promptText.textContent = randomPrompt;
  });
});

nextButton.addEventListener('click', () => {
  if (currentActivity) {
    const randomPrompt = discussionQuestions[currentActivity][Math.floor(Math.random() * discussionQuestions[currentActivity].length)];
    promptText.textContent = randomPrompt;
  }
});

createFloatingElements();


