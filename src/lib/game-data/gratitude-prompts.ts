// Gratitude prompts
// This is a large file with many prompts, so I'll include a representative sample

export interface GratitudePrompt {
  category: string;
  text: string;
}

export const gratitudePrompts: GratitudePrompt[] = [
  {
    category: 'Relationships',
    text: 'Something your partner did today that made you smile',
  },
  {
    category: 'Relationships',
    text: 'A quality you admire in your partner',
  },
  {
    category: 'Relationships',
    text: 'A moment you shared with your partner that brought you closer',
  },
  {
    category: 'Relationships',
    text: 'Something your partner taught you',
  },
  {
    category: 'Relationships',
    text: 'A way your partner supports your dreams',
  },
  {
    category: 'Relationships',
    text: 'A small gesture from your partner that meant a lot',
  },
  {
    category: 'Relationships',
    text: 'A way your partner makes you feel special',
  },
  {
    category: 'Relationships',
    text: 'A moment when your partner showed understanding',
  },
  {
    category: 'Relationships',
    text: 'Something your partner does that makes you feel loved',
  },
  {
    category: 'Relationships',
    text: 'A way your partner helps you grow',
  },
  {
    category: 'Health',
    text: 'A part of your body that works well',
  },
  {
    category: 'Health',
    text: 'A way your body supports you',
  },
  {
    category: 'Health',
    text: "A healthy habit you've developed",
  },
  {
    category: 'Home',
    text: 'A cozy spot in your home',
  },
  {
    category: 'Home',
    text: 'A home improvement you love',
  },
  {
    category: 'Work',
    text: 'Something you accomplished at work',
  },
  {
    category: 'Work',
    text: 'A colleague you appreciate',
  },
  // ... more prompts would be added from the full list
];

export function getGratitudePromptsByCategory(
  category?: string
): GratitudePrompt[] {
  if (!category || category === 'all') {
    return gratitudePrompts;
  }
  return gratitudePrompts.filter((p) => p.category === category);
}

export function getGratitudeCategories(): string[] {
  const categories = new Set(gratitudePrompts.map((p) => p.category));
  return Array.from(categories);
}
