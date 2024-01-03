
import React from 'react';
import deleteIcon from '../images/deleteIcon.png';
import shareIcon from '../images/shareIcon.png';
import share from '../images/share.png';

const ShareOptions = ({ isShareMode, toggleShareMode, handleShare }) => {
    return (
        <div className="share-container">
            {isShareMode ? (
                <div className="share-options">
                <button className="btn-option" onClick={toggleShareMode} title="Cancel Share">
                  <img src={deleteIcon} alt="Cancel" />
                </button>
                <button className="btn-option" onClick={handleShare} title="Share Selected">
                  <img src={shareIcon} alt="Share" />
                </button>
              </div>
            ) : (
                <button className="btn-share" onClick={toggleShareMode} title="Share Cards">
                    <img src={share} alt="Share Cards" />
                    </button>
            )}
        </div>
    );
};

export default ShareOptions;
