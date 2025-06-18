import "./CreateBoardModal.css";
import { createBoard } from './utils.js';
import {useState} from 'react';

const CreateBoardModal = ({ isModalVisible, onClose, onBoardCreated }) => {

    const [titleText, setTitleText] = useState('');
    const [categoryText, setCategoryText] = useState('Select a category');

    if (!isModalVisible) {
    return null;
}

const handleCreateBoard = async () => {
    const title = document.getElementById('board-title').value;
    const type = document.getElementById('types').value;
    const author = document.getElementById('board-author').value;

    if(!title || !type) {
        setTitleText('Title is required');
        setCategoryText('Category is required');
        return;
    }

    try {
    await createBoard(title, type, author);
    onBoardCreated(); // Notify the parent component that a new board was created
    onClose(); // Close the modal after creating the board
    } catch (error) {
    console.error('Failed to create board:', error);
    }
};

return (
    <div className="opaque-background" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
        &times;
        </button>
        <h2>Create a New Board</h2>
        <div className="inputs">
        <label htmlFor="board-title">Title:</label>
        <input type="text" id="board-title" placeholder={titleText}/>
        <label htmlFor="types">Category:</label>
        <select name="types" id="types">
            <option value>{categoryText}</option>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
        </select>
        <label htmlFor="board-author">Author:</label>
        <input type="text" id="board-author" />
        <button onClick={handleCreateBoard}>Create Board</button>
        </div>
    </div>
    </div>
);
};

export default CreateBoardModal;
