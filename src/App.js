import React,{ useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import FlashCardsPage from './pages/FlashCardsPage';
import ContactPage from './pages/ContactPage';
import NavBar from './components/NavBar';






function App() {
 
  return (
    <ThemeProvider>
    <Router>
    <ThemeApplicator />
    
      <NavBar />

      <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/flashcards" element={<FlashCardsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      

      </Routes>
    </Router>
    </ThemeProvider>
  );
}
function ThemeApplicator() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}

export default App;