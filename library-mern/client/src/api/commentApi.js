import axiosInstance from '@/api/axiosInstance'; // Import the axios instance with baseURL and interceptors

// Fetch all comments
export const getAllComments = async () => {
    try {
        console.log("Fetching all comments...");
        const response = await axiosInstance.get('/comment'); // No need for BASE_URL or headers
        console.log("All comments fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all comments:', error);
        throw error;
    }
};

// Fetch comments for a specific book
// Fetch comments for a specific book
// Fetch comments for a specific book
export const getComments = async (bookId) => {
    if (!bookId) {
        console.error('bookId is undefined or null');
        return [];
    }
    try {
        console.log(`Fetching comments for bookId: ${bookId}`);
        const response = await axiosInstance.get(`/comment/book/${bookId}`);
        console.log(`Comments for bookId ${bookId} fetched successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};


// Post a new comment
export const postComment = async (bookId, commentData) => {
    if (!bookId) {
        console.error('bookId is undefined or null');
        return;
    }
    try {
        console.log(`Posting new comment for bookId: ${bookId}`, commentData);
        const response = await axiosInstance.post(`/comment/${bookId}`, commentData); // No need for BASE_URL or headers
        console.log("New comment posted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

// Update an existing comment
export const updateExistingComment = async (commentId, updatedFields) => {
    if (!commentId) {
        console.error('commentId is undefined or null');
        return;
    }
    try {
        console.log(`Updating comment ID: ${commentId} with fields:`, updatedFields);
        const response = await axiosInstance.put(`/comment/${commentId}`, updatedFields); // No need for BASE_URL or headers
        console.log("Comment updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

// Delete an existing comment
export const deleteExistingComment = async (commentId) => {
    if (!commentId) {
        console.error('commentId is undefined or null');
        return;
    }
    try {
        console.log(`Deleting comment ID: ${commentId}`);
        const response = await axiosInstance.delete(`/comment/${commentId}`); // No need for BASE_URL or headers
        console.log(`Comment ID ${commentId} deleted successfully.`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
