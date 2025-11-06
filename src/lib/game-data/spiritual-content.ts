// Spiritual/Christian content
// This is a large file, so I'll include the structure

export interface SpiritualPrompt {
  text: string;
  verse: string;
}

export interface SpiritualPath {
  prompts: SpiritualPrompt[];
  milestone: string;
}

export const spiritualPaths: Record<string, SpiritualPath> = {
  reflect: {
    prompts: [
      {
        text: "What moments of God's presence have you noticed today?",
        verse: 'Be still, and know that I am God. - Psalm 46:10',
      },
      {
        text: "How has God's love been evident in your life recently?",
        verse:
          'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing. - Zephaniah 3:17',
      },
      {
        text: "What blessings have you received that you haven't fully appreciated?",
        verse:
          'Every good and perfect gift is from above, coming down from the Father of the heavenly lights. - James 1:17',
      },
      {
        text: "How has God's guidance been present in your decisions?",
        verse:
          'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight. - Proverbs 3:5-6',
      },
      {
        text: "What patterns of God's faithfulness do you see in your life?",
        verse:
          'Great is his faithfulness; his mercies begin afresh each morning. - Lamentations 3:23',
      },
      {
        text: "How has God's peace been working in your circumstances?",
        verse:
          'Peace I leave with you; my peace I give you. I do not give to you as the world gives. - John 14:27',
      },
      {
        text: 'What growth have you seen in your relationship with God?',
        verse:
          'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. - 2 Peter 3:18',
      },
      {
        text: "How has God's wisdom been guiding your thoughts?",
        verse:
          'For the Lord gives wisdom; from his mouth come knowledge and understanding. - Proverbs 2:6',
      },
      {
        text: 'What answered prayers can you reflect on?',
        verse:
          'Praise be to God, who has not rejected my prayer or withheld his love from me! - Psalm 66:20',
      },
      {
        text: "How has God's mercy been evident in your life?",
        verse:
          'The Lord is compassionate and gracious, slow to anger, abounding in love. - Psalm 103:8',
      },
      {
        text: 'What opportunities has God provided for you to serve?',
        verse:
          "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms. - 1 Peter 4:10",
      },
      {
        text: "How has God's strength been present in your weaknesses?",
        verse:
          'My grace is sufficient for you, for my power is made perfect in weakness. - 2 Corinthians 12:9',
      },
      {
        text: 'What healing has God brought to your life?',
        verse:
          'He heals the brokenhearted and binds up their wounds. - Psalm 147:3',
      },
      {
        text: "How has God's provision met your needs?",
        verse:
          'And my God will meet all your needs according to the riches of his glory in Christ Jesus. - Philippians 4:19',
      },
      {
        text: 'What joy has God brought to your heart?',
        verse: 'The joy of the Lord is your strength. - Nehemiah 8:10',
      },
      {
        text: "How has God's protection kept you safe?",
        verse:
          'The Lord will keep you from all harm—he will watch over your life. - Psalm 121:7',
      },
      {
        text: 'What hope has God restored in your life?',
        verse:
          'May the God of hope fill you with all joy and peace as you trust in him. - Romans 15:13',
      },
      {
        text: "How has God's presence comforted you?",
        verse:
          'Even though I walk through the darkest valley, I will fear no evil, for you are with me. - Psalm 23:4',
      },
      {
        text: 'What forgiveness has God shown you?',
        verse:
          'If we confess our sins, he is faithful and just and will forgive us our sins. - 1 John 1:9',
      },
      {
        text: "How has God's love transformed you?",
        verse: 'We love because he first loved us. - 1 John 4:19',
      },
    ],
    milestone: "Deep reflection on God's work",
  },
  praise: {
    prompts: [
      {
        text: "What aspect of God's creation fills you with awe today?",
        verse:
          'The heavens declare the glory of God; the skies proclaim the work of his hands. - Psalm 19:1',
      },
      {
        text: "How has God's love been evident in your life this week?",
        verse:
          'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16',
      },
      {
        text: 'What blessing would you like to thank God for?',
        verse:
          "Give thanks in all circumstances; for this is God's will for you in Christ Jesus. - 1 Thessalonians 5:18",
      },
      // ... more prompts would be added from the full list
    ],
    milestone: 'Praise and thanksgiving',
  },
  pray: {
    prompts: [
      {
        text: 'What specific blessing would you like to thank God for?',
        verse:
          "Give thanks in all circumstances; for this is God's will for you in Christ Jesus. - 1 Thessalonians 5:18",
      },
      // ... more prompts
    ],
    milestone: 'Prayer and intercession',
  },
  connect: {
    prompts: [
      {
        text: 'How can you connect with God today?',
        verse: 'Come near to God and he will come near to you. - James 4:8',
      },
      // ... more prompts
    ],
    milestone: 'Connection with God',
  },
};

export type SpiritualPathName = keyof typeof spiritualPaths;
