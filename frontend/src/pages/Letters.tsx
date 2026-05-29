import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LetterEnvelope from '../components/LetterEnvelope';
import { API_BASE_URL } from '../config';

interface Letter {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  unlockDate: string;
}

const ROMANTIC_RESPONSES = [
  "I'll do it baby, I know you're missing me. Writing your next letter right now! ❤️",
  "Your request has been received by my heart! I'm starting on a brand new letter for you this very second, my love. 🌹",
  "I know you miss me so much, baby. Writing something incredibly special for you right now, just hold on! ✨",
  "A direct alert sent to Pulkit: 'Purva is missing you.' I'm on it, my beautiful girl! 💖",
  "Your wish is my absolute command, baby. A brand new letter is being drafted with all my love. Letter coming soon! 💌"
];

export default function Letters() {
  const [lettersList, setLettersList] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeMessage, setActiveMessage] = useState("");

  const handleRequestLetter = () => {
    const randomIndex = Math.floor(Math.random() * ROMANTIC_RESPONSES.length);
    setActiveMessage(ROMANTIC_RESPONSES[randomIndex]);
    setShowRequestModal(true);
  };

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/letters`);
        const data = await response.json();
        setLettersList(data);
      } catch (error) {
        console.error('Failed to fetch letters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, []);

  // Map backend letters to the exact Stitch UI grid positions
  const getGridClasses = (index: number) => {
    const classes = [
      'md:col-span-5 md:col-start-1 group-hover:rotate-y-[-2deg]',
      'md:col-span-6 md:col-start-7 mt-0 md:mt-stack-lg group-hover:rotate-y-[2deg]',
      'md:col-span-8 md:col-start-3 mt-0 md:mt-stack-xl', // Birthday - Special
      'md:col-span-4 md:col-start-1 mt-0 md:mt-stack-xl group-hover:rotate-y-[-1deg]',
      'md:col-span-4 md:col-start-5 mt-0 md:mt-stack-xl md:-translate-y-8 group-hover:rotate-y-[1deg]',
      'md:col-span-4 md:col-start-9 mt-0 md:mt-stack-xl md:translate-y-4 group-hover:rotate-y-[-2deg]',
      'md:col-span-5 md:col-start-2 mt-0 md:mt-stack-xl group-hover:rotate-y-[2deg]',
      'md:col-span-5 md:col-start-8 mt-0 md:mt-stack-xl md:-translate-y-12 group-hover:rotate-y-[-1deg]',
      'md:col-span-6 md:col-start-1 mt-0 md:mt-stack-xl group-hover:rotate-y-[2deg]',
      'md:col-span-5 md:col-start-8 mt-0 md:mt-stack-xl md:translate-y-8 group-hover:rotate-y-[-2deg]'
    ];
    return classes[index % classes.length];
  };

  const parseTitle = (fullTitle: string) => {
    const parts = fullTitle.split(/(when|on|before)/i);
    if (parts.length > 1) {
      const t1 = parts[0] + parts[1];
      const t2 = parts.slice(2).join('').trim();
      return { t1, t2 };
    }
    return { t1: fullTitle, t2: '' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-background text-on-surface min-h-screen antialiased overflow-x-hidden selection:bg-surface-tint selection:text-surface-container-lowest"
    >
      <div className="light-leak-top-right"></div>
      <div className="light-leak-bottom-left"></div>

      <main className="pt-[120px] pb-stack-xl px-margin-page">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto text-center mb-stack-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display-editorial text-display-editorial text-primary mb-stack-md"
          >
            Unsealed Sentiments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto italic"
          >
            A collection of carefully preserved letters, waiting for the perfect moment. Choose an envelope when the feeling arises.
          </motion.p>
        </header>

        {/* Editorial Grid */}
        {isLoading ? (
          <div className="text-center font-label-caps tracking-widest text-[#C5A059] py-20">Gathering letters...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-editorial max-w-7xl mx-auto relative">
            {lettersList.map((l, index) => {
              const { t1, t2 } = parseTitle(l.title);
              const isSpecial = l.slug.includes('birthday');
              const isAdmin = localStorage.getItem('role') === 'admin';
              
              return (
                <LetterEnvelope 
                  key={l.slug}
                  index={index + 1}
                  slug={l.slug}
                  title1={t1}
                  title2={t2}
                  subtitle={l.subtitle}
                  unlockDate={new Date(l.unlockDate)}
                  className={getGridClasses(index)}
                  isSpecial={isSpecial}
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-stack-xl text-center relative z-10">
          <button 
            onClick={handleRequestLetter}
            className="px-8 py-4 border border-[#C5A059] text-[#C5A059] font-label-caps text-label-caps tracking-widest hover:bg-[#C5A059] hover:text-surface-container-lowest transition-colors duration-500 ease-in-out"
          >
              REQUEST A NEW LETTER
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-stack-lg border-t border-outline-variant/20 bg-surface dark:bg-surface flex flex-col md:flex-row justify-between items-center px-margin-page gap-stack-md mt-stack-xl relative z-10">
        <div className="font-accent-script text-accent-script text-primary">
            Open When...
        </div>
        <div className="font-body-sm text-body-sm text-secondary dark:text-secondary opacity-60">
            © 2024 Open When... A Digital Heirloom.
        </div>
        <div className="flex gap-gutter-editorial">
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Privacy</a>
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Archive</a>
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Terms</a>
          <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Contact</a>
        </div>
      </footer>

      {/* Romantic Modal Popup */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="bg-[#14110b] border border-[#C5A059]/30 p-8 md:p-12 max-w-md w-full relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden text-center"
            >
              <div className="paper-texture"></div>
              
              {/* Floating Hearts Accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50"></div>
              
              {/* Floating Hearts Animation */}
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, x: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 0.8, 0], 
                    y: -120, 
                    x: [0, (i % 2 === 0 ? 30 : -30) * Math.random(), (i % 2 === 0 ? 60 : -60) * Math.random()], 
                    scale: [0.5, 1.2, 0.8] 
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.4, 
                    repeat: Infinity, 
                    ease: 'easeOut' 
                  }}
                  className="absolute text-red-500/20 text-xl pointer-events-none select-none"
                  style={{ bottom: '20px', left: '48%' }}
                >
                  ❤️
                </motion.span>
              ))}

              <div className="mb-6 text-3xl">💌</div>
              
              <h3 className="font-display-editorial text-2xl text-[#eae1d6] mb-4">
                Sent to Pulkit's Heart
              </h3>
              
              {/* Handwritten Note Area */}
              <div className="bg-[#1b170f] border border-[#C5A059]/10 p-6 my-6 relative overflow-hidden rounded">
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <p className="font-accent-script text-2xl text-[#C5A059] leading-relaxed select-none">
                  "{activeMessage}"
                </p>
              </div>

              <p className="font-body-sm text-xs text-[#eae1d6]/50 mb-8 italic">
                A romantic whisper has been delivered. He's already writing it!
              </p>

              <button 
                onClick={() => setShowRequestModal(false)}
                className="px-6 py-2 border border-[#C5A059]/40 text-[#eae1d6]/80 font-label-caps text-xs tracking-widest hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300"
              >
                CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
