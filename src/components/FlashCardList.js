import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import { getAllCards, updateCard, deleteCard, createCard } from '../services/flashCardService';
import '../styles/flashCard.css';
import '../styles/filterOption.css'
import '../styles/shareButton.css'
import SearchBar from './SearchBar';
import plusIcon from '../images/plusIcon.png';
import deleteIcon from '../images/deleteIcon.png';
import shareIcon from '../images/shareIcon.png';
import share from '../images/share.png';





const FlashCardList = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCard, setNewCard] = useState({ front: '', back: '',status: 'Noted', lastModified: formatDate(new Date()) });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShareMode, setIsShareMode] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);


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

  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  

  function formatDate(date) {
    const d = new Date(date),
          month = '' + (d.getMonth() + 1),  
          day = '' + d.getDate(),
          year = d.getFullYear(),
          hour = '' + d.getHours(),
          minute = '' + d.getMinutes();
  
    return [month.padStart(2, '0'), day.padStart(2, '0'), year].join('/') + ', ' + [hour.padStart(2, '0'), minute.padStart(2, '0')].join(':');
  }
  
  const filteredFlashCards = flashCards.filter(card =>
    (card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
     card.back.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || card.status === statusFilter)
  );

  const handleUpdate = async (id, updatedData) => {
    try {
      const newDataWithTime = {
        ...updatedData,
        lastModified: formatDate(new Date())
      };
      await updateCard(id, newDataWithTime);
      setFlashCards(flashCards.map(card => (card.id === id ? { ...card, ...newDataWithTime } : card))
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)));
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

  


  const handleAddNewCard = async () => {
  
    try {
      const newCardWithTime = {
        ...newCard,
        lastModified: formatDate(new Date()) 
      };
      const card = await createCard(newCardWithTime);
      setFlashCards([card, ...flashCards]
        .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)));
        setNewCard({ front: '', back: '', status: 'Noted', lastModified: formatDate(new Date()) }); 
        setShowAddForm(false);  
    } catch (error) {
      console.error("Error creating new card:", error);
    }
  };
 

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  
  const closeForm = () => {
    setShowAddForm(false);
    setNewCard({ front: '', back: '' }); 
  };
 
  const handleSelectCard = (cardId) => {
    setSelectedCards(prev => {
      if(prev.includes(cardId)){
        return prev.filter(id => id !== cardId); 
      } else {
        return [...prev, cardId]; 
      }
    });
  };

  const handleShare = () => {
    const selectedCardDetails = flashCards.filter(card => selectedCards.includes(card.id));
    const emailContent = JSON.stringify(selectedCardDetails, null, 2); 
  
    
    const subject = encodeURIComponent("Shared Flashcards");
    const body = encodeURIComponent(`Here are the flashcards: \n\n${emailContent}`);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  
    
    window.open(mailtoLink, '_blank');
    setIsShareMode(false);
    setShowShareOptions(false);
  };
  
  const toggleShareMode = () => {
    setIsShareMode(!isShareMode);
    setShowShareOptions(!showShareOptions); 
  };
  

  if (isLoading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flashcard-container">
    <div className="share-container">
      {isShareMode ? (
        <div className="share-options">
          <button className="btn-option" onClick={toggleShareMode} title="Cancel Share">
            <img src={deleteIcon} alt="Cancel" />
          </button>
          <button className="btn-option" onClick={handleShare} title="Share Selected">
            <img src={shareIcon} alt="Share" />
          </button>
        </div>
      ) : (
        <button className="btn-share" onClick={toggleShareMode} title="Share Cards">
          <img src={share} alt="Share Cards" />
        </button>
      )}
    </div>

      
      

    <div className="parent-container">
      <div className="filter-container">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Noted">Noted</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Learned">Learned</option>
        </select>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

      
      <div className="flashcard-list">
        <div className="add-card-placeholder" onClick={toggleAddForm}>
          {!showAddForm ? (
            <div className="add-icon-container">
              <img src={plusIcon} alt="Add New" className="plus-icon" />
            </div>
          ) : (
            <div onClick={(e) => e.stopPropagation()} className="new-card-form-content">
              <input type="text" name="front" placeholder="Front of card" value={newCard.front} onChange={(e) => setNewCard({ ...newCard, front: e.target.value })} className="card-input" />
              <input type="text" name="back" placeholder="Back of card" value={newCard.back} onChange={(e) => setNewCard({ ...newCard, back: e.target.value })} className="card-input" />
              <div className="form-controls">
                <button className="btn add" onClick={handleAddNewCard}>Add Card</button>
                <button className="btn cancel" onClick={closeForm}>Cancel</button> 
              </div>
            </div>
          )}
        </div>
  
        {filteredFlashCards.map(card => (
          <FlashCard 
            key={card.id} 
            id={card.id}
            front={card.front} 
            back={card.back} 
            lastModified={card.lastModified} 
            status={card.status} 
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isSelected={selectedCards.includes(card.id)} 
            handleSelectCard={handleSelectCard}
            isShareMode={isShareMode}
          />
        ))}
        
      </div>
    </div>
  );
  
};

export default FlashCardList;