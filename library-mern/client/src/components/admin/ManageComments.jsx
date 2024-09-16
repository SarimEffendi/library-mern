// src/components/admin/ManageComments.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function ManageComments() {
    const [comments, setComments] = useState([
        { id: 1, bookName: "The Great Gatsby", description: "Beautifully written, a true classic!", author: "John Doe", publishedDate: "2023-04-15" },
        { id: 2, bookName: "To Kill a Mockingbird", description: "A powerful and thought-provoking novel.", author: "Jane Smith", publishedDate: "2022-11-20" },
        { id: 3, bookName: "Harry Potter and the Sorcerer's Stone", description: "Magical and enchanting, a true masterpiece.", author: "Emily Johnson", publishedDate: "2021-08-01" },
        { id: 4, bookName: "Pride and Prejudice", description: "A timeless romance that captivates the heart.", author: "Michael Brown", publishedDate: "2020-03-10" },
        { id: 5, bookName: "The Catcher in the Rye", description: "A raw and honest portrayal of adolescence.", author: "Sarah Davis", publishedDate: "2019-09-25" },
        { id: 6, bookName: "To Kill a Mockingbird", description: "A powerful and thought-provoking novel.", author: "Jane Smith", publishedDate: "2022-11-20" },
        { id: 7, bookName: "Harry Potter and the Sorcerer's Stone", description: "Magical and enchanting, a true masterpiece.", author: "Emily Johnson", publishedDate: "2021-08-01" },
        { id: 8, bookName: "Pride and Prejudice", description: "A timeless romance that captivates the heart.", author: "Michael Brown", publishedDate: "2020-03-10" },
        { id: 9, bookName: "The Catcher in the Rye", description: "A raw and honest portrayal of adolescence.", author: "Sarah Davis", publishedDate: "2019-09-25" },
        { id: 10, bookName: "The Great Gatsby", description: "Beautifully written, a true classic!", author: "John Doe", publishedDate: "2023-04-15" },
        { id: 11, bookName: "Harry Potter and the Sorcerer's Stone", description: "Magical and enchanting, a true masterpiece.", author: "Emily Johnson", publishedDate: "2021-08-01" },
        { id: 12, bookName: "Pride and Prejudice", description: "A timeless romance that captivates the heart.", author: "Michael Brown", publishedDate: "2020-03-10" },
        { id: 13, bookName: "The Catcher in the Rye", description: "A raw and honest portrayal of adolescence.", author: "Sarah Davis", publishedDate: "2019-09-25" },
        { id: 14, bookName: "The Great Gatsby", description: "Beautifully written, a true classic!", author: "John Doe", publishedDate: "2023-04-15" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [editingComment, setEditingComment] = useState(null);
    const [newComment, setNewComment] = useState({
        bookName: "",
        description: "",
        author: "",
        publishedDate: "",
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditComment = (comment) => {
        setEditingComment(comment);
        setNewComment(comment);
        setIsDialogOpen(true);
    };

    const handleAddComment = () => {
        setEditingComment(null);
        setNewComment({
            bookName: "",
            description: "",
            author: "",
            publishedDate: "",
        });
        setIsDialogOpen(true);
    };

    const handleSaveComment = () => {
        if (editingComment) {
            setComments(comments.map((comment) => (comment.id === editingComment.id ? newComment : comment)));
        } else {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    ...newComment,
                },
            ]);
        }
        setEditingComment(null);
        setNewComment({
            bookName: "",
            description: "",
            author: "",
            publishedDate: "",
        });
        setIsDialogOpen(false);
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Comments Management</h1>
                <Button onClick={handleAddComment} className="bg-primary text-primary-foreground">
                    Add New Comment
                </Button>
            </header>
            <main className="flex-1 overflow-auto">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{editingComment ? "Edit Comment" : "Add New Comment"}</DialogTitle>
                        </DialogHeader>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bookName">Book Name</Label>
                                    <Input
                                        id="bookName"
                                        value={newComment.bookName}
                                        onChange={(e) => setNewComment({ ...newComment, bookName: e.target.value })}
                                        disabled={editingComment !== null}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={newComment.description}
                                        onChange={(e) => setNewComment({ ...newComment, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        value={newComment.author}
                                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                        disabled={editingComment !== null}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="publishedDate">Published Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                disabled={editingComment !== null}
                                            >
                                                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                                                {newComment.publishedDate || "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                value={newComment.publishedDate}
                                                onValueChange={(date) => setNewComment({ ...newComment, publishedDate: date })}
                                                disabled={editingComment !== null}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        setEditingComment(null);
                                        setNewComment({
                                            bookName: "",
                                            description: "",
                                            author: "",
                                            publishedDate: "",
                                        });
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveComment}>{editingComment ? "Save" : "Create"}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Card>
                    <CardHeader>
                        <CardTitle>Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Book Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Published Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentComments.map((comment) => (
                                        <TableRow key={comment.id}>
                                            <TableCell>{comment.bookName}</TableCell>
                                            <TableCell>{comment.description}</TableCell>
                                            <TableCell>{comment.author}</TableCell>
                                            <TableCell>{comment.publishedDate}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEditComment(comment)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) handlePageChange(currentPage - 1);
                                        }}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages).keys()].map((page) => (
                                    <PaginationItem key={page + 1}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page + 1}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page + 1);
                                            }}
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > 5 && currentPage < totalPages - 1 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}

function CalendarDaysIcon(props) {
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
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    );
}
