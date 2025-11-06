// Extracted from neverHaveIEver.html
import statements from './statements.js';

let currentCategory = 'all';
let currentStatement = null;
let timerInterval = null;
let timeLeft = 30;
let score = 0;

function updateStatement() {
  const statementText = document.querySelector('.statement-text');
  const timer = document.querySelector('.timer');
  const categoryStatements = statements[currentCategory];
  const randomIndex = Math.floor(Math.random() * categoryStatements.length);
  currentStatement = categoryStatements[randomIndex];
  statementText.textContent = `Never have I ever ${currentStatement}`;
  timeLeft = 30;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time remaining: ${timeLeft}s`;
    if (timeLeft <= 0) { clearInterval(timerInterval); timer.textContent = "Time's up!"; }
  }, 1000);
}

window.nextStatement = () => updateStatement();
window.incrementScore = () => { score++; document.getElementById('score').textContent = score; };

document.querySelectorAll('.category-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.category-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    updateStatement();
  });
});


