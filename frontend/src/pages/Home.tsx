import { motion } from 'framer-motion';

export default function Home() {
  const role = localStorage.getItem('role');
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative w-full min-h-screen flex items-center justify-center vignette overflow-hidden pt-[100px] bg-background"
    >
      {/* Background Image Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="A dramatic, high-contrast black and white photograph of a couple in a cinematic, moody setting." 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0OC-yiaXefhgz35jXwkIz9jO_66nxvRIP5ByTEBW2dtQEEOL5P7RSR-QhojM-fMxACFQcq5bBycNHAW6ScRadDHz-Rk8Kc2sftCkIK_BD4KEBaxg_L1F91sy5k-7q6XUI_NJR8KHACUT5kYoH2Aox01c2kR8LaGqsDbHD7LMgnE78pCeIGj4-kne9pzqrHhsc86Vv4fsqwH0x-iQB_eiyJ162gy869K3ZeJXh8UC3GO-NgNvV0cgXh9YDA2grnCSdS5Et5ZMpbwc" 
        />
        {/* Lighting gradients for depth */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#D6B8A8]/10 to-transparent blur-3xl rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#D6B8A8]/10 to-transparent blur-3xl rounded-full mix-blend-screen"></div>
      </div>
      
      {/* Content Canvas */}
      <div className="relative z-10 text-center px-margin-page flex flex-col items-center">
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="font-display-editorial text-display-editorial text-primary tracking-tighter relative z-10" 
            style={{ fontSize: 'clamp(80px, 15vw, 240px)', lineHeight: 0.8 }}
          >
            LOVE
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0, x: "-50%", y: "-40%", rotate: 0 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", rotate: -5 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute top-1/2 left-1/2 font-accent-script text-accent-script text-tertiary whitespace-nowrap z-20 mix-blend-overlay" 
            style={{ fontSize: 'clamp(40px, 8vw, 100px)' }}
          >
            in all its soft forms
          </motion.span>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-stack-lg font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          A digital heirloom built for the quiet moments. Preserve the letters, the memories, and the promises meant only for each other.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-stack-xl group flex items-center gap-stack-sm border border-[#C5A059] text-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-[#C5A059]/10 transition-colors duration-500 backdrop-blur-sm"
        >
          <span>OPEN THE ARCHIVE</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </motion.button>
      </div>
      
      {/* Ambient Floating Elements (simulated) */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] opacity-30"></motion.div>
      <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-tertiary rounded-full blur-[3px] opacity-20"></motion.div>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute top-1/2 right-1/3 w-1 h-1 bg-surface-tint rounded-full blur-[1px] opacity-40"></motion.div>
      
      {/* Personalized Welcome */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.3 }} 
        transition={{ delay: 2, duration: 2 }}
        className="font-accent-script text-xl text-[#C5A059]/50 mt-16 text-center z-10 relative"
      >
        {role === 'admin' ? 'Welcome back, Pulkit.' : `This was made for you, Purva.`}
      </motion.p>
    </motion.main>
  );
}
