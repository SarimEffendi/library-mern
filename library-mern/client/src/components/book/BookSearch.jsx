import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAllBooks } from "@/api/bookApi";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function BookSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 5; 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedData = await getAllBooks(currentPage, itemsPerPage, searchTerm); 
                console.log("Fetched Data: ", fetchedData);

                if (fetchedData.books) {
                    setBooks(fetchedData.books); 
                    setTotalPages(fetchedData.totalPages); 
                } else {
                    console.error("Error: Fetched data does not contain valid 'books' array");
                    setBooks([]);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                setBooks([]);
            }
        };

        fetchBooks(); 
    }, [currentPage, searchTerm]); 

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            <PaginationItem key={page}>
                <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                    }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        );
    }

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
                {books.map((book) => (
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
                                <div className="text-lg font-semibold">${book.price || "N/A"}</div>
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) handlePageChange(currentPage - 1);
                                    }}
                                    disabled={currentPage === 1}
                                />
                            </PaginationItem>
                            {paginationItems}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                    }}
                                    disabled={currentPage === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
