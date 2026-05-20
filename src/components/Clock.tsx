import React from 'react';

interface ClockProps {
  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;
  theme: 'neumorphism' | 'glassmorphism' | 'cyberpunk' | 'luxury';
  isAlarmActive: boolean;
  showSeconds: boolean;
}

export const Clock: React.FC<ClockProps> = ({
  hourDeg,
  minuteDeg,
  secondDeg,
  theme,
  isAlarmActive,
  showSeconds,
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  // Clock theme styles
  const themeClasses = {
    neumorphism: {
      clockBg: 'bg-[#e0e5ec] border-[10px] border-[#e0e5ec] shadow-neumorphic-out',
      centerDot: 'bg-[#2d3436] border-2 border-white',
      numberColor: 'text-[#444] font-semibold font-sans',
      hourHand: 'bg-[#2d3436] w-[8px] h-[75px]',
      minuteHand: 'bg-[#636e72] w-[5px] h-[105px]',
      secondHand: 'bg-[#ff7675] w-[2px] h-[125px]',
      innerFace: 'absolute inset-2 rounded-full border border-white/30',
    },
    glassmorphism: {
      clockBg: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
      centerDot: 'bg-[#00f2fe] border-2 border-white/50 shadow-[0_0_10px_#00f2fe]',
      numberColor: 'text-white/80 font-medium font-sans drop-shadow-sm',
      hourHand: 'bg-white/70 w-[6px] h-[75px] rounded-full backdrop-blur-md border border-white/30',
      minuteHand: 'bg-white/40 w-[4px] h-[105px] rounded-full backdrop-blur-md border border-white/20',
      secondHand: 'bg-[#00f2fe] w-[2px] h-[125px] shadow-[0_0_12px_#00f2fe]',
      innerFace: 'absolute inset-0 rounded-full bg-radial-gradient from-white/5 to-transparent',
    },
    cyberpunk: {
      clockBg: 'bg-[#0a0a0f] border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.25)] cyberpunk-glow',
      centerDot: 'bg-pink-500 border-2 border-cyan-400 shadow-[0_0_10px_#ec4899]',
      numberColor: 'text-cyan-400 font-bold font-mono tracking-widest cyberpunk-glow',
      hourHand: 'bg-pink-500 w-[6px] h-[70px] shadow-[0_0_10px_#ec4899]',
      minuteHand: 'bg-purple-500 w-[4px] h-[100px] shadow-[0_0_10px_#a855f7]',
      secondHand: 'bg-yellow-400 w-[2px] h-[120px] shadow-[0_0_12px_#facc15]',
      innerFace: 'absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]',
    },
    luxury: {
      clockBg: 'bg-gradient-to-tr from-[#0b0c10] to-[#1f2833] border-[6px] border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.6),_inset_0_2px_15px_rgba(245,158,11,0.1)]',
      centerDot: 'bg-amber-400 border border-black shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
      numberColor: 'text-amber-400/90 font-semibold font-serif',
      hourHand: 'bg-gradient-to-b from-amber-400 to-amber-600 w-[5px] h-[75px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
      minuteHand: 'bg-gradient-to-b from-amber-400 to-amber-600 w-[3px] h-[105px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
      secondHand: 'bg-amber-300 w-[1.5px] h-[125px]',
      innerFace: 'absolute inset-4 rounded-full border border-amber-500/20 bg-radial-gradient from-transparent to-black/30',
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Dynamic Animated Background Blobs for Glassmorphism */}
      {theme === 'glassmorphism' && (
        <div className="absolute inset-0 w-[420px] h-[420px] -z-10 flex items-center justify-center">
          <div className="absolute top-[10%] left-[10%] w-[180px] h-[180px] bg-cyan-400/30 rounded-full blur-[40px] animate-blob-1" />
          <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] bg-fuchsia-400/30 rounded-full blur-[40px] animate-blob-2" />
          <div className="absolute top-[40%] right-[20%] w-[160px] h-[160px] bg-indigo-400/30 rounded-full blur-[45px] animate-blob-3" />
        </div>
      )}

      {/* Main Clock Face */}
      <div
        className={`w-[340px] h-[340px] rounded-full relative flex items-center justify-center transition-all duration-700 ease-in-out ${
          currentTheme.clockBg
        } ${isAlarmActive ? 'animate-ping duration-1000 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : ''}`}
      >
        {/* Inner face decorations */}
        <div className={currentTheme.innerFace} />

        {/* Dial ticks for Cyberpunk / Luxury themes */}
        {theme === 'cyberpunk' && (
          <div className="absolute inset-4 rounded-full border border-cyan-500/10 pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className={`absolute left-1/2 top-0 bottom-1/2 w-[1px] origin-bottom -translate-x-1/2 ${
                  i % 5 === 0 ? 'bg-cyan-400/50 h-[8px]' : 'bg-cyan-500/10 h-[4px]'
                }`}
                style={{ transform: `rotate(${i * 6}deg)` }}
              />
            ))}
          </div>
        )}

        {theme === 'luxury' && (
          <div className="absolute inset-6 rounded-full border border-amber-500/10 pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className={`absolute left-1/2 top-0 bottom-1/2 w-[1px] origin-bottom -translate-x-1/2 ${
                  i % 5 === 0 ? 'bg-amber-400/40 h-[6px]' : 'bg-amber-400/10 h-[3px]'
                }`}
                style={{ transform: `rotate(${i * 6}deg)` }}
              />
            ))}
          </div>
        )}

        {/* Numbers 1-12 */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {numbers.map((num, i) => {
            const rotation = num * 30;
            const displayText = theme === 'luxury' ? romanNumerals[i] : num.toString();
            return (
              <div
                key={num}
                className="absolute w-full h-full text-center"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  padding: theme === 'luxury' ? '24px' : '18px',
                }}
              >
                <span
                  className={`inline-block transition-all duration-500 ${currentTheme.numberColor}`}
                  style={{
                    transform: `rotate(-${rotation}deg)`,
                    fontSize: theme === 'luxury' ? '1.25rem' : theme === 'cyberpunk' ? '1.2rem' : '1.35rem',
                  }}
                >
                  {displayText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Clock Hands Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Hour Hand */}
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 transition-transform duration-75 ease-out rounded-full z-10"
            style={{
              transform: `translateX(-50%) rotate(${hourDeg}deg)`,
            }}
          >
            <div className={`rounded-full ${currentTheme.hourHand}`} />
          </div>

          {/* Minute Hand */}
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 transition-transform duration-75 ease-out rounded-full z-20"
            style={{
              transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
            }}
          >
            <div className={`rounded-full ${currentTheme.minuteHand}`} />
          </div>

          {/* Second Hand */}
          {showSeconds && (
            <div
              className="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 transition-transform duration-75 ease-out rounded-full z-30"
              style={{
                transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              }}
            >
              <div className={`rounded-full ${currentTheme.secondHand}`} />
            </div>
          )}

          {/* Center Pivot Dot */}
          <div className={`w-[14px] h-[14px] rounded-full z-40 ${currentTheme.centerDot}`} />
        </div>
      </div>
    </div>
  );
};
