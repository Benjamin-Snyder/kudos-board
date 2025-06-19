
import "./ViewBoard.css";
import { Link } from "react-router"; // Corrected import
import { useParams } from "react-router"; // Corrected import
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import CardList from "./CardList.jsx";
import { upvoteCard, deleteCard } from "./utils.js";

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
        } catch (error) {
            console.error("Error fetching board:", error);
        }
    };

    const loadCards = async () => {
        try {
            const cardsData = await axios.get(`${BASE_URL}/${id}/cards`);
            setCards(cardsData.data);
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


    const handleUpvoteClick = async (card) => {
        try {
            const updatedCard = await upvoteCard(card);
            setCards((prevCards) => // ensure the order of card stays the same
                prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
            );
        }catch (error) {
            console.error("Error upvoting card:", error);
        }
    }

    const handleDeleteClick = async (card) => {

        try{
            await deleteCard(card);
            loadCards();
        }catch(error){
            console.error("Error deleting card:", error);
        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!board) {
        return <div>No board found</div>;
    }


    return (
        <div className="view-board">
            <Link to="/"><button id="home-button">Home</button></Link>
            <div className="top-portion">
                <Header/>
                <h1>{board.title}</h1>
                <button>Create a Card</button>
                {cards.length === 0 ? <h2 className="no-cards">No cards found</h2> : null}
            </div>


            <CardList cards={cards} onUpvoteClick={handleUpvoteClick} onDeleteClick={handleDeleteClick}/>

            <Footer/>
        </div>
    );
};

export default ViewBoard;
