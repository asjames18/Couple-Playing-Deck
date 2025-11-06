// Extracted from memoryLane.html
import memories from './memories.js';

let currentMemoryIndex = 0;
let totalMemories = 0;

function updateMemory() {
  const memoryText = document.getElementById('memory-text');
  const memoryDate = document.getElementById('memory-date');
  const memoryImage = document.getElementById('memory-image');
  const progress = document.getElementById('progress');
  const memory = memories[currentMemoryIndex];
  memoryText.textContent = memory.text;
  memoryDate.textContent = memory.date;
  if (memory.image) {
    memoryImage.src = memory.image;
    memoryImage.style.display = 'block';
  } else {
    memoryImage.style.display = 'none';
  }
  const progressPercentage = ((currentMemoryIndex + 1) / totalMemories) * 100;
  progress.style.width = `${progressPercentage}%`;
}

window.nextMemory = () => { currentMemoryIndex = (currentMemoryIndex + 1) % totalMemories; updateMemory(); };
window.shareMemory = () => {
  const memory = memories[currentMemoryIndex];
  const shareText = `${memory.date}: ${memory.text}`;
  navigator.clipboard.writeText(shareText)
    .then(() => alert('Memory copied to clipboard!'))
    .catch((err) => console.error('Failed to copy memory:', err));
};

totalMemories = memories.length;
updateMemory();

const floatingElements = document.createElement('div');
floatingElements.className = 'floating-elements';
document.querySelector('.game-container').appendChild(floatingElements);
const symbols = ['📸', '📅', '💭', '🌟', '💫', '✨'];
for (let i = 0; i < 20; i++) {
  const element = document.createElement('div');
  element.className = 'floating-element';
  element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  element.style.left = `${Math.random() * 100}%`;
  element.style.top = `${Math.random() * 100}%`;
  element.style.animationDelay = `${Math.random() * 5}s`;
  floatingElements.appendChild(element);
}


