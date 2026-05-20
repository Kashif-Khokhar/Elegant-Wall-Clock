import { useState, useEffect, useRef } from 'react';
import { Clock } from './components/Clock';
import { Controls } from './components/Controls';
import { Clock as ClockIcon } from 'lucide-react';
import { worldwideTimezones, countryBgs } from './utils/timezones';

type ThemeType = 'neumorphism' | 'glassmorphism' | 'cyberpunk' | 'luxury';

function App() {
  const [theme, setTheme] = useState<ThemeType>('neumorphism');
  const [isSweep, setIsSweep] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [timezone, setTimezone] = useState('local');
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [alarmTimezone, setAlarmTimezone] = useState<string>('local');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  // Compute active background image according to selected zone
  const activeBg = (() => {
    if (timezone === 'local') return countryBgs['default'];
    
    const found = worldwideTimezones.find(tz => tz.value === timezone);
    
    if (found) {
      // 1. Check curated premium capital city backgrounds first
      if (countryBgs[found.country]) {
        return countryBgs[found.country];
      }
      
      // 2. Generate dynamic city/capital featured backdrop for other zones
      // Split names like "Mumbai / New Delhi" to search for the specific city
      const cleanCityName = found.name.split('/').pop()?.trim() || found.name;
      const cleanQuery = `${cleanCityName.toLowerCase().replace(/\s+/g, '-')},${found.country.toLowerCase().replace(/\s+/g, '-')},skyline`;
      return `https://images.unsplash.com/featured/1920x1080/?${cleanQuery}`;
    }
    
    return countryBgs['default'];
  })();

  // Background cross-dissolve states
  const [currentBg, setCurrentBg] = useState(activeBg);
  const [prevBg, setPrevBg] = useState(activeBg);
  const [bgOpacity, setBgOpacity] = useState(1);

  // Trigger background cross-dissolve fade when activeBg changes
  useEffect(() => {
    if (activeBg !== currentBg) {
      setPrevBg(currentBg);
      setCurrentBg(activeBg);
      setBgOpacity(0);
      const timeout = setTimeout(() => {
        setBgOpacity(1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [activeBg, currentBg]);

  // Degrees state
  const [hourDeg, setHourDeg] = useState(0);
  const [minuteDeg, setMinuteDeg] = useState(0);
  const [secondDeg, setSecondDeg] = useState(0);
  const [digitalTime, setDigitalTime] = useState('');

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<number | null>(null);

  // 1. Web Audio API Chime Synthesizer
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSoftChime = (freq: number, duration = 2.0, volume = 0.35) => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Add a higher-frequency harmonic for a crystal/bell bell tone
      const harmonicOsc = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      harmonicOsc.type = 'triangle';
      harmonicOsc.frequency.setValueAtTime(freq * 1.5, ctx.currentTime); // Perfect fifth harmonic

      // Envelope for natural bell strike decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      harmonicGain.gain.setValueAtTime(0, ctx.currentTime);
      harmonicGain.gain.linearRampToValueAtTime(volume * 0.35, ctx.currentTime + 0.04);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 0.7);

      osc.connect(gainNode);
      harmonicOsc.connect(harmonicGain);

      gainNode.connect(ctx.destination);
      harmonicGain.connect(ctx.destination);

      osc.start();
      harmonicOsc.start();

      osc.stop(ctx.currentTime + duration);
      harmonicOsc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context error playing chime:', e);
    }
  };

  // Test sound: Play a dual chime (C5 & G5)
  const handleTestChime = () => {
    playSoftChime(523.25, 2.0, 0.4); // C5
    setTimeout(() => {
      playSoftChime(783.99, 1.8, 0.25); // G5
    }, 120);
  };

  // Triggering recurring alarm chimes
  const triggerAlarmSound = () => {
    let step = 0;
    const playSequence = () => {
      // Elegant crystal arpeggio: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (isAlarmActive || step === 0) { // check if still active
            playSoftChime(freq, 2.2, 0.3);
          }
        }, idx * 150);
      });
      step++;
    };

    // Play immediately, then every 3.5 seconds
    playSequence();
    const interval = setInterval(playSequence, 3500);
    alarmIntervalRef.current = interval as any;
  };

  // Stop current alarm sequence
  const handleStopAlarm = () => {
    setIsAlarmActive(false);
    setAlarmEnabled(false);
    setAlarmTime(null);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  };

  // Helper: Get structured time parts adjusted to timezone
  const getTzParts = (tz: string) => {
    const now = new Date();
    const ms = now.getMilliseconds();
    if (tz === 'local') {
      return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds(), ms };
    }
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
      });
      const parts = formatter.formatToParts(now);
      const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0');
      return { hours, minutes, seconds, ms };
    } catch (e) {
      console.error('Invalid Timezone:', tz, e);
      return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds(), ms };
    }
  };

  // 2. Clock animation loop using requestAnimationFrame for continuous sweeping
  useEffect(() => {
    let animationId: number;

    const tick = () => {
      const { hours, minutes, seconds, ms } = getTzParts(timezone);

      // Calculation of degrees
      let secFraction = seconds;
      if (isSweep) {
        secFraction += ms / 1000;
      }

      const secDeg = (secFraction / 60) * 360;
      const minDeg = ((minutes + secFraction / 60) / 60) * 360;
      const hrDeg = (((hours % 12) + minutes / 60) / 12) * 360;

      setSecondDeg(secDeg);
      setMinuteDeg(minDeg);
      setHourDeg(hrDeg);

      // Format digital clock text
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      setDigitalTime(`${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`);

      // Alarm evaluation once a second (checking integer seconds) using alarmTimezone
      if (alarmEnabled && alarmTime && !isAlarmActive && ms < 30) {
        const alarmTzParts = getTzParts(alarmTimezone);
        const currentAlarmFormat = `${pad(alarmTzParts.hours)}:${pad(alarmTzParts.minutes)}`;
        if (currentAlarmFormat === alarmTime) {
          setIsAlarmActive(true);
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [timezone, alarmTimezone, isSweep, alarmEnabled, alarmTime, isAlarmActive]);

  // Handle active alarm sound looping
  useEffect(() => {
    if (isAlarmActive) {
      triggerAlarmSound();
    } else {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    }

    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
    };
  }, [isAlarmActive]);

  // Page background configurations
  const getBaseThemeBg = () => {
    switch (theme) {
      case 'neumorphism': return 'bg-[#e0e5ec]';
      case 'glassmorphism': return 'bg-slate-950';
      case 'cyberpunk': return 'bg-[#030306]';
      case 'luxury': return 'bg-neutral-950';
    }
  };

  const getPageTextColor = () => {
    switch (theme) {
      case 'neumorphism': return 'text-gray-800';
      case 'glassmorphism': return 'text-white';
      case 'cyberpunk': return 'text-cyan-400';
      case 'luxury': return 'text-amber-100';
    }
  };

  const getOverlayStyle = () => {
    switch (theme) {
      case 'neumorphism':
        return { backgroundColor: 'rgba(224, 229, 236, 0.42)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' };
      case 'glassmorphism':
        return { backgroundColor: 'rgba(2, 6, 23, 0.38)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' };
      case 'cyberpunk':
        return { backgroundColor: 'rgba(3, 3, 6, 0.42)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' };
      case 'luxury':
        return {
          backgroundColor: 'rgba(5, 5, 7, 0.42)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.9)'
        };
    }
  };

  const getTitleFont = () => {
    switch (theme) {
      case 'neumorphism': return 'font-sans font-bold tracking-tight';
      case 'glassmorphism': return 'font-sans font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400';
      case 'cyberpunk': return 'font-mono font-black uppercase tracking-wider cyberpunk-glow text-cyan-400';
      case 'luxury': return 'font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600';
    }
  };

  const getDigitalFont = () => {
    switch (theme) {
      case 'neumorphism': return 'font-mono text-gray-600 bg-gray-200/50 shadow-inner rounded-xl px-4 py-2 text-2xl';
      case 'glassmorphism': return 'font-mono text-white bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 text-2xl backdrop-blur-md shadow-lg';
      case 'cyberpunk': return 'font-mono text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] border border-cyan-500/30 bg-[#090912] rounded-lg px-5 py-2.5 text-3xl tracking-widest cyberpunk-glow';
      case 'luxury': return 'font-serif italic text-amber-400/90 tracking-wide text-2xl';
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-between p-6 transition-all duration-700 ease-in-out overflow-hidden ${getPageTextColor()}`}>
      
      {/* Full-screen Background Backdrop Layers */}
      <div className="absolute inset-0 z-[-10] overflow-hidden pointer-events-none select-none">
        {/* Base Theme Color Fallback Underlayer */}
        <div className={`absolute inset-0 transition-colors duration-700 ${getBaseThemeBg()}`} />
        
        {/* Previous Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url("${prevBg}")` }}
        />
        {/* Current Background Image (transitions opacity) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: `url("${currentBg}")`, opacity: bgOpacity }}
        />
        {/* Theme-Specific Readability Overlay with explicit inline styles */}
        <div className="absolute inset-0 transition-all duration-700 ease-in-out" style={getOverlayStyle()} />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <ClockIcon className={`w-8 h-8 ${theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'luxury' ? 'text-amber-400' : 'text-gray-600'}`} />
          <h1 className={`text-xl sm:text-2xl transition-all duration-700 ease-in-out ${getTitleFont()}`}>
            Elegant Chronos
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12 my-8">
        
        {/* Clock Face & Digital Display */}
        <div className="flex flex-col items-center justify-center gap-8 lg:w-1/2">
          
          <Clock
            hourDeg={hourDeg}
            minuteDeg={minuteDeg}
            secondDeg={secondDeg}
            theme={theme}
            isAlarmActive={isAlarmActive}
            showSeconds={showSeconds}
          />

          {/* Premium Digital Clock Display */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Digital Time</span>
            <div className={`transition-all duration-700 ease-in-out ${getDigitalFont()}`}>
              {digitalTime || '00:00:00 AM'}
            </div>
            <span className="text-[11px] opacity-75 mt-1">
              Timezone: <span className="font-semibold">{timezone === 'local' ? 'Local Time' : timezone}</span>
            </span>
          </div>

        </div>

        {/* Controls Panel */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <Controls
            theme={theme}
            setTheme={setTheme}
            isSweep={isSweep}
            setIsSweep={setIsSweep}
            showSeconds={showSeconds}
            setShowSeconds={setShowSeconds}
            timezone={timezone}
            setTimezone={setTimezone}
            alarmTime={alarmTime}
            setAlarmTime={setAlarmTime}
            alarmTimezone={alarmTimezone}
            setAlarmTimezone={setAlarmTimezone}
            alarmEnabled={alarmEnabled}
            setAlarmEnabled={setAlarmEnabled}
            isAlarmActive={isAlarmActive}
            stopAlarm={handleStopAlarm}
            testChime={handleTestChime}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl text-center py-4 border-t border-white/5 opacity-65 text-xs">
        <p>&copy; {new Date().getFullYear()} Elegant Chronos. Styled with Tailwind CSS & built with React Vite.</p>
      </footer>
    </div>
  );
}

export default App;
