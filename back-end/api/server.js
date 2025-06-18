
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get((req, res) => {
    console.log('GET request received');
});

// [Get] /api/boards
server.get('/api/boards', async (req, res, next) => {
    const search = req.query;
    try {
        const boards = await prisma.board.findMany({
            where: search
        });
        if (boards.length) {
            res.json(boards);
        } else {
            next({ status: 404, message: 'No boards found match the search criteria' });
        }
    } catch (err) {
        next(err);
    }
});

// [Get] /api/boards/:id
server.get('/api/boards/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const board = await prisma.board.findUnique({
            where: { id }
        });
        if (board) {
            res.json(board);
        } else {
            next({ status: 404, message: `Board not found with ID ${id}` });
        }
    } catch (err) {
        next(err);
    }
});

// [Post] /api/boards
server.post('/api/boards', async (req, res, next) => {
    const newBoard = req.body;
    try {
        const newBoardValid = (
            newBoard.title !== undefined &&
            newBoard.type !== undefined &&
            newBoard.image !== undefined
        );
        if (newBoardValid) {
            const created = await prisma.board.create({
                data: newBoard
            });
            res.status(201).json(created);
        } else {
            next({ status: 422, message: 'title, type, and image are required fields' });
        }
    } catch (err) {
        next(err);
    }
});

// [Put] /api/boards/:id
server.put('/api/boards/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    const changes = req.body;

    try {
        const board = await prisma.board.findUnique({
            where: { id }
        });

        const changedValid = (
            changes.title !== undefined ||
            changes.type !== undefined ||
            changes.image !== undefined
        );
        if (board && changedValid) {
            const updated = await prisma.board.update({
                where: { id },
                data: changes
            });
            res.json(updated);
        } else {
            next({ status: 422, message: "Invalid ID or changes" });
        }
    } catch (err) {
        next(err);
    }
});

// [Delete] /api/boards/:id
server.delete('/api/boards/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const board = await prisma.board.findUnique({
            where: { id }
        });
        if (board) {
            const deleted = await prisma.board.delete({
                where: { id }
            });
            res.json(deleted);
        } else {
            next({ status: 404, message: `Board not found with ID ${id}` });
        }
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
server.use((err, req, res, next) => {
    const { message, status = 500 } = err;
    console.log(message);
    res.status(status).json({ message }); // Unsafe in prod
});

module.exports = server;
