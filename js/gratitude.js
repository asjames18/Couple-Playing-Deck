// Extracted from gratitude.html
import prompts from './gratitude-prompts.js';

let currentPromptIndex = 0;
let totalPrompts = 0;
let streak = 0;
let currentCategory = 'all';
let filteredPrompts = [];

function updateCategoryButtons() {
  const categoryButtons = document.getElementById('category-buttons');
  const categories = ['all', ...new Set(prompts.map((p) => p.category))];
  categoryButtons.innerHTML = categories
    .map(
      (category) => `
        <button class="category-btn ${category === currentCategory ? 'active' : ''}" onclick="window.selectCategory('${category}')">
          ${category}
        </button>`
    )
    .join('');
}

function filterPrompts() {
  filteredPrompts = currentCategory === 'all' ? prompts : prompts.filter((p) => p.category === currentCategory);
  totalPrompts = filteredPrompts.length;
  currentPromptIndex = 0;
  updatePrompt();
}

window.selectCategory = (category) => {
  currentCategory = category;
  updateCategoryButtons();
  filterPrompts();
};

function updatePrompt() {
  const promptText = document.getElementById('gratitude-text');
  const promptCategory = document.getElementById('gratitude-category');
  const progress = document.getElementById('progress');
  const prompt = filteredPrompts[currentPromptIndex];
  promptText.textContent = prompt.text;
  promptCategory.textContent = prompt.category;
  const progressPercentage = ((currentPromptIndex + 1) / totalPrompts) * 100;
  progress.style.width = `${progressPercentage}%`;
}

window.nextPrompt = () => {
  currentPromptIndex = (currentPromptIndex + 1) % totalPrompts;
  updatePrompt();
};

window.shareGratitude = () => {
  streak++;
  document.getElementById('streak').textContent = streak;
  const prompt = filteredPrompts[currentPromptIndex];
  const shareText = `Today I'm grateful for: ${prompt.text}`;
  navigator.clipboard.writeText(shareText)
    .then(() => alert('Gratitude copied to clipboard!'))
    .catch((err) => console.error('Failed to copy gratitude:', err));
};

// Initialize
updateCategoryButtons();
filterPrompts();

// Floating elements
const floatingElements = document.createElement('div');
floatingElements.className = 'floating-elements';
document.querySelector('.game-container').appendChild(floatingElements);
const symbols = ['🙏', '💚', '✨', '🌟', '💫', '🌱'];
for (let i = 0; i < 20; i++) {
  const element = document.createElement('div');
  element.className = 'floating-element';
  element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  element.style.left = `${Math.random() * 100}%`;
  element.style.top = `${Math.random() * 100}%`;
  element.style.animationDelay = `${Math.random() * 5}s`;
  floatingElements.appendChild(element);
}


