import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#1f2937] text-white h-screen flex-shrink-0 fixed top-0 left-0 z-10">
            <div className="flex h-16 items-center justify-between px-6 bg-[#111827]">
                <Link to="/admin" className="flex items-center gap-2 font-semibold">
                    <BookIcon className="h-6 w-6" />
                    <span className="text-lg">Admin Dashboard</span>
                </Link>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <XIcon className="h-5 w-5" />
                    <span className="sr-only">Close sidebar</span>
                </Button>
            </div>
            <nav className="flex flex-col space-y-1 px-4 py-6 overflow-y-auto h-full">
                <Link
                    to="/admin/users"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#374151] hover:text-white"
                >
                    <UsersIcon className="h-5 w-5" />
                    Users
                </Link>
                <Link
                    to="/admin/books"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#374151] hover:text-white"
                >
                    <BookIcon className="h-5 w-5" />
                    Books
                </Link>
                <Link
                    to="/admin/comments"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#374151] hover:text-white"
                >
                    <MessageCircleIcon className="h-5 w-5" />
                    Comments
                </Link>
            </nav>
        </aside>
    );
}

function BookIcon(props) {
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
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    );
}

function MessageCircleIcon(props) {
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
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}

function UsersIcon(props) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
