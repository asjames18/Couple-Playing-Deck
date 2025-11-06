// Extracted from storyTime.html
import stories from './stories.js';

let currentCategory = 'all';
let currentStory = null;
let timerInterval = null;
let timeLeft = 60;
let score = 0;

function updateStory() {
  const storyText = document.querySelector('.story-text');
  const timer = document.querySelector('.timer');
  const categoryStories = stories[currentCategory];
  const randomIndex = Math.floor(Math.random() * categoryStories.length);
  currentStory = categoryStories[randomIndex];
  storyText.textContent = currentStory;
  timeLeft = 60;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time remaining: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timer.textContent = "Time's up!";
    }
  }, 1000);
}

window.nextStory = () => updateStory();
window.shareStory = () => {
  score++;
  document.getElementById('score').textContent = score;
};

document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.category-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    updateStory();
  });
});

// Floating elements already managed inline CSS; no extra init required


