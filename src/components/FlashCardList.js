import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import { getAllCards, updateCard, deleteCard } from '../services/flashCardService';
import '../styles/flashCard.css';

const FlashCardList = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchFlashCards = async () => {
      try {
        const cards = await getAllCards();
        if (isMounted) {
          setFlashCards(cards);
        }
      } catch (error) {
        console.error('Error fetching flash cards:', error);
        if (isMounted) {
          setError('Failed to fetch flash cards');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFlashCards();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateCard(id, updatedData);
      setFlashCards(flashCards.map(card => (card.id === id ? { ...card, ...updatedData } : card)));
    } catch (error) {
      console.error('Error updating flash card:', error);
      setError('Failed to update flash card');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setFlashCards(flashCards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting flash card:', error);
      setError('Failed to delete flash card');
    }
  };

  if (isLoading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flashcard-list">
      {flashCards.map(card => (
        <FlashCard 
          key={card.id} 
          id={card.id}
          front={card.front} 
          back={card.back} 
          lastModified={card.lastModified} 
          status={card.status} 
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FlashCardList;
