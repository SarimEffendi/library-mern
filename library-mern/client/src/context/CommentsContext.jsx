import React, { createContext, useState, useEffect } from 'react';
import {
    getAllComments,
    postComment,
    updateExistingComment,
    deleteExistingComment,
} from '../api/commentApi';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        console.log("Loading all comments...");
        try {
            setLoading(true);
            const data = await getAllComments();
            console.log("Fetched comments:", data);
            setComments(data);
            setLoading(false);
        } catch (err) {
            console.error("Error in loadComments:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const addComment = async (comment) => {
        console.log("Adding comment:", comment);
        try {
            const newComment = await postComment(comment.bookId, { description: comment.description });
            console.log("New comment added:", newComment);
            setComments((prevComments) => [...prevComments, newComment]);
            return newComment; // Ensure the created comment is returned
        } catch (err) {
            console.error("Error in addComment:", err);
            setError(err.message);
        }
    };

    const editComment = async (id, updatedFields) => {
        console.log(`Editing comment ID ${id} with fields:`, updatedFields);
        try {
            const updatedComment = await updateExistingComment(id, updatedFields);
            console.log("Updated comment:", updatedComment);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === id ? updatedComment : comment
                )
            );
            return updatedComment;
        } catch (err) {
            console.error("Error in editComment:", err);
            setError(err.message);
        }
    };

    const deleteComment = async (id) => {
        console.log(`Deleting comment ID ${id}`);
        try {
            await deleteExistingComment(id);
            console.log(`Comment ID ${id} deleted.`);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== id)
            );
        } catch (err) {
            console.error("Error in deleteComment:", err);
            setError(err.message);
        }
    };

    return (
        <CommentsContext.Provider
            value={{
                comments,
                loading,
                error,
                addComment,
                editComment,
                deleteComment,
                reloadComments: loadComments,
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
