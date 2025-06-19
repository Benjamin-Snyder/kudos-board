import "./CardList.css"
import Card from "./Card"

const CardList = ({cards, onUpvoteClick, onDeleteClick}) => {

    return (
        <div className="list-of-cards">
            {cards.map((card) => (
                <Card
                    key = {card.id}
                    card={card}
                    onUpvoteClick={onUpvoteClick}
                    onDeleteClick={onDeleteClick} />
            ))}
        </div>

    )
}

export default CardList
