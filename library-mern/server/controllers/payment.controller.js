
const asyncHandler = require('express-async-handler');
const Book = require('../models/book.model');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const stripe = require('../config/stripe');

exports.createCheckoutSession = asyncHandler(async (req, res) => {
    const { bookId, type } = req.body;

    if (!['purchase', 'rental'].includes(type)) {
        return res.status(400).json({ message: 'Invalid transaction type.' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    let amount = 0;
    let description = '';
    if (type === 'purchase' && book.availableForPurchase) {
        amount = book.price * 100; // in cents
        description = `Purchase of ${book.title}`;
    } else if (type === 'rental' && book.availableForRental) {
        amount = book.rentalPrice * 100; // in cents
        description = `Rental of ${book.title}`;
    } else {
        return res.status(400).json({ message: 'Book not available for this type of transaction' });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: book.title,
                    description: description,
                },
                unit_amount: amount,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        metadata: {
            bookId,
            type,
            userId: req.user._id.toString(),
        },
    });
    console.log(session);
    console.log(process.env.CLIENT_URL);
    res.json({ url: session.url });
});

// New confirmPayment
exports.confirmPayment = asyncHandler(async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ message: 'Session ID is required.' });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
        return res.status(400).json({ message: 'Payment not completed.' });
    }

    const { bookId, type, userId } = session.metadata;

    // Check if payment already exists to prevent duplicate processing
    const existingPayment = await Payment.findOne({ stripePaymentId: session.payment_intent });

    if (existingPayment) {
        return res.json({ success: true, message: 'Payment already processed.' });
    }

    // Create a Payment record
    const payment = new Payment({
        book: bookId,
        user: userId,
        amount: session.amount_total / 100, // Convert cents to dollars
        stripePaymentId: session.payment_intent,
        status: 'succeeded',
        type: type,
    });

    await payment.save();

    // Update Book and User based on the type
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (type === 'purchase') {
        book.purchasers.push({
            user: userId,
            purchaseDate: new Date(),
            paymentId: payment._id,
        });
        await book.save();

        user.ownedBooks.push({
            book: bookId,
            paymentId: payment._id,
        });
        await user.save();
    } else if (type === 'rental') {
        const rentalDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
        const rentalEndDate = new Date(Date.now() + rentalDuration);

        book.renters.push({
            user: userId,
            rentalDate: new Date(),
            rentalEndDate,
            paymentId: payment._id,
        });
        await book.save();

        user.rentedBooks.push({
            book: bookId,
            paymentId: payment._id,
            rentalEndDate: rentalEndDate,
        });
        await user.save();
    }

    res.json({ success: true, message: 'Payment confirmed and records updated.' });
});
