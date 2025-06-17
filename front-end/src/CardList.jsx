import "./CardList.css"
import BoardCard from "./BoardCard"

const CardList = ({filter, searchQuery, cards, onViewClick, onDeleteClick}) => {
    const searchedCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function sortDate(playlist){
        let sorted = playlist.sort((a,b)=>{
            if(a.date < b.date) return 1;
            if(a.date > b.date) return -1;
            return 0;
        })
        return sorted;
    }

    const filteredCards = (cards) => {
        if (filter === 'All') {
            return cards;
        } else if (filter === 'Recent') {
            return sortDate(cards).splice(0,6);
        } else if (filter === 'Celebration') {
            return cards.filter(card => card.type === 'Celebration');
        } else if (filter === 'Thank You') {
            return cards.filter(card => card.type === 'Thank You');
        } else if (filter === 'Inspiration') {
            return cards.filter(card => card.type === 'Inspiration');
        }
        return [];
    };

    const cardsToDisplay = filteredCards(searchedCards);

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
