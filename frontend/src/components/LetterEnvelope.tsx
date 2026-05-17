import { Link, useNavigate } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';

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
  const { days, hours, minutes, seconds, isUnlocked } = useCountdown(unlockDate);
  const navigate = useNavigate();

  const effectivelyUnlocked = isUnlocked || isAdmin;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (effectivelyUnlocked) {
      navigate(`/letters/${slug}`);
    }
  };

  const numberStr = `No. ${index.toString().padStart(2, '0')}`;

  return (
    <div 
      onClick={handleCardClick}
      className={`relative interactive group perspective-1000 ${effectivelyUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'} ${className}`}
    >
      <div className={`bg-[#2B1E1E] paper-texture rounded-DEFAULT p-8 flex flex-col justify-between border ${isSpecial ? 'border-[#C5A059]/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]' : 'border-outline-variant/30'} card-shadow-hover relative z-10 transform-gpu transition-transform duration-700 ease-out h-[380px] md:h-[400px]`}>
        
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <span className={`material-symbols-outlined ${isSpecial ? 'text-[#C5A059] opacity-60' : 'text-surface-tint opacity-50'}`}>mail</span>
          <div className={`font-accent-script text-accent-script ${isSpecial ? 'text-[#C5A059]/40 -rotate-2' : 'text-primary/40 -rotate-3'}`}>{numberStr}</div>
        </div>
        
        {/* Content */}
        <div className="text-center relative z-20">
          <h2 className={`font-headline-lg ${isSpecial ? 'text-[48px]' : 'text-[36px] md:text-[40px]'} leading-tight text-on-surface mb-4`}>
            {title1}<br/>
            <span className={`italic ${isSpecial ? 'text-[#C5A059]' : 'text-primary'}`}>{title2}</span>
          </h2>
          <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">{subtitle}</p>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col items-center gap-4">
          {!isUnlocked && isAdmin && (
            <div className="bg-[#16130d]/80 border border-green-500/30 backdrop-blur-sm px-4 py-2 rounded-sm text-[10px] font-label-caps tracking-[0.2em] text-green-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">key</span>
              ADMIN UNLOCK
            </div>
          )}
          {!isUnlocked && !isAdmin && (
            <div className="bg-[#16130d]/80 border border-[#C5A059]/30 backdrop-blur-sm px-4 py-2 rounded-sm text-[10px] font-label-caps tracking-[0.2em] text-[#C5A059] flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">lock</span>
              {days}D {hours}H {minutes}M {seconds}S
            </div>
          )}
          <div className={`h-[1px] ${isSpecial ? 'bg-[#C5A059]/30 w-16 group-hover:w-32' : 'bg-primary/30 w-12 group-hover:w-24'} transition-all duration-500`}></div>
        </div>

        {/* Lock Overlay */}
        {!effectivelyUnlocked && (
          <div className="absolute inset-0 z-30 bg-[#16130d]/40 backdrop-blur-[2px] rounded-DEFAULT overflow-hidden">
            {isSpecial && (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C5A059]/20 rounded-full blur-[40px] animate-pulse"></div>
                {/* Simulated simple particles */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-1 h-1 bg-[#C5A059] rounded-full absolute top-10 left-10 animate-[ping_3s_ease-in-out_infinite]"></div>
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full absolute top-32 right-10 animate-[ping_4s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-1 bg-[#C5A059] rounded-full absolute bottom-20 left-20 animate-[ping_2s_ease-in-out_infinite]"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
