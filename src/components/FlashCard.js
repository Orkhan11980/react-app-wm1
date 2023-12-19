
import React, { useState } from 'react';
import '../styles/flashCard.css';  

const FlashCard = ({ front, back, lastModified, status }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={flipCard}>
    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-face front">
        <div className="card-content">
          <p className="card-info">Last Modified: {lastModified}</p>
          <p className="card-info">Status: {status}</p>
          {front}
        </div>
      </div>
      <div className="card-face back">
        {back}
      </div>
    </div>
  </div>
  );
};

export default FlashCard;
