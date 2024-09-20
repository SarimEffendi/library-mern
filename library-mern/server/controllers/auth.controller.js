const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.register = asyncHandler(async (req, res) => {
    await body('username').isString().notEmpty().withMessage('Username is required').run(req);
    await body('email').isEmail().withMessage('Invalid email format').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

    await body('role').isArray().optional().withMessage('Role must be an array')
        .custom((roles) => {
            const uniqueRoles = [...new Set(roles)];
            if (roles.length !== uniqueRoles.length) {
                throw new Error('Duplicate roles are not allowed');
            }
            return true;
        }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password, email, role } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: "Username is already taken" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Email is already taken" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = role && role.length > 0 ? [...new Set(role)] : ['reader'];

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role: userRole
        });

        await newUser.save();
        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWTSECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

exports.login = asyncHandler(async (req, res) => {
    await body('username').isString().notEmpty().withMessage('Username is required').run(req);
    await body('password').isString().notEmpty().withMessage('Password is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWTSECRET, { expiresIn: '1h' });

        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
    
    if (req.user) {
        res.status(200).json({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            roles: req.user.role,
            ownedBooks: req.user.ownedBooks,
            rentedBooks: req.user.rentedBooks,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


