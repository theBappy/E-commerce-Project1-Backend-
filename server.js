require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const expressRateLimit = require('express-rate-limit');



const app = express();

// Router 
const authRouter = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');



// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
}));
// Rate Limiting Middleware (Global)
const apiLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later',
});

// Apply rate-limiting to all API routes
app.use('/api/v1', apiLimiter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to E-commerce API...');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', productRoutes);
app.use('/api/v1/products/review', reviewRoutes);
app.use('/api/v1/productsCart', cartRoutes);
app.use('/api/v1/order', orderRoutes );
app.use('/api/v1/orderpay', paymentRoutes );

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
    
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on htttp://localhost:${PORT}`));
