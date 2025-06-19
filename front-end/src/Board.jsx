import "./Board.css"
import { Link } from "react-router"


const Board = ({board, onViewClick, onDeleteClick}) => {
    return (
        <div className="board-card" >
            <img src={board.image} alt="Board Card" width="200px"/>
            <h3>{board.title}</h3>
            <p>{board.type}</p>
            <div className="card-buttons">
                <Link to={`/boards/${board.id}/cards`} ><button className="view-button" onClick={() => onViewClick(board)}>View Board</button></Link>
                <button className="delete-button" onClick={ ()=> onDeleteClick(board.id)}>Delete Board</button>
            </div>
        </div>
    );
}



export default Board
