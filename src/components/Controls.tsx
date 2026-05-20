import React, { useState } from 'react';
import { 
  Palette, 
  Globe, 
  Activity, 
  Bell, 
  BellOff, 
  Eye, 
  EyeOff, 
  Volume2,
  Clock as ClockIcon,
  Search
} from 'lucide-react';
import { worldwideTimezones } from '../utils/timezones';

interface ControlsProps {
  theme: 'neumorphism' | 'glassmorphism' | 'cyberpunk' | 'luxury';
  setTheme: (theme: 'neumorphism' | 'glassmorphism' | 'cyberpunk' | 'luxury') => void;
  isSweep: boolean;
  setIsSweep: (isSweep: boolean) => void;
  showSeconds: boolean;
  setShowSeconds: (show: boolean) => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  alarmTime: string | null;
  setAlarmTime: (time: string | null) => void;
  alarmTimezone: string;
  setAlarmTimezone: (tz: string) => void;
  alarmEnabled: boolean;
  setAlarmEnabled: (enabled: boolean) => void;
  isAlarmActive: boolean;
  stopAlarm: () => void;
  testChime: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  theme,
  setTheme,
  isSweep,
  setIsSweep,
  showSeconds,
  setShowSeconds,
  timezone,
  setTimezone,
  alarmTime,
  setAlarmTime,
  alarmTimezone,
  setAlarmTimezone,
  alarmEnabled,
  setAlarmEnabled,
  isAlarmActive,
  stopAlarm,
  testChime,
}) => {
  const [alarmInput, setAlarmInput] = useState('07:00');
  
  const [showPicker, setShowPicker] = useState(false);
  const [selHour, setSelHour] = useState('07');
  const [selMin, setSelMin] = useState('00');
  const [selAmpm, setSelAmpm] = useState('AM');

  // Worldwide search timezone states
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Helper: Format 24h time string (HH:MM) to 12h AM/PM format
  const format12h = (time24: string | null) => {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${mStr} ${ampm}`;
  };

  const themes: { name: string; value: typeof theme; desc: string; preview: string }[] = [
    { name: 'Classic Neumorphism', value: 'neumorphism', desc: 'Soft 3D curves & shadows', preview: 'bg-[#e0e5ec] text-[#444]' },
    { name: 'Frosted Glassmorphism', value: 'glassmorphism', desc: 'Translucent & vibrant blobs', preview: 'bg-slate-900/85 text-white border border-white/20 backdrop-blur-md' },
    { name: 'Cyberpunk Neon', value: 'cyberpunk', desc: 'Electric pink & cyan pulse', preview: 'bg-[#0a0a0f] text-cyan-400 border border-cyan-500/50' },
    { name: 'Luxury Minimalist', value: 'luxury', desc: 'Brushed gold & deep obsidian', preview: 'bg-gradient-to-tr from-black to-[#1f2833] text-amber-400 border border-amber-500/30' },
  ];

  const timezones = [
    { name: 'Local Time', value: 'local' },
    { name: 'London (GMT/BST)', value: 'Europe/London' },
    { name: 'New York (EST/EDT)', value: 'America/New_York' },
    { name: 'Tokyo (JST)', value: 'Asia/Tokyo' },
    { name: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
  ];

  const filteredWorldwideTimezones = worldwideTimezones.filter((tz) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      tz.name.toLowerCase().includes(query) ||
      tz.country.toLowerCase().includes(query) ||
      tz.value.toLowerCase().includes(query) ||
      (tz.aliases && tz.aliases.some(alias => alias.toLowerCase().includes(query)))
    );
  });

  const isCustomTz = !timezones.some(tz => tz.value === timezone);
  const currentTzName = isCustomTz
    ? (() => {
        const found = worldwideTimezones.find(tz => tz.value === timezone);
        return found ? `${found.name} (${found.country})` : timezone;
      })()
    : '';

  const handleSetAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    setAlarmTime(alarmInput);
    setAlarmTimezone(timezone);
    setAlarmEnabled(true);
  };

  const handleCancelAlarm = () => {
    setAlarmTime(null);
    setAlarmEnabled(false);
  };

  // Base styling adjustments based on current theme
  const getPanelClass = () => {
    switch (theme) {
      case 'neumorphism':
        return 'bg-[#e0e5ec] border border-[#e0e5ec] shadow-neumorphic-out text-gray-700';
      case 'glassmorphism':
        return 'bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl';
      case 'cyberpunk':
        return 'bg-[#06060c] border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-mono';
      case 'luxury':
        return 'bg-[#0c0d10] border border-amber-500/20 text-amber-200/90 shadow-[0_15px_30px_rgba(0,0,0,0.5)]';
    }
  };

  const getButtonClass = (active: boolean) => {
    if (active) {
      switch (theme) {
        case 'neumorphism': return 'shadow-neumorphic-in text-gray-900 font-bold bg-[#e0e5ec]';
        case 'glassmorphism': return 'bg-white/20 text-white border border-white/40 shadow-inner';
        case 'cyberpunk': return 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)]';
        case 'luxury': return 'bg-amber-500/20 border border-amber-400 text-amber-300';
      }
    } else {
      switch (theme) {
        case 'neumorphism': return 'hover:bg-gray-100/50 shadow-none text-gray-500';
        case 'glassmorphism': return 'hover:bg-white/5 bg-transparent border border-white/10 text-white/60';
        case 'cyberpunk': return 'hover:bg-cyan-950/20 border border-cyan-500/20 text-cyan-500/60';
        case 'luxury': return 'hover:bg-amber-950/10 border border-amber-500/10 text-amber-500/60';
      }
    }
  };

  const getInputClass = () => {
    switch (theme) {
      case 'neumorphism': return 'bg-[#e0e5ec] shadow-neumorphic-in border-none text-gray-700 hover:bg-gray-200/40';
      case 'glassmorphism': return 'bg-white/5 border border-white/15 text-white hover:bg-white/10';
      case 'cyberpunk': return 'bg-black border border-cyan-500/40 text-cyan-400 hover:border-cyan-400 shadow-[inset_0_0_8px_rgba(6,182,212,0.1)]';
      case 'luxury': return 'bg-black border border-amber-500/30 text-amber-400 hover:border-amber-400';
    }
  };

  const getPrimaryBtnClass = () => {
    switch (theme) {
      case 'neumorphism': return 'shadow-neumorphic-out hover:shadow-neumorphic-in transition-all text-gray-800 bg-[#e0e5ec] font-semibold rounded-lg px-4 py-2.5 w-full';
      case 'glassmorphism': return 'bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-lg px-4 py-2.5 transition-all w-full';
      case 'cyberpunk': return 'bg-pink-600 hover:bg-pink-500 border border-pink-400 text-white font-bold rounded-md px-4 py-2.5 shadow-[0_0_10px_#db2777] transition-all w-full';
      case 'luxury': return 'bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-md px-4 py-2.5 transition-all w-full';
    }
  };

  const getActiveItemClass = () => {
    switch (theme) {
      case 'neumorphism': return 'shadow-neumorphic-in text-gray-900 bg-[#e0e5ec] font-bold';
      case 'glassmorphism': return 'bg-white/20 text-white font-bold shadow-inner';
      case 'cyberpunk': return 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow-[0_0_6px_rgba(6,182,212,0.3)] font-black';
      case 'luxury': return 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold';
    }
  };

  const getInactiveItemClass = () => {
    switch (theme) {
      case 'neumorphism': return 'text-gray-700 hover:text-gray-950 hover:bg-gray-300/40 transition-colors duration-200';
      case 'glassmorphism': return 'text-slate-200/75 hover:text-white hover:bg-white/10 transition-colors duration-200';
      case 'cyberpunk': return 'text-cyan-400/70 hover:text-cyan-100 hover:bg-cyan-950/45 border border-transparent hover:border-cyan-500/25 transition-all duration-200';
      case 'luxury': return 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/35 border border-transparent hover:border-amber-500/25 transition-all duration-200';
    }
  };

  const getIanaClass = () => {
    switch (theme) {
      case 'neumorphism': return 'text-[10px] text-gray-500 font-normal italic';
      case 'glassmorphism': return 'text-[10px] text-white/50 font-normal italic';
      case 'cyberpunk': return 'text-[10px] text-pink-400/60 font-mono italic';
      case 'luxury': return 'text-[10px] text-amber-500/60 font-serif italic';
    }
  };

  return (
    <div className={`w-full max-w-md p-6 rounded-2xl transition-all duration-700 ease-in-out ${getPanelClass()} flex flex-col gap-6`}>
      
      {/* SECTION 1: Theme Selection */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
          <Palette size={16} className={theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'luxury' ? 'text-amber-400' : ''} />
          Choose Visual Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`p-3 rounded-xl cursor-pointer text-left transition-all duration-300 whitespace-normal break-words ${
                theme === t.value 
                  ? 'ring-2 ' + (theme === 'cyberpunk' ? 'ring-pink-500' : theme === 'luxury' ? 'ring-amber-400' : 'ring-blue-500') 
                  : 'opacity-70 hover:opacity-100'
              } ${t.preview}`}
            >
              <div className="font-bold text-xs leading-tight whitespace-normal break-words">{t.name}</div>
              <div className="text-[10px] opacity-75 mt-1.5 leading-normal whitespace-normal break-words">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <hr className="opacity-10 border-current" />

      {/* SECTION 2: Movement & Preferences */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
          <Activity size={16} className={theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'luxury' ? 'text-amber-400' : ''} />
          Movement Preferences
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsSweep(true)}
            className={`px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all text-center ${getButtonClass(isSweep)}`}
          >
            Continuous Sweep
          </button>
          <button
            onClick={() => setIsSweep(false)}
            className={`px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all text-center ${getButtonClass(!isSweep)}`}
          >
            Traditional Tick
          </button>
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            className={`px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 col-span-2 ${getButtonClass(showSeconds)}`}
          >
            {showSeconds ? <Eye size={14} /> : <EyeOff size={14} />}
            {showSeconds ? 'Hide Second Hand' : 'Show Second Hand'}
          </button>
        </div>
      </div>

      <hr className="opacity-10 border-current" />

      {/* SECTION 3: Timezones */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
          <Globe size={16} className={theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'luxury' ? 'text-amber-400' : ''} />
          Timezone Selector
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {timezones.slice(0, 4).map((tz) => (
            <button
              key={tz.value}
              onClick={() => {
                setTimezone(tz.value);
                setSearchQuery('');
              }}
              className={`px-2.5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all text-center truncate ${getButtonClass(timezone === tz.value)}`}
            >
              {tz.name}
            </button>
          ))}
          <button
            onClick={() => {
              setTimezone(timezones[4].value);
              setSearchQuery('');
            }}
            className={`px-2.5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all text-center truncate col-span-2 ${getButtonClass(timezone === timezones[4].value)}`}
          >
            {timezones[4].name}
          </button>
        </div>

        {/* Searchable Worldwide Dropup Picker */}
        <div className="relative mt-3 w-full">
          {isCustomTz && (
            <div className="text-[10px] uppercase font-bold tracking-wider mb-1.5 opacity-75 flex items-center gap-1">
              <Globe size={11} className={theme === 'cyberpunk' ? 'text-pink-500 animate-pulse' : 'text-amber-500'} />
              Active custom: <span className="underline decoration-current font-extrabold">{currentTzName}</span>
            </div>
          )}
          
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search worldwide city..."
              className={`w-full text-xs rounded-lg py-2.5 pl-8.5 pr-4 flex items-center justify-between cursor-text transition-all duration-300 ${getInputClass()}`}
            />
            <Search size={13} className="absolute left-3 top-3.5 opacity-50" />
          </div>

          {showSearchDropdown && (
            <>
              {/* Click-away overlay */}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowSearchDropdown(false)}
              />
              
              {/* Dropup list of filtered timezones */}
              <div className={`absolute left-0 right-0 z-50 bottom-full mb-2 max-h-48 overflow-y-auto p-2 rounded-xl border transition-all duration-500 shadow-2xl flex flex-col gap-1 ${
                theme === 'neumorphism' ? 'bg-[#e0e5ec] border-white/60 shadow-neumorphic-out text-gray-700' :
                theme === 'glassmorphism' ? 'bg-slate-950/95 backdrop-blur-xl border-white/15 text-white' :
                theme === 'cyberpunk' ? 'bg-[#090912] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-cyan-400 font-mono' :
                'bg-[#0f1013] border-amber-500/30 text-amber-100'
              }`}
              style={{ scrollbarWidth: 'thin' }}
              >
                <div className="text-[9px] uppercase opacity-55 font-black tracking-wider pb-1 px-1.5 border-b border-current/10 mb-1 sticky top-0 bg-inherit z-10">
                  Global Cities ({filteredWorldwideTimezones.length})
                </div>

                {filteredWorldwideTimezones.length > 0 ? (
                  filteredWorldwideTimezones.map((tz) => (
                    <button
                      key={`${tz.value}-${tz.name}`}
                      type="button"
                      onClick={() => {
                        setTimezone(tz.value);
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                      className={`w-full py-2 px-3 text-left text-xs font-semibold rounded cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        timezone === tz.value ? getActiveItemClass() : getInactiveItemClass()
                      }`}
                    >
                      <span>{tz.name} ({tz.country})</span>
                      <span className={getIanaClass()}>{tz.value}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-[11px] opacity-50 py-3 text-center">No cities found matching "{searchQuery}"</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="opacity-10 border-current" />

      {/* SECTION 4: Smart Alarm */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
          <Bell size={16} className={theme === 'cyberpunk' ? 'text-cyan-400' : theme === 'luxury' ? 'text-amber-400' : ''} />
          Smart Alarm
        </h3>

        {isAlarmActive ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between gap-3 animate-pulse">
            <div>
              <div className="font-bold text-red-500 text-xs sm:text-sm flex items-center gap-1.5">
                <Bell className="animate-bounce" size={14} />
                Alarm Triggered!
              </div>
              <div className="text-[11px] text-red-400 mt-1">
                Wake up! It is {format12h(alarmTime)} ({timezones.find(tz => tz.value === alarmTimezone)?.name || alarmTimezone}).
              </div>
            </div>
            <button
              onClick={stopAlarm}
              className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg px-3 py-1.5 text-xs transition-all shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-none"
            >
              DISMISS
            </button>
          </div>
        ) : alarmEnabled && alarmTime ? (
          <div className={`border rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors ${
            theme === 'cyberpunk' ? 'border-cyan-500/20 bg-cyan-500/5' : theme === 'luxury' ? 'border-amber-500/20 bg-amber-500/5' : 'border-gray-300 bg-gray-50/50'
          }`}>
            <div>
              <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                <Bell size={14} className="text-green-500" />
                Alarm: <span className="underline">{format12h(alarmTime)}</span>
              </div>
              <div className="text-[10px] opacity-75 mt-0.5">
                Active zone: <span className="font-bold">{timezones.find(tz => tz.value === alarmTimezone)?.name || alarmTimezone}</span>
              </div>
            </div>
            <button
              onClick={handleCancelAlarm}
              className={`flex items-center gap-1 font-semibold rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                theme === 'cyberpunk' ? 'bg-zinc-800 border border-cyan-500/30 text-cyan-400 hover:bg-zinc-750' : 'bg-gray-250 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <BellOff size={12} />
              Cancel
            </button>
          </div>
        ) : (
          <form onSubmit={handleSetAlarm} className="flex flex-col gap-2.5 w-full">
            
            {/* Custom Time Selection Popover Input */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className={`w-full text-center text-sm rounded-lg py-2.5 px-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${getInputClass()}`}
              >
                <span className="flex items-center gap-2 font-semibold text-xs opacity-65 uppercase tracking-wider">
                  <ClockIcon size={14} />
                  Time:
                </span>
                <span className="font-bold text-base tracking-widest">
                  {selHour}:{selMin} {selAmpm}
                </span>
                <ClockIcon size={14} className="opacity-0" /> {/* Spacer for symmetry */}
              </button>

              {showPicker && (
                <>
                  {/* Click-away overlay */}
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => {
                      // Apply time when clicking away
                      const hourNum = parseInt(selHour);
                      let hr24 = hourNum;
                      if (selAmpm === 'PM' && hourNum !== 12) hr24 += 12;
                      if (selAmpm === 'AM' && hourNum === 12) hr24 = 0;
                      setAlarmInput(`${hr24.toString().padStart(2, '0')}:${selMin}`);
                      setShowPicker(false);
                    }}
                  />
                  
                  {/* Styled Popover Modal */}
                  <div className={`absolute left-0 right-0 z-50 bottom-full mb-2 p-4 rounded-xl border transition-all duration-500 shadow-2xl flex flex-col ${
                    theme === 'neumorphism' ? 'bg-[#e0e5ec] border-white/60 shadow-neumorphic-out text-gray-700' :
                    theme === 'glassmorphism' ? 'bg-slate-950/95 backdrop-blur-xl border-white/15 text-white' :
                    theme === 'cyberpunk' ? 'bg-[#090912] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-cyan-400 font-mono' :
                    'bg-[#0f1013] border-amber-500/30 text-amber-100'
                  }`}>
                    
                    {/* Columns Selector */}
                    <div className="flex gap-4 justify-center h-32 border-b border-current/10 pb-2">
                      {/* Hours Column */}
                      <div 
                        className="flex flex-col overflow-y-auto w-12 text-center" 
                        style={{ scrollbarWidth: 'none' }}
                      >
                        <div className="text-[9px] uppercase opacity-55 mb-1.5 font-black tracking-wider sticky top-0 bg-inherit py-1">Hour</div>
                        {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setSelHour(h)}
                            className={`py-1 text-sm font-semibold rounded cursor-pointer transition-all ${
                              selHour === h ? getActiveItemClass() : getInactiveItemClass()
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>

                      {/* Minutes Column */}
                      <div 
                        className="flex flex-col overflow-y-auto w-12 text-center"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        <div className="text-[9px] uppercase opacity-55 mb-1.5 font-black tracking-wider sticky top-0 bg-inherit py-1">Min</div>
                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelMin(m)}
                            className={`py-1 text-sm font-semibold rounded cursor-pointer transition-all ${
                              selMin === m ? getActiveItemClass() : getInactiveItemClass()
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>

                      {/* Period (AM/PM) Column */}
                      <div className="flex flex-col w-12 text-center justify-center gap-1.5">
                        <div className="text-[9px] uppercase opacity-55 mb-2.5 font-black tracking-wider">Period</div>
                        {['AM', 'PM'].map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setSelAmpm(a)}
                            className={`py-2 text-xs font-bold rounded cursor-pointer transition-all ${
                              selAmpm === a ? getActiveItemClass() : getInactiveItemClass()
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const hourNum = parseInt(selHour);
                        let hr24 = hourNum;
                        if (selAmpm === 'PM' && hourNum !== 12) hr24 += 12;
                        if (selAmpm === 'AM' && hourNum === 12) hr24 = 0;
                        setAlarmInput(`${hr24.toString().padStart(2, '0')}:${selMin}`);
                        setShowPicker(false);
                      }}
                      className={`w-full py-2 mt-3 text-xs font-bold rounded-lg text-center cursor-pointer transition-all ${
                        theme === 'cyberpunk' ? 'bg-cyan-500 text-black hover:bg-cyan-400 font-mono shadow-[0_0_10px_rgba(6,182,212,0.4)]' :
                        theme === 'luxury' ? 'bg-amber-500 text-black hover:bg-amber-400' :
                        theme === 'glassmorphism' ? 'bg-white/25 hover:bg-white/35 text-white border border-white/20' :
                        'shadow-neumorphic-out hover:shadow-neumorphic-in text-gray-800 bg-[#e0e5ec]'
                      }`}
                    >
                      Confirm Time
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Set Alarm Actions Button Row */}
            <div className="flex gap-2 w-full">
              <button
                type="submit"
                className={`flex-1 text-xs font-semibold cursor-pointer ${getPrimaryBtnClass()}`}
              >
                Set Alarm
              </button>
              <button
                type="button"
                onClick={testChime}
                title="Test Alarm Sound"
                className={`px-3 py-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-center ${
                  theme === 'cyberpunk' ? 'hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 
                  theme === 'luxury' ? 'hover:bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                  'hover:bg-gray-150 border border-gray-300 text-gray-500 shadow-neumorphic-out hover:shadow-neumorphic-in'
                }`}
              >
                <Volume2 size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
