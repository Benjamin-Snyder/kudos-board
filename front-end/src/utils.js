import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchAllBoards() {
    try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
}

async function createBoard(name, type, author) {
    try {
        const response = await axios.post(`${BASE_URL}`, {
            title: name,
            type: type,
            author: author,
            image: 'https://fastly.picsum.photos/id/211/200/200.jpg?hmac=VJ4wl95YuQJMvM_1O83L3nSfTn20OxaVfWe0wNMZrIc' // Add a default or dynamic image URL
        });
        return response.data;
    } catch (error) {
        console.error('Error creating board:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteBoard(boardId) {
    try {
        const response = await axios.delete(`${BASE_URL}/${boardId}`);
        return response.data;
    }catch(err){
        console.error('Error deleting board:', err);
        throw err;
    }
}

async function createCard(boardId, title, description, gif, owner) {
    try{
        const response = await axios.post(`${BASE_URL}/${boardId}/cards`, {
            boardId: boardId,
            title: title,
            description: description,
            gif: gif,
            owner: owner,
        })
        return response.data;
    }catch(err){
        console.error('Error creating card:', err);
        throw err;
    }
}

async function deleteCard(card) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${card.boardId}/cards/${card.id}`);
        return response.data;
    }catch(err){
        console.error('Error deleting card:', err);
    }
}

async function fetchCards(boardId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${boardId}/cards`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
}

async function upvoteCard(card) {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/${card.boardId}/cards/${card.id}`,{
            upvotes: card.upvotes + 1
        });
        return response.data;
    }catch(err){
        console.error('Error upvoting card:', err);
        throw err;
    }
}

async function addComment(card, newComment) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${card.boardId}/cards/${card.id}`);
        const currentComments = response.data.comments || [];
        const updatedComments = [...currentComments, newComment];
        const updateResponse = await axios.put(`${import.meta.env.VITE_BASE_URL}/${card.boardId}/cards/${card.id}`, {
            comments: updatedComments
        });
        return updateResponse.data;
    } catch (err) {
        console.error('Error publishing comment:', err);
        throw err;
    }
}

export { fetchAllBoards, createBoard, deleteBoard, fetchCards, upvoteCard, deleteCard, createCard , addComment };
