const asyncHandler = require('express-async-handler');
const Book = require('../models/book.model');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const stripe = require('../config/stripe');

exports.createPaymentIntent = asyncHandler(async (req, res) => {
    try {
        const { bookId, type } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let amount = 0;

        if (type === 'purchase' && book.availableForPurchase) {
            amount = book.price * 100;
        } else if (type === 'rental' && book.availableForRental) {
            amount = book.rentalPrice * 100;
        } else {
            return res.status(400).json({ message: 'Book not available for this type of transaction' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
    } catch (error) {
        console.error('Error in createPaymentIntent:', error.message);
        res.status(500).json({ error: error.message });
    }
});

exports.createPayment = asyncHandler(async (req, res) => {
    try {
        const { bookId, stripePaymentId, amount, status, type } = req.body;

        if (!bookId || !stripePaymentId || !amount || !status || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const payment = new Payment({
            book: bookId,
            user: req.user._id,
            amount,
            stripePaymentId,
            status,
            type
        });

        await payment.save();

        const paymentId = payment._id; 
        console.log('Payment ID:', paymentId);

        if (type === 'purchase') {
            book.purchasers.push({
                user: req.user._id,
                purchaseDate: new Date(),
                paymentId: paymentId 
            });
            await book.save();

            const userUpdateResult = await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    ownedBooks: {
                        book: bookId,
                        paymentId: paymentId
                    }
                }
            }, { new: true });

            console.log('User Update Result:', userUpdateResult);

        } else if (type === 'rental') {
            const rentalDuration = 7 * 24 * 60 * 60 * 1000;
            const rentalEndDate = new Date(Date.now() + rentalDuration);
            book.renters.push({
                user: req.user._id,
                rentalDate: new Date(),
                rentalEndDate,
                paymentId: paymentId
            });
            await book.save();

            const userUpdateResult = await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    rentedBooks: {
                        book: bookId,
                        paymentId: paymentId, 
                        rentalEndDate: rentalEndDate
                    }
                }
            }, { new: true });

            console.log('User Update Result:', userUpdateResult);
        }

        res.status(201).json(payment);
    } catch (error) {
        console.error('Error in createPayment:', error.message);
        res.status(500).json({ error: error.message });
    }
});
