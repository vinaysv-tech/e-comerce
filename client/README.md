# NovaCart Client - React Frontend

The React frontend for the NovaCart e-commerce platform.

## ✨ Features

- **Modern UI**: Clean, responsive design with dark theme
- **Authentication**: User registration and login flows
- **Product Catalog**: Browse and search products
- **Shopping Cart**: Full cart functionality with persistence
- **Order Management**: Track and manage orders
- **Admin Dashboard**: Product and order management interface

## 🛠️ Tech Stack

- React 19+
- Redux Toolkit
- React Router v7
- Axios
- EmailJS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Ensure the backend server is running on `http://localhost:5000`

### Running the Application

1. From the client directory: `npm start`
2. Or from the project root: `npm run client`

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── components/
│   ├── Header.jsx           # Navigation header
│   ├── Footer.jsx           # Page footer
│   ├── ProductCard.jsx      # Product display card
│   └── Loader.jsx           # Loading indicator
├── pages/
│   ├── Home.jsx             # Homepage with product listings
│   ├── ProductDetails.jsx   # Individual product view
│   ├── Cart.jsx             # Shopping cart page
│   ├── Checkout.jsx         # Order checkout process
│   ├── Login.jsx            # User login form
│   ├── Register.jsx         # User registration form
│   ├── Orders.jsx           # Order history page
│   └── AdminDashboard.jsx   # Admin management interface
├── services/
│   ├── api.js               # API client and interceptors
│   └── emailService.js      # Email notifications service
└── slices/
    ├── authSlice.js         # Authentication state
    ├── cartSlice.js         # Shopping cart state
    ├── orderSlice.js        # Order management state
    └── productSlice.js      # Product catalog state
```

## 🔌 API Integration

The client connects to the backend API at `http://localhost:5000/api` during development.

## 🧪 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📊 State Management

Uses Redux Toolkit for centralized state management:

- **Auth Slice**: Manages user authentication state
- **Cart Slice**: Handles shopping cart functionality
- **Product Slice**: Manages product catalog
- **Order Slice**: Handles order processing and history

## 🌐 Environment Variables

The client uses these environment variables:

- `REACT_APP_API_URL`: Backend API base URL
- `REACT_APP_EMAILJS_SERVICE_ID`: EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `REACT_APP_EMAILJS_PUBLIC_KEY`: EmailJS public key

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.
