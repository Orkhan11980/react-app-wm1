import React, { useState } from 'react';
import FlashCard from './FlashCard';
import '../styles/flashCard.css';
import '../styles/filterOption.css'
import '../styles/shareButton.css'
import FilterOptions from './FilterOptions';
import ShareOptions from './ShareOptions';
import AddCardForm from './AddCardForm';
import useFlashCards from '../hooks/useFlashCards';
//import { updateCardsOrder } from '../services/flashCardService';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




const FlashCardList = () => {
  const {
    flashCards,
    isLoading,
    error,
   // setFlashCards,
    newCard,
    setNewCard,
    handleUpdate,
    handleDelete,
    handleAddNewCard
  } = useFlashCards();

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShareMode, setIsShareMode] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
 

  


  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  
  
  
  const filteredFlashCards = flashCards.filter(card =>
    (card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
     card.back.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || card.status === statusFilter)
  );

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
  
    console.log(selectedCardDetails)
    window.open(mailtoLink, '_blank');
    setIsShareMode(false);
    setShowShareOptions(false);
  };
  
  const toggleShareMode = () => {
    setIsShareMode(!isShareMode);
    setShowShareOptions(!showShareOptions); 
    if (isShareMode) { 
      setSelectedCards([]); 
    }
  };
  

  if (isLoading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(flashCards);

  return (
    
    <div className="flashcard-container">
              <ShareOptions
                isShareMode={isShareMode}
                toggleShareMode={toggleShareMode}
                handleShare={handleShare}
            />

    

               <FilterOptions
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                handleSearch={handleSearch}
            />

      
      <div className="flashcard-list">
              <AddCardForm
                showAddForm={showAddForm}
                toggleAddForm={toggleAddForm}
                newCard={newCard}
                setNewCard={setNewCard}
                handleAddNewCard={handleAddNewCard}
                closeForm={closeForm}
            />
  
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

