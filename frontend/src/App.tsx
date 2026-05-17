import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Letters from './pages/Letters';
import OpenedLetter from './pages/OpenedLetter';
import Story from './pages/Story';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import Future from './pages/Future';
import Secret from './pages/Secret';
import Birthday from './pages/Birthday';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && role !== 'admin') return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Wait, if login is the VERY FIRST page, we should redirect / to /login instead.
  // Or render Login on /login. We will handle redirect to /login inside ProtectedRoute.
  // We'll hide nav only on exactly '/login'.
  
  return (
    <>
      <div className="grain-overlay"></div>
      <CustomCursor />
      {location.pathname !== '/login' && <Navigation />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/our-story" element={<ProtectedRoute><Story /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/letters" element={<ProtectedRoute><Letters /></ProtectedRoute>} />
          <Route path="/letters/:slug" element={<ProtectedRoute><OpenedLetter /></ProtectedRoute>} />
          <Route path="/playlist" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
          <Route path="/future" element={<ProtectedRoute><Future /></ProtectedRoute>} />
          <Route path="/secret" element={<ProtectedRoute><Secret /></ProtectedRoute>} />
          <Route path="/birthday" element={<ProtectedRoute><Birthday /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
