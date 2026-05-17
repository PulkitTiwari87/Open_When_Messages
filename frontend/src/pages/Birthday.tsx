import { motion } from 'framer-motion';

export default function Birthday() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-background min-h-screen flex items-center justify-center pt-32 pb-20 px-4"
    >
      <div className="text-center">
        <h1 className="font-display-editorial text-5xl md:text-8xl text-[#C5A059] mb-6 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">Happy Birthday</h1>
        <p className="font-body-sm text-secondary tracking-[0.1em] uppercase">Unlocks on 29th May 2026</p>
      </div>
    </motion.main>
  );
}
