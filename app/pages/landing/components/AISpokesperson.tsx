import { useState, useEffect, useRef } from 'react';
import { Button } from '../../../ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, X } from 'lucide-react';

interface AISpokespersonProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const voiceOverScript = {
  homePage: {
    title: "Main Page Introduction",
    estimatedDuration: "2.5 minutes",
    audioSrc: "/audio/main-page.mp3",
    script: `Welcome to Gemalgo dot trade - your portal to the NikolAI Algorithm's proven performance.

At Gemalgo, we believe in three core principles: Conservative. Consistent. Proven.

Unlike aggressive trading strategies that promise unrealistic returns with devastating drawdowns, the NikolAI Algorithm takes a disciplined, methodical approach. We focus on capital preservation first, consistent growth second, and proven results that speak for themselves.

On this page, you'll see three real client accounts, each demonstrating the same algorithm's performance across different timeframes and investment sizes. These aren't backtested simulations or cherry-picked examples - these are actual account statements showing real money, real trades, and real results.`
  },
  account800k: {
    title: "$800,000 Report",
    estimatedDuration: "3.5 min",
    audioSrc: "/audio/800000.mp3",
    script: `This is our flagship account - the one that started it all. In August 2023, a client invested $800,000 in the NikolAI Algorithm. Let's walk through what happened over the next 28 months.

Looking at the dashboard, the first thing you'll notice is the current portfolio value: $2,247,706. That's a total return of over $1.4 million dollars on an $800,000 investment. A 181% gain in just over two years.`
  },
  account50k: {
    title: "$50,000 Report",
    estimatedDuration: "3 min",
    audioSrc: "/audio/50000.mp3",
    script: `Now we're looking at a $50,000 account that started in May 2024. This account is particularly interesting because it shows how the NikolAI Algorithm performs regardless of account size.

The current portfolio value stands at $102,815. That's right - a $50,000 investment has grown to over $102,000 in just 19 months. That's a 105.6% return, effectively doubling the initial investment.`
  },
  account75k: {
    title: "$75,000 Report",
    estimatedDuration: "3 min",
    audioSrc: "/audio/75000.mp3",
    script: `This is our most recent account - $75,000 invested in March 2025. With only 9 months of data, this account gives us a real-time view of how the NikolAI Algorithm is performing right now, in current market conditions.

The portfolio value currently sits at $95,186. That's a gain of over $20,000 on a $75,000 investment - a 26.9% return in just 9 months. Annualized, that's exceptional performance by any standard.`
  },
  closing: {
    title: "Closing",
    estimatedDuration: "1.5 min",
    audioSrc: "/audio/cloasing.mp3",
    script: `You've now seen three different accounts, three different starting amounts, three different timeframes - and one consistent pattern: the NikolAI Algorithm delivers conservative, consistent, proven results.

Whether it's 28 months, 19 months, or 9 months - whether it's $800,000, $75,000, or $50,000 - the performance characteristics remain the same.`
  }
};

export function AISpokesperson({ onClose, isMobile }: AISpokespersonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState<'homePage' | 'account800k' | 'account50k' | 'account75k' | 'closing'>('homePage');
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sections = [
    { id: 'homePage' as const, title: 'Main Page', duration: '2.5 min' },
    { id: 'account800k' as const, title: '$800,000 Report', duration: '3.5 min' },
    { id: 'account50k' as const, title: '$50,000 Report', duration: '3 min' },
    { id: 'account75k' as const, title: '$75,000 Report', duration: '3 min' },
    { id: 'closing' as const, title: 'Closing', duration: '1.5 min' }
  ];

  // Initialize and clean up audio when section changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(voiceOverScript[currentSection].audioSrc);
      
      audioRef.current.onended = () => {
        const currentIdx = sections.findIndex(s => s.id === currentSection);
        if (currentIdx < sections.length - 1) {
          setCurrentSection(sections[currentIdx + 1].id);
          // It will auto-play because isPlaying is still true, and the next useEffect will handle it
        } else {
          setIsPlaying(false);
        }
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSection]);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      
      if (isPlaying) {
        // Catch any play promise errors (e.g., if audio file doesn't exist yet)
        audioRef.current.play().catch((err) => {
          console.warn("Audio play failed, likely missing file:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, currentSection]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIdx = sections.findIndex(s => s.id === currentSection);
    if (currentIdx < sections.length - 1) {
      setCurrentSection(sections[currentIdx + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIdx = sections.findIndex(s => s.id === currentSection);
    if (currentIdx > 0) {
      setCurrentSection(sections[currentIdx - 1].id);
    }
  };

  const handleSectionChange = (sectionId: typeof currentSection) => {
    setCurrentSection(sectionId);
    setIsPlaying(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className={`flex flex-col bg-[#0f1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMobile ? 'w-[calc(100vw-3rem)] max-w-sm' : isExpanded ? 'w-[360px] sm:w-[400px]' : 'w-[320px] sm:w-[360px]'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          <span className="text-white font-medium text-sm">NikolAI Guide</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:text-white transition-colors rounded-md hover:bg-white/5">
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:text-white transition-colors rounded-md hover:bg-white/5">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Avatar & Title Row */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-full border-2 ${isPlaying ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)] animate-pulse' : 'border-blue-600'} bg-[#0B1221] flex items-center justify-center overflow-hidden`}>
               <img src="/sean.jpg" alt="Sean" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-white font-semibold text-sm truncate mb-1">
              {voiceOverScript[currentSection].title}
            </h3>
            {!isExpanded ? (
               <p className="text-gray-400 text-xs leading-relaxed">
                  {truncateText(voiceOverScript[currentSection].script, 60)}
               </p>
            ) : (
               <p className="text-gray-500 text-xs">
                 {voiceOverScript[currentSection].estimatedDuration}
               </p>
            )}
          </div>
        </div>

        {/* Expanded Body */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Text Box */}
            <div className="bg-[#141620] border border-white/5 rounded-xl p-4 mb-4 h-[120px] overflow-y-auto custom-scrollbar">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {voiceOverScript[currentSection].script}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 px-1">
                <span>Section {sections.findIndex(s => s.id === currentSection) + 1}/{sections.length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1">
                <div 
                  className="bg-slate-600 h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(sections.findIndex(s => s.id === currentSection) + (isPlaying ? 0.5 : 0)) * 100 / sections.length}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Controls Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevious}
              disabled={currentSection === 'homePage'}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={handlePlayPause}
              className={`w-12 h-10 flex items-center justify-center rounded-lg text-white transition-all duration-300 shadow-lg ${
                isExpanded 
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button 
              onClick={handleNext}
              disabled={currentSection === 'closing'}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Jump to Section */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="text-[11px] text-gray-500 uppercase tracking-wider mb-2 px-1">Jump to Section:</h4>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border transition-all duration-200 ${
                    currentSection === section.id
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className={`text-xs font-bold ${currentSection === section.id ? 'text-white' : 'text-slate-300'}`}>{section.title}</span>
                  <span className={`text-[10px] ${currentSection === section.id ? 'text-blue-200' : 'text-slate-500'}`}>{section.duration}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
