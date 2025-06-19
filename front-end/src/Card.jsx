import "./Card.css"

const Card = ({card, onUpvoteClick, onDeleteClick}) => {

    return (
        <div className="card" >
            <img src={card.gif} alt="Card Gif" width="200px"/>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="card-buttons">
                <button className="upvote-button" onClick={()=>onUpvoteClick(card)}>{`Upvote: ${card.upvotes}`}</button>
                <button className="delete-button" onClick={()=>onDeleteClick(card)}>Delete Board</button>
            </div>
        </div>
    );
}

export default Card;
