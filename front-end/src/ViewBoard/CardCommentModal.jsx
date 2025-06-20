import React, { useState, useEffect } from "react";
import "./CardCommentModal.css";
import { addComment } from "../utils";

const CardCommentModal = ({ card = {}, isOpen, onClose }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => { // Update comments when card changes
        if (card.comments) {
            setComments(card.comments);
        }
    }, [card]);

    const handlePost = async () => {
        if (comment && author) { // Check if comment and author are not empty
            const newComment = `${author}: ${comment}`;
            try {
                const updatedCard = await addComment(card, newComment); // Add comment to card in database
                setComments(updatedCard.comments);
                setComment("");
                setAuthor("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="comment-inputs">
                    <input
                        type="text"
                        id="comment-input"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <input
                        type="text"
                        id="author-input"
                        placeholder="Author..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <button id="post-button" onClick={handlePost}>Post</button>
                </div>
                <div className="comments-list">
                    {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        {comment}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCommentModal;
