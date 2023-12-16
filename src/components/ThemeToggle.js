import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
  <button className="theme-toggle" onClick={toggleTheme}>
    <span className={`icon-sun ${theme === 'light' ? '' : 'hidden'}`}>🌞</span>
    <span className={`icon-moon ${theme === 'dark' ? '' : 'hidden'}`}>🌜</span>
  </button>

  );
};

export default ThemeToggle;
