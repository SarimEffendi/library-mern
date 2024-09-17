// src/components/BookDetails.jsx
import React, { useEffect, useState } from 'react';
import { getBookById } from '@/api/bookApi';
import { getComments, postComment } from '@/api/commentApi';
import { createCheckoutSession } from '@/api/paymentApi';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useParams, useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';

const StarIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const stripe = useStripe();

    const [book, setBook] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('BookDetails Component Mounted');
        console.log('Extracted bookId from URL:', bookId);

        if (!bookId) {
            console.error('No book ID provided');
            setError('No book ID provided');
            return;
        }

        const fetchBookDetails = async () => {
            console.log(`Fetching details for bookId: ${bookId}`);
            try {
                const bookResponse = await getBookById(bookId);
                console.log('Book details fetched successfully:', bookResponse);
                setBook(bookResponse);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Error fetching book details');
            }
        };

        const fetchBookComments = async () => {
            console.log(`Fetching comments for bookId: ${bookId}`);
            try {
                const commentsResponse = await getComments(bookId);
                console.log('Comments fetched successfully:', commentsResponse);
                setComments(commentsResponse);
            } catch (err) {
                console.error('Error fetching comments:', err);
                setError('Error fetching comments');
            }
        };

        fetchBookDetails();
        fetchBookComments();
    }, [bookId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting new comment:', newComment);
        try {
            const commentData = { description: newComment };
            const postResponse = await postComment(bookId, commentData);
            console.log('Comment posted successfully:', postResponse);
            setNewComment('');

            // Refresh comments after posting a new one
            console.log('Refreshing comments after new comment submission');
            const updatedComments = await getComments(bookId);
            console.log('Updated comments fetched:', updatedComments);
            setComments(updatedComments);
        } catch (err) {
            console.error('Error posting comment:', err);
            setError('Error posting comment');
        }
    };

    const handlePayment = async (type) => {
        console.log(`Initiating payment of type: ${type} for bookId: ${bookId}`);
        if (!stripe) {
            console.error('Stripe has not loaded yet.');
            setError('Stripe has not loaded yet. Please try again later.');
            return;
        }

        setLoading(true);
        try {
            // Initiate the checkout session using the API function
            const response = await createCheckoutSession(bookId, type);
            console.log('Checkout session created successfully:', response);
            const { url } = response;

            if (url) {
                console.log('Redirecting to Stripe Checkout URL:', url);
                // Redirect to Stripe Checkout
                window.location.href = url;
            } else {
                console.error('Stripe Checkout URL not found in response:', response);
                setError('Failed to initiate payment. Please try again.');
                setLoading(false);
            }
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 2xx
                console.error('Error response from server:', err.response);
                setError(`Payment initiation failed: ${err.response.data.message || 'Unknown error'}`);
            } else if (err.request) {
                // Request was made but no response received
                console.error('No response received from server:', err.request);
                setError('No response from server. Please try again later.');
            } else {
                // Something else caused the error
                console.error('Error creating checkout session:', err.message);
                setError('Failed to initiate payment. Please try again.');
            }
            setLoading(false);
        }
    };

    // Log the current state whenever it changes (optional, can be verbose)
    useEffect(() => {
        console.log('Current State:', { book, comments, error, loading });
    }, [book, comments, error, loading]);

    if (error) {
        console.error('Rendering error state:', error);
        return (
            <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-background rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="text-red-500">Error: {error}</p>
                <Button className="mt-4" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </div>
        );
    }

    if (!book) {
        console.log('Book data not loaded yet. Rendering loading state.');
        return <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-background rounded-lg shadow-lg">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-background rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={book.coverImage || "https://m.media-amazon.com/images/I/416V8IMmH7L._SX342_SY445_.jpg"}
                        alt="Book Cover"
                        width={400}
                        height={600}
                        className="rounded-lg w-full h-auto object-cover"
                        style={{ aspectRatio: "400/600", objectFit: "cover" }}
                        onLoad={() => console.log('Book cover image loaded successfully')}
                        onError={() => console.error('Error loading book cover image')}
                    />
                </div>
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-muted-foreground">by {book.author.username}</p>
                    </div>
                    <div className="prose max-w-none">
                        <p>{book.description}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <div className="text-muted-foreground">Price</div>
                            <div className="text-2xl font-bold">${book.price}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">Rental Price</div>
                            <div className="text-2xl font-bold">${book.rentalPrice}</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button size="lg" onClick={() => handlePayment('purchase')} disabled={loading}>
                            {loading ? 'Processing...' : 'Buy'}
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => handlePayment('rental')} disabled={loading}>
                            {loading ? 'Processing...' : 'Rent'}
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-6">
                <div>
                    <h2 className="text-2xl font-bold">Reviews</h2>
                </div>
                <div className="grid gap-4">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment._id} className="flex items-start gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarImage src={comment.author.avatar || "/placeholder-user.jpg"} alt={comment.author.username} />
                                    <AvatarFallback>{comment.author.username.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{comment.author.username}</div>
                                        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} className={`w-4 h-4 ${i < comment.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-muted-foreground">{comment.description}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review this book!</p>
                    )}
                </div>
                <div>
                    <form onSubmit={handleCommentSubmit}>
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a review..."
                            className="w-full rounded-lg border border-muted p-4"
                            rows={4}
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <Button type="submit">Submit Review</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
