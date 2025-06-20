import "./CardList.css";
import Card from "./Card"

const CardList = ({ cards, onUpvoteClick, onDeleteClick, onPinClick }) => {
    return (
        <div className="list-of-cards">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onUpvoteClick={onUpvoteClick}
                    onDeleteClick={onDeleteClick}
                    onPinClick={onPinClick} // Ensure this line is present
                />
            ))}
        </div>
    );
};

export default CardList;
