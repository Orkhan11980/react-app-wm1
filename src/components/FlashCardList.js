import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import { getAllCards } from '../services/flashCardService'; // Adjust the path as per your project structure

const FlashCardList = () => {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const cards = await getAllCards();
        setFlashCards(cards);
      } catch (error) {
        console.error('Error fetching flash cards:', error);
        // Handle the error appropriately
      }
    };

    fetchFlashCards();
  }, []);

  
return (
    <div className="flashcard-list">
      {flashCards.map(card => (
        <FlashCard 
          key={card.id} 
          front={card.front} 
          back={card.back} 
          lastModified={card.lastModified} 
          status={card.status} 
        />
      ))}
    </div>
  );
  // ...
  
};

export default FlashCardList;
