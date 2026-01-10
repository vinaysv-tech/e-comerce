import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderStart, createOrderSuccess, createOrderFail } from '../slices/orderSlice';
import { clearCart } from '../slices/cartSlice';
import { orderAPI } from '../services/api';
import { sendOrderConfirmationEmail, sendAdminNotification } from '../services/emailService';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      shippingAddress,
      paymentMethod
    };

    try {
      dispatch(createOrderStart());
      const response = await orderAPI.createOrder(orderData);
      dispatch(createOrderSuccess(response.data));
      
      // Send order confirmation email to customer
      if (userInfo && userInfo.email) {
        await sendOrderConfirmationEmail(
          response.data,
          userInfo.email,
          userInfo.name
        );
        
        // Send notification to admin
        await sendAdminNotification({
          ...response.data,
          customerName: userInfo.name
        });
      }
      
      dispatch(clearCart());
      navigate(`/orders`);
    } catch (err) {
      dispatch(createOrderFail(err));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h2>Your cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="shipping-section">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={shippingAddress.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={shippingAddress.zip}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Method</h2>
            <div className="form-group">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-place-order">
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
