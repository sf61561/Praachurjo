import React, { useEffect, useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Category from '../Category/Category';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user once for all categories
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data.user))
            .catch(error => console.error("Error fetching user:", error));
    }, []);

    // Fetch categories
    useEffect(() => {
        setLoading(true);
        fetch('/categories.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load categories');
                }
                return response.json();
            })
            .then(data => {
                // Add mock item counts for demonstration
                const categoriesWithCounts = data.map(cat => ({
                    ...cat,
                    count: Math.floor(Math.random() * 500) + 50 // Random count between 50-550
                }));
                setCategories(categoriesWithCounts);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Filter categories based on search term
    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;
        
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    // Loading skeleton
    const renderSkeleton = () => (
        <>
            {[...Array(10)].map((_, index) => (
                <div key={`skeleton-${index}`} className="category-skeleton">
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-count"></div>
                </div>
            ))}
        </>
    );

    // Empty state
    const renderEmptyState = () => (
        <div className="empty-state">
            <FiSearch className="empty-icon" />
            <h3 className="empty-title">No categories found</h3>
            <p className="empty-description">
                Try adjusting your search or browse all categories
            </p>
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="empty-button"
                >
                    Clear Search
                </button>
            )}
        </div>
    );

    // Error state
    const renderError = () => (
        <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Failed to load categories</h3>
            <p className="error-description">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="error-button"
            >
                Retry
            </button>
        </div>
    );

    return (
        <section className="categories-section" aria-label="Product categories">
            <div className="categories-container">
                {/* Header with Search */}
                <div className="categories-header">
                    <div className="header-content">
                        <h2 className="categories-title">Categories</h2>
                        <p className="categories-subtitle">
                            {loading 
                                ? 'Loading categories...' 
                                : `Browse our collection of ${categories.length} categories`
                            }
                        </p>
                    </div>
                    
                    <div className="search-container">
                        <FiSearch className="search-icon" aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search categories"
                            disabled={loading}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="search-clear"
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading announcement for screen readers */}
                <div 
                    role="status" 
                    aria-live="polite" 
                    aria-atomic="true"
                    className="sr-only"
                >
                    {loading && 'Loading categories...'}
                    {!loading && !error && `${filteredCategories.length} categories available`}
                </div>

                {/* Categories Grid */}
                {error ? (
                    renderError()
                ) : (
                    <div 
                        className="categories-grid"
                        role="list"
                    >
                        {loading ? (
                            renderSkeleton()
                        ) : filteredCategories.length > 0 ? (
                            filteredCategories.map((category, index) => (
                                <Category 
                                    key={category.id} 
                                    category={category}
                                    user={user}
                                    index={index}
                                />
                            ))
                        ) : (
                            renderEmptyState()
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;