# Nova Cart - E-commerce Application

A modern e-commerce website with dark theme built using React and Redux Toolkit.

## Features

- Dark theme UI
- Product browsing and search
- Shopping cart functionality
- User authentication
- Order management
- Responsive design

## Tech Stack

- React 19+
- Redux Toolkit
- React Router
- Axios
- EmailJS

## Installation

1. Make sure you have Node.js installed
2. Navigate to the client directory: `cd client`
3. Install dependencies: `npm install`

## Running the Application

1. Navigate to the project root: `cd ..`
2. Start both client and server: `npm run dev`

Or start just the client: `npm run client`

## Project Structure

```
src/
├── app/
│   └── store.js
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── Loader.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Orders.jsx
│   └── AdminDashboard.jsx
├── services/
│   ├── api.js
│   └── emailService.js
└── slices/
    ├── authSlice.js
    ├── cartSlice.js
    ├── orderSlice.js
    └── productSlice.js
```

## API Integration

The client connects to the backend API at `http://localhost:5000/api` during development.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
