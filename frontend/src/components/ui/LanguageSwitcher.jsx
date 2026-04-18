import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const { currentLanguage, LANGUAGES, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
          border border-gray-700 hover:border-gray-500
          bg-transparent text-sm text-white transition-all"
      >
        <Globe size={15} className="text-gray-400" />
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:block text-xs">{currentLanguage.name}</span>
        <ChevronDown size={13} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48
          bg-dark-card border border-gray-700 rounded-xl
          shadow-2xl z-50 overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  switchLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3
                  px-4 py-3 text-sm text-left hover:bg-gray-800/50
                  transition-colors ${
                    currentLanguage.code === lang.code
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300'
                  }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguage.code === lang.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
