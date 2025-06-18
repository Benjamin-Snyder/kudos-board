
import "./ViewBoard.css";
import { Link } from "react-router"; // Corrected import
import { useParams } from "react-router"; // Corrected import
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const ViewBoard = () => {
const { id } = useParams();
const [board, setBoard] = useState(null);
const BASE_URL = import.meta.env.VITE_BASE_URL;
useEffect(() => {
    const fetchBoard = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setBoard(response.data);
    } catch (error) {
        console.error("Error fetching board:", error);
    }
    };

    fetchBoard();
}, [id]);

console.log(board);

if (!board) {
    return <div>Loading...</div>;
}

return (
    <div>

        <h1>View Board</h1>
        <h2>{board.title}</h2>
        <p>Type: {board.type}</p>
        <img src={board.image} alt={board.title} />
        <Link to="/"><button>Home</button></Link>
        <Footer/>
    </div>
);
};

export default ViewBoard;
