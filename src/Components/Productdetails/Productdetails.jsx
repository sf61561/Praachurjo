import React, { useEffect, useState } from 'react';
import { FiCheck, FiShoppingCart, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Productdetails = () => {
    const { id } =useParams();
    const [product,setProduct] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isAdding] = useState(false);
    const [isAdded] = useState(false);
    const [user, setUser] = useState(null); 
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
                setCarts(data.carts);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);  
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log("Product details fetched:", data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}/seller`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log("Product seller details fetched:", data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:5000/reviews/${id}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                console.log("Product reviews fetched:", data);
            })
            .catch(error => {
                console.error("Error fetching product reviews:", error);
            });
    }, [id]);
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900'>
            <Navbar  user={user} carts={carts} setCarts={setCarts} />
            
            {/* Product Details Section */}
            <div className='max-w-[1440px] mx-auto px-20 py-16'>
                <div className='flex flex-col lg:flex-row gap-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={product[0]?.image} 
                            alt={product[0]?.title} 
                            className='rounded-2xl w-full lg:w-[450px] h-auto object-cover shadow-2xl shadow-black/30'
                        />
                    </div>
                    
                    {/* Product Info */}
                    <div className='flex flex-col gap-6 justify-center flex-1'>
                        <h2 className='text-4xl font-bold text-white'>{product[0]?.title}</h2>
                        <p className='text-2xl font-semibold text-pink-300'>Price: ৳{product[0]?.price}</p>
                        
                        {/* Quantity Selector */}
                        <div className='flex gap-4 items-center text-white text-lg'>
                            <span className='font-semibold'>Quantity:</span>
                            <button 
                                className='w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold rounded-lg transition-all duration-150'
                                onClick={() => quantity > 0 ? setQuantity(quantity - 1) : null}
                            >
                                -
                            </button>
                            <span className='text-xl font-bold min-w-[40px] text-center'>{quantity}</span>
                            <button 
                                className='w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold rounded-lg transition-all duration-150'
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                            {/* Buy Now Button */}
                            <button className='flex-1 py-4 px-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold text-lg rounded-xl transition-all duration-150'>
                                Buy Now
                            </button>
                            
                            {/* Add to Cart Button */}
                            <button
                                className={`flex-1 py-4 px-6 flex items-center justify-center gap-3 font-semibold text-lg rounded-xl transition-all duration-150 ${
                                    isAdded 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={isAdding || isAdded}
                                aria-busy={isAdding}
                            >
                                {isAdded ? (
                                    <>
                                        <FiCheck className="text-xl" aria-hidden="true" />
                                        <span>Added to Cart</span>
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="text-xl" aria-hidden="true" />
                                        <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Seller Information Section */}
                <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden'>
                    {/* Header with gradient background */}
                    <div className='bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border-b border-white/20 px-8 py-6'>
                        <h2 className='text-3xl font-bold text-white mb-4'>Sold By</h2>
                        <div className='flex items-center gap-4'>
                            {/* Seller Avatar */}
                            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl transform hover:scale-105 transition-all duration-200'>
                                {product[0]?.seller_shop_name?.charAt(0)?.toUpperCase() || 'S'}
                            </div>
                            
                            {/* Seller Name and Badge */}
                            <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-1'>
                                    <h2 className='text-2xl font-bold text-white'>
                                        {product[0]?.seller_shop_name || 'Official Store'}
                                    </h2>
                                    <span className='px-3 py-1 bg-green-500/20 border border-green-400/50 text-green-300 text-xs font-semibold rounded-full'>
                                        ✓ Verified
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='flex gap-0.5'>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className={`text-base ${index < Math.floor(product[0]?.seller_rating || 4.5) ? 'text-yellow-400' : 'text-white/30'}`}>★</span>
                                        ))}
                                    </div>
                                    <span className='text-white/70 text-sm'>
                                        {product[0]?.seller_rating || '4.5'} Rating
                                    </span>
                                </div>
                            </div>
                            
                            {/* Visit Shop Button */}
                            <button className='px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-200'>
                                Visit Shop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Description Section */}
                <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                    <h1 className='text-3xl font-bold text-white mb-6'>Product Description</h1>
                    <p className='text-lg text-white/80 leading-relaxed'>{product[0]?.description}</p>
                </div>

                {/* Product Reviews Section */}
                <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                    <h1 className='text-3xl font-bold text-white mb-6'>Product Reviews</h1>
                    <div className='space-y-4'>
                        {
                            Array.isArray(reviews) && reviews.length > 0 ? 
                            reviews.map((review) => (
                                <div key={review.id} className="p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-200">
                                    <div className='flex justify-between items-start mb-3'>
                                        <div className='flex gap-1'>
                                            {Array.from({ length: review.number_of_star }).map((_, index) => (
                                                <span key={index} className="text-yellow-400 text-xl">★</span>
                                            ))}
                                            {Array.from({ length: 5-review.number_of_star }).map((_, index) => (
                                                <span key={index} className="text-white/30 text-xl">★</span>
                                            ))}
                                        </div>
                                        <h3 className="text-white/60 text-sm">{review.date}</h3>
                                    </div>
                                    <h3 className="mb-2 text-white/70 font-medium">{review.reviewer}</h3>
                                    <p className="text-white font-normal">{review.review_description}</p>
                                </div>
                            )) : (
                                <div className='flex flex-col items-center justify-center py-12'>
                                    <div className="text-6xl mb-4">💬</div>
                                    <p className='text-white/70 text-lg'>No reviews available for this product.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productdetails;