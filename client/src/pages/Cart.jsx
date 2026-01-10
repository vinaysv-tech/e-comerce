import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ id, quantity }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="btn-continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="quantity-input"
                    />
                  </div>
                  <div className="cart-item-total">
                    <p>${(Number(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="btn-checkout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
