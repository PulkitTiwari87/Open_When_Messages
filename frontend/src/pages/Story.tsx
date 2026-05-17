import { motion } from 'framer-motion';

export default function Story() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="w-full relative z-10 bg-background pt-[100px]"
    >
      <div className="light-leak"></div>

      {/* 1. Cinematic Hero */}
      <section className="h-[80vh] w-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-surface">
          <img 
            alt="Cinematic Hero B&W Couple" 
            className="w-full h-full object-cover opacity-60 grayscale scale-105 transition-transform duration-[20s] ease-out hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoiG_XNh7HK-Q_XVRucCB2s1GS5_gVYJIfj7O-Mr531xKIN4dVN_4aaracP86Cxx6I7Lf4MPJbaURG_zoX78h1aU0ekRhfMrtuLNt9prveO7jFQF0rutmWUYR0FUEqp_3J8wIufkoiUll5bM1bgAyxUoBE9vBVxF823l0AyGGePMe7dfTSxwUY7_jLx50RyFLMqvA1IppLvY76oKfJaaHqmqNzlHcImnnWeEGMa-_HA47suEizNEcSZzqM_0cEMC2X9tMm3juxRAE"
          />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="font-display-editorial text-display-editorial text-on-surface mix-blend-overlay opacity-90 tracking-tighter">
            Our Story
          </h1>
          <p className="font-accent-script text-accent-script text-tertiary mt-[-2rem] ml-12 rotate-[-5deg]">
            every little moment led us here
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-on-surface-variant opacity-60">
          <span className="font-label-caps text-label-caps">Scroll to discover</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-on-surface-variant to-transparent"></div>
        </div>
      </section>

      {/* 2. Intro Memory Block */}
      <section className="min-h-[80vh] py-stack-xl px-margin-page flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-editorial items-center relative w-full">
          <div className="md:col-span-5 md:col-start-2 relative z-10 order-2 md:order-1 mt-stack-lg md:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="bg-surface-container-high p-8 rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.3)] rotate-[-2deg] max-w-sm ml-auto relative"
            >
              <div className="paper-texture"></div>
              <p className="font-accent-script text-accent-script text-on-surface leading-relaxed text-center relative z-10">
                "I didn't know one person could slowly become my favorite place."
              </p>
            </motion.div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="aspect-[3/4] w-full overflow-hidden relative"
            >
              <img 
                alt="Intro Memory Block B&W" 
                className="w-full h-full object-cover grayscale opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqx2AbHlqWpOiiRNS_RDhGdTv1IPgkqHDCNPVwsvZSipIeerOoDTGIcbVb1sxDG3w8-AeazXQbtE2jxTIFxiVIaoHc1O87aOAUxRe8UKD15XK3fHFnO56-G0eD01dm8RJG1V-V20Se2SoByRjjlZB0rR7Pke6h9G7ZWvV6jAEqnLqWTAUL3lfEEsRnr-XSczx-WAX4-4KHFbYTwOEJ8bB9XT1h_cmhqSXm87BRY470vlTmV559KK4J4o3QTEB1BDD8qDRVq-UmRqc"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-stack-lg bg-surface border-t border-outline-variant/20 px-margin-page relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <div className="font-accent-script text-accent-script text-primary">Open When...</div>
          <div className="flex flex-wrap gap-6 justify-center">
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Privacy</a>
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Archive</a>
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Terms</a>
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#">Contact</a>
          </div>
          <div className="text-secondary font-body-sm text-body-sm text-center md:text-right">
            © 2024 Open When... A Digital Heirloom.
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
