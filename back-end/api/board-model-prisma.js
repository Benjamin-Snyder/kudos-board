// import prisma client lib and instantiate
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = {
async findBoards(where) {
    // GET http://localhost:5432/api/boards?type=Recent
    // SELECT * FROM "Board" WHERE type='Recent';
    const boards = await prisma.board.findMany({where});
    return boards;

},

async findBoardById(id) {
    // GET http://localhost:5432/api/boards/1
    // SELECT * FROM "Board" WHERE id = 1;
    const board = await prisma.board.findUnique({ where: { id } });
    return board;

},

async createBoard(newBoard) {
    // POST http://localhost:5432/api/boards/1 { title: "Vibes", author:"Ben" ,type: "Inspiration", ... }
    // INSERT INTO "Board"  VALUES ;
    const created = await prisma.board.create({ data: newBoard });
    return created;

},

async updateBoard (id, changes) {
    // PUT http://localhost:5432/api/boards/1
    // UPDATE "Pet" SET adopted = true WHERE id = 1;
    const updated = await prisma.board.update({ where: { id }, data: changes });
    return updated;

},

/*
async deleteBoard(id) {
    // DELETE http://localhost:5432/api/boards/1
    // DELETE FROM "Board" WHERE id = 1;
    const deleted = await prisma.board.delete({ where: { id } });
    return deleted;

},
*/

async deleteBoard(id) {
    try {
        // delete all cards associated with the board first
        await prisma.card.deleteMany({
            where: {
                boardId: id
            }
        });

        // delete the board
        const deletedBoard = await prisma.board.delete({
            where: { id }
        });

        return deletedBoard;
    } catch (err) {
        console.error('Error deleting board:', err);
        throw err;
    }
},

async createCard(boardID,newCard){
    const created = await prisma.card.create({ data: newCard });
    //const board = await prisma.board.findUnique({ where: { boardId } });
    prisma.board.update({
        where: { boardID },
        data: { cards: { push : created} },
    })
    return created;
},

async findCardById(id){
    const card = await prisma.card.findUnique({ where: { id } });
    return card;
},

async updateCard (id, changes) {
    const updated = await prisma.card.update({ where: { id }, data: changes });
    return updated;
},

async deleteCard(id) {
    const deleted = await prisma.card.delete({ where: { id } });
    return deleted;
}
}
