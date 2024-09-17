import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/authApi';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const toggleRole = (role) => {
        setSelectedRoles((prevRoles) => {
            const updatedRoles = prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role)
                : [...prevRoles, role];
            console.log("Selected roles:", updatedRoles);
            return updatedRoles;
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; 
        return usernameRegex.test(username);
    };

    const validateInputs = () => {
        const validationErrors = {};

        if (!username.trim()) {
            validationErrors.username = "Username is required";
        } else if (!validateUsername(username)) {
            validationErrors.username = "Username must be at least 3 characters and contain only letters, numbers, or underscores";
        }

        if (!email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            validationErrors.email = "Invalid email format";
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            validationErrors.password = "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character";
        }

        if (!confirmPassword.trim()) {
            validationErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        if (selectedRoles.length === 0) {
            validationErrors.roles = "At least one role must be selected";
        }

        if (!acceptedTerms) {
            validationErrors.terms = "You must accept the Terms and Conditions";
        }

        return validationErrors;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log("Validation errors:", validationErrors);
            return;
        }

        try {
            const userData = {
                username,
                email,
                password,
                role: selectedRoles
            };
            console.log("Sending user data:", userData);
            await registerUser(userData);
            console.log("Registration successful");
            navigate('/signin'); 
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                setErrors({ api: error.response.data.error || 'Something went wrong' });
            } else {
                setErrors({ api: 'Something went wrong' });
            }
        }
    };

    const isSelected = (role) => selectedRoles.includes(role);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSignup} noValidate>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="abc123"
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="name@company.com"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="••••••••"
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role(s)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => toggleRole('reader')}
                                    className={`p-4 text-center cursor-pointer rounded-lg border-2 transition ${isSelected('reader') ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600'}`}
                                >
                                    <span className="text-gray-900 dark:text-white">Reader</span>
                                </div>
                                <div
                                    onClick={() => toggleRole('author')}
                                    className={`p-4 text-center cursor-pointer rounded-lg border-2 transition ${isSelected('author') ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600'}`}
                                >
                                    <span className="text-gray-900 dark:text-white">Author</span>
                                </div>
                            </div>
                            {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
                        </div>

                        {errors.api && <p className="text-red-500">{errors.api}</p>}

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className={`w-4 h-4 border ${errors.terms ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                    I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>
                        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create an account
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
