E-Commerce Project

This is a full-stack e-commerce web application designed for users to browse, purchase, and manage products. It allows admins to manage product listings and track orders, while regular users can sign up, log in, add products to their cart, checkout using Stripe, and view order histories. The project leverages modern web development technologies to ensure scalability, security, and a smooth user experience.

------------------------------------------------------------

Table of Contents

1. Project Overview
2. Tech Stack
3. Features
4. Installation Instructions
5. Usage
6. Project Structure
7. API Endpoints
8. Contributing
9. License

------------------------------------------------------------

Project Overview

This e-commerce platform has been designed with the following key functionalities:

- User Authentication & Authorization: Allow users to register, login, and manage their profile. Admins can manage product listings and view all orders.
- Product Management: Users can view, search, and filter products. Admins can add, update, and delete product listings.
- Shopping Cart: Users can add products to their cart, modify quantities, and remove items.
- Checkout & Payment: Secure checkout process using Stripe to process payments.
- Order Management: Users can view order history and order details.
- Admin Dashboard: Admins can access an overview of all orders and product management options.
- Security Features: The application includes JWT authentication, input validation, sanitization, and rate-limiting to protect the system from abuse.

------------------------------------------------------------

Tech Stack

Frontend:
- React.js: A powerful JavaScript library for building user interfaces.
- Vite: A fast, modern, and highly optimized bundler for React apps.
- React Router: For navigation between pages.
- Axios: To handle HTTP requests between the frontend and backend.
- Stripe: For integrating payment functionality securely.
- CSS Modules & Custom Styles: For styling the components.

Backend:
- Node.js with Express.js: A lightweight framework for building RESTful APIs.
- MongoDB: A NoSQL database to store user data, products, orders, etc.
- Mongoose: ODM (Object Data Modeling) for MongoDB, simplifying database operations.
- JWT (JSON Web Tokens): For secure user authentication.
- Express Rate Limiting: To prevent abuse and manage request rate limits.
- Stripe API: To process payments securely.

------------------------------------------------------------

Features

1. User Authentication
- Registration & Login: Users can register for an account and log in to access their profile and make purchases.
- JWT Authentication: Users are authenticated using JWT tokens, which are stored in local storage for session persistence.
- Profile Management: Users can view and update their profile, including their email, password, and shipping details.

2. Product Management
- Product Listing: Users can view a list of products with details such as price, description, and images.
- Admin Product Management: Admins can add, update, and delete products.

3. Shopping Cart
- Add Products to Cart: Users can add items to their shopping cart.
- Manage Cart Items: Modify quantities and remove items from the cart.
- Cart Summary: Displays the total price of the items in the cart.

4. Checkout & Payment
- Stripe Integration: The application integrates with Stripe for secure payment processing.
- Order Confirmation: Once payment is successful, the user receives an order confirmation.

5. Order Management
- Order History: Users can view a history of their previous orders, including details such as products, quantities, and order status.
- Admin Order Management: Admins can view all orders placed and track the status of the orders.

6. Security Enhancements
- Input Validation: Proper validation of user inputs (email, passwords, etc.) to prevent invalid data and SQL injections.
- Sanitization: Ensures user inputs are safe by removing any harmful or malicious content.
- Rate Limiting: Implemented to restrict the number of requests a user can make to the API in a given period, preventing brute-force attacks.

------------------------------------------------------------

Installation Instructions

Prerequisites:
- Node.js (>= 14.x)
- MongoDB
- Stripe account (for payment integration)

1. Clone the Repository

git clone https://github.com/your-username/e-commerce-project.git
cd e-commerce-project

2. Backend Setup
- Navigate to the `backend` directory.
- Install dependencies:

cd backend
npm install

- Create a `.env` file in the `backend` directory with the following contents:

MONGO_URI=your_mongo_database_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret_key

- Run the backend server:

npm run dev

The backend server will start on http://localhost:5000.

3. Frontend Setup
- Navigate to the `src` directory.
- Install dependencies:

cd ../src
npm install

- Run the frontend development server:

npm run dev

The frontend application will be accessible at http://localhost:5173.

------------------------------------------------------------

Usage

User Workflow:
- Register/Login: Navigate to the login or registration page to create an account or log in.
- Browse Products: View products and add them to the cart.
- Checkout: Complete the purchase using the Stripe payment gateway.
- View Orders: Check the order history in the user's profile page.

Admin Workflow:
- Manage Products: Admins can add, update, or remove products from the catalog.
- Manage Orders: Admins can view and process all incoming orders.

------------------------------------------------------------

Project Structure

root
├── backend
│   ├── controllers             # Handles the business logic for routes (e.g., product management, authentication)
│   ├── middleware              # Middleware for authentication, file uploads, etc.
│   ├── models                  # Mongoose models for the data (e.g., User, Product, Order)
│   ├── routes                  # Defines the API routes for the app (e.g., products, orders)
│   ├── utils                   # Helper functions (e.g., query builders)
│   └── server.js               # Main backend server file, initializes Express.js
├── node_modules                # Installed dependencies
├── src
│   ├── assets                  # Static assets (e.g., images, stylesheets)
│   ├── components              # Reusable React components (e.g., Navbar, ProductCard)
│   ├── context                 # Context API to manage global state (e.g., authentication, cart)
│   ├── pages                   # React pages (e.g., Dashboard, Home, Profile, Cart)
│   ├── services                # API service functions for interacting with the backend
│   ├── utils                   # Helper functions (e.g., token helpers)
│   ├── App.jsx                 # Main React entry point
│   ├── main.jsx                # Vite entry point for React app
│   ├── routes.jsx              # React Router setup for navigation
├── .env                        # Environment variables (MongoDB URI, Stripe API key, etc.)
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point for the frontend
├── vite.config.js              # Vite configuration file
├── package.json                # Project dependencies and scripts
└── README.txt                  # Project documentation

------------------------------------------------------------

API Endpoints

Authentication
- POST /api/v1/auth/register: Register a new user.
- POST /api/v1/auth/login: Login to get JWT token.
- GET /api/v1/auth/profile: Get user profile (protected route).

Products
- GET /api/v1/products: Get all products.
- GET /api/v1//products/:id: Get a single product.
- POST /api/v1/admin/product/new: Add a new product (admin only).
- POST /api/v1/admin/product/upload: Add a new product with image (admin only).
- GET /api/v1/admin/product/:id: Updating a product (admin only).

Cart
- GET /api/v1/cart: Get user cart.
- POST /api/v1/cart: Add an item to the cart.
- PUT /api/v1/cart/:id: Update item quantity in the cart.
- DELETE /api/v1/cart/:id: Remove an item from the cart.

Orders
- GET /api/v1/order: Get all orders (admin only).
- POST /api/v1/order: Create a new order.
- GET /api/v1/order/:id: Get a single order by ID.

Payments
- POST /api/v1/orderpay: Create a payment session with Stripe.

------------------------------------------------------------

Contributing

We welcome contributions to improve this project! If you have any suggestions or improvements, feel free to open an issue or a pull request.

How to Contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Push your changes to your forked repository.
5. Open a pull request with a detailed explanation of what you've done.

------------------------------------------------------------

License

This project is licensed under the MIT License - see the LICENSE file for details.
