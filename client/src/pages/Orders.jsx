import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail } from '../slices/orderSlice';
import { orderAPI } from '../services/api';
import Loader from '../components/Loader';

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'pending': 'status-pending',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled',
      'paid': 'status-paid',
      'failed': 'status-failed'
    };
    return statusMap[status] || 'status-default';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(fetchOrdersStart());
        const response = await orderAPI.getMyOrders();
        dispatch(fetchOrdersSuccess(response.data));
      } catch (err) {
        dispatch(fetchOrdersFail(err));
      }
    };

    fetchOrders();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {error && <div className="error-message">{error}</div>}

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.orderNumber}</h3>
                  <span className={`order-status ${getStatusBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${Number(order.totalAmount).toFixed(2)}</p>
                  <p>
                    <strong>Payment:</strong> 
                    <span className={`payment-badge ${getStatusBadgeClass(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </p>
                  <p><strong>Items:</strong> {order.items.length}</p>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
