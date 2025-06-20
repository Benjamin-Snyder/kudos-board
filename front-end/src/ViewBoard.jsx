import "./ViewBoard.css";
import { Link } from "react-router"; // Corrected import
import { useParams } from "react-router"; // Corrected import
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import CardList from "./CardList.jsx";
import { upvoteCard, deleteCard } from "./utils.js";
import CreateCardModal from "./CreateCardModal.jsx";

const ViewBoard = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]); // State for cards
    const [loading, setLoading] = useState(true); // Add loading state
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility


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

    const handlePinClick = async (card, isPinned) => {
        try {
            // Update the card's pinned state in the backend
            const updatedCard = { ...card, isPinned: isPinned };
            await axios.put(`${BASE_URL}/${id}/cards/${card.id}`, updatedCard);

            setCards((prevCards) =>
                prevCards.map((c) => (c.id === card.id ? updatedCard : c))
            );
        } catch (error) {
            console.error("Error updating pin state:", error);
        }
    };

    const sortbyUpvotesAndPins = (cards) => {
        let sorted = [...cards].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            if (a.upvotes < b.upvotes) return 1;
            if (a.upvotes > b.upvotes) return -1;
            return 0;
        });
        return sorted;
    };

    let sortedCards = sortbyUpvotesAndPins(cards);

    const handleUpvoteClick = async (card) => {
        try {
            const updatedCard = await upvoteCard(card);
            setCards((prevCards) =>
                prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
            );
        } catch (error) {
            console.error("Error upvoting card:", error);
        }
    };

    const handleDeleteClick = async (card) => {
        try {
            await deleteCard(card);
            loadCards();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };




    const handleCloseModal = () => {
        setIsModalVisible(false); // Set modal visibility to false
    };

    const handleOpenModal = () => {
        setIsModalVisible(true); // Set modal visibility to true
    };

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
                <Header />
                <h1>{board.title}</h1>
                <button onClick={handleOpenModal}>Create a Card</button>
                {cards.length === 0 ? <h2 className="no-cards">No cards found</h2> : null}
            </div>

            <CreateCardModal
                boardId={id} // Pass boardId here
                isModalVisible={isModalVisible}
                onClose={handleCloseModal}
                onCreateCard={loadCards}
            />


            <CardList
                cards={sortedCards}
                onUpvoteClick={handleUpvoteClick}
                onDeleteClick={handleDeleteClick}
                onPinClick={handlePinClick}
            />

            <Footer />
        </div>
    );
};

export default ViewBoard;
