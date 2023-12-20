import React, { useState } from 'react';

const EditCardModal = ({ card, show, onClose, onSave }) => {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  const handleSave = () => {
    onSave(card.id, { front, back });
    onClose(); 
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <label>
            Front:
            <input type="text" value={front} onChange={e => setFront(e.target.value)} />
          </label>
          <label>
            Back:
            <textarea value={back} onChange={e => setBack(e.target.value)} />
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
