const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({  error:error.message });
    }
});

exports.getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found!" }); 
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({  error:error.message });
    }
});

exports.updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found!" }); 
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:error.message });
    }
});

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:error.message });
    }
});
// Create a new user
exports.createUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format!" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long!" });
    }

    // Validate role
    const validRoles = ['admin', 'author', 'reader'];
    if (!Array.isArray(role) || !role.every(r => validRoles.includes(r))) {
        return res.status(400).json({ message: "Invalid role(s) provided!" });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(409).json({ message: "Username or email already exists!" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully!", user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
