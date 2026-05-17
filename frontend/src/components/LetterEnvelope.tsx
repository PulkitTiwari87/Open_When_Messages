import { useNavigate } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import { motion } from 'framer-motion';

interface LetterProps {
  index: number;
  slug: string;
  title1: string;
  title2: string;
  subtitle: string;
  unlockDate: Date;
  className?: string;
  isSpecial?: boolean;
  isAdmin?: boolean;
}

export default function LetterEnvelope({ 
  index, slug, title1, title2, subtitle, unlockDate, className = "", isSpecial = false, isAdmin = false
}: LetterProps) {
  const target = new Date(unlockDate);
  const { days, hours, minutes, seconds, isUnlocked } = useCountdown(target);
  const actuallyLocked = !isUnlocked;
  
  const navigate = useNavigate();

  const effectivelyUnlocked = !actuallyLocked || isAdmin;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (effectivelyUnlocked) {
      navigate(`/letters/${slug}`);
    }
  };

  const numberStr = `No. ${index.toString().padStart(2, '0')}`;

  const renderCountdown = () => {
    return (
      <div className="w-full flex flex-col items-center border border-[#C5A059]/30 p-4 relative z-40 bg-[#110e08]/80 backdrop-blur-sm">
        <div className="font-label-caps text-[8px] tracking-[0.3em] text-[#C5A059]/60 mb-2">──── UNLOCKS IN ────</div>
        <div className="font-display-editorial text-2xl text-[#C5A059] flex items-center justify-center gap-2">
          <span>{days.toString().padStart(2, '0')}</span>
          <span className="text-[#C5A059]/40">:</span>
          <span>{hours.toString().padStart(2, '0')}</span>
          <span className="text-[#C5A059]/40">:</span>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="text-[#C5A059]/40">:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className="flex gap-4 mt-1">
          <span className="font-label-caps text-[8px] tracking-[0.3em] text-[#eae1d6]/40">DAYS</span>
          <span className="font-label-caps text-[8px] tracking-[0.3em] text-[#eae1d6]/40">HOURS</span>
          <span className="font-label-caps text-[8px] tracking-[0.3em] text-[#eae1d6]/40">MINS</span>
          <span className="font-label-caps text-[8px] tracking-[0.3em] text-[#eae1d6]/40">SECS</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      onClick={handleCardClick}
      whileHover={actuallyLocked ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={`relative group perspective-1000 ${effectivelyUnlocked ? 'cursor-pointer interactive' : 'cursor-not-allowed'} ${className}`}
    >
      <div className={`bg-[#2B1E1E] paper-texture rounded-none p-8 flex flex-col justify-between ${isSpecial ? 'border border-[#C5A059]/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]' : (actuallyLocked ? 'border border-dashed border-[#C5A059]/30' : 'border border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:shadow-[0_0_40px_rgba(197,160,89,0.08)]')} relative z-10 transform-gpu transition-all duration-700 ease-out h-[380px] md:h-[400px]`}>
        
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <span className={`text-2xl ${actuallyLocked ? 'opacity-30' : (isSpecial ? 'text-[#C5A059] opacity-60' : 'text-[#C5A059] opacity-50')}`}>
            {actuallyLocked ? '🔒' : <span className="material-symbols-outlined">mail</span>}
          </span>
          <div className={`font-accent-script text-accent-script ${isSpecial ? 'text-[#C5A059]/40 -rotate-2' : 'text-primary/40 -rotate-3'}`}>{numberStr}</div>
        </div>
        
        {/* Content */}
        <div className={`text-center relative z-20 ${actuallyLocked ? 'opacity-60' : 'opacity-100'}`}>
          <h2 className={`font-headline-lg ${isSpecial ? 'text-[48px]' : 'text-[36px] md:text-[40px]'} leading-tight text-on-surface mb-4`}>
            {title1}<br/>
            <span className={`italic ${isSpecial ? 'text-[#C5A059]' : 'text-primary'}`}>{title2}</span>
          </h2>
          <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">{subtitle}</p>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col items-center gap-4 relative z-30">
          {actuallyLocked ? (
            isAdmin ? (
              <div className="bg-[#16130d]/80 border border-green-500/30 backdrop-blur-sm px-4 py-2 rounded-sm text-[10px] font-label-caps tracking-[0.2em] text-green-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">key</span>
                ADMIN UNLOCK
              </div>
            ) : (
              renderCountdown()
            )
          ) : (
            <div className={`h-[1px] ${isSpecial ? 'bg-[#C5A059]/30 w-16 group-hover:w-32' : 'bg-primary/30 w-12 group-hover:w-24'} transition-all duration-500`}></div>
          )}
          
          {effectivelyUnlocked && (
            <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-label-caps text-[8px] tracking-[0.3em] text-[#C5A059]">
              OPEN
            </div>
          )}
        </div>

        {/* Lock Overlay for special locked */}
        {actuallyLocked && isSpecial && (
          <div className="absolute inset-0 z-10 bg-[#16130d]/20 backdrop-blur-[1px] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-[40px] animate-pulse"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
