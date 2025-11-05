import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Category = ({ category, user, index }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        
        // Ripple effect
        const card = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Navigate after ripple starts
        setTimeout(() => {
            if (user) {
                navigate(`/products/category/${category.name}`);
            } else {
                navigate('/login');
            }
        }, 200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Format count with commas
    const formatCount = (count) => {
        return count ? count.toLocaleString() : '0';
    };

    return (
        <Link
            to={user ? `/products/category/${category.name}` : '/login'}
            className="category-card"
            role="listitem"
            aria-label={`${category.name} category, ${category.count || 0} items available`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={{ animationDelay: `${index * 0.05}s` }}
            tabIndex={0}
        >
            {/* Icon Container with Gradient Background */}
            <div className="category-icon-container" aria-hidden="true">
                {imageError ? (
                    <div className="category-icon-fallback">
                        {category.name.charAt(0).toUpperCase()}
                    </div>
                ) : (
                    <img
                        src={category.image}
                        alt=""
                        className="category-icon"
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content */}
            <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                {category.count !== undefined && (
                    <div className="category-count">
                        <span aria-label={`${category.count} items`}>
                            {formatCount(category.count)} items
                        </span>
                    </div>
                )}
            </div>

            {/* Arrow Icon (shows on hover) */}
            <div className="category-arrow" aria-hidden="true">
                <FiArrowRight />
            </div>

            {/* Hover Overlay */}
            <div className="category-overlay" aria-hidden="true"></div>
        </Link>
    );
};

export default Category;