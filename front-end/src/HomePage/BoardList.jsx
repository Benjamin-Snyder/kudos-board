import "./BoardList.css"
import Board from "./Board"

const BoardList = ({filter, searchQuery, cards, onDeleteClick}) => {
    const searchedCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCards = (cards) => {
        if (filter === 'all') { // Show all boards
            return cards;
        } else if (filter === 'recent') {
            const sorted = cards.sort((a, b) => {
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                return dateB - dateA; // Sort in descending order
            })
            return sorted.splice(0,6);
        } else if (filter === 'celebration') {
            return cards.filter(card => card.type === 'celebration'); // Only show celebration boards
        } else if (filter === 'thank You') {
            return cards.filter(card => card.type === 'thank you'); // Only show thank you boards
        } else if (filter === 'inspiration') {
            return cards.filter(card => card.type === 'inspiration'); // Only show inspiration boards
        }
        return [];
    };

    const cardsToDisplay = filteredCards(searchedCards); // Apply the filter to the searched cards

    return (
        <div className="list-of-boards">
            {cardsToDisplay.map((card) => (
                <Board
                    key={card.id}
                    board={card}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </div>
    );
}

export default BoardList;
