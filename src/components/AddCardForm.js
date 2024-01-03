
import React from 'react';
import plusIcon from '../images/plusIcon.png';

const AddCardForm = ({ showAddForm, toggleAddForm, newCard, setNewCard, handleAddNewCard, closeForm }) => {
    return (
        <div className="add-card-placeholder" onClick={toggleAddForm}>
            {!showAddForm ? (
                <div className="add-icon-container">
                    <img src={plusIcon} alt="Add New" className="plus-icon" />
                </div>
            ) : (
                <div onClick={(e) => e.stopPropagation()} className="new-card-form-content">
                <input type="text" required name="front" placeholder="Front of card (required)" value={newCard.front} onChange={(e) => setNewCard({ ...newCard, front: e.target.value })} className="card-input"  />
                <input type="text" required name="back" placeholder="Back of card (required)" value={newCard.back} onChange={(e) => setNewCard({ ...newCard, back: e.target.value })} className="card-input" />
                <div className="form-controls">
                <button className="btn add" onClick={handleAddNewCard} disabled={!newCard.front.trim() || !newCard.back.trim()}>Add Card</button>

                    <button className="btn cancel" onClick={closeForm}>Cancel</button> 
                </div>
            </div>
            )}
        </div>
    );
};

export default AddCardForm;
