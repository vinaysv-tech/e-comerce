import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFail } from '../slices/productSlice';
import { productAPI } from '../services/api';

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchProductsStart());
        const response = await productAPI.getProducts();
        dispatch(fetchProductsSuccess(response.data));
      } catch (err) {
        dispatch(fetchProductsFail(err));
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to NovaCart</h1>
          <p>Discover amazing products at great prices</p>
        </div>

        {loading && <Loader />}
        
        {error && <div className="error-message">{error}</div>}

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="no-products">
            <h3>No products available</h3>
            <p>The database is not connected or no products have been added yet.</p>
            <p>To add products:</p>
            <ol style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Install and start MongoDB</li>
              <li>Run: <code>npm run seed</code></li>
              <li>Refresh this page</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
