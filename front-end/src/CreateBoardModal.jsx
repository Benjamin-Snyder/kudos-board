
import "./CreateBoardModal.css";
import { createBoard } from './utils.js';
import { useState } from 'react';

const CreateBoardModal = ({ isModalVisible, onClose, onBoardCreated }) => {
    const [titleError, setTitleError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    if (!isModalVisible) {
        return null;
    }

    const handleCreateBoard = async () => {
        const title = document.getElementById('board-title').value;
        const type = document.getElementById('types').value;
        const author = document.getElementById('board-author').value;

        let hasError = false;
        if (!title) {
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        if (!type || type === 'Select a category') {
            setCategoryError(true);
            hasError = true;
        } else {
            setCategoryError(false);
        }

        if (hasError) {
            return;
        }

        try {
            await createBoard(title, type, author);
            onBoardCreated();
            onClose();
        } catch (error) {
            console.error('Failed to create board:', error);
        }
    };

    return (
        <div className="opaque-background" onClick={() => {onClose(), setCategoryError(false), setTitleError(false)}}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => {onClose(), setCategoryError(false), setTitleError(false)}}>
                    &times;
                </button>
                <h2>Create a New Board</h2>
                <div className="inputs">
                    {titleError && <span style={{ color: 'red' }}>Title is required</span>}
                    <label htmlFor="board-title">Title:</label>
                    <input
                        type="text"
                        id="board-title"
                        placeholder=""
                        style={{ borderColor: titleError ? 'red' : 'initial' }}
                    />
                    {categoryError && <span style={{ color: 'red' }}>Category is required</span>}
                    <label htmlFor="types">Category:</label>
                    <select
                        name="types"
                        id="types"
                        style={{ borderColor: categoryError ? 'red' : 'initial' }}
                    >
                        <option value="Select a category">Select a category</option>
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
