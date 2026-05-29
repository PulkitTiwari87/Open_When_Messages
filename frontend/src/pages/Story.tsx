import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { resolveImage } from '../utils/offlineImages';

const TIMELINE_EVENTS = [
  {
    id: 1,
    icon: '🌟',
    label: 'The beginning',
    title: 'The Day We Met',
    description:
      'The Day we meet on Deepak dont know that you will beacome that speacial person in my life that i will fall in love with you',
    color: '#f43f5e',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYUaa3jkHe2Sjv1CgakMozr3mnOMjzPrM3fRO_yKIfpAZbjcJtq7JJJPGyxEDdyH4ObCd2lkiqMnHDPGa_-8DjWy7F-gmG-p9MLZHcVD2ClW3UofCk6SGFATRx_L9z1nuQFY4UTxcS3iCiZmG0qvRpE2bBRbufR1o7PSwCQH6BpYZehMeSrxNe2GAL5EHXZr8KMIrJNKmgyD3gyydHCj2pPtpJxXOJVaQM5d340iRqRxI3dhH8nEo4pvWqSpPsr1wt5mjn_tnfpKU'
  },
  {
    id: 2,
    icon: '📱',
    label: 'First connection',
    title: 'Hidden Date',
    description:
      'That hidden date in the city still feels so special to me. We had waffles and ice cream, I still remember ordering butterscotch, and you laughing at me for it. And yeah… that tea was honestly terrible. But somehow, none of that mattered. It was the conversation we had that day so real, so effortless. I remember sitting there thinking… damn, this woman could be really special to me.',
    date: '23rd Feb 26',
    color: '#fb7185',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMLPhes4rjYQsK9qwFRleiNCdcLGtLdGa3c93y-nhK86Ids3yzL9hsfx6ccKCgsN_1PFwGphIp_UtCQm8aUXgXlfwxMZ742Dbj_xe-nnnGlMKfJQEx5GQBGWlA6ZOCFHL3liwyy5qUag4GtO4fyBuYDpFwF5qlkdT29PDJ-HJ5xA8bVKdPitMSOccMaKkrsUfZYGsLxQ5ou8aSlLyEYxYKapb6ywWv9QXtI8awERENr8XDIA6rh2KYgmTrVrm1F-UHGawd_zGMif4'
  },
  {
    id: 3,
    icon: '😂',
    label: 'Pure joy',
    title: 'Our First Laugh Together',
    description:
      'I still remember that day we randomly went to Aroma just to buy biscuits… and somehow it turned into something much more. After that, we went to Ruminos, and that tea date was honestly so much fun. It wasn’t anything big or planned, but moments like that — simple, spontaneous, and full of laughter — are the ones I’ll always hold close. Being with you just made everything feel lighter and happier.',
    date: '27th feb 26',
    color: '#a78bfa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVG1JhOwI_22SfsYcSNyn8YhqtD40XoWfvBiHJ8aozCNgAZaOuLX9z_MsyepyQ94LnKlSa2znNI7YFyagOEGtFEgjMda5m5mWPMsfY3gEVQcQ3SGatky9Es6dqxtk0V0ITCk3zinUul435Fo0IrFmt7z5gzEMdlH9fDJVRTGF5xXhmgPHUWvxuYUC3j6-xcLCD-hUmxVpaSDKikQspWzaPzK28ZBt8As-YGKYID6XifSvLfzezqUd52TvBsUUVCUp9XkUJTmYKLKY'
  },
  {
    id: 4,
    icon: '💭',
    label: 'Confession',
    title: 'The confession',
    description:
      'At Anuj’s flat… I don’t think I’ll ever forget it. I was so unsure if you even liked me or not, but somewhere deep down, I already knew I was completely into you. Seeing you that day—so free, so carefree, like nothing else in the world mattered—just being yourself, talking to me, holding my hand… it felt different, special. And that moment, when I finally said it—when I told you I liked you—it meant everything to me. It wasn’t perfect or planned, but it was real. And honestly, that’s what made it so unforgettable.',
    date: '14th Mar 26',
    color: '#c4b5fd',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj1cyxn2-h_xcOd8m4-WCd9DnQT5c__WoMi6mmR-khOGGFkQnhJmGjDrgRIJEc0CfaP4lb4Qf9OKA-9r1SMZMFSldi3leJ11ql3XyUEt3-nhYV_GBdA-n9mJOo34vqaJxlObtsN0ouCmAzU5Hjw0ArDQ7BwshE32ahIodP6XnT87kgz7GSGJGKksNKdgydcHDRZQj-hEyg0lH3FMMwqcW96yu-MJ0DxqvYPoY-wUG5aHNEiXkMQEhDqR7RULRLXyc6lre3vsnq5-s'
  },
  {
    id: 5,
    icon: '💕',
    label: 'Growing closer',
    title: 'The Koti Date',
    description:
      'That Koti trip will always stay close to my heart. We spent the day exploring, finding that perfect Maggie spot with the most beautiful view it felt like our own little world. Everything about that day was so light, so happy, just us enjoying every moment together. And then that night on the TNT road… our kiss. I won’t lie—that was my first kiss ever, and I had no idea what I was doing. But you… you made it so easy, so natural. You taught me, guided me and now yeah, I can proudly say I’m kind of a professional because of you. That moment wasn’t just special, it was unforgettable.',
    date: '23rd Mar 26',
    color: '#fda4af',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK8jVGcZye3eDWP624NdjP438zJZM2B3LvzdMdE0jWYl9hPSNtKEeRf4Bi8CQAYG93gi2_LaxrUdx0SOFyDj7AretKK85Tpk2ZfZWIG9BisT9OJghH_nr7OuqF2dvMpX5L8xzPqtJDvF8g6bmSlfkras0RyW2UMwV6uWxFtnvMSAHB_00ukJ-jjZP5YXABftGCreFCSdNBR5_5dv0LXemYPQFqRUYFPQzCcVLcDjDjTdcpK_vmJA8KXwPZTyEm8Z5bj41zZbl1YbQ'
  },
  {
    id: 6,
    icon: '🎉',
    label: 'One month!',
    title: 'Happy One Month Anniversary',
    description:
      '',
    date: '3rd May 26',
    color: '#f43f5e',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjm4nHt41q0qDVlZVftpl5Ws55A8fP1TPZJItnljA8UcYJpD7-zWNzz2ZBzf3MFwA3NwfNeH4vTUShPWySrcdgRU5Be1gDv8RI4irYJfgB6kKZ_NuslBtYDrS_bPAFaxzuwctQvPwk4sVngTBC_KHe2mWjlAJAyHfjWPxeM8and0byQCIRhOJCFyf2qOrvlksO9iCwDZQAWC-4z-z9T575EDVFokddCyhDpv26zAFWPxR1Wl58mWkobZBsWtORxlzMIpe_64T_wBw'
  },
];

