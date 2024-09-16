import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    const checkAuthStatus = () => {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', token);

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded token:', decodedToken);

                if (decodedToken && decodedToken.role) {
                    setRoles(decodedToken.role);
                    console.log('Roles set in state:', decodedToken.role);
                } else {
                    console.log('Decoded token does not contain roles');
                }

                return !!decodedToken;
            } catch (error) {
                console.error('Failed to decode token:', error);
                return false;
            }
        }
        return false;
    };

    useEffect(() => {
        setIsAuthenticated(checkAuthStatus());

        const handleAuthChange = () => {
            setIsAuthenticated(checkAuthStatus());
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    const handleProfileClick = () => {
        setIsProfileOpen(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setIsProfileOpen(false);
        window.dispatchEvent(new Event("authChange"));
        navigate("/signin");
    };

    const isReader = roles.includes('reader');
    const isAuthor = roles.includes('author');
    const isReaderAndAuthor = isReader && isAuthor;

    console.log('roles:', roles);

    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-[#1E293B] text-white">
            <Link to="/" className="mr-6 flex items-center">
                <LibraryIcon className="h-6 w-6 fill-white group-hover:animate-pulse" />
                <span className="sr-only">Library Management</span>
            </Link>
            <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
                {isAuthenticated ? (
                    <>
                        <Link to="book-list" className="text-sm font-medium hover:underline underline-offset-4 text-white group-hover:animate-bounce">
                            Books
                        </Link>
                        <Link to="/book-search" className="text-sm font-medium hover:underline underline-offset-4 text-white group-hover:animate-bounce delay-100">
                            All Books
                        </Link>
                        {isReader && (
                            <Link to="/comments" className="text-sm font-medium hover:underline underline-offset-4 text-white group-hover:animate-bounce delay-200">
                                Owned Books
                            </Link>
                        )}
                        {isAuthor && (
                            <>
                                <Link to="/book-upload" className="text-sm font-medium hover:underline underline-offset-4 text-white group-hover:animate-bounce delay-300">
                                    Book Upload
                                </Link>
                                <Link to="/book-management" className="text-sm font-medium hover:underline underline-offset-4 text-white group-hover:animate-bounce delay-400">
                                    Manage Books
                                </Link>
                            </>
                        )}
                    </>
                ) : null}
            </nav>
            <h1 className="mx-auto text-2xl font-bold text-white group-hover:animate-pulse">Library Management</h1>
            <div className="ml-auto flex items-center text-sm font-medium">
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={handleProfileClick}
                            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                            <UserIcon className="h-6 w-6" />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
                                <Link to="/account-settings" className="block px-4 py-2 hover:bg-gray-100">Account Settings</Link>
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/signin" className="hover:underline underline-offset-4 text-white group-hover:animate-bounce">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

function LibraryIcon(props) {
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
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
        </svg>
    );
}

function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
