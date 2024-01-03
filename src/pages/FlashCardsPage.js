
import React from 'react';
import FlashCardList from '../components/FlashCardList'; 
import AnimatedBackground from '../animation/AnimatedBackground';



const FlashCardsPage = () => {
  return (
    <div>
      <AnimatedBackground />
      <h1>Flash Cards</h1>
      <FlashCardList />
    </div>
  );
};

export default FlashCardsPage;
