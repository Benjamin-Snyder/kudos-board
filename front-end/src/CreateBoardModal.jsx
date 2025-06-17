import "./CreateBoardModal.css"


const CreateBoardModal = () => {

    return(
        <div className= "opaque-background" >
            <div className= "modal-content">
                <h2>Create a New Board</h2>
                <div className="inputs">
                    <label htmlFor="board-title">Title:</label>
                    <input type="text" id="board-title"/>
                    <label htmlFor="board-author">Author:</label>
                    <input type="text" id="board-author"/>
                </div>

            </div>
        </div>
    )
}

export default CreateBoardModal;
