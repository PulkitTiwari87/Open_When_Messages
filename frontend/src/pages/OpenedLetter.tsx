import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

interface LetterData {
  title: string;
  subtitle: string;
  message: string;
  emotionalQuote: string;
  heroImage: string;
  galleryImages: string[];
  galleryTexts: string[];
  videos: string[];
  voiceNotes: string[];
  endingMessage: string;
  audioUrl?: string;
}

const isVideo = (url?: string) => {
  if (!url) return false;
  return url.match(/\.(mp4|webm|ogg)$/i) !== null;
};

export default function OpenedLetter() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [letter, setLetter] = useState<LetterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const memoryFragments = [
    { text: "you looked so happy here", top: "15%", left: "5%", rotate: -10 },
    { text: "I replay this memory a lot", top: "45%", right: "8%", rotate: 12 },
    { text: "you made me feel safe here", top: "75%", left: "10%", rotate: -5 },
    { text: "this moment still feels warm", bottom: "10%", right: "15%", rotate: 8 }
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`http://localhost:5000/api/letters/${slug}`, { headers });
        if (!response.ok) throw new Error('Letter not found');
        const data = await response.json();
        
        if (data.message === 'Locked') {
          navigate('/letters');
          return;
        }
        
        // Map backend data to local state or use defaults if missing
        setLetter({
          title: data.title,
          subtitle: data.subtitle,
          message: data.message,
          emotionalQuote: data.emotionalQuote || "\"You don't realize how much of my peace exists inside your voice.\"",
          heroImage: data.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuC1oshTdSlU9YsFAKsxnUMCAKPBfPJk5q78s8UuQM24p_lWXnrlQujpJSvNHZZSo2XkKSJU9WF-OFhnndz4wTP3XFZgZ4MoiNAStAs35S687G7kCxcL84nleixQeQOPLBiA2u61vqz71l87jamRduVIFgx37VMcUm7ZaO4VijKpWFLocRHvDgmgRasODMA-BNyLcJ_4zeToHcXn1wGVploGyGmm4k0_8nqfjxLWffcGbkCVOaY6hUMXT57dVZFbAbmExl2FBvsXK-U",
          galleryImages: [
            data.galleryImages?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_KdgGvu2YLL0ZD8ld_A_W7tiOdPvKy-__bSf0Wf2CbXmsYJbOAD6QhbPeLs0-i6tn8w1uXDIKJ_Zeim53NRKcLs0LvYHSc9OiTjXeaUraPvGKT1-2SKdEfcaJPurJL-4ySMfLhW4jj9VrJmvyKwi9K-go2wfxeJknokw77DUMAXvlfszKzekoVGzDX2ECKr9dis5UhdX_venIT-cvItNEdbKZSFmljE1Ci8kBLMCrHQAen_mWmxB9CBua-O_8j2BoA6vFG_buqE",
            data.galleryImages?.[1] || "https://lh3.googleusercontent.com/aida-public/AB6AXuAE8DZ2VAyEEwDdVZmUuC0jLADa2zIhG8kiB5vepUHHGiLGWq6uL-pfARRdggoVuWT64Q9Tapmu0Xddn44Ms_lzclfPQ6XipHHZcobvWLzmUa4XeZXvuYZCD3_EOoiDs_wwMiq53zrnvmM54c4_YVSFi-TTG7kgw8EIshiKVYYJGGL6lXaOYVla3MzjdzYfBdJ7B7q4F-S6-t4XR5DKolmu6MmxvV4dFkimjt-EKTLbRKZhT8QEQWjZFvYiu72rhHiaFaLX2fLfgVk"
          ],
          galleryTexts: [
            data.galleryTexts?.[0] || "our favorite drive",
            data.galleryTexts?.[1] || "quiet mornings"
          ],
          videos: data.videos || [],
          voiceNotes: data.voiceNotes || [],
          audioUrl: data.audioUrl || "",
          endingMessage: data.endingMessage || "And no matter where life takes us...\nYou will always have a place in my heart."
        });
        if (data.slug === 'open-on-your-birthday') {
          setShowConfetti(true);
        }
      } catch (error) {
        console.error('Failed to fetch letter:', error);
        navigate('/letters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetter();
  }, [slug, navigate]);

  if (isLoading || !letter) {
    return <div className="min-h-screen bg-background flex items-center justify-center font-display-editorial text-2xl text-[#C5A059]">Unsealing...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="bg-background text-on-background w-full"
    >
      {/* Fullscreen Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden vignette">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img 
            alt="Cinematic black and white portrait" 
            className="w-full h-full object-cover grayscale opacity-60" 
            src={letter.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background"></div>
        </motion.div>
        <div className="relative z-10 text-center px-margin-page flex flex-col items-center gap-stack-md max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-accent-script text-accent-script text-tertiary opacity-80 transform -rotate-2"
          >
            {letter.subtitle}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="font-display-editorial text-display-editorial text-on-surface tracking-tighter leading-none"
          >
            {letter.title}
          </motion.h1>
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-stack-lg w-px h-24 bg-gradient-to-b from-primary to-transparent opacity-50 origin-top"
          ></motion.div>
        </div>
      </section>

      {/* Birthday Confetti/Balloons Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh", x: Math.random() * window.innerWidth }}
              animate={{ 
                y: "-10vh", 
                x: (Math.random() * window.innerWidth) + (Math.random() > 0.5 ? 100 : -100),
                rotate: Math.random() * 360 
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute w-4 h-4 rounded-sm bg-[#C5A059] opacity-60"
              style={{
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                backgroundColor: ['#C5A059', '#e0c691', '#8c6d31'][Math.floor(Math.random() * 3)]
              }}
            />
          ))}
        </div>
      )}

      {/* The Letter */}
      <section className="py-stack-xl px-margin-page relative flex justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-fixed/5 rounded-full blur-[100px]"></div>
        <motion.article 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="paper-texture w-full max-w-3xl p-8 md:p-16 lg:p-24 rounded-sm relative z-10 transform rotate-1"
        >
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-primary/20"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-primary/20"></div>
          
          <h2 className="font-accent-script text-4xl md:text-5xl text-primary mb-stack-lg opacity-90">My Love,</h2>
          
          <div className="space-y-stack-md font-body-lg text-body-lg text-on-surface/90 leading-relaxed whitespace-pre-line">
            <p>{letter.message.split('\n\n')[0]}</p>
            {letter.emotionalQuote && (
              <p className="text-2xl md:text-3xl font-headline-lg text-tertiary my-stack-lg italic text-center leading-tight">
                  {letter.emotionalQuote}
              </p>
            )}
            <p>{letter.message.split('\n\n').slice(1).join('\n\n')}</p>
          </div>
          
          <div className="mt-stack-xl flex justify-end">
            <p className="font-accent-script text-3xl text-primary opacity-80">- Yours</p>
          </div>
        </motion.article>

        {/* Floating Memory Fragments */}
        {memoryFragments.map((frag, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: idx * 0.3 }}
            className="absolute hidden lg:block z-20 pointer-events-none"
            style={{ 
              top: frag.top, left: frag.left, right: frag.right, bottom: frag.bottom, 
              rotate: frag.rotate 
            }}
          >
            <p className="font-accent-script text-2xl text-[#C5A059] drop-shadow-md">{frag.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Memory Gallery (Asymmetrical) */}
      <section className="py-stack-xl px-margin-page relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter-editorial items-center">
          <div className="md:col-span-4 space-y-stack-md">
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-headline-lg text-headline-lg text-on-surface"
            >
              Fragments of Us
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-body-lg text-body-lg text-on-surface-variant"
            >
              Moments frozen in time, waiting for you to revisit them whenever the longing sets in.
            </motion.p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 gap-8 relative mt-stack-lg md:mt-0">
            {/* Polaroid 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              whileHover={{ rotate: 0, y: -10 }}
              className="relative z-10 mt-12 cursor-pointer"
            >
              <div className="bg-surface-variant p-4 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {isVideo(letter.galleryImages[0]) ? (
                  <video src={letter.galleryImages[0]} autoPlay loop muted playsInline className="w-full aspect-[4/5] object-cover filter contrast-125 sepia-[.2]" />
                ) : (
                  <img src={letter.galleryImages[0]} className="w-full aspect-[4/5] object-cover filter contrast-125 sepia-[.2]" />
                )}
                <p className="absolute bottom-4 left-6 font-accent-script text-xl text-primary">{letter.galleryTexts[0]}</p>
              </div>
            </motion.div>
            {/* Polaroid 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              whileHover={{ rotate: -1, y: -10 }}
              className="relative z-0 cursor-pointer"
            >
              <div className="bg-surface-variant p-4 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {isVideo(letter.galleryImages[1]) ? (
                  <video src={letter.galleryImages[1]} autoPlay loop muted playsInline className="w-full aspect-square object-cover grayscale contrast-150" />
                ) : (
                  <img src={letter.galleryImages[1]} className="w-full aspect-square object-cover grayscale contrast-150" />
                )}
                <p className="absolute bottom-4 left-6 font-accent-script text-xl text-primary">{letter.galleryTexts[1]}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video/Audio Memory Container */}
      {letter.audioUrl && (
        <section className="py-stack-xl relative w-full overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <img src={letter.heroImage} className="w-full h-[120%] object-cover blur-md opacity-20" />
            <div className="absolute inset-0 bg-background/60"></div>
          </motion.div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-margin-page flex flex-col items-center text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-headline-lg text-4xl md:text-5xl text-on-surface mb-stack-lg italic opacity-80"
            >
              "Even silence felt beautiful with you."
            </motion.h3>
            
            <audio 
              ref={audioRef} 
              src={letter.audioUrl} 
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              autoPlay
            />

            <motion.div 
              onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
                  }
                }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`glass-panel w-full max-w-md p-6 rounded-2xl flex items-center gap-6 mt-stack-md shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer transition-colors ${isPlaying ? 'border-primary/50 bg-[#C5A059]/10' : 'hover:border-primary/30'}`}
            >
              <button className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="flex-1 text-left">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">Our Song</p>
                <div className="h-8 flex items-center gap-1 opacity-50">
                  {/* Simple CSS animation bars */}
                  {[1,3,6,4,8,5,2,7,4,3,6].map((h, i) => (
                    <div 
                      key={i} 
                      className={`w-1 bg-primary rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{ height: `${isPlaying ? Math.random() * 8 + 2 : h * 0.5}rem` }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Emotional Ending */}
      <section className="h-[80vh] flex items-center justify-center relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-margin-page max-w-3xl whitespace-pre-line"
        >
          <p className="font-display-editorial text-4xl md:text-6xl text-on-surface leading-tight tracking-tight opacity-90">
            {letter.endingMessage.split('\n')[0]}
          </p>
          <p className="font-accent-script text-3xl md:text-5xl text-tertiary mt-stack-md opacity-80">
            {letter.endingMessage.split('\n').slice(1).join('\n')}
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
