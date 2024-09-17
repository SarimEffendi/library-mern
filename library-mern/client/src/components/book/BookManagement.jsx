import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getBooksByAuthor, createBook, updateBookById, deleteBook } from "@/api/bookApi";

export default function BookManagement() {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [showBookForm, setShowBookForm] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [user, setUser] = useState({ username: "", id: "" });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUser({ username: decodedToken.username, id: decodedToken._id });
                    const data = await getBooksByAuthor(decodedToken._id);
                    setBooks(data);
                } else {
                    console.log("No token found");
                }
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleDeleteBook = (book) => {
        setBookToDelete(book);
        setShowModal(true);
    };

    const confirmDeleteBook = async () => {
        if (bookToDelete) {
            try {
                await deleteBook(bookToDelete.id);
                setBooks(books.filter((book) => book.id !== bookToDelete.id));
                setShowModal(false);
            } catch (error) {
                console.error('Failed to delete book:', error);
            }
        }
    };

    const handleEditBook = (book) => {
        setCurrentBook(book);
        setShowBookForm(true);
    };

    const handleAddBook = () => {
        setCurrentBook(null);
        setShowBookForm(true);
    };

    const saveBook = async (book) => {
        try {
            if (book.id) {
                await updateBookById(book.id, book);
                setBooks(books.map((b) => (b.id === book.id ? book : b)));
            } else {
                const newBook = await createBook(book);
                setBooks([...books, { ...newBook, id: books.length + 1 }]);
            }
            setShowBookForm(false);
        } catch (error) {
            console.error('Failed to save book:', error);
        }
    };

    return (
        <div className="bg-muted/40 min-h-screen flex flex-col">
            <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Publications</h1>
                <Button onClick={handleAddBook}>Add Book</Button>
            </header>
            <main className="flex-1 p-6 grid gap-6">
                {books.length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    books.map((book) => (
                        <Card key={book.id} className="flex flex-col md:flex-row">
                            <div className="flex-1">
                                <CardHeader>
                                    <CardTitle>{book.title}</CardTitle>
                                    {/* Fix rendering of author object */}
                                    <CardDescription>Author: {book.author.username}</CardDescription>
                                    <CardDescription>Published: {book.publicationDate}</CardDescription>
                                    <CardDescription>Price: ${book.price}</CardDescription>
                                    <CardDescription>Rental Price: ${book.rentalPrice}</CardDescription>
                                    <div className="flex items-center gap-2">
                                        {book.availableForPurchase ? (
                                            <div className="flex items-center gap-2">
                                                <CheckIcon className="w-4 h-4 text-green-500" />
                                                <span>Available for Purchase</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <XIcon className="w-4 h-4 text-red-500" />
                                                <span>Not Available for Purchase</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {book.availableForRental ? (
                                            <div className="flex items-center gap-2">
                                                <CheckIcon className="w-4 h-4 text-green-500" />
                                                <span>Available for Rental</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <XIcon className="w-4 h-4 text-red-500" />
                                                <span>Not Available for Rental</span>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p>{book.description}</p>
                                </CardContent>
                                <CardFooter className="mt-auto flex gap-2">
                                    <Button variant="outline" onClick={() => handleEditBook(book)}>
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDeleteBook(book)}>
                                        Delete
                                    </Button>
                                </CardFooter>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 md:w-48">
                                <img
                                    src={book.imageUrl || "https://m.media-amazon.com/images/I/416V8IMmH7L._SX342_SY445_.jpg"}
                                    alt={`Cover of ${book.title}`}
                                    width={192}
                                    height={256}
                                    className="w-full h-auto rounded-md object-cover"
                                    style={{ aspectRatio: "192/256", objectFit: "cover" }}
                                />
                            </div>
                        </Card>
                    ))
                )}
            </main>
            <AlertDialog open={showModal} onOpenChange={setShowModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Book</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete "{bookToDelete?.title}"?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteBook}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog open={showBookForm} onOpenChange={setShowBookForm} className="max-h-[90vh] overflow-auto">
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>{currentBook ? "Edit Book" : "Add Book"}</DialogTitle>
                        <DialogDescription>
                            {currentBook ? "Make changes to the book details." : "Fill out the form to add a new book."}
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            saveBook({
                                id: currentBook?.id,
                                title: e.target.title.value,
                                author: { username: user.username, _id: user.id }, // Save the author's details
                                publicationDate: e.target.publicationDate.value,
                                description: e.target.description.value,
                                price: parseFloat(e.target.price.value),
                                rentalPrice: parseFloat(e.target.rentalPrice.value),
                                availableForPurchase: e.target.availableForPurchase.value === 'yes',
                                availableForRental: e.target.availableForRental.value === 'yes',
                                imageUrl: e.target.imageUrl.value,
                            });
                        }}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" name="title" defaultValue={currentBook?.title} required />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author
                            </Label>
                            <Input
                                id="author"
                                name="author"
                                value={user.username}
                                disabled
                                className="bg-muted/40"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="publicationDate" className="text-right">
                                Publication Date
                            </Label>
                            <Input
                                id="publicationDate"
                                name="publicationDate"
                                type="date"
                                defaultValue={currentBook?.publicationDate}
                                required
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea id="description" name="description" defaultValue={currentBook?.description} required />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price ($)
                            </Label>
                            <Input id="price" name="price" type="number" step="0.01" defaultValue={currentBook?.price} required />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="rentalPrice" className="text-right">
                                Rental Price ($)
                            </Label>
                            <Input id="rentalPrice" name="rentalPrice" type="number" step="0.01" defaultValue={currentBook?.rentalPrice} required />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label className="text-right">Available for Purchase</Label>
                            <Select defaultValue={currentBook?.availableForPurchase ? 'yes' : 'no'} name="availableForPurchase">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label className="text-right">Available for Rental</Label>
                            <Select defaultValue={currentBook?.availableForRental ? 'yes' : 'no'} name="availableForRental">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="imageUrl" className="text-right">
                                Cover Image URL
                            </Label>
                            <Input id="imageUrl" name="imageUrl" defaultValue={currentBook?.imageUrl} required />
                        </div>
                        <DialogFooter>
                            <Button type="submit">{currentBook ? "Save Changes" : "Add Book"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}


function CheckIcon(props) {
    return (
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
function XIcon(props) {
    return (
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}