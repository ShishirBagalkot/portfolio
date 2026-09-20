import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const NIGHT_START_HOUR = 19; // 7pm
const NIGHT_END_HOUR = 6; // 6am

const getSystemPreference = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return null;
};

const getTimeOfDayTheme = () => {
  const hour = new Date().getHours();
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR ? 'dark' : 'light';
};

const getAutoTheme = () => getSystemPreference() || getTimeOfDayTheme();

const getInitialTheme = () => {
  const isManual = localStorage.getItem('themeSource') === 'manual';
  const stored = localStorage.getItem('theme');
  if (isManual && (stored === 'light' || stored === 'dark')) return stored;
  return getAutoTheme();
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keep following the system/time-of-day unless the visitor has toggled manually.
  useEffect(() => {
    const isManual = () => localStorage.getItem('themeSource') === 'manual';

    const recheck = () => {
      if (!isManual()) setTheme(getAutoTheme());
    };

    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', recheck);

    const interval = setInterval(recheck, 15 * 60 * 1000); // catch dusk/dawn crossing during a long visit

    return () => {
      media?.removeEventListener?.('change', recheck);
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    localStorage.setItem('themeSource', 'manual');
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
