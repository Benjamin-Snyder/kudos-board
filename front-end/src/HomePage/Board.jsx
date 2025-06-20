import "./Board.css"
import { Link } from "react-router"
import { DarkModeContext } from "../DarkModeContext";
import { useContext } from "react";

const Board = ({board, onDeleteClick}) => {
    const {darkMode} = useContext(DarkModeContext);
    return (
        <div className={darkMode ? `dark-board-card` : `light-board-card`} >
            <img src={board.image} className={darkMode ? `dark-img` : ``} alt="Board Card" width="200px"/>
            <h3>{board.title}</h3>
            <p>{board.type}</p>
            <div className="card-buttons">
                <Link to={`/boards/${board.id}/cards`} ><button className="view-button" >View Board</button></Link>
                <button className="delete-button" onClick={ ()=> onDeleteClick(board.id)}>Delete Board</button>
            </div>
        </div>
    );
}

export default Board
