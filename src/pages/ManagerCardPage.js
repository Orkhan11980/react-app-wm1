import React, { useState, useEffect } from 'react';
import FlashCardList from '../components/FlashCardList';
import { getAllCards, updateCard, deleteCard } from '../services/flashCardService';
import EditCardModal from '../components/EditCardModal';

const ManagerCardPage = () => {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getAllCards();
      setCards(fetchedCards);
    };
    fetchCards();
  }, []);

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleSave = async (id, updatedCard) => {
    await updateCard(id, updatedCard);
    setCards(cards.map(card => card.id === id ? { ...card, ...updatedCard } : card));
  };

  const handleDelete = async (id) => {
    await deleteCard(id);
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div>
      <FlashCardList cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
      {editingCard && (
        <EditCardModal
          card={editingCard}
          show={Boolean(editingCard)}
          onClose={() => setEditingCard(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManagerCardPage;
