import React, { useState } from 'react';
import '../styles/flashCard.css';  

const FlashCard = ({ id, front, back, lastModified, status, handleUpdate, handleDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFront, setEditFront] = useState(front);
  const [editBack, setEditBack] = useState(back);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFlipCard = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = setter => event => {
    setter(event.target.value);
  };

  const handleSave = async (event) => {
    event.stopPropagation(); 
    setIsLoading(true);
    const updatedData = {
      front: editFront,
      back: editBack,
      lastModified: new Date().toISOString(),
      status
    };
    try {
      await handleUpdate(id, updatedData);
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      setIsLoading(true);
      await handleDelete(id);
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flashcard" onClick={toggleFlipCard}>
      {isEditing ? (
        <div className="card edit-mode">
          <input type="text" value={editFront} onChange={handleInputChange(setEditFront)} />
          <input type="text" value={editBack} onChange={handleInputChange(setEditBack)} />
          <button onClick={(event) => handleSave(event)} disabled={isLoading}>Save</button>
          <button onClick={handleToggleEdit} disabled={isLoading}>Cancel</button>
        </div>
      ) : (
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-face front">
            <div className="card-content">
              <p className="card-info">Last Modified: {lastModified}</p>
              <p className="card-info">Status: {status}</p>
              <div>{front}</div>
              <button onClick={handleToggleEdit} disabled={isLoading}>Edit</button>
              <button onClick={handleDeleteClick} disabled={isLoading}>Delete</button>
            </div>
          </div>
          <div className="card-face back">
            {back}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
