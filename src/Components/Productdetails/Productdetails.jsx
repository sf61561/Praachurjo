import React, { useEffect, useState } from 'react';
import { FiCheck, FiShoppingCart, FiStar, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Productdetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch product details
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log("✅ Product details fetched:", data);
            })
            .catch(error => {
                console.error("❌ Error fetching product details:", error);
            });
    }, [id]);

    // Fetch reviews with sentiment data and statistics
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/reviews/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ Reviews API Response:", data);
                
                // Handle the response structure from your Express server
                if (data.success && data.reviews) {
                    setReviews(data.reviews);
                    setReviewStats(data.stats);
                    console.log(`✅ Loaded ${data.reviews.length} reviews`);
                    console.log("✅ Review Stats:", data.stats);
                } else if (Array.isArray(data)) {
                    // Fallback if response is just an array
                    setReviews(data);
                    console.log(`✅ Loaded ${data.length} reviews (array format)`);
                } else {
                    setReviews([]);
                    setReviewStats(null);
                    console.log("ℹ️ No reviews found");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("❌ Error fetching reviews:", error);
                setReviews([]);
                setReviewStats(null);
                setLoading(false);
            });
    }, [id]);

    // Render star rating
    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FiStar key={`full-${i}`} className="text-yellow-500 fill-yellow-500" size={20} />
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <FiStar key="half" className="text-yellow-500 fill-yellow-500" size={20} style={{ opacity: 0.5 }} />
            );
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FiStar key={`empty-${i}`} className="text-gray-300" size={20} />
            );
        }
        
        return stars;
    };

    return (
        <div className='text-black bg-white min-h-screen'>
            <Navbar />
            
            {/* Product Details */}
            <div className='flex gap-10 p-10'>
                <img 
                    src={product[0]?.image} 
                    alt={product[0]?.title} 
                    className='shadow-2xl rounded-2xl w-[450px] h-[450px] object-cover'
                />
                <div className='flex flex-col gap-5 justify-center'>
                    <h2 className='text-3xl font-bold'>{product[0]?.title}</h2>
                    <p className='text-xl'>Price: ৳{product[0]?.price}</p>
                    
                    {/* Overall Rating Display */}
                    {reviewStats && reviewStats.total > 0 && (
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                            <div className='flex gap-1'>
                                {renderStarRating(reviewStats.overallRating)}
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-2xl font-bold text-gray-800'>
                                    {reviewStats.overallRating.toFixed(1)} / 5.0
                                </span>
                                <span className='text-sm text-gray-500'>
                                    Based on {reviewStats.total} reviews
                                </span>
                            </div>
                        </div>
                    )}

                    <div className='flex gap-3 items-center'>
                        Quantity:
                        <button 
                            className='btn bg-gray-400 border-0' 
                            onClick={() => quantity > 0 ? setQuantity(quantity - 1) : null}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button 
                            className='btn bg-gray-400 border-0' 
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <button className='btn bg-[#2fa95b] text-white border-0 w-50 h-14'>
                            Buy Now
                        </button>
                        <button
                            className={`btn ${isAdded ? 'bg-green-500' : 'bg-[#2fa95b]'} text-white border-0 w-50 h-14 ${isAdding ? 'loading' : ''}`}
                            disabled={isAdding || isAdded}
                        >
                            {isAdded ? (
                                <>
                                    <FiCheck className="mr-2" />
                                    <span>Added to Cart</span>
                                </>
                            ) : (
                                <>
                                    <FiShoppingCart className="mr-2" />
                                    <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className='mx-20 mt-10'>
                <h1 className='text-2xl font-bold mb-3'>Product Description</h1>
                <p className='text-lg'>{product[0]?.description}</p>
            </div>

            {/* Review Statistics */}
            {reviewStats && reviewStats.total > 0 && (
                <div className='mx-20 mt-10'>
                    <div className='bg-gradient-to-r from-green-50 to-red-50 p-6 rounded-2xl border-2 border-gray-200'>
                        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Review Summary</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {/* Overall Rating */}
                            <div className='flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm'>
                                <div className='text-4xl font-bold text-gray-800 mb-2'>
                                    {reviewStats.overallRating.toFixed(1)}
                                </div>
                                <div className='flex gap-1 mb-2'>
                                    {renderStarRating(reviewStats.overallRating)}
                                </div>
                                <span className='text-sm text-gray-600'>
                                    {reviewStats.percentage}% Satisfaction
                                </span>
                            </div>

                            {/* Positive Reviews */}
                            <div className='flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm'>
                                <div className='w-16 h-16 flex items-center justify-center bg-green-100 rounded-full'>
                                    <FiThumbsUp className='text-green-600' size={28} />
                                </div>
                                <div>
                                    <div className='text-3xl font-bold text-green-600'>
                                        {reviewStats.positive}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        Positive Reviews
                                    </div>
                                </div>
                            </div>

                            {/* Negative Reviews */}
                            <div className='flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm'>
                                <div className='w-16 h-16 flex items-center justify-center bg-red-100 rounded-full'>
                                    <FiThumbsDown className='text-red-600' size={28} />
                                </div>
                                <div>
                                    <div className='text-3xl font-bold text-red-600'>
                                        {reviewStats.negative}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        Negative Reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Reviews with Sentiment Analysis */}
            <div className='mx-20 mt-10 mb-20'>
                <h1 className='text-2xl font-bold mb-5'>
                    Customer Reviews ({reviews.length})
                </h1>
                
                {loading ? (
                    <div className='text-center py-10'>
                        <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
                        <p className='mt-4 text-gray-600'>Loading reviews...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <div className='space-y-4'>
                        {reviews.map((review) => (
                            <div 
                                key={review.id} 
                                className="p-6 border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                style={{ 
                                    borderColor: review.sentiment_color || '#e5e7eb',
                                    backgroundColor: `${review.sentiment_color}15` 
                                }}
                            >
                                <div className='flex justify-between items-start mb-3'>
                                    <div className='flex-1'>
                                        {/* Star Rating */}
                                        <div className='flex gap-1 mb-2'>
                                            {Array.from({ length: review.number_of_star || 0 }).map((_, index) => (
                                                <FiStar 
                                                    key={`filled-${index}`} 
                                                    className="text-yellow-500 fill-yellow-500" 
                                                    size={20}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review.number_of_star || 0) }).map((_, index) => (
                                                <FiStar 
                                                    key={`empty-${index}`} 
                                                    className="text-gray-300" 
                                                    size={20}
                                                />
                                            ))}
                                        </div>
                                        
                                        {/* Reviewer and Date */}
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {review.reviewer}
                                        </h3>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>

                                    {/* Sentiment Badge */}
                                    {review.sentiment && (
                                        <div 
                                            className='px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-3 shadow-md'
                                            style={{ 
                                                backgroundColor: review.sentiment_color || '#6b7280',
                                                color: 'white'
                                            }}
                                        >
                                            <span className='text-2xl'>
                                                {review.sentiment === 'positive' ? '😊' : '😞'}
                                            </span>
                                            <div className='flex flex-col items-start'>
                                                <span className='text-base'>
                                                    {review.sentiment.toUpperCase()}
                                                </span>
                                                {review.confidence && (
                                                    <span className='text-xs opacity-90'>
                                                        {typeof review.confidence === 'number' 
                                                            ? review.confidence.toFixed(1) 
                                                            : parseFloat(review.confidence).toFixed(1)}% confident
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Review Text with Sentiment Color */}
                                <p 
                                    className='text-lg font-medium leading-relaxed mt-4'
                                    style={{ 
                                        color: review.sentiment === 'positive' ? '#059669' : '#dc2626'
                                    }}
                                >
                                    {review.review_description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-10 bg-gray-50 rounded-xl'>
                        <div className='text-6xl mb-4'>📝</div>
                        <p className='text-gray-500 text-lg'>
                            No reviews yet. Be the first to review this product!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Productdetails;