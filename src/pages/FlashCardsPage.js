
import React from 'react';
import FlashCardList from '../components/FlashCardList'; 
import AnimatedBackground from '../animation/AnimatedBackground';



const FlashCardsPage = () => {
  return (
    <div>
      <AnimatedBackground />
      <h1 style={{ color: '#007bff' }}>Flash Cards</h1>
      <FlashCardList />
    </div>
  );
};

export default FlashCardsPage;
