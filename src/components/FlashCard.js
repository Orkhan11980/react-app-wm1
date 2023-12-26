import React, { useState, useCallback, memo } from 'react';
import '../styles/flashCard.css';

const FlashCard = memo(({ id, front, back, lastModified, status, handleUpdate, handleDelete }) => {
  const [cardState, setCardState] = useState({
    isFlipped: false,
    isEditing: false,
    editFront: front,
    editBack: back,
    isLoading: false,
    editStatus: status,
  });

  const toggleFlipCard = useCallback(() => {
    if (!cardState.isEditing) {
      setCardState({ ...cardState, isFlipped: !cardState.isFlipped });
    }
  }, [cardState]);

  const handleToggleEdit = useCallback((event) => {
    event.stopPropagation();
    setCardState({ ...cardState, isEditing: !cardState.isEditing });
  }, [cardState]);

  const handleInputChange = useCallback(
    (field) => (event) => {
      setCardState({ ...cardState, [field]: event.target.value });
    },
    [cardState]
  );

  const handleSave = useCallback(async (event) => {
    event.stopPropagation();
    setCardState({ ...cardState, isLoading: true });
    const formatter = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
    const updatedData = {
      front: cardState.editFront,
      back: cardState.editBack,
      lastModified: formatter.format(new Date()),
      status: cardState.editStatus, 
    };
    try {
      await handleUpdate(id, updatedData);
      setCardState(prevState => ({ ...prevState, lastModified: updatedData.lastModified }));
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      setCardState(prevState => ({ ...prevState, isLoading: false, isEditing: false }));
    }
  }, [cardState, id, handleUpdate]);

  const handleDeleteClick = useCallback(async () => {
    setCardState({ ...cardState, isLoading: true });
    try {
      await handleDelete(id);
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setCardState({ ...cardState, isLoading: false });
    }
  }, [cardState, id, handleDelete]);

  return (
    <div className="flashcard" onClick={toggleFlipCard}>
      {cardState.isEditing ? (
        <EditModeComponent
          editFront={cardState.editFront}
          editBack={cardState.editBack}
          editStatus={cardState.editStatus}
          isLoading={cardState.isLoading}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleToggleEdit={handleToggleEdit}
        />
      ) : (
        <DisplayModeComponent
          front={front}
          back={back}
          lastModified={lastModified}
          status={status}
          isLoading={cardState.isLoading}
          handleToggleEdit={handleToggleEdit}
          handleDeleteClick={handleDeleteClick}
          isFlipped={cardState.isFlipped}
        />
      )}
    </div>
  );
});

const EditModeComponent = memo(({ editFront, editBack, editStatus, isLoading, handleInputChange, handleSave, handleToggleEdit }) => (
  <div className="card edit-mode">
     <input type="text" placeholder="Front Text" value={editFront} onChange={handleInputChange('editFront')} />
    <input type="text" placeholder="Back Text" value={editBack} onChange={handleInputChange('editBack')} />

    <select value={editStatus} onChange={handleInputChange('editStatus')}>
      <option value="Want to Learn">Want to Learn</option>
      <option value="Learned">Learned</option>
      <option value="Noted">Noted</option>
      
    </select>
    <div className="card-controls-edit">
      <button className="save" onClick={handleSave} disabled={isLoading}>Save</button>
      <button className="cancel" onClick={handleToggleEdit} disabled={isLoading}>Cancel</button>
    </div>
  </div>
));



const DisplayModeComponent = memo(({ front, back, lastModified, status, isLoading, handleToggleEdit, handleDeleteClick, isFlipped }) => (
  <div className={`card ${isFlipped ? 'flipped' : ''}`}>
    <div className="card-face front">
      <div className="card-content">
        <p className="card-info">Last Modified: {lastModified}</p>
        <p className="card-info">Status: {status}</p>
        <div>{front}</div>
        <div className="card-controls">
        <button className="edit" onClick={handleToggleEdit} disabled={isLoading}>Edit</button>
        <button className="delete" onClick={handleDeleteClick} disabled={isLoading}>Delete</button>
      </div>
      </div>
    </div>
    <div className="card-face back">
      {back}
    </div>
  </div>
));


export default FlashCard;