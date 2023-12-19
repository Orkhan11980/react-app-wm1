// FlashCard.js
import React, { useState } from 'react';
import '../styles/flashCard.css';  // Ensure this path is correct

const FlashCard = ({ front, back, lastModified, status }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={flipCard}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face front">
          {front}
        </div>
        <div className="card-face back">
          {back}
        </div>
      </div>
      <div className="card-info">
        <p>Last Modified: {lastModified}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default FlashCard;
