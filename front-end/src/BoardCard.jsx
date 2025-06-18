import "./BoardCard.css"


const BoardCard = ({board, onViewClick, onDeleteClick}) => {
    return (
        <div className="board-card" >
            <img src={board.image} alt="Board Card" width="200px"/>
            <h3>{board.title}</h3>
            <p>{board.type}</p>
            <div className="card-buttons">
                <button className="view-button" onClick={() => onViewClick(board)}>View Board</button>
                <button className="delete-button" onClick={() => onDeleteClick(board)}>Delete Board</button>
            </div>
        </div>
    );
}



export default BoardCard
