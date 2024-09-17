import React, { useEffect, useState } from 'react';
import { getBookById } from '@/api/bookApi';
import { getComments, postComment } from '@/api/commentApi';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useParams } from 'react-router-dom';

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
    const [book, setBook] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookId) {
            setError('No book ID provided');
            return;
        }

        const fetchBookDetails = async () => {
            try {
                const bookResponse = await getBookById(bookId);
                setBook(bookResponse);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Error fetching book details');
            }
        };

        const fetchBookComments = async () => {
            try {
                const commentsResponse = await getComments(bookId);
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
        try {
            const commentData = { description: newComment };
            await postComment(bookId, commentData);
            setNewComment(''); 
            
            // Refresh comments after posting a new one
            const updatedComments = await getComments(bookId);
            setComments(updatedComments);
        } catch (err) {
            setError('Error posting comment');
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!book) return <div>Loading...</div>;

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
                        <Button size="lg">Buy</Button>
                        <Button variant="outline" size="lg">Rent</Button>
                    </div>
                </div>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-6">
                <div>
                    <h2 className="text-2xl font-bold">Reviews</h2>
                </div>
                <div className="grid gap-4">
                    {comments.map(comment => (
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
                    ))}
                </div>
                <div>
                    <form onSubmit={handleCommentSubmit}>
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a review..."
                            className="w-full rounded-lg border border-muted p-4"
                            rows={4}
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
