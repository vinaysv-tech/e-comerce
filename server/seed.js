const { connectDB, sequelize } = require('./config/database');
const Product = require('./models/Product');
const User = require('./models/User');

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

const seedDatabase = async () => {
  try {
    console.log('⏳ Connecting to SQLite database...');
    await connectDB();
    
    // Temporarily disable foreign key constraints for seeding
    await sequelize.query('PRAGMA foreign_keys = OFF');
    
    console.log('🗑️  Clearing existing data...');
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    
    // Re-enable foreign key constraints after sync
    await sequelize.query('PRAGMA foreign_keys = ON');
    
    console.log('📦 Inserting sample products...');
    await Product.bulkCreate(sampleProducts);
    
    console.log('👥 Creating test users...');
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
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('   Admin: admin@novacart.com / admin123');
    console.log('   User: user@test.com / user123');
    console.log('\n💾 Database file: novacart.sqlite\n');
    
    process.exit(0);
  } catch (error) {
    // Re-enable foreign keys in case of error
    try {
      await sequelize.query('PRAGMA foreign_keys = ON');
    } catch (e) {}
    
    console.error('\n❌ Error seeding database:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
