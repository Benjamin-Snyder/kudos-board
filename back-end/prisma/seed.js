const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const boards = [
{
    title: "Welcome Board",
    type: "inspiration",
    author: "jackson",
    image: "https://fastly.picsum.photos/id/666/200/200.jpg?hmac=keuaJ7nJC5hkHIEyee1b6jdEMbHBZbozYQ9NClt2_lk",
},
{
    title: "Celebration Highlights",
    type: "celebration",
    author:"",
    image: "https://fastly.picsum.photos/id/5/200/200.jpg?hmac=oN9VtXdJYLSFssji8vCr48JaI-e5Zi4eH9GAiYBB_Ig",
},
{
    title: "Thank You Notes",
    type: "thank you",
    author: "thomas",
    image: "https://fastly.picsum.photos/id/883/200/200.jpg?hmac=evNCTcW3jHI_xOnAn7LKuFH_YkA8r6WdQovmsyoM1IY",
},
{
    title: "Motivational Quotes",
    type: "inspiration",
    author: "kevi ",
    image: "https://fastly.picsum.photos/id/1058/200/200.jpg?hmac=EF_mUeWbCxK5wJj7PuNrLKm7kBMu2DBtQXuGQg6p_gA",
},
{
    title: "Team Achievements",
    type: "celebration",
    author: "",
    image: "https://fastly.picsum.photos/id/218/200/200.jpg?hmac=pIx-HTJBJRheNaHmhgqsQRX8JbTGvag_zic9NTNWFJU",
},
{
    title: "Appreciation Board",
    type: "thank you",
    author: "jim",
    image: "https://fastly.picsum.photos/id/637/200/200.jpg?hmac=5gHTwbVytbdI9UEOz3_YW6GES2HCcph0DN7ylAvsN0Y",
},
{
    title: "Inspiration Wall",
    type: "inspiration",
    author: "bob",
    image: "https://fastly.picsum.photos/id/908/200/200.jpg?hmac=CovMVsq4EkU03tnOxNLyxYsLlemPPHBizxcnmaHaRcU",
},
{
    title: "Milestone Moments",
    type: "celebration",
    author: "",
    image: "https://fastly.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo",
},
];

const cards = [
{
    boardId: 1,
    title: "Great Start!",
    description: "Kudos for getting the project off the ground!",
    gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
    upvotes: 5,
    owner: "Alice",
},
{
    boardId: 1,
    title: "Keep it up!",
    description: "Loving the momentum here!",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    upvotes: 3,
    owner: "Bob",
},
{
    boardId: 1,
    title: "Fantastic Effort!",
    description: "Your dedication really shows!",
    gif: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
    upvotes: 4,
    owner: "Clara",
},
{
    boardId: 2,
    title: "Congrats on Launch!",
    description: "Celebrating the successful new product launch.",
    gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    upvotes: 10,
    owner: "Charlie",
},
{
    boardId: 2,
    title: "Way to go team!",
    description: "Teamwork made the dream work!",
    gif: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
    upvotes: 8,
    owner: "Dana",
},
{
    boardId: 2,
    title: "Victory Dance",
    description: "We did it! Time to celebrate!",
    gif: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
    upvotes: 9,
    owner: "Ethan",
},
{
    boardId: 3,
    title: "Thanks a ton!",
    description: "Appreciate all your help on the support desk.",
    gif: "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
    upvotes: 7,
    owner: "Eve",
},
{
    boardId: 3,
    title: "Much appreciated!",
    description: "Your hard work never goes unnoticed.",
    gif: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
    upvotes: 4,
    owner: "",
},
{
    boardId: 3,
    title: "Super Supportive",
    description: "Thanks for always being there to help.",
    gif: "https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif",
    upvotes: 6,
    owner: "Grace",
},
{
    boardId: 4,
    title: "Motivation Monday",
    description: "Starting the week with positive vibes!",
    gif: "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif",
    upvotes: 5,
    owner: "",
},
{
    boardId: 4,
    title: "Keep Pushing",
    description: "Never give up on your dreams.",
    gif: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
    upvotes: 7,
    owner: "Ivy",
},
{
    boardId: 5,
    title: "Teamwork Rocks",
    description: "Together we can achieve anything!",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    upvotes: 9,
    owner: "Jack",
},
{
    boardId: 5,
    title: "Awesome Job",
    description: "Your efforts make a big difference.",
    gif: "https://media.giphy.com/media/xUPGcl3ijl9dyxxZSw/giphy.gif",
    upvotes: 6,
    owner: "",
},
];

async function main() {
// Seed boards
for (const board of boards) {
    await prisma.board.create({ data: board });
}

// Seed cards
for (const card of cards) {
    await prisma.card.create({ data: card });
}

console.log("Database seeded successfully!");
}

main()
.then(() => prisma.$disconnect())
.catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
