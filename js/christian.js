// Extracted from christian.html
import { spiritualPaths } from './spiritual-content.js';

let currentStep = null;
let journalEntries = [];

const pathSteps = document.querySelectorAll('.path-step');
const reflectionText = document.getElementById('reflectionText');
const bibleVerse = document.getElementById('bibleVerse');
const prayerButton = document.getElementById('prayerButton');
const spiritualJournal = document.getElementById('spiritualJournal');
const journalTextarea = document.querySelector('.journal-textarea');
const milestoneText = document.getElementById('milestoneText');
const floatingElements = document.getElementById('floatingElements');

function createFloatingElements() {
  const symbols = ['✝', '❤', '🙏', '🌿', '✨', '✝', '❤', '🙏', '🌿', '✨'];
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

function updateReflection(step) {
  const content = spiritualPaths[step];
  const randomPrompt = content.prompts[Math.floor(Math.random() * content.prompts.length)];
  reflectionText.textContent = randomPrompt.text;
  bibleVerse.textContent = randomPrompt.verse;
  milestoneText.textContent = content.milestone;
}

pathSteps.forEach((step) => {
  step.addEventListener('click', () => {
    pathSteps.forEach((s) => s.classList.remove('active'));
    step.classList.add('active');
    currentStep = step.dataset.step;
    updateReflection(currentStep);
  });
});

prayerButton.addEventListener('click', () => {
  spiritualJournal.style.display = spiritualJournal.style.display === 'none' ? 'block' : 'none';
  prayerButton.innerHTML = spiritualJournal.style.display === 'none'
    ? '<i class="fas fa-pray"></i> Open Prayer Journal'
    : '<i class="fas fa-times"></i> Close Prayer Journal';
});

journalTextarea.addEventListener('blur', () => {
  if (journalTextarea.value.trim()) {
    const entry = { step: currentStep, text: journalTextarea.value, date: new Date().toISOString() };
    journalEntries.push(entry);
    localStorage.setItem('spiritualJournal', JSON.stringify(journalEntries));
  }
});

function loadJournalEntries() {
  const saved = localStorage.getItem('spiritualJournal');
  if (saved) journalEntries = JSON.parse(saved);
}

createFloatingElements();
loadJournalEntries();


