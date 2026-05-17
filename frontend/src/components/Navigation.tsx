import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Open When Letters', path: '/letters' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Playlist', path: '/playlist' },
    { name: 'Future Together', path: '/future' },
    { name: 'Secret Page', path: '/secret' },
    { name: 'Birthday Letter', path: '/birthday' },
  ];

  const role = localStorage.getItem('role');
  if (role === 'admin') {
    links.push({ name: 'Admin Dashboard', path: '/admin' });
  }

  return (
    <>
      <nav className="absolute top-0 w-full z-50 bg-transparent flex justify-between items-center px-margin-page py-6 max-w-full pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/" className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tighter hover:opacity-80 transition-opacity drop-shadow-md">
            Open When...
          </Link>
        </div>
        
        <div className="pointer-events-auto">
          <button 
            onClick={toggleMenu}
            className="text-[#C5A059] hover:text-white transition-all duration-300 ease-in-out mix-blend-difference drop-shadow-md z-[60] relative"
          >
            <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-[#16130d]/80 flex flex-col justify-center px-margin-page"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#C5A059]/5 pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-6 items-end">
              {links.map((link, index) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                    className="group"
                  >
                    <Link 
                      to={link.path}
                      onClick={toggleMenu}
                      className={`font-display-editorial text-4xl md:text-6xl lg:text-7xl tracking-tighter transition-all duration-500 flex items-center gap-6
                        ${isActive ? 'text-[#C5A059] translate-x-0' : 'text-[#eae1d6]/50 hover:text-[#eae1d6] hover:-translate-x-4'}
                      `}
                    >
                      {isActive && <span className="w-12 h-[2px] bg-[#C5A059] inline-block hidden md:block"></span>}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: links.length * 0.05, ease: 'easeOut' }}
                className="mt-8"
              >
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    window.location.href = '/login';
                  }}
                  className="font-label-caps text-sm tracking-[0.3em] text-red-500/60 hover:text-red-500 transition-colors"
                >
                  LOGOUT
                </button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-10 right-margin-page font-label-caps text-xs tracking-[0.2em] text-[#C5A059]/40"
            >
              A DIGITAL HEIRLOOM
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
