import { resolve } from 'node:path';

const htmlEntries = [
  'home.html',
  'real-talk-cards.html',
  'christian.html',
  'couples.html',
  'family.html',
  'friends.html',
  'gratitude.html',
  'kids.html',
  'memoryLane.html',
  'loveescape.html',
  'neverHaveIEver.html',
  'storyTime.html',
  'truthOrDare.html',
  'twoTruths.html',
  'wouldYouRather.html'
];

export default {
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlEntries.map((f) => [f.replace('.html', ''), resolve(__dirname, f)])
      )
    }
  }
};


