
import "./ViewBoard.css";
import { Link } from "react-router"; // Corrected import
import { useParams } from "react-router"; // Corrected import
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import CardList from "./CardList.jsx";
import { fetchCards } from "./utils.js";

const ViewBoard = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]); // State for cards
    const [loading, setLoading] = useState(true); // Add loading state
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const fetchBoard = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            setBoard(response.data);
            console.log(`data: ${response.data}`);
        } catch (error) {
            console.error("Error fetching board:", error);
        }
    };

    const loadCards = async () => {
        try {
            const cardsData = await axios.get(`${BASE_URL}/${id}/cards`);
            setCards(cardsData.data);
            console.log(`Carddata: ${cardsData.data}`);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchBoard();
        loadCards();
    }, [id]);





    if (loading) {
        return <div>Loading...</div>;
    }

    if (!board) {
        return <div>No board found</div>;
    }

    console.log(`cards: ${cards}`)
    return (
        <div className="view-board">
            <Link to="/"><button id="home-button">Home</button></Link>
            <div className="top-portion">
                <Header/>
                <h1>{board.title}</h1>
                <button>Create a Card</button>
            </div>

            <CardList cards={cards} />

            <Footer/>
        </div>
    );
};

export default ViewBoard;
