import "./CreateBoardButton.css"


const CreateBoardButton = ({ onClick }) => {
return (
    <div className="create-button">
    <button onClick={onClick}>Create a New Board</button>
    </div>
);
};

export default CreateBoardButton;
