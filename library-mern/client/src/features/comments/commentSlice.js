import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchCommentsByBookId, 
    fetchCommentById, 
    addComment, 
    updateComment, 
    deleteComment, 
    fetchCommentsByAuthor 
} from '@/features/comments/commentThunks';

const initialState = {
    items: [],              
    loading: false,         
    error: null,            
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch comments by book ID
            // .addCase(fetchCommentsByBookId.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchCommentsByBookId.fulfilled, (state, action) => {
            //     state.items = action.payload;
            //     state.loading = false;
            // })
            // .addCase(fetchCommentsByBookId.rejected, (state, action) => {
            //     state.error = action.payload || action.error.message;
            //     state.loading = false;
            // })

            // Fetch comment by ID
            .addCase(fetchCommentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentById.fulfilled, (state, action) => {
                state.loading = false;
                // Update specific comment in the state
            })
            .addCase(fetchCommentById.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            })

            // Add new comment
            .addCase(addComment.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // Update existing comment
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (comment) => comment.id === action.payload.id || comment._id === action.payload._id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            // Delete a comment
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (comment) => comment.id !== action.payload && comment._id !== action.payload
                );
            })

            // Fetch comments by author
            .addCase(fetchCommentsByAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentsByAuthor.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCommentsByAuthor.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            });
    },
});

export default commentsSlice.reducer;
