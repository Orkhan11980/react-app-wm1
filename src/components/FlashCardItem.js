import React from 'react';
import FlashCard from './FlashCard';
import { Draggable } from 'react-beautiful-dnd';

const FlashCardItem = ({
  card,
  index,
  selectedCards,
  handleSelectCard,
  isShareMode,
  provided,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
      {(provided) => (
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
          provided={provided}
        />
      )}
    </Draggable>
  );
};

export default FlashCardItem;
