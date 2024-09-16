import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAllBooks } from "@/api/bookApi"; 

export default function BookSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getAllBooks();
                console.log(fetchedBooks); 
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Input
                    type="search"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                    <Link
                        key={book._id}
                        to={`/book/${book._id}`}
                        className="flex items-start gap-4 bg-background rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        <img
                            src={book.image || "https://m.media-amazon.com/images/I/416V8IMmH7L._SX342_SY445_.jpg"}
                            alt={book.title}
                            width={120}
                            height={180}
                            className="object-cover w-[120px] h-[180px]"
                            style={{ aspectRatio: "120/180", objectFit: "cover" }}
                        />
                        <div className="flex-1 p-4">
                            <h3 className="text-lg font-medium mb-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                by {book.author?.username || "Unknown Author"}
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-lg font-semibold">
                                    ${book.price || "N/A"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Rent for ${book.rentalPrice || "N/A"}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm">Buy</Button>
                                <Button size="sm" variant="outline">
                                    Rent
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
