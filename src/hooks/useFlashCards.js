
import { useState, useEffect } from 'react';
import { getAllCards, updateCard, deleteCard, createCard } from '../services/flashCardService';
import { formatDate } from '../utils/utils';  



const useFlashCards = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCard, setNewCard] = useState({ front: '', back: '',status: 'Noted', lastModified: formatDate(new Date()) });
  
  
  useEffect(() => {
    let isMounted = true;

    const fetchFlashCards = async () => {
      try {
        let cards = await getAllCards();
        cards.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        if (isMounted) {
          setFlashCards(cards);
        }
      } catch (error) {
        console.error('Error fetching flash cards:', error);
        if (isMounted) {
          setError('Failed to fetch flash cards. Make sure server is running');
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

  // Update a flashcard
  const handleUpdate = async (id, updatedData) => {
    try {
      const newDataWithTime = {
        ...updatedData,
        lastModified: formatDate(new Date())
      };

      await updateCard(id, newDataWithTime);

      let updatedCards = flashCards.map(card => 
        card.id === id ? { ...card, ...newDataWithTime } : card
      );

      updatedCards.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

      setFlashCards(updatedCards);
    } catch (err) {
      setError('Failed to update flash card');
      console.error('Error updating flash card:', err);
    }
  };

  // Delete a flashcard
  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setFlashCards(flashCards.filter(card => card.id !== id));
    } catch (err) {
      setError('Failed to delete flash card');
      console.error('Error deleting flash card:', err);
    }
  };

  // Add a new flashcard
  const handleAddNewCard = async () => { 
    try {
      const newCardWithTime = {
        ...newCard, 
        lastModified: formatDate(new Date())
      };
      const card = await createCard(newCardWithTime);
      setFlashCards([card, ...flashCards]);
      setNewCard({ front: '', back: '', status: 'Noted', lastModified: formatDate(new Date()) }); 
    } catch (err) {
      setError('Failed to add new flash card');
      console.error('Error adding new flash card:', err);
    }
  };
  
 

  return {
    flashCards,
    isLoading,
    error,
    handleUpdate,
    handleDelete,
    newCard,
    setNewCard,
    setFlashCards,
    handleAddNewCard
  };
};

export default useFlashCards;

