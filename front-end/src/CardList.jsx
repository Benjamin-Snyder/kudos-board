import "./CardList.css"
import BoardCard from "./BoardCard"

const CardList = ({filter, searchQuery, cards, onViewClick, onDeleteClick}) => {
    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCards = (cards) => {
        if (filter === 'All') {
            return cards;
        } else if (filter === 'Recent') {
            // Implement sorting logic for 'Recent' if needed
        } else if (filter === 'Celebration') {
            return cards.filter(card => card.type === 'Celebration');
        } else if (filter === 'Thank You') {
            return cards.filter(card => card.type === 'Thank You');
        } else if (filter === 'Inspiration') {
            return cards.filter(card => card.type === 'Inspiration');
        }
        return [];
    };

    const cardsToDisplay = sortedCards(filteredCards);

    return (
        <div className="list-of-cards">
            {cardsToDisplay.map((card) => (
                <BoardCard
                    key={card.id}
                    board={card}
                    onViewClick={onViewClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </div>
    );
}

export default CardList;
