import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          {product.inStock ? (
            <button onClick={handleAddToCart} className="btn-add-to-cart">
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          ) : (
            <button disabled className="btn-out-of-stock">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
