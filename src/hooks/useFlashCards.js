
import { useState, useEffect, useRef } from 'react';
import { getAllCards, updateCard, deleteCard, createCard } from '../services/flashCardService';
import { formatDate } from '../utils/utils';  



const useFlashCards = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCard, setNewCard] = useState({ front: '', back: '',status: 'Noted', lastModified: formatDate(new Date()) });
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const scrollRef = useRef(0);

  const batchSize = 10; 
  
  
  
  
  const loadNextBatch = () => {
    if (hasMore) {
      
      scrollRef.current = window.scrollY;
      
     
      setTimeout(() => {
        setPage(page => page + 1);
      }, 1000);
    }
  };
  

    

  useEffect(() => {
    const fetchFlashCards = async () => {
      setIsLoading(true); 
      try {
        console.log("Current page:", page);
        let cards = await getAllCards(page,batchSize); 
        
        if (cards.length < batchSize) {
          setHasMore(false); 
        }

        setFlashCards(prevCards => {
          const allCards = new Set([...prevCards, ...cards]);
          return Array.from(allCards);
        });
        

      } catch (error) {
        console.error('Error fetching flash cards:', error);
        setError('Failed to fetch flash cards. Make sure server is running');
      } finally {
        setIsLoading(false);

        setTimeout(() => {
          window.scrollTo(0, scrollRef.current);
        }, 0);
      }
    };
    
    fetchFlashCards(); 
  }, [page]); 

 
  
  

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

  
  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setFlashCards(flashCards.filter(card => card.id !== id));
    } catch (err) {
      setError('Failed to delete flash card');
      console.error('Error deleting flash card:', err);
    }
  };

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
    handleAddNewCard,
    loadNextBatch, 
    hasMore
  };
};

export default useFlashCards;

