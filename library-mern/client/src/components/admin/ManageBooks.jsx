import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook, updateBook, deleteBook } from "@/features/books/bookThunks"; // Adjust import path accordingly
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function BookManagement() {
    const dispatch = useDispatch();
    const { items: books, loading, error } = useSelector((state) => state.books); // Get books, loading, error state from Redux

    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Fetch books on component mount
    useEffect(() => {
        dispatch(fetchBooks()); // Dispatch the thunk to fetch books
    }, [dispatch]);

    // Open modal for editing or adding a new book
    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteBook(id)); // Dispatch the thunk to delete a book by ID
    };

    const handleSubmit = (book) => {
        if (selectedBook) {
            dispatch(updateBook(book)); // Dispatch the thunk to update the book
        } else {
            dispatch(addBook(book)); // Dispatch the thunk to add a new book
        }
        setShowModal(false);
        setSelectedBook(null);
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-primary text-primary-foreground py-4 px-6">
                <h1 className="text-2xl font-bold">Book Management</h1>
            </header>
            <main className="flex-1 p-6">
                <div className="flex justify-end mb-4">
                    <Button variant="outline" onClick={() => setShowModal(true)}>
                        Add Book
                    </Button>
                </div>
                {loading && <p>Loading books...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-muted text-muted-foreground">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Author</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Published Date</th>
                                <th className="px-4 py-2 text-right">Price</th>
                                <th className="px-4 py-2 text-right">Rental Price</th>
                                <th className="px-4 py-2 text-center">Available</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id || book._id} className="border-b"> {/* Use book.id or book._id */}
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author.username || "Unknown"}</td> {/* Render the username */}
                                    <td className="px-4 py-2">{book.description}</td>
                                    <td className="px-4 py-2">{new Date(book.publishedDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 text-right">${book.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-right">${book.rentalPrice.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-center">
                                        {book.availableForPurchase && book.availableForRental ? (
                                            <Badge variant="success">Available</Badge>
                                        ) : (
                                            <Badge variant="danger">Unavailable</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete(book.id || book._id)}>
                                                Delete
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedBook ? "Edit Book" : "Create Book"}</DialogTitle>
                        <DialogDescription>
                            {selectedBook ? "Update the book details below." : "Fill out the form to create a new book."}
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const book = {
                                id: selectedBook?.id || selectedBook?._id, // For update
                                title: formData.get("title"),
                                author: formData.get("author"),
                                description: formData.get("description"),
                                publishedDate: formData.get("publishedDate"),
                                price: parseFloat(formData.get("price")),
                                rentalPrice: parseFloat(formData.get("rentalPrice")),
                                availableForPurchase: formData.get("availableForPurchase") === "on",
                                availableForRental: formData.get("availableForRental") === "on",
                            };
                            handleSubmit(book);
                        }}
                    >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" defaultValue={selectedBook?.title} required />
                                </div>
                                <div>
                                    <Label htmlFor="author">Author</Label>
                                    <Input id="author" name="author" defaultValue={selectedBook?.author.username} required />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" defaultValue={selectedBook?.description} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="publishedDate">Published Date</Label>
                                    <Input
                                        id="publishedDate"
                                        name="publishedDate"
                                        type="date"
                                        defaultValue={selectedBook?.publishedDate?.split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" name="price" type="number" step="0.01" defaultValue={selectedBook?.price} />
                                </div>
                                <div>
                                    <Label htmlFor="rentalPrice">Rental Price</Label>
                                    <Input id="rentalPrice" name="rentalPrice" type="number" step="0.01" defaultValue={selectedBook?.rentalPrice} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="availableForPurchase"
                                        name="availableForPurchase"
                                        defaultChecked={selectedBook?.availableForPurchase}
                                    />
                                    <Label htmlFor="availableForPurchase">Available for Purchase</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="availableForRental"
                                        name="availableForRental"
                                        defaultChecked={selectedBook?.availableForRental}
                                    />
                                    <Label htmlFor="availableForRental">Available for Rental</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{selectedBook ? "Save Changes" : "Create Book"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <footer className="bg-muted text-muted-foreground py-4 px-6">
                <div className="flex justify-between items-center">
                    <p>&copy; 2023 Book Management. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
