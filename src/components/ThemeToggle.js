import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
  <button className="theme-toggle" onClick={toggleTheme}>
    <span className={`icon-sun ${theme === 'light' ? '' : 'hidden'}`}><i id="modes">DARK MODE OFF </i>🌞</span>
    <span className={`icon-moon ${theme === 'dark' ? '' : 'hidden'}`}> <i id="modes">DARK MODE ON</i> 🌜</span>
  </button>

  );
};

export default ThemeToggle;