function TimelineItem({ event, index }: { event: typeof TIMELINE_EVENTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref} 
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-16 last:mb-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } w-full`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#16130d] border border-[#C5A059]/10 p-6 md:p-8 w-full md:flex-1 max-w-full md:max-w-sm relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
      >
        <div className="paper-texture"></div>
        {event.image && (
          <div className="mb-6 overflow-hidden aspect-[4/3] w-full border border-[#C5A059]/10 relative z-10 bg-black/20">
            <img
              src={resolveImage(event.image)}
              alt={event.title}
              className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-105"
            />
          </div>
        )}

        {/* Date badge */}
        {event.date && (
          <span className="inline-block text-[10px] font-label-caps tracking-widest text-[#C5A059] border border-[#C5A059]/30 px-3 py-1 mb-4 relative z-10">
            {event.date}
          </span>
        )}

        {/* Label */}
        <p className="text-[#eae1d6]/40 text-[9px] font-label-caps tracking-[0.25em] mb-1 relative z-10">
          {event.label}
        </p>

        {/* Title */}
        <h3 className="font-display-editorial text-2xl text-[#eae1d6] mb-3 relative z-10 leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-body-sm text-[#eae1d6]/70 text-xs leading-relaxed whitespace-pre-line relative z-10">
          {event.description}
        </p>
      </motion.div>

      {/* Center connector dot (Desktop only to prevent mobile card squishing) */}
      <div className="relative flex-col items-center mx-4 md:mx-0 flex-shrink-0 hidden md:flex">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg bg-[#16130d] border border-[#C5A059]/40 text-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.15)] z-10 relative"
        >
          {event.icon}
        </motion.div>
      </div>

      {/* Spacer for the opposite side (Desktop only) */}
      <div className="flex-1 max-w-sm hidden md:block" />
    </div>
  );
}

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
            src={resolveImage("https://lh3.googleusercontent.com/aida-public/AB6AXuBg3dqEvO688YEKI9VNBJ3lnQt4bjUhD0gANPCAmWrYxqKXY6wI9BATHoVtDnk2Q2AdlK59MQkmEn22cc3UAr3L6BtMM8_W_qT5W8ZbiwNY2GVA821DxWmgXsxd_xMP_1tSQVes1ZUMl8r4Mjcmzvs9mmf_x1YaaI32ZdWmUbML62HOhxW-SUN3UmOO5Naitsyg5j0CPGqp4B3B3N7iXOZZtHDGu4uYO24scVC74V6tZGhlFrIUfu6RQXwBWQw3CfUF3QjwbP7ohZE")}
          />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center px-4">
          <h1 className="font-display-editorial text-display-editorial text-on-surface mix-blend-overlay opacity-90 tracking-tighter">
            Our Story
          </h1>
          <p className="font-accent-script text-accent-script text-tertiary mt-[-1rem] md:mt-[-2rem] ml-4 md:ml-12 rotate-[-5deg]">
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
                src={resolveImage("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSP9CA0VXXZ7am9Z8d7_AMgyE07NWriIyKDHXy_HjvAzWOEjQC_XfuhGDLwf2WBHHc3UhlCcMb0oCL4cUX531XtyffIhsZg8tCz57NNG-VHoIt40BIrsRDCP3pge5pE38AVXdw1irQeO_ej_cPXkfTP8ditZyEE47yKpv9mzBTVspglDTaYVdFF9hMtgwpteqsAXuA8UcORN6c_Rgdb6BrOE1cd5r1XBq98yeGXHNJmsolct2YKw35vMcRIXe5d6qX6s12jSOLwU")}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Vertical Timeline */}
      <section className="relative py-24 px-6 overflow-hidden bg-background">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-accent-script text-[#C5A059] text-3xl mb-2"
          >
            Chapter by chapter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display-editorial text-5xl md:text-7xl text-[#eae1d6] tracking-tighter"
          >
            Our Story So Far
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#C5A059]/30 mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical center line */}
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[1px] bg-[#C5A059]/20 hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => (
              <TimelineItem key={event.id} event={event} index={idx} />
            ))}
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
