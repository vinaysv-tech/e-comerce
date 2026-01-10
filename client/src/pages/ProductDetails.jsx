import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { productAPI } from '../services/api';
import Loader from '../components/Loader';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProduct(id);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            
            <div className="stock-info">
              {product.inStock ? (
                <span className="in-stock">In Stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {product.inStock && (
              <div className="add-to-cart-section">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="quantity-input"
                />
                <button onClick={handleAddToCart} className="btn-add-to-cart">
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
