import { useState, useEffect } from "react";
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
import useComments from "@/hooks/useComments"; // Import the custom hook

export default function ManageComments() {
    const {
        comments,
        loading,
        error,
        addComment,
        editComment,
        deleteComment,
        reloadComments,
    } = useComments();

    console.log("Comments loaded:", comments);
    console.log("Loading state:", loading);
    console.log("Error state:", error);

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    console.log("Current Page:", currentPage);
    console.log("Current Comments on Page:", currentComments);

    const handlePageChange = (pageNumber) => {
        console.log("Changing to page:", pageNumber);
        setCurrentPage(pageNumber);
    };

    const [editingComment, setEditingComment] = useState(null);
    const [newComment, setNewComment] = useState({
        bookId: "",
        description: "",
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        console.log("New comment state updated:", newComment);
    }, [newComment]);

    const handleEditComment = (comment) => {
        console.log("Editing comment:", comment);
        setEditingComment(comment);
        setNewComment({
            bookId: comment.book ? comment.book._id : "",
            description: comment.description,
        });
        setIsDialogOpen(true);
    };

    const handleAddComment = () => {
        console.log("Adding new comment");
        setEditingComment(null);
        setNewComment({
            bookId: "",
            description: "",
        });
        setIsDialogOpen(true);
    };

    const handleSaveComment = async () => {
        console.log("Saving comment. Editing comment:", editingComment);
        if (editingComment) {
            console.log("Editing existing comment with ID:", editingComment._id);
            const updatedComment = await editComment(editingComment._id, {
                description: newComment.description,
            });
            // Optionally update the comment in state if not handled in context
        } else {
            console.log("Adding new comment:", newComment);
            const createdComment = await addComment(newComment);
            // Ensure that the createdComment has the 'book' and 'author' fields populated
            setComments((prevComments) => [...prevComments, createdComment]);
        }
        setEditingComment(null);
        setNewComment({
            bookId: "",
            description: "",
        });
        setIsDialogOpen(false);
        console.log("Comment saved.");
    };

    const handleDeleteComment = async (id) => {
        console.log("Deleting comment with ID:", id);
        await deleteComment(id);
    };

    if (loading) {
        console.log("Loading comments...");
        return <div>Loading comments...</div>;
    }
    if (error) {
        console.error("Error loading comments:", error);
        return <div>Error: {error}</div>;
    }

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
                                {!editingComment && (
                                    <div className="space-y-2">
                                        <Label htmlFor="bookId">Book ID</Label>
                                        <Input
                                            id="bookId"
                                            value={newComment.bookId}
                                            onChange={(e) => setNewComment({ ...newComment, bookId: e.target.value })}
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={newComment.description}
                                        onChange={(e) => setNewComment({ ...newComment, description: e.target.value })}
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
                                                {newComment.publishedDate
                                                    ? new Date(newComment.publishedDate).toLocaleDateString()
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                selected={newComment.publishedDate}
                                                onSelect={(date) => {
                                                    console.log("Date selected:", date);
                                                    setNewComment({ ...newComment, publishedDate: date });
                                                }}
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
                                        console.log("Closing dialog without saving");
                                        setIsDialogOpen(false);
                                        setEditingComment(null);
                                        setNewComment({
                                            bookId: "",
                                            description: "",
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
                                        <TableHead>Book Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Published Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentComments.map((comment) => {
                                        console.log("Rendering comment:", comment);
                                        return (
                                            <TableRow key={comment._id}>
                                                <TableCell>
                                                    {comment.book?.title ?? "N/A"}
                                                </TableCell>
                                                <TableCell>{comment.description}</TableCell>
                                                <TableCell>
                                                    {comment.author?.username ?? "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {comment.publishedAt
                                                        ? new Date(comment.publishedAt).toLocaleDateString()
                                                        : "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditComment(comment)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDeleteComment(comment._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
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
