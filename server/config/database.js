const { Sequelize } = require('sequelize');
const path = require('path');

// Use environment variable for database URL, fallback to SQLite for local dev
const DATABASE_URL = process.env.DATABASE_URL || '';

let sequelize;

if (DATABASE_URL) {
  // Production: Use PostgreSQL or other database
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: process.env.DB_DIALECT || 'postgres',
    protocol: process.env.DB_PROTOCOL || 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL ? { require: true, rejectUnauthorized: false } : false,
    },
    logging: false,
  });
} else {
  // Development: Use SQLite
  const dbPath = path.join(__dirname, '../../novacart.sqlite');
  const DB_PATH = process.env.DB_PATH || dbPath;
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH,
    logging: false, // Set to console.log to see SQL queries
    define: {
      timestamps: true,
      underscored: false,
      // Disable foreign key constraints in SQLite to avoid issues during sync
      foreignKeyConstraints: false
    },
    dialectOptions: {
      // Disable foreign keys at SQLite level
      foreignKeys: false
    }
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connected successfully');
    console.log(`📁 Database location: ${DB_PATH}`);
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized');
    
    // Auto-seed database if empty (only for SQLite)
    if (!DATABASE_URL) { // Only for SQLite (not for PostgreSQL)
      const Product = require('../models/Product');
      const User = require('../models/User');
      
      const productCount = await Product.count();
      
      if (productCount === 0) {
        console.log('📦 No products found, seeding database with sample data...');
        
        const sampleProducts = [
          {
            name: "Wireless Headphones",
            description: "Premium noise-cancelling wireless headphones with 30hr battery life",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 50
          },
          {
            name: "Smart Watch",
            description: "Feature-rich smartwatch with health monitoring and notifications",
            price: 249.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 30
          },
          {
            name: "Bluetooth Speaker",
            description: "Portable waterproof speaker with 360° sound and deep bass",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 25
          },
          {
            name: "Smartphone",
            description: "Latest model smartphone with advanced camera and battery life",
            price: 699.99,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 20
          },
          {
            name: "Professional Camera",
            description: "Professional DSLR camera with 4K video recording",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 15
          },
          {
            name: "Laptop",
            description: "High-performance laptop for work and gaming",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
            category: "Electronics",
            inStock: true,
            stockQuantity: 12
          }
        ];
        
        await Product.bulkCreate(sampleProducts);
        console.log('✅ Database seeded with sample products');
        
        // Create default users if none exist
        const userCount = await User.count();
        if (userCount === 0) {
          await User.create({
            name: 'Admin User',
            email: 'admin@novacart.com',
            password: 'admin123',
            role: 'admin'
          });
        
          await User.create({
            name: 'Test User',
            email: 'user@test.com',
            password: 'user123',
            role: 'user'
          });
          
          console.log('✅ Default users created');
        }
      } else {
        console.log(`📊 Database already contains ${productCount} products`);
      }
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
};

module.exports = { sequelize, connectDB };
