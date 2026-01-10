import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFail, deleteProductSuccess } from '../slices/productSlice';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail } from '../slices/orderSlice';
import { productAPI, orderAPI } from '../services/api';
import Loader from '../components/Loader';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector((state) => state.products);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const [activeTab, setActiveTab] = useState('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stockQuantity: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsStart());
      const response = await productAPI.getProducts();
      dispatch(fetchProductsSuccess(response.data));
    } catch (err) {
      dispatch(fetchProductsFail(err));
    }
  };

  const fetchOrders = async () => {
    try {
      dispatch(fetchOrdersStart());
      const response = await orderAPI.getAllOrders();
      dispatch(fetchOrdersSuccess(response.data));
    } catch (err) {
      dispatch(fetchOrdersFail(err));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createProduct(formData);
      setFormData({ name: '', description: '', price: '', image: '', category: '', stockQuantity: '' });
      setShowProductForm(false);
      fetchProducts();
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        dispatch(deleteProductSuccess(id));
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await orderAPI.updateOrderStatus(orderId, { orderStatus: status });
      fetchOrders();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Products Management</h2>
              <button onClick={() => setShowProductForm(!showProductForm)} className="btn-add">
                {showProductForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showProductForm && (
              <form onSubmit={handleCreateProduct} className="product-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="btn-submit">Create Product</button>
              </form>
            )}

            {productsLoading ? (
              <Loader />
            ) : (
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>{product.category}</td>
                        <td>{product.stockQuantity}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Orders Management</h2>
            {ordersLoading ? (
              <Loader />
            ) : (
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.userId?.name || 'N/A'}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>${Number(order.totalAmount).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${order.orderStatus}`}>
                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                          </span>
                        </td>
                        <td>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
