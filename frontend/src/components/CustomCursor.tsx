import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;

      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const addHoverEvents = () => {
      const interactables = document.querySelectorAll('a, button, .interactive');
      
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(follower, {
            scale: 2.5,
            backgroundColor: 'rgba(197, 160, 89, 0.2)',
            borderColor: 'transparent',
            duration: 0.3,
          });
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(follower, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'rgba(197, 160, 89, 0.3)',
            duration: 0.3,
          });
          gsap.to(cursor, { opacity: 1, duration: 0.2 });
        });
      });
    };

    addHoverEvents();

    // Re-attach events if DOM changes
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-[#C5A059]/50 rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 transition-colors hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-[30px] h-[30px] border border-[#C5A059]/30 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-colors hidden md:block"
      />
    </>
  );
}
