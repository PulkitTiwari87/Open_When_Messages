import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFLINE_IMAGES, resolveImage } from '../utils/offlineImages';

// Dynamically generate all 26 luxury film memories for the polaroid mason grid
const VAULT_MEMORIES = OFFLINE_IMAGES.map((img, idx) => ({
  id: img.id,
  url: img.path,
  caption: img.caption,
  date: img.date,
  rotation: idx % 3 === 0 ? '-rotate-2' : idx % 3 === 1 ? 'rotate-3' : 'rotate-1',
  height: idx % 4 === 0 ? 'h-[360px] md:h-[450px]' : idx % 4 === 1 ? 'h-[340px] md:h-[400px]' : idx % 4 === 2 ? 'h-[380px] md:h-[420px]' : 'h-[350px] md:h-[430px]'
}));

export default function Gallery() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<typeof VAULT_MEMORIES[0] | null>(null);

  // Main featured 4 images, mapped locally for zero-downtime offline support
  const mainMemories = [
    {
      id: 101,
      url: resolveImage('https://lh3.googleusercontent.com/aida-public/AB6AXuCK8jVGcZye3eDWP624NdjP438zJZM2B3LvzdMdE0jWYl9hPSNtKEeRf4Bi8CQAYG93gi2_LaxrUdx0SOFyDj7AretKK85Tpk2ZfZWIG9BisT9OJgh_nr7OuqF2dvMpX5L8xzPqtJDvF8g6bmSlfkras0RyW2UMwV6uWxFtnvMSAHB_00ukJ-jjZP5YXABftGCreFCSdNBR5_5dv0LXemYPQFqRUYFPQzCcVLcDjDjTdcpK_vmJA8KXwPZTyEm8Z5bj41zZbl1YbQ'),
      caption: 'The Sunset Promise',
      date: '23rd Mar 2026',
      rotation: '-rotate-2',
      colSpan: 'md:col-span-5 md:col-start-2',
      height: 'h-[400px] md:h-[500px]'
    },
    {
      id: 102,
      url: resolveImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBuOxFc9gQ7n8kZlDwEYdIEyjZlN5FAXnNiZ0bEfKivvhXFcGrUX_8nwbwfe46pDbxxLoV0pd1tW0nLpDK3VqFmHNIQjes-ZX_TVmQVLKPDyGhjL8SVE6-RxG502rRQ_3Gqx2TRdnA699oP6Nt6o15XaVyBEEB0bU9uSDtWPQgujQz3cWrrUd5QZ61b79A3MsnmWHy2nj4aabE_y5KxYpUfxEaYllWa-lmPwGhfk4eDxmpMRfdSacePLMY6MatMpKW2uSyTz1ylp3o'),
      caption: 'Frail beauty in quiet focus.',
      date: 'Spring 2026',
      rotation: 'rotate-1',
      colSpan: 'md:col-span-4 md:col-start-8 mt-8 md:mt-32',
      height: 'h-[320px] md:h-[400px]'
    },
    {
      id: 103,
      url: resolveImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDVG1JhOwI_22SfsYcSNyn8YhqtD40XoWfvBiHJ8aozCNgAZaOuLX9z_MsyepyQ94LnKlSa2znNI7YFyagOEGtFEgjMda5m5mWPMsfY3gEVQcQ3SGatky9Es6dqxtk0V0ITCk3zinUul435Fo0IrFmt7z5gzEMdlH9fDJVRTGF5xXhmgPHUWvxuYUC3j6-xcLCD-hUmxVpaSDKikQspWzaPzK28ZBt8As-YGKYID6XifSvLfzezqUd52TvBsUUVCUp9XkUJTmYKLKY'),
      caption: 'Midnight chats, absolutely silent.',
      date: '27th Feb 2026',
      rotation: 'rotate-2',
      colSpan: 'md:col-span-6 md:col-start-1 mt-8 md:mt-16',
      height: 'h-[450px] md:h-[600px]'
    },
    {
      id: 104,
      url: resolveImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDjm4nHt41q0qDVlZVftpl5Ws55A8fP1TPZJItnljA8UcYJpD7-zWNzz2ZBzf3MFwA3NwfNeH4vTUShPWySrcdgRU5Be1gDv8RI4irYJfgB6kKZ_NuslBtYDrS_bPAFaxzuwctQvPwk4sVngTBC_KHe2mWjlAJAyHfjWPxeM8and0byQCIRhOJCFyf2qOrvlksO9iCwDZQAWC-4z-z9T575EDVFokddCyhDpv26zAFWPxR1Wl58mWkobZBsWtORxlzMIpe_64T_wBw'),
      caption: 'Words left unsaid in the gold light.',
      date: 'Anniversary • 2026',
      rotation: '-rotate-1',
      colSpan: 'md:col-span-4 md:col-start-8 mt-8 md:mt-12 relative z-10',
      height: 'h-[320px] md:h-[400px]'
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-background text-on-background min-h-screen relative overflow-x-hidden pt-[120px] pb-24 px-6 md:px-16"
    >
      <div className="light-leak"></div>

      {/* Header Section */}
      <header className="mb-16 mt-12 md:w-2/3 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[#C5A059] font-label-caps text-xs tracking-[0.4em] block mb-3 uppercase"
        >
          Visual Legacy • Collective Memories
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display-editorial text-5xl md:text-7xl lg:text-8xl text-on-background mb-6 leading-none"
        >
          Echoes of Summer
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body-lg text-lg md:text-xl text-secondary opacity-80 max-w-2xl leading-relaxed"
        >
          A curated collection of fleeting moments, captured on 35mm film. The light was golden, the air was warm, and everything felt eternal.
        </motion.p>
      </header>

      {/* Asymmetrical Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
        {mainMemories.map((mem) => (
          <motion.div 
            key={mem.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`${mem.colSpan} polaroid transform ${mem.rotation} cursor-pointer hover:border-[#C5A059]/60 transition-all`}
            onClick={() => setActivePhoto(mem)}
          >
            <div className={`w-full ${mem.height} overflow-hidden bg-surface-container-lowest relative group`}>
              <img 
                alt={mem.caption} 
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mb-4" 
                src={mem.url}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
            </div>
            <div className="pt-4 pb-2">
              <p className="font-accent-script text-xl md:text-2xl text-center text-[#C5A059] leading-tight mb-1">{mem.caption}</p>
              <p className="text-center font-label-caps text-[9px] tracking-[0.2em] opacity-40 uppercase">{mem.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Expanding Vault Section */}
      <AnimatePresence>
        {isVaultOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-16 md:mt-24"
          >
            <div className="border-t border-[#C5A059]/20 pt-16">
              <div className="text-center mb-16">
                <span className="font-accent-script text-3xl md:text-4xl text-[#C5A059] block mb-2">The Vault</span>
                <h2 className="font-display-editorial text-4xl md:text-6xl text-on-background uppercase tracking-wider">A Collection of Moments</h2>
                <p className="font-body-sm text-sm text-secondary opacity-60 max-w-md mx-auto mt-4">Unlocking the vault of every laugh, every quiet afternoon, and every starry twilight we shared together.</p>
              </div>

              {/* Masonry-like dynamic columns */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 relative z-10">
                {VAULT_MEMORIES.map((mem) => (
                  <motion.div
                    key={mem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`break-inside-avoid polaroid inline-block w-full transform ${mem.rotation} cursor-pointer hover:border-[#C5A059]/60 transition-all`}
                    onClick={() => setActivePhoto(mem)}
                  >
                    <div className={`w-full ${mem.height} overflow-hidden bg-surface-container-lowest relative group`}>
                      <img 
                        alt={mem.caption} 
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        src={mem.url}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
                    </div>
                    <div className="pt-4 pb-2">
                      <p className="font-accent-script text-xl md:text-2xl text-center text-[#C5A059] leading-tight mb-1">{mem.caption}</p>
                      <p className="text-center font-label-caps text-[9px] tracking-[0.2em] opacity-40 uppercase">{mem.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Call to Action */}
      <div className="mt-16 md:mt-24 flex justify-center relative z-10">
        <button 
          onClick={() => setIsVaultOpen(!isVaultOpen)}
          className="px-10 py-5 border border-[#C5A059] text-[#C5A059] font-label-caps text-xs md:text-sm tracking-[0.3em] hover:bg-[#C5A059] hover:text-background transition-all duration-500 uppercase rounded-none relative overflow-hidden group shadow-lg"
        >
          <span className="relative z-10">{isVaultOpen ? 'Close the Vault' : 'Open the Vault'}</span>
          <div className="absolute inset-0 bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
        </button>
      </div>

      {/* Lightbox Immersive Overlay */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActivePhoto(null)}
          >
            <div className="absolute top-6 right-6 z-50">
              <button 
                onClick={() => setActivePhoto(null)}
                className="text-white/60 hover:text-white transition-colors text-sm font-label-caps tracking-widest uppercase flex items-center gap-2"
              >
                <span>Close</span>
                <span className="text-lg">✕</span>
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="max-w-4xl w-full flex flex-col md:flex-row bg-[#2b1e1e]/90 border border-[#C5A059]/30 rounded-none overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              <div className="md:w-2/3 relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden bg-black flex items-center justify-center">
                <img 
                  alt={activePhoto.caption} 
                  className="w-full h-full object-contain filter contrast-110" 
                  src={activePhoto.url} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Memory Reflection Panel */}
              <div className="md:w-1/3 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#C5A059]/20 relative bg-[#1E1313]">
                <div>
                  <span className="font-accent-script text-2xl text-[#C5A059] block mb-2">Memory Reflection</span>
                  <h3 className="font-display-editorial text-2xl text-on-background leading-tight mb-4 uppercase tracking-wider">{activePhoto.caption}</h3>
                  <div className="w-12 h-[1px] bg-[#C5A059]/40 mb-6"></div>
                  <p className="font-body-sm text-sm text-secondary opacity-75 leading-relaxed italic mb-6">
                    "Every picture tells a story, but ours has no ending. Looking back at this moment, the warm wind and the golden sunlight still feel as real as the first day we met."
                  </p>
                </div>

                {/* Memory Vault Copy Helper */}
                <div className="p-3 bg-surface-container-high/40 border border-[#C5A059]/20 rounded-none flex flex-col gap-2 my-2">
                  <span className="text-[9px] font-label-caps tracking-widest text-[#C5A059] uppercase">Vault Image Path</span>
                  <div className="flex gap-1.5 items-center">
                    <input 
                      type="text" 
                      readOnly 
                      value={activePhoto.url} 
                      className="bg-black/50 text-[10px] text-white/80 font-mono px-2 py-1.5 rounded-none w-full border border-white/5 select-all focus:outline-none"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(activePhoto.url);
                      }}
                      className="bg-[#C5A059] hover:bg-[#C5A059]/80 text-[#1E1313] font-label-caps text-[9px] px-2.5 py-2 uppercase transition-all duration-300 active:scale-95 shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C5A059]/10 flex justify-between items-center text-[10px] font-label-caps tracking-widest text-[#C5A059]/60">
                  <span>DATE: {activePhoto.date}</span>
                  <span>FILM: 35MM ISO 400</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-surface dark:bg-surface w-full py-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center mt-24 gap-6 z-10 relative">
        <div className="font-accent-script text-2xl text-[#C5A059]">Open When...</div>
        <div className="font-body-sm text-sm text-secondary opacity-60 text-center md:text-left">
          © 2026 Open When... A Digital Heirloom.
        </div>
        <div className="flex gap-6">
          <a className="font-label-caps text-xs text-on-surface-variant hover:text-[#C5A059] transition-colors duration-300 tracking-wider" href="#">Privacy</a>
          <a className="font-label-caps text-xs text-on-surface-variant hover:text-[#C5A059] transition-colors duration-300 tracking-wider" href="#">Archive</a>
          <a className="font-label-caps text-xs text-on-surface-variant hover:text-[#C5A059] transition-colors duration-300 tracking-wider" href="#">Terms</a>
          <a className="font-label-caps text-xs text-on-surface-variant hover:text-[#C5A059] transition-colors duration-300 tracking-wider" href="#">Contact</a>
        </div>
      </footer>
    </motion.main>
  );
}
