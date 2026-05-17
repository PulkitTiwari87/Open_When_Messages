import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LetterEnvelope from '../components/LetterEnvelope';
import { API_BASE_URL } from '../config';

interface Letter {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  unlockDate: string;
}

export default function Letters() {
  const [lettersList, setLettersList] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <button className="px-8 py-4 border border-[#C5A059] text-[#C5A059] font-label-caps text-label-caps tracking-widest hover:bg-[#C5A059] hover:text-surface-container-lowest transition-colors duration-500 ease-in-out">
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
    </motion.div>
  );
}
