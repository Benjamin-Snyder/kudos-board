import "./Card.css";
import filledPin from "./assets/filled-pin.png";
import emptyPin from "./assets/empty-pin.png";
import { useState, useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Card = ({ card, onUpvoteClick, onDeleteClick, onPinClick }) => {
    const [pinSrc, setPinSrc] = useState(card.isPinned ? filledPin : emptyPin);

    const {darkMode} = useContext(DarkModeContext);

    const handlePinClick = () => {
        const newPinnedState = pinSrc === emptyPin;
        setPinSrc(newPinnedState ? filledPin : emptyPin);
        onPinClick(card, newPinnedState);
    };

    return (
        <div className={darkMode ? `dark-card` :`light-card`}>
            <img className={darkMode ? `dark-pin-button` :`light-pin-button`} src={pinSrc} onClick={handlePinClick} alt="Pin Button" width="30px" />
            <img className="card-gif" src={card.gif} alt="Card Gif" width="200px" />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="card-buttons">
                <button className="upvote-button" onClick={() => onUpvoteClick(card)}>{`Upvote: ${card.upvotes}`}</button>
                <button className="delete-button" onClick={() => onDeleteClick(card)}>Delete Board</button>
            </div>
        </div>
    );
};

export default Card;
