import React, { useState,useEffect , useCallback} from 'react';
import '../styles/flashCard.css';
import '../styles/filterOption.css'
import '../styles/shareButton.css'
import FilterOptions from './FilterOptions';
import ShareOptions from './ShareOptions';
import AddCardForm from './AddCardForm';
import FlashCardItem from './FlashCardItem';
import useFlashCards from '../hooks/useFlashCards';
//import { updateCardsOrder } from '../services/flashCardService';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';



const FlashCardList = () => {
  const {
    flashCards,
    isLoading,
    error,
    setFlashCards,
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
  const [sortOrder, setSortOrder] = useState(''); 

 

  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = reorder(
      flashCards,
      result.source.index,
      result.destination.index
    );
  
    
    setFlashCards(items);
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
  const sortFlashCards = useCallback((order) => {
    const sortedCards = [...flashCards].sort((a, b) => {
      if (order === 'newest') {
        return new Date(b.lastModified) - new Date(a.lastModified);
      } else if (order === 'oldest') {
        return new Date(a.lastModified) - new Date(b.lastModified);
      }
      return 0;
    });
    setFlashCards(sortedCards);
  }, [flashCards, setFlashCards]); 
  
  
  useEffect(() => {
    if (sortOrder !== '') {
      sortFlashCards(sortOrder);
    }
  }, [sortOrder, sortFlashCards]); 
   

  if (isLoading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(flashCards);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          setSortOrder={setSortOrder} 
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

          <Droppable droppableId="unique-droppable-id">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flashcard-list"
              >
                {filteredFlashCards.map((card, index) => (
                  <FlashCardItem
                    key={card.id}
                    card={card}
                    index={index}
                    selectedCards={selectedCards}
                    handleSelectCard={handleSelectCard}
                    isShareMode={isShareMode}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default FlashCardList;

