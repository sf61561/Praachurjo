import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiCheck } from "react-icons/fi";
import "./Justforyoucard.css";
import { Button } from "@material-tailwind/react";

const Justforyoucard = ({ product, index }) => {
  const { cart, setCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  // Check if item is already in cart
  useEffect(() => {
    const isInCart = cart.some(item => item.id === product.id);
    setIsAdded(isInCart);
  }, [cart, product.id]);


  // Handle add to cart with animation
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (isAdding || isAdded) return;

    setIsAdding(true);

    // Add ripple effect
    createRipple(e, e.currentTarget);

    // Simulate API call delay
    setTimeout(() => {
      const newCart = [...cart, product];
      const uniqueCart = Array.from(
        new Map(newCart.map(item => [item.id, item])).values()
      );
      setCart(uniqueCart);
      
      setIsAdding(false);
      setIsAdded(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  // Ripple effect function
  const createRipple = (event, button) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Toggle wishlist
  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price;
  };

  // Render star rating
  const renderStars = () => {
    const rating = parseFloat(product.rating);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={i <= Math.floor(rating) ? "star-filled" : "star-empty"}
          aria-hidden="true"
        />
      );
    }
    
    return stars;
  };

  return (
    <article
      ref={cardRef}
      className="product-card"
      role="listitem"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="product-image-container"
        aria-label={`View details for ${product.title}`}
      >
        {/* Badges */}
        <div className="product-badges">
          {product.isNew && (
            <span className="badge-new">New</span>
          )}
          {product.discount && (
            <span className="badge-discount">-{product.discount}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <FiHeart className="wishlist-icon" aria-hidden="true" />
        </button>

        {/* Product Image */}
        {imageError ? (
          <div className="image-fallback">
            <span>📦</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="product-info">
        {/* Rating */}
        {product.rating && (
          <div 
            className="product-rating"
            aria-label={`Rated ${product.rating} out of 5 stars`}
          >
            <div className="rating-stars">
              {renderStars()}
            </div>
            <span className="rating-count">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>
        </Link>

        {/* Category */}
        {product.category && (
          <div className="product-category">
            <span>{product.category}</span>
          </div>
        )}

        {/* Pricing */}
        <div className="product-pricing">
          <span className="price-current">
            ৳{getDiscountedPrice()}
          </span>
          {product.discount && (
            <>
              <span className="price-original">
                ৳{product.price}
              </span>
              <span className="price-save">
                Save ৳{(product.price - getDiscountedPrice()).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* View Details Button */}
        <Link to={`/products/${product.id}`}>
        <button className={`btn-add-to-cart mb-3 ${isAdding ? "loading" : ""} ${isAdded ? "success" : ""}`}
          aria-busy={isAdding}
        >View Details
        </button> </Link>
        
        {/* Add to Cart Button */}
        <button
          className={`btn-add-to-cart ${isAdding ? "loading" : ""} ${isAdded ? "success" : ""}`}
          onClick={handleAddToCart}
          disabled={isAdding || isAdded}
          aria-label={`Add ${product.title} to cart for ${getDiscountedPrice()} Taka`}
          aria-busy={isAdding}
        >
          {isAdded ? (
            <>
              <FiCheck className="btn-icon" aria-hidden="true" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <FiShoppingCart className="btn-icon" aria-hidden="true" />
              <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isAdding && "Adding to cart..."}
        {isAdded && "Item added to cart successfully"}
      </div>
    </article>
  );
};

export default Justforyoucard;
