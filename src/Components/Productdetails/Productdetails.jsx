import React, { useEffect, useState } from 'react';
import { FiCheck, FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Productdetails = () => {
    const { id } =useParams();
    const [product,setProduct] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    console.log(id);
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
    }, []);
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
    }, []);
    return (
        <div className='text-black'>
            <Navbar/>
            <div className='flex'>
                <img src={product[0]?.image} alt={product[0]?.title} className='ml-5 shadow-2xl rounded-2xl w-[450px]'/>
                <div className='flex flex-col gap-5 ml-10 justify-center'>
                    <h2 className='text-3xl font-bold'>{product[0]?.title}</h2>
                    <p className='text-xl'>Price: ৳{product[0]?.price}</p>
                    <div className='flex gap-3 items-center'>Quantity:<button className='btn bg-gray-400 border-0' onClick={() => quantity > 0 ? setQuantity(quantity - 1) : null}>-</button><span>{quantity}</span><button className='btn bg-gray-400 border-0' onClick={() => setQuantity(quantity + 1)}>+</button> </div>
                    <div className='flex items-center justify-center'>
                        {/* View Details Button */}
                        <button className={`btn-add-to-cart mr-3 !w-50 !h-14`}>Buy Now</button>
                        
                        {/* Add to Cart Button */}
                        <button
                        className={`btn-add-to-cart !w-50 !h-14 ${isAdding ? "loading" : ""} ${isAdded ? "success" : ""}`}
                        disabled={isAdding || isAdded}
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
                </div>
            </div>
            <div className='mx-20 mt-10'>
                <h1 className='text-2xl font-bold mb-3'>Product Description</h1>
                <p className='text-lg'>{product[0]?.description}</p>
            </div>
            <div className='mx-20 mt-10'>
                <h1 className='text-2xl font-bold mb-3'>Product Reviews</h1>
                {
                    Array.isArray(reviews) &&reviews.length > 0 ? 
                    reviews.map((review) => (
                        <div key={review.id} className="p-4 border text-black border-gray-300 rounded-lg">
                            <div className='flex justify-between'>
                            <div>{Array.from({ length: review.number_of_star }).map((_, index) => (
                                <span key={index} className="text-yellow-500">★</span>
                            ))}
                            {Array.from({ length: 5-review.number_of_star }).map((_, index) => (
                                <span key={index} className="text-gray-300">★</span>
                            ))}</div>
                            <h3 className="mb-2 text-gray-600">{review.date}</h3>
                            </div>
                            <h3 className="mb-2 text-gray-500">{review.reviewer}</h3>
                            <p className="text-black font-semibold">{review.review_description}</p>
                        </div>
                    )) : <p>No reviews available for this product.</p>
                }
            </div>
        </div>
    );
};

export default Productdetails;