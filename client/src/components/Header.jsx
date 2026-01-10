import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <h1>NovaCart</h1>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                Cart
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
            </li>
            {userInfo ? (
              <>
                <li>
                  <Link to="/orders">My Orders</Link>
                </li>
                {userInfo.role === 'admin' && (
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                )}
                <li>
                  <span className="user-name">Hi, {userInfo.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn-register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
