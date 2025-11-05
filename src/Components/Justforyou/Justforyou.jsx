import React, { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import Justforyoucard from "../Justforyoucard/Justforyoucard";
import "./Justforyou.css";

const Justforyou = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  console.log(products);
  // Loading skeleton
  const renderSkeleton = () => (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={`skeleton-${index}`} className="product-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-rating"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-category"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </>
  );

  // Error state
  const renderError = () => (
    <div className="products-error-state">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Failed to load products</h3>
      <p className="error-description">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="error-retry-btn"
      >
        Retry
      </button>
    </div>
  );

  // Empty state
  const renderEmpty = () => (
    <div className="products-empty-state">
      <div className="empty-icon">📦</div>
      <h3 className="empty-title">No products available</h3>
      <p className="empty-description">
        Check back soon for new arrivals and deals!
      </p>
    </div>
  );

  return (
    <section className="justforyou-section">
      <div className="justforyou-container">
        {/* Section Header */}
        <div className="justforyou-header">
          <div className="header-content">
            <div className="header-icon">
              <FiTrendingUp />
            </div>
            <div className="header-text">
              <h2 className="justforyou-title">Just For You</h2>
              <p className="justforyou-subtitle">
                {loading 
                  ? "Loading personalized recommendations..." 
                  : `${products.length} handpicked products based on your preferences`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loading announcement for screen readers */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {loading && "Loading products..."}
          {!loading && !error && `${products.length} products available`}
        </div>

        {/* Products Grid */}
        {error ? (
          renderError()
        ) : (
          <div 
            className="products-grid"
            role="list"
            aria-label="Product recommendations"
          >
            {loading ? (
              renderSkeleton()
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <Justforyoucard 
                  key={product.id} 
                  product={product}
                  index={index}
                />
              ))
            ) : (
              renderEmpty()
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Justforyou;
