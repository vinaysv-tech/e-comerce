const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database file path
const dbPath = path.join(__dirname, '../../novacart.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
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

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connected successfully');
    console.log(`📁 Database location: ${dbPath}`);
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
};

module.exports = { sequelize, connectDB };
