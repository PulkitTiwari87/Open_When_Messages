import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComfortButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#2a211e]/80 backdrop-blur-md border border-[#8e7a68]/30 rounded-full flex items-center justify-center hover:bg-[#8e7a68]/20 transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <span className="font-serif italic text-2xl text-[#e0cfba]">?</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-cinematic/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="bg-[#1c1815] border border-[#3e322d] p-10 md:p-14 max-w-md w-full rounded-sm text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 font-sans text-[10px] uppercase tracking-widest text-cream/40 hover:text-[#d0bfa7] transition-colors"
              >
                Close
              </button>
              
              <h2 className="font-serif text-4xl mb-4 text-[#e0cfba]">Need Me?</h2>
              <p className="font-sans text-xs text-cream/60 mb-10 tracking-wider">
                How are you feeling right now?
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {['Lonely', 'Stressed', 'Angry', 'Sad', 'Happy', 'Overthinking'].map((mood) => (
                  <button 
                    key={mood}
                    className="px-6 py-3 border border-[#3e322d] rounded-full font-sans text-[10px] uppercase tracking-widest text-cream/70 hover:bg-[#8e7a68]/20 hover:text-[#d0bfa7] hover:border-[#8e7a68] transition-all duration-300"
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
