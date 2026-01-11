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
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
};

module.exports = { sequelize, connectDB };
