// import prisma client lib and instantiate
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = {
async find(where) {
    // GET http://localhost:5432/api/boards?type=Recent
    // SELECT * FROM "Board" WHERE type='Recent';
    const boards = await prisma.board.findMany({ where });
    return boards;

},

async findById(id) {
    // GET http://localhost:5432/api/boards/1
    // SELECT * FROM "Board" WHERE id = 1;
    const board = await prisma.board.findUnique({ where: { id } });
    return board;

},

async create(newBoard) {
    // POST http://localhost:5432/api/boards/1 { title: "Vibes", author:"Ben" ,type: "Inspiration", ... }
    // INSERT INTO "Board"  VALUES ;
    const created = await prisma.board.create({ data: newBoard });
    return created;

},

async update(id, changes) {
    // PUT http://localhost:5432/api/boards/1
    // UPDATE "Pet" SET adopted = true WHERE id = 1;
    const updated = await prisma.board.update({ where: { id }, data: changes });
    return updated;

},

async delete(id) {
    // DELETE http://localhost:5432/api/boards/1
    // DELETE FROM "Board" WHERE id = 1;
    const deleted = await prisma.board.delete({ where: { id } });
    return deleted;

},
}
