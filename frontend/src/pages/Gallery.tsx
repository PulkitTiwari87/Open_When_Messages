import { motion } from 'framer-motion';

export default function Gallery() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-background text-on-background min-h-screen relative overflow-x-hidden pt-[120px] pb-stack-xl px-margin-page"
    >
      <div className="light-leak"></div>

      {/* Header Section */}
      <header className="mb-stack-xl mt-12 md:w-2/3 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display-editorial text-display-editorial text-on-background mb-stack-md leading-none"
        >
          Echoes of Summer
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body-lg text-body-lg text-secondary opacity-80 max-w-2xl"
        >
          A curated collection of fleeting moments, captured on 35mm film. The light was golden, the air was warm, and everything felt eternal.
        </motion.p>
      </header>

      {/* Asymmetrical Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-editorial items-start relative z-10">
        {/* Memory 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:col-span-5 md:col-start-2 mt-0 polaroid transform -rotate-2 cursor-pointer"
        >
          <img alt="Gallery 1" className="w-full h-[500px] object-cover grayscale filter contrast-125 mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARDV0YR4IcT5Z70ovWMWzUW7YiLnDR_xv55muA5_PUJMM6YWOKquvfO2_paZ62Fx-TKeIY2-z4pxQXRRgHKGtD1Lv7qUg5KI1fPjC32peD0RYQMNTvux2-sDX52u6oKiW-Tl_zHk6Wi4bSbCRBFagO9790GMwlb3y-tIAdOgLGwf_T1B0HqQGT4_vJpRkwd5v_ogRtA6SrKP6Aptond7lBuoQvJfFvO5shOvrTGOYFWCQYc-Ywib0NYVJ98NhFCUwlxfXs5t2zYM8"/>
          <p className="font-accent-script text-accent-script text-on-surface text-center opacity-80">August winds, half-remembered.</p>
        </motion.div>

        {/* Memory 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-4 md:col-start-8 mt-32 polaroid transform rotate-1 cursor-pointer"
        >
          <img alt="Gallery 2" className="w-full h-[400px] object-cover grayscale filter contrast-125 mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf18ahlqIpdJDJpXFlJQtQWdO8tjaHNTVVFCAm0G77IuPWY0gGwXIzEVQ272JqGXGh8qU9KTB9rBiKUIFRGalRVKpfsN5_Fm6wxZKB0xzu20kJLtKa52a-k3CYZcEPR8dkGA0Bst8agdDMDzg4djuV0ZodMkBcICmI5nJA7J583VJubHtcsc1PjWtorIx55Yzl-uLS6MFsjy-IGYGMwUBpnbYF9s6OQWYSgXgBpbEz7Cqx8niJ_VS-_e8KO8XoZdf4BwRicNMfq2k"/>
          <p className="font-accent-script text-accent-script text-on-surface text-center opacity-80">Frail beauty.</p>
        </motion.div>

        {/* Memory 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:col-span-6 md:col-start-1 mt-16 polaroid transform rotate-2 cursor-pointer"
        >
          <img alt="Gallery 3" className="w-full h-[600px] object-cover grayscale filter contrast-125 mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSp12b228p9D8yp5T7b11QPiQsp6coi3G6p9UzOD2SValL6LYnEWiKTcFurEyDN_OLV2f5x_eyJmInCNWKy6vb78azd7QfvyM142AZJ0HeCwlpfpfkIraqnLkyBRNt8BJGu6_xVWQ8mXKr-UHvdGokZR7DEmG1r5GYs6pMBFJrHHHieUm7mar6AHL3H1yCkwGPA0xhYgkjrSM9lM6skpH8csVVb4NgkHJg1kWGhZguMwpJb-XAwvyJ7h1w9apqYVsv2lGfAljSXZM"/>
          <p className="font-accent-script text-accent-script text-on-surface text-center opacity-80">Midnight in Paris, silent.</p>
        </motion.div>

        {/* Memory 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-4 md:col-start-8 mt-[-100px] polaroid transform -rotate-1 relative z-10 cursor-pointer"
        >
          <img alt="Gallery 4" className="w-full h-[400px] object-cover grayscale filter contrast-125 mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWeRxa2pW0pUf8tKNQTbsq7Ia_MJzQYCwK3ejjZqpBi8gvNIsJMDJXXJ2J-HvFjj2CjOup4w1-tGPMQPLb-1UIclSamYeBGU-T7FNYhW3lrRy9Ds0CvBRusweK447rPWcEiE_ocjz9EY82usi0TrTG90bxFvpUZM8MdFKkiTZeR2RznzYkMP5WiQib9UXOa7wZPw5qwLsgWcg9LUmbNhmWHA4Y8-oROJwV6MP29lb_OdzkTwSqddWXYIQqyDm4q0xnV8kvkuiCGrY"/>
          <p className="font-accent-script text-accent-script text-on-surface text-center opacity-80">Words left unsaid.</p>
        </motion.div>
      </div>

      {/* Subtle Call to Action */}
      <div className="mt-stack-xl flex justify-center relative z-10">
        <button className="px-8 py-4 border border-[#C5A059] text-[#C5A059] font-label-caps text-label-caps hover:bg-[#C5A059] hover:text-surface-container-lowest transition-all duration-500 tracking-[0.3em]">
          OPEN THE VAULT
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-surface dark:bg-surface w-full py-stack-lg border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center mt-stack-xl gap-stack-md z-10 relative">
        <div className="font-accent-script text-accent-script text-primary">Open When...</div>
        <div className="font-body-sm text-body-sm text-secondary dark:text-secondary opacity-60 text-center md:text-left">
          © 2024 Open When... A Digital Heirloom.
        </div>
        <div className="flex gap-gutter-editorial">
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Privacy</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Archive</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Terms</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Contact</a>
        </div>
      </footer>
    </motion.main>
  );
}
