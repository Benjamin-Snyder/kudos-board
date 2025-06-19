import "./CreateCardModal.css"
import { useState } from "react"
import { createCard } from "./utils.js"

const CreateCardModal = ({ boardId, isModalVisible, onClose, onCreateCard }) => {
    if (!isModalVisible) return null;

    const handleCreateCard = async () => {
        const title = document.getElementById('card-title').value;
        const description = document.getElementById('card-description').value;
        const gifUrl = document.getElementById('gif-url').value;
        const owner = document.getElementById('owner').value;

        try {
            await createCard(boardId, title, description, gifUrl, owner);
            onCreateCard();
            onClose();
        } catch (error) {
            console.error('Failed to create card', error);
        }
    };

    return (
        <div className="opaque-background" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Create a New Card</h2>
                <div className="inputs">
                    <input type="text" id="card-title" placeholder="Enter card title" required />
                    <input type="text" id="card-description" placeholder="Enter card description" />
                    <input type="text" id="search-gif-input" placeholder="Search GIFs..." />
                    <button className="search-button">Search</button>
                    <input type="text" id="gif-url" placeholder="Enter GIF URL" />
                    <button className="copy-button">Copy GIF URL</button>
                    <input type="text" id="owner" placeholder="Enter owner (optional)" />
                    <button className="submit" onClick={handleCreateCard}>Create Card</button>
                </div>
            </div>
        </div>
    );
};

export default CreateCardModal;
