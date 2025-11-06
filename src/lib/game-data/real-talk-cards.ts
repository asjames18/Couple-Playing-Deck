export interface RealTalkCard {
  icon: string;
  category: string;
  question: string;
  footer: string;
  type?: 'wild-card';
  categoryKey?: string;
}

export interface RealTalkCardsData {
  [categoryKey: string]: RealTalkCard[];
}

export const allCards: RealTalkCardsData = {
  'real-life': [
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: "What's one thing people assume about you that's not true?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'Who do you feel safe being 100% yourself around?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: "What's one pressure you feel every day just for being a teen?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'When do you feel most misunderstood?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question:
        "What's something you're proud of, even if nobody else notices it?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'What part of yourself are you still learning to love?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'Who has influenced your identity the most so far?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question:
        'When people say "be yourself," what does that actually mean to you?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question:
        "What's a label you've been given that doesn't fit you anymore?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'What does confidence look like in your world?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'If you could rewrite your reputation, what would it say?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'What makes you feel seen and valued?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'How do you handle being judged or stereotyped?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: "What's your biggest fear about growing up?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'Do you feel like your voice matters? Why or why not?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question:
        "What's something you wish adults really understood about your generation?",
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'What do you do when you feel lost in your own thoughts?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'What does "real" mean to you when it comes to friendships?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: 'Have you ever changed yourself just to be accepted?',
      footer: 'Pass card',
    },
    {
      icon: '🎯',
      category: 'Real Life / Identity',
      question: "What does it mean to be you when nobody's watching?",
      footer: 'Pass card',
    },
  ],
  'faith-culture': [
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        'What does following Jesus actually look like in your school or circle?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'Do you think faith and culture can coexist? Why or why not?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        'What does "set apart" mean to you in a world that pushes you to fit in?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'How do you respond when someone challenges your faith?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: "What's one thing you struggle to understand about God?",
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'Has social media helped or hurt your faith walk?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        'What do you think Jesus would do if He was a teen in your school today?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        "What do you do when the Bible doesn't seem relevant to your situation?",
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'Is it hard to talk about your faith without sounding "extra"?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'What do you think Heaven will really be like?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: "What's something you wish church would talk about more?",
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'How do you balance faith and fun without feeling judged?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'Have you ever doubted your faith? What brought you back?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: "What's one verse that actually helped you in real life?",
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'How do you know if your relationship with God is growing?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'What makes you feel connected to God?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        'What\'s the difference between being "religious" and being in relationship with God?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'What does spiritual warfare look like in 2025?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question:
        'Do you ever feel like Christianity is viewed as "uncool"? How do you handle that?',
      footer: 'Pass card',
    },
    {
      icon: '🔑',
      category: 'Faith + Culture',
      question: 'What does Kingdom living look like for your generation?',
      footer: 'Pass card',
    },
  ],
  encouragement: [
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What helps you bounce back when life hits hard?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question:
        "What's something you've overcome that you never thought you would?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question:
        "What's a habit that helps you stay mentally or spiritually strong?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question:
        'How do you speak life over yourself when negativity creeps in?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'Who in your life encourages you to keep going?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What do you do when your motivation runs out?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "What's one thing God's taught you through a hard season?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'How do you handle failure without losing your identity?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "What's something you've done scared, but did it anyway?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "What's your biggest growth area right now?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What does trusting God look like when nothing makes sense?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'How do you fight the feeling of not being enough?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What helps you forgive people who never apologized?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "What's your favorite way to connect with God?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What do you say to your inner critic when it gets loud?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question:
        'What does healing look like for you — mentally, emotionally, spiritually?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question:
        'What\'s a "win" you celebrated this month — even if it was small?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "Who's your spiritual role model, and why?",
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: 'What does it mean to walk boldly in your purpose?',
      footer: 'Pass card',
    },
    {
      icon: '💥',
      category: 'Encouragement / Growth',
      question: "What would you say to someone who's ready to give up?",
      footer: 'Pass card',
    },
  ],
  'fun-creative': [
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'If your life was a movie, what would it be titled?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you had a superpower for your faith walk, what would it be?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: "What's your theme song right now and why?",
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        "What's your most-used emoji and what does it say about your mood lately?",
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you could sit and talk with any Bible character, who and why?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        "What's one thing you wish you could say to the entire world on a mic?",
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'What would you name your testimony if it was a Netflix special?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'If God gave you a billboard for one week, what would it say?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'What\'s your "comfort food" when your soul is tired?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        "What's one worship song or lyric that hits different every time?",
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'What would your alter ego be if you had a faith-based superhero name?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'What social media trend do you secretly love (or hate)?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you could make your own holiday, what would it be and how would we celebrate?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you were a sneaker or shoe, what kind would you be and why?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: "What's your dream job if money wasn't an issue?",
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'What\'s your "hidden talent" that nobody really knows about?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you had 60 seconds to speak to your younger self, what would you say?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        'If you could remix any Bible story into a movie, which one would you do?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question: 'What\'s your dream place to travel and "unplug"?',
      footer: 'Pass card',
    },
    {
      icon: '💡',
      category: 'Bonus Fun / Creative',
      question:
        "If you could team up with Jesus to do one thing in your city — what would y'all do?",
      footer: 'Pass card',
    },
  ],
  spiritually: [
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'What does it mean to you to have a personal relationship with the Lord, not just follow a religion?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'When did faith first become *real* to you, and what changed in your life afterward?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'What distractions pull your heart away from time with God the most?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        "How can you tell when you've drifted spiritually — and how do you find your way back?",
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        "What does holiness look like for someone living in today's world?",
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'Why do you think so many people believe in God but struggle to obey Him?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'How can we tell the difference between conviction from the Spirit and guilt from the enemy?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'What does spiritual growth look like beyond just attending church?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'Why do you think prayer feels difficult for so many believers, and how can it become natural again?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question: 'What are some signs that a person is spiritually maturing?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question: 'How does faith impact your identity and how you see yourself?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'What happens when you try to live for both the world and the Lord at the same time?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        "How does obedience protect you even when it doesn't feel easy?",
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question: 'What role does repentance play in staying close to God?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question: 'How do you feed your spirit daily?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'What would it look like for you to walk boldly in the Spirit this year?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'Why do you think God allows tests and trials in our spiritual walk?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question: 'How do you handle moments when you feel distant from God?',
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        "What's one habit that could strengthen your spiritual life right now?",
      footer: 'Pass card',
    },
    {
      icon: '🔹',
      category: 'Spiritually',
      question:
        'How can you help someone else find their way back to faith without judging them?',
      footer: 'Pass card',
    },
  ],
  culturally: [
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What voices have the most influence on your generation right now?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How does culture teach people to see themselves — and how is that different from how Elohiym sees us?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What kind of "gods" does modern culture worship without realizing it?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How has technology changed the way people express their faith?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What message does popular music send about identity, love, or success?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How can we stay true to biblical values while still being relatable to others?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        "Why do people feel pressure to fit in, even when they know it's wrong?",
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        "How do you think social media affects people's relationship with truth?",
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        "What's the difference between *influencing* and *being influenced*?",
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How can a believer use their online presence to shine light instead of seeking likes?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question: 'Why does standing for truth often come with rejection?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How do you think culture is shaping the way people see family, gender, or purpose?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What can we learn from how Yahusha engaged with culture in His time?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        "What are some examples of 'kingdom culture' you've seen in real life?",
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        "How do you know when you're compromising your values for acceptance?",
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question: 'What does it look like to be *in* the world but not *of* it?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question: 'How can creativity become a weapon for righteousness?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What cultural trend do you think is pulling people furthest from truth right now?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'How can believers reclaim influence in art, business, and media?',
      footer: 'Pass card',
    },
    {
      icon: '🌐',
      category: 'Culturally',
      question:
        'What would change if young believers led culture instead of following it?',
      footer: 'Pass card',
    },
  ],
  prophetically: [
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "What parts of Scripture feel like they're being fulfilled in front of our eyes?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'How does prophecy strengthen your faith instead of scaring you?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'Why do you think the world is becoming more confused about truth and identity?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "What's one event or trend that made you stop and say, 'This lines up with Scripture'?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "What does the Bible mean when it says people's love will grow cold?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'How do you stay focused on your assignment in a world full of chaos?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'What do you think the Lord is saying to His people in this generation?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'Why do you think young believers are waking up spiritually right now?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question: 'How do you think technology fits into end-time prophecy?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question: 'How can prophecy help us see hope instead of fear?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "What role does Israel play in understanding the times we're in?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'Why do you think deception is increasing in media, religion, and politics?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "What are some 'false peace' messages you hear in today's world?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'How can we stay spiritually alert without falling into anxiety?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question: "What's the danger of ignoring prophecy altogether?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'What does it mean to be part of the remnant in these last days?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        "How can we prepare our families for what's coming without living in panic?",
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question: 'Why is discernment more important now than ever before?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'How can young people play a role in the restoration and revival the Lord is bringing?',
      footer: 'Pass card',
    },
    {
      icon: '🔮',
      category: 'Prophetically',
      question:
        'What does it look like to build the Kingdom now, knowing time is short?',
      footer: 'Pass card',
    },
  ],
  practically: [
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'What daily habits keep your faith strong in a world full of distractions?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'How do you balance ambition and obedience to God?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'What does discipline mean for someone trying to live holy?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'What boundaries do you need to protect your peace and purity?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'What kind of community do you need around you to stay focused on purpose?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'How can faith guide your decisions in relationships, school, or business?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        "What's one area in your life that God is calling you to grow in right now?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: "How can you serve others with the gifts He's given you?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        "What does success look like in the Kingdom compared to the world's definition?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'How do you keep your joy when life feels heavy?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        "What's the difference between confidence and pride — and how can you tell the line?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        "How do you respond when people don't understand your walk of faith?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'What does it mean to build legacy that honors God?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'How can you be a light in your family or workplace without preaching at people?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: "What's one practical way to make time for God every day?",
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'How do you stay humble while walking in your calling?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'What would change if you treated your purpose like an assignment instead of an option?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'What are some practical ways to overcome temptation in everyday life?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question:
        'What\'s the biggest challenge of being "set apart" today — and how do you face it?',
      footer: 'Pass card',
    },
    {
      icon: '⚡',
      category: 'Practically',
      question: 'How can you turn your faith into action this week?',
      footer: 'Pass card',
    },
  ],
};

export const wildCard: RealTalkCard = {
  icon: '🎲',
  category: 'Wild Card',
  question: 'WILD CARD\n\nAsk anyone a question from any deck!',
  footer: 'Use anytime',
  type: 'wild-card',
};

export type RealTalkCategory =
  | 'all'
  | 'real-life'
  | 'faith-culture'
  | 'encouragement'
  | 'fun-creative'
  | 'spiritually'
  | 'culturally'
  | 'prophetically'
  | 'practically';
