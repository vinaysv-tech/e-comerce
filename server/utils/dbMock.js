// Mock database for development without MongoDB
class MockDB {
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.nextId = 1;
    
    // Add a default admin user for testing
    this.addDefaultUsers();
  }
  
  addDefaultUsers() {
    // Add a default admin user
    const adminUser = {
      _id: 'admin123',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$12$LQv3c12cP5N5B5B5B5B5BOhH.6yf421xPtEY9X9X9X9X9X9X9X9X9', // bcrypt hash for 'password123'
      role: 'admin',
      createdAt: new Date()
    };
    
    // Add a default regular user
    const regularUser = {
      _id: 'user123',
      name: 'Test User',
      email: 'user@example.com',
      password: '$2b$12$LQv3c12cP5N5B5B5B5B5BOhH.6yf421xPtEY9X9X9X9X9X9X9X9X9', // bcrypt hash for 'password123'
      role: 'user',
      createdAt: new Date()
    };
    
    this.users.set(adminUser._id, adminUser);
    this.users.set(regularUser._id, regularUser);
  }
  
  // User methods
  async findUserByEmail(email) {
    for (const [id, user] of this.users) {
      if (user.email === email) {
        return { ...user };
      }
    }
    return null;
  }
  
  async findUserById(id) {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }
  
  async createUser(userData) {
    const id = `user${this.nextId++}`;
    const user = {
      _id: id,
      ...userData,
      createdAt: new Date()
    };
    
    this.users.set(id, user);
    return { ...user };
  }
  
  // Product methods
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  
  async getProductById(id) {
    return this.products.get(id) || null;
  }
  
  async createProduct(productData) {
    const id = `product${this.nextId++}`;
    const product = {
      _id: id,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.set(id, product);
    return { ...product };
  }
  
  // Order methods
  async createOrder(orderData) {
    const id = `order${this.nextId++}`;
    const order = {
      _id: id,
      ...orderData,
      orderDate: new Date(),
      orderStatus: 'pending'
    };
    
    this.orders.set(id, order);
    return { ...order };
  }
  
  async getAllOrders() {
    return Array.from(this.orders.values());
  }
  
  async getUserOrders(userId) {
    const userOrders = [];
    for (const [id, order] of this.orders) {
      if (order.userId === userId) {
        userOrders.push(order);
      }
    }
    return userOrders;
  }
  
  async updateOrderStatus(orderId, status) {
    const order = this.orders.get(orderId);
    if (order) {
      order.orderStatus = status;
      this.orders.set(orderId, order);
      return { ...order };
    }
    return null;
  }
}

const mockDB = new MockDB();
module.exports = mockDB;