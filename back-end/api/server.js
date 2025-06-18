
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const { findBoardById, updateBoard, deleteBoard, findBoards, createBoard, createCard, findCardById, updateCard, deleteCard } = require('./board-model-prisma');


const prisma = new PrismaClient();
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get((req, res) => {
    console.log('GET request received');
});

// [Get] /api/boards
server.get('/api/boards', async (req, res, next) => { //get all boards
    const search = req.query;
    try {
        const boards = await findBoards(search);
        if (boards.length) { //error handling
            res.json(boards);
        }
        else if(!boards.length){
            next({ status: 404, message: 'No boards in database' });
        }
        else {
            next({ status: 404, message: 'No boards found match the search criteria' });
        }
    } catch (err) {
        next(err);
    }
});

// [Get] /api/boards/:id
server.get('/api/boards/:id', async (req, res, next) => { //get Board by ID
    const id = Number(req.params.id);

    try {
        const board = await findBoardById(id);
        if (board) { //error handling
            res.json(board);
        } else {
            next({ status: 404, message: `Board not found with ID ${id}` });
        }
    } catch (err) {
        next(err);
    }
});

// [Post] /api/boards
server.post('/api/boards', async (req, res, next) => { //create Board
    const newBoard = req.body;
    try {
        const newBoardValid = ( //error handling
            newBoard.title !== undefined &&
            newBoard.type !== undefined &&
            newBoard.image !== undefined
        );
        if (newBoardValid) {
            const created = await createBoard(newBoard);
            res.status(201).json(created);
        } else {
            next({ status: 422, message: 'title, type, and image are required fields' });
        }
    } catch (err) {
        next(err);
    }
});

// [Put] /api/boards/:id       /api/boards/:boardId/cards { votes: }
server.put('/api/boards/:id', async (req, res, next) => { //update Board
    const id = Number(req.params.id);
    const changes = req.body;

    try {
        const board = await findBoardById(id);

        const changedValid = ( //error handling
            changes.title !== undefined ||
            changes.type !== undefined ||
            changes.image !== undefined
        );
        if (board && changedValid) {
            const updated = await updateBoard(id, changes);
            res.json(updated);
        } else {
            next({ status: 422, message: "Invalid ID or changes" });
        }
    } catch (err) {
        next(err);
    }
});

// [Delete] /api/boards/:id
server.delete('/api/boards/:id', async (req, res, next) => { //delete Board
    const id = Number(req.params.id);
    try {
        const board = await findBoardById(id);
        if (board) { //error handling
            const deleted = await deleteBoard(id);
            res.json(deleted);
        } else {
            next({ status: 404, message: `Board not found with ID ${id}` });
        }
    } catch (err) {
        next(err);
    }
});




/*-------------------CARD ROUTES-------------------*/



// [Get] /api/board/:boardId/cards
server.get('/api/boards/:boardId/cards', async (req, res, next) => { //get all cards for a board
    const boardId = Number(req.params.boardId);
    const search = { ...req.query, boardId }; // Ensure boardId is part of the search criteria

    try{
        const cards = await prisma.card.findMany({
            where: search
        });
        if(cards.length){ //error handling
            res.json(cards);
        }
        else{
            next({ status: 404, message: 'No cards found match the search criteria' });
        }
    }catch(err){
        next(err);
    }
})

// [Post] /api/board/:boardId/cards
server.post('/api/boards/:boardId/cards', async (req, res, next) => { //create card in board
    const boardId = Number(req.params.boardId);
    const newCard = req.body;
    newCard.boardId = boardId;
    try{
        const newCardValid = ( //error handling
            newCard.title !== undefined &&
            newCard.description !== undefined &&
            newCard.gif !== undefined
        );
        if(newCardValid){
            const created = await createCard(boardId, newCard);
            res.status(201).json(created);
        }
        else{
            next({ status: 422, message: 'title, description, and gif are required fields' });
        }

    }catch(err){
        next(err);
    }
})


//[Put] /api/board/:boardId/cards/:cardId
server.put('/api/boards/:boardId/cards/:cardId', async (req, res, next) => { // update vote count
    const boardId = Number(req.params.boardId);
    const cardId = Number(req.params.cardId);
    const changes = req.body;

    try{
        const board = await findBoardById(boardId);
        const card = await findCardById(cardId);

        if(board){
            const changedValid = (changes.upvotes !== undefined)

            if(card && changedValid){ //error handling
                const updated = await updateCard(cardId, changes);
                res.json(updated);
            }
            else{
                next({ status: 422, message: "Invalid ID or changes" });
            }
        }
        else{
            next({ status: 404, message: "Board not found" });
        }

    }catch(err){
        next(err);
    }

})



//[Delete] /api/board/:boardId/cards/:cardId
server.delete('/api/boards/:boardId/cards/:cardId', async (req, res, next) => { //delete card by ID
    const boardId = Number(req.params.boardId);
    const cardId = Number(req.params.cardId);

    try{
        board = await findBoardById(boardId);
        card = await findCardById(cardId);

        if(board && card){ //error handling
            const deleted = await deleteCard(cardId);
            res.json(deleted);
        }
        else{
            next({ status: 404, message: "Board or Card not found" });
        }
    }catch(err){
        next(err);
    }
})

// Error handling middleware
server.use((err, req, res, next) => {
    const { message, status = 500 } = err;
    console.log(message);
    res.status(status).json({ message }); // Unsafe in prod
});



module.exports = server;
