import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOwnedBooks } from '@/api/bookApi'; 

const BookIcon = (props) => (
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
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { purchasedBooks, rentedBooks } = await getOwnedBooks();

                const allBooks = [...purchasedBooks, ...rentedBooks];
                setBooks(allBooks);
            } catch (error) {
                setError("Failed to fetch owned books.");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid gap-6 p-6 md:p-12">
            <div className="grid gap-2">
                <h1 className="text-2xl font-bold">My Books</h1>
                <p className="text-muted-foreground">Here's a list of the books you've purchased or rented.</p>
            </div>
            <div className="grid gap-4">
                {books.map((book, index) => (
                    <a key={index} href="#" className="no-underline">
                        <Card>
                            <CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full">
                                    <BookIcon className="w-6 h-6" />
                                </div>
                                <div className="grid gap-1">
                                    <h3 className="font-semibold">{book.title}</h3>
                                    <p className="text-muted-foreground">by {book.author}</p>
                                </div>
                                <Badge variant="outline" className="px-2 py-1 text-xs">
                                    {book.type}
                                </Badge>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BookList;
