// Extracted from truthOrDare.html
import challenges from './challenges.js';

let currentCategory = 'all';
let currentType = null;
let currentChallenge = null;
let timerInterval = null;
let timeLeft = 30;

function updateChallenge(type, challenge) {
  const challengeType = document.querySelector('.challenge-type');
  const challengeText = document.querySelector('.challenge-text');
  const timer = document.querySelector('.timer');
  challengeType.textContent = type.toUpperCase();
  challengeType.className = `challenge-type ${type}`;
  challengeText.textContent = challenge;
  currentType = type;
  currentChallenge = challenge;
  timeLeft = 30;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time remaining: ${timeLeft}s`;
    if (timeLeft <= 0) { clearInterval(timerInterval); timer.textContent = "Time's up!"; }
  }, 1000);
}

function getRandomChallenge(type) {
  const categoryChallenges = challenges[currentCategory][type];
  const randomIndex = Math.floor(Math.random() * categoryChallenges.length);
  return categoryChallenges[randomIndex];
}

window.getTruth = () => { const c = getRandomChallenge('truth'); updateChallenge('truth', c); };
window.getDare = () => { const c = getRandomChallenge('dare'); updateChallenge('dare', c); };
window.nextChallenge = () => { if (currentType) { const c = getRandomChallenge(currentType); updateChallenge(currentType, c); } };

document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.category-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    if (currentType) { const c = getRandomChallenge(currentType); updateChallenge(currentType, c); }
  });
});


