# NovaCart - Modern E-Commerce Platform

A full-stack e-commerce platform with advanced features including user authentication, order management, and responsive UI.

## ✨ Features

- **User Authentication**: Secure JWT-based registration and login
- **Role-Based Access**: Admin and user permissions
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Full cart functionality with persistence
- **Order Processing**: Complete order management system
- **Admin Dashboard**: Product and order management interface
- **Responsive Design**: Mobile-first approach
- **Email Notifications**: Order confirmations and admin alerts

## 🛠️ Tech Stack

**Frontend:**
- React 19+
- Redux Toolkit
- React Router v6
- Axios
- CSS Modules

**Backend:**
- Node.js
- Express.js
- SQLite (via Sequelize ORM)
- JWT Authentication
- Bcrypt for password hashing

**Development:**
- Concurrently
- Nodemon
- EmailJS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-platform
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client && npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your specific values

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with these variables:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=your-emailjs-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

## 📁 Project Structure

```
.
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API and utility services
│   │   ├── slices/          # Redux slices
│   │   └── styles/          # Global styles
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication and error handling
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── seed.js             # Database seeding script
│   └── server.js           # Main server file
├── .env.example           # Environment variables template
├── .env                   # Local environment variables
├── package.json           # Root package file
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get authenticated user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🧪 Available Scripts

In the project root directory:

- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start only the server
- `npm run client` - Start only the client
- `npm run seed` - Seed the database with sample data

In the client directory:

- `npm start` - Start development server
- `npm run build` - Build for production

## 👤 Default Credentials

After seeding the database:

- **Admin Account**: admin@novacart.com / admin123
- **User Account**: user@test.com / user123

## 🖼️ Screenshots

_Coming soon - Screenshots of the application interface_

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Build the client: `cd client && npm run build`
3. Deploy the server with the built client files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, please contact the development team or raise an issue in the GitHub repository.