import "./CreateCardModal.css"
import { useEffect, useState } from "react"
import { createCard } from "./utils.js"
import axios from "axios";
const GIPHY_API_KEY = import.meta.env.VITE_API_KEY;

const CreateCardModal = ({ boardId, isModalVisible, onClose, onCreateCard }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [gifs, setGifs] = useState([]); // Array of gif objects
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [gifUrlError, setGifUrlError] = useState(false);


    if (!isModalVisible) return null;

    const handleCreateCard = async () => {

        const title = document.getElementById('card-title').value;
        const description = document.getElementById('card-description').value;
        const gifUrl = document.getElementById('gif-url').value;
        const owner = document.getElementById('owner').value;

        let hasError = false;

        if (!title) { // error handle for title
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        if (!description) { // error handle for description
            setDescriptionError(true);
            hasError = true;
        } else {
            setDescriptionError(false);
        }

        if (!gifUrl) { // error handle for gifUrl
            setGifUrlError(true);
            hasError = true;
        } else {
            setGifUrlError(false);
        }

        if (hasError) {
            return;
        }

        try {
            await createCard(boardId, title, description, gifUrl, owner);
            onCreateCard();
            onClose();
        } catch (error) {
            console.error('Failed to create card', error);
        }
    };

    const handleSearchGifs = async () => {
        try{
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
                params: {
                    api_key: GIPHY_API_KEY,
                    q: searchQuery,
                    limit: 6
                }
            });
            setGifs(response.data.data);
        } catch (error) {
            console.error('Failed to fetch gifs', error);
        }
    };

    const handleGifSelect = (gifUrl) => {
        document.getElementById('gif-url').value = gifUrl;
        setGifs([]); // Clear GIFs after selection
    };

    return (
        <div className="opaque-background" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Create a New Card</h2>
                <div className="inputs">
                    {titleError && <span style={{ color: 'red' }}>Title is required</span>}
                    <input
                        type="text"
                        id="card-title"
                        placeholder="Enter card title"
                        required
                        style={{ borderColor: titleError ? 'red' : 'initial' }}
                    />

                    {descriptionError && <span style={{ color: 'red' }}>Description is required</span>}
                    <input
                        type="text"
                        id="card-description"
                        placeholder="Enter card description"
                        style={{ borderColor: descriptionError ? 'red' : 'initial' }}
                    />

                    <input
                        type="text"
                        id="search-gif-input"
                        placeholder="Search GIFs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />

                    <button className="search-button" onClick={handleSearchGifs}>Search</button>
                    <div className="gif-results">
                        {gifs.map((gif) => (
                                <div key={gif.id} className="gif-item">
                                    <img
                                        key={gif.id}
                                        src={gif.images.fixed_height.url}
                                        alt={gif.title}
                                        onClick={() => handleGifSelect(gif.images.fixed_height.url)}
                                        style={{ cursor: 'pointer', margin: '5px' }}
                                    />
                                </div>

                            ))}
                    </div>

                    {gifUrlError && <span style={{ color: 'red' }}>GIF URL is required</span>}
                    <input
                        type="text"
                        id="gif-url"
                        placeholder="Enter GIF URL"
                        style={{ borderColor: gifUrlError ? 'red' : 'initial' }}
                    />


                    <button className="copy-button">Copy GIF URL</button>
                    <input type="text" id="owner" placeholder="Enter owner (optional)" />
                    <button className="submit" onClick={ () => {handleCreateCard(), setSearchQuery("")}} >Create Card</button>
                </div>

            </div>
        </div>
    );
};

export default CreateCardModal;
