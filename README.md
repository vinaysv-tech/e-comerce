# Nova Cart - Full Stack E-commerce Application

A modern e-commerce website with dark theme built using React, Node.js, and Express.

## 🛠️ Features

- Dark theme UI/UX design
- Product browsing and search functionality
- Shopping cart management
- User authentication and authorization
- Order management system
- Responsive design for all devices
- Email notifications using EmailJS

## 📋 Tech Stack

### Frontend
- React 19+
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express.js
- SQLite database
- JWT authentication
- Bcrypt password hashing

### Other Tools
- EmailJS for sending emails
- Concurrently for running client and server together

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vinaysv-tech/e-comerce.git
   cd e-comerce
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
   Then update the values in `.env` file according to your setup.

### Running the Application

#### Development Mode
```bash
npm run dev
```
This will start both the client and server concurrently.

#### Individual Services
- Start server only: `npm run server`
- Start client only: `npm run client`

#### Seeding the Database
```bash
npm run seed
```
This will populate the database with sample products.

## 🏗️ Project Structure

```
.
├── client/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── slices/
│   └── package.json
├── server/                 # Node.js backend application
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed.js
│   └── server.js
├── .env.example           # Environment variables template
├── .gitignore
├── package.json           # Root package file
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Orders
- `GET /api/orders` - Get all orders (user or admin)
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.