import Letter from './models/Letter';

export const seedLetters = async () => {
  try {
    await Letter.deleteMany({}); // Clear existing to apply personalized content

    const normalUnlock = new Date(); // Unlocked by default so she can open them now
    const bdayUnlock = new Date('2026-05-29T00:00:00'); // Locked until birthday

    const seedData = [
      {
        title: 'Open when you miss me',
        slug: 'open-when-you-miss-me',
        subtitle: 'comfort, longing, emotional closeness',
        emotionalQuote: 'Distance only changes where you are, not where you belong.',
        message: `My love, if you're reading this, I know it's one of those nights. \n\nThe kind where the quiet feels a little too loud, and the space between us feels a little too vast. I miss you too. I miss your presence, your voice, and those random late-night conversations where we lose track of time. \n\nYou have become my absolute favorite part of ordinary days. Even the mundane moments sparkle because of you. I still replay our conversations in my head just to feel close to you when we're apart. I want you to remember that even silence feels softer, more beautiful, when it's with you.\n\nTake a deep breath and know that I am holding you in my heart right now.`,
        endingMessage: 'Distance means so little when someone means so much.\nI am always yours.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: "Open when you're stressed",
        slug: 'open-when-you-are-stressed',
        subtitle: 'peace and reassurance',
        emotionalQuote: 'You don’t have to carry everything alone.',
        message: `Take a deep breath. Right now. Just breathe.\n\nI know how overwhelmed your mind can get when everything piles up, but I want you to stop for a second and just be here with me. Drink a glass of water first. Relax your shoulders. \n\nPlease remember that rest is not weakness. You don't have to be perfect, and you definitely don't have to carry the weight of the world by yourself. I am here to share that load with you. Whatever is stressing you out, it will pass. You are safe, you are so deeply loved, and you are doing enough.\n\nClose your eyes. Let your mind be quiet for just a moment. I've got you.`,
        endingMessage: 'Whenever it gets too loud, come back to me.\nI will be your quiet.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open on your birthday',
        slug: 'open-on-your-birthday',
        subtitle: 'A yearly wish',
        emotionalQuote: 'To the girl who makes my world brighter simply by existing.',
        message: `Happy Birthday, my absolute favorite person.\n\nToday is entirely about you. It's about celebrating the incredible, beautiful, chaotic, and kind soul that you are. I am so endlessly grateful that you were born, and even more grateful that our paths crossed.\n\n22 things I love about you:\n1. The way your eyes light up when you smile.\n2. Your laugh, which is my favorite sound in the universe.\n3. How deeply you care about the people around you.\n4. Your late-night chaotic energy.\n5. The way you make ordinary moments feel like magic.\n(and 17 more that I'll tell you in person, one kiss at a time).\n\nI promise to make every future birthday even more special than the last. I promise to hold your hand through the hard years and celebrate endlessly in the good ones. Thank you for being you.`,
        endingMessage: 'Here is to growing older, but never growing apart.\nHappy Birthday, my love.',
        unlockDate: bdayUnlock,
        isOpened: false
      },
      {
        title: 'Open when we fight',
        slug: 'open-when-we-fight',
        subtitle: 'reassurance and emotional safety',
        emotionalQuote: 'Us against the problem. Never against each other.',
        message: `Hey. Take a breath. I know we're probably both upset right now, and maybe we aren't even talking. But I needed you to read this.\n\nArguments do not change my love for you. Not even a fraction. Being mad at you doesn't mean I stop caring, and it doesn't mean I'm going anywhere. We are a team, and sometimes teams have bad days. \n\nWhatever we are fighting about, it is incredibly small compared to what we have built. I am sorry for my part in this. I want us to fix it, together. You are my safe space, and I want to make sure I am always yours, even on the days we disagree.\n\nCome talk to me when you're ready. I'll be waiting.`,
        endingMessage: 'I love you more than being right.\nAlways.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open when you feel lonely',
        slug: 'open-when-you-feel-lonely',
        subtitle: 'presence despite distance',
        emotionalQuote: 'Even from miles away, I am still beside you.',
        message: `Hey love. I hate that you're feeling lonely right now, and I hate even more that I can't just reach over and pull you into a hug.\n\nBut I want you to imagine me sitting right beside you. Pretend we are talking right now, just the two of us, like we always do. The physical distance between us is just an illusion because emotionally, my heart is right next to yours. \n\nYou are never truly alone. I am always carrying a piece of you with me, just like I hope you're carrying a piece of me with you. Read this letter as many times as you need, and let my words be the hug you need until I can give you a real one.`,
        endingMessage: 'Look at the moon.\nWe are under the same sky, breathing the same air.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open when you need to smile',
        slug: 'open-when-you-need-to-smile',
        subtitle: 'funny memories and chaos',
        emotionalQuote: 'To the one who brings out the beautiful chaos in me.',
        message: `Okay, stop whatever you're doing. It's time to smile.\n\nI want you to think about all the incredibly goofy, embarrassing, and chaotic moments we've shared. Remember that time we couldn't stop laughing for absolutely no reason? Or the absolutely unhinged late-night thoughts you share with me? \n\nYou bring out this wonderfully light, playful side of me that I didn't even know existed. Life is entirely too serious sometimes, but with you, it's a warm, comfortable kind of chaos. \n\nI hope this brought at least a tiny smirk to your beautiful face. If not, just remember I have blackmail material (just kidding... mostly).`,
        endingMessage: 'Your smile is my favorite view.\nNever stop showing it to the world.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open before sleeping',
        slug: 'open-before-sleeping',
        subtitle: 'soft romance',
        emotionalQuote: 'I hope your dreams are as beautiful as your heart.',
        message: `The day is finally over. The world has gone quiet.\n\nI wanted to be the last voice you "heard" before you close your eyes. As you lay there in the dark, I want you to know how deeply cherished you are. Whatever happened today, good or bad, is in the past. Now is the time to rest your mind and your beautiful soul.\n\nImagine my arms wrapped around you. Let the moonlight spilling into your room be a gentle reminder of the soft, peaceful love I have for you.\n\nSleep well, my love. I will meet you in your dreams.`,
        endingMessage: 'Goodnight, beautiful.\nI love you.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open when you overthink',
        slug: 'open-when-you-overthink',
        subtitle: 'calm reassurance',
        emotionalQuote: 'Not every fear deserves your peace.',
        message: `Your mind is a beautiful place, but right now, it's playing tricks on you.\n\nStop. Breathe in for four seconds. Hold it. Exhale.\n\nWhatever worst-case scenarios your brain is spinning, they aren't real. You are safe. We are okay. Life is okay. You don't have to figure everything out right this very second. Give yourself permission to let go of the things you cannot control.\n\nI am here to anchor you. Ground yourself in this moment. Listen to the music playing on this page. Focus on my words: You are loved, you are secure, and nothing your anxiety is telling you is the truth.`,
        endingMessage: 'Let it go for tonight.\nTomorrow is a new day, and I will be there for it.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open when you doubt yourself',
        slug: 'open-when-you-doubt-yourself',
        subtitle: 'confidence and admiration',
        emotionalQuote: 'You are becoming everything you once needed.',
        message: `If you are doubting yourself, I need you to borrow my eyes for a minute.\n\nIf you could see yourself the way I see you, you would never doubt yourself again. You are one of the strongest, most resilient, and brilliantly capable people I have ever met. You handle life with a grace that constantly leaves me in awe.\n\nDo not let a bad day or a momentary setback convince you that you are anything less than extraordinary. You have overcome 100% of your bad days. You are constantly growing, constantly evolving, and I am so incredibly proud of the woman you are right now.\n\nStand tall. You've got this. And I've got you.`,
        endingMessage: 'I believe in you.\nMore than you will ever know.',
        unlockDate: normalUnlock,
        isOpened: false
      },
      {
        title: 'Open when you need me',
        slug: 'open-when-you-need-me',
        subtitle: 'ultimate emotional safe space',
        emotionalQuote: 'No matter where you are, my heart still knows the way back to you.',
        message: `This is your safe space. \n\nIf you're reading this, you need me, and I want you to know that I am here. Completely, unconditionally, without hesitation—I am here. \n\nI promise to be the shoulder you lean on, the hand you hold, and the quiet space where you can just be vulnerable without any judgment. Whatever life throws at us, whatever storms you're walking through, you will never have to walk through them alone. \n\nYou are the best part of my life, Purva. I will spend forever making sure you feel protected, cherished, and endlessly loved.`,
        endingMessage: 'And if life ever feels too heavy, come back here.\nCome back to me.',
        unlockDate: normalUnlock,
        isOpened: false
      }
    ];

    await Letter.insertMany(seedData);
    console.log('Database wiped and seeded with deep personalized letters for Purva.');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};
