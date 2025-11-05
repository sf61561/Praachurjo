import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { MdPendingActions } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { MdCancel } from "react-icons/md";

const Track = () => {
    const [products,setProducts] = useState([]);
    const {user} = useParams();
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
    fetch(`http://localhost:5000/${user}/track`)
    .then(res => res.json())
    .then(data => setProducts(data));
    },[]);
    console.log(products);
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logging out...");
        fetch("http://localhost:5000/logout",{
        credentials: "include"
        })
        .then(navigate('/login'))
        .catch(error => console.error("Error:", error));
    }
    return (
        <div>
            <div className="flex items-center justify-between h-[80px] shadow-sm">
                <NavLink to={"/"}>
                <img
                    className="w-[250px]"
                    src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
                    alt="Jkkniu-Mart"
                /></NavLink>
                <div className={`flex items-center gap-10 mr-20 ${user ? '' : 'hidden'}`}>
                    <span className={`text-[#2fa95b] font-bold ${user ? '' : 'hidden'}`}>{user}</span>
                    <button className={`btn text-black bg-white border-0 shadow-none ${user ? '' : 'hidden'}`} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5 bg-white'>
                <h2 className='text-2xl font-bold mb-4 text-black text-center'>Your Ordered Products</h2>
                <table className='border-[#2fa95b] border-2 w-full'>
                    <thead className='text-black'>
                        <tr className='border-[#2fa95b] border-2'>
                            <th className='border-[#2fa95b] border-2 p-2'>Product ID</th>
                            <th className='border-[#2fa95b] border-2'>Quantity</th>
                            <th className='border-[#2fa95b] border-2'>Status</th>
                            <th className='border-[#2fa95b] border-2'>Address</th>
                            <th className='border-[#2fa95b] border-2'>Payment Method</th>
                            <th className='border-[#2fa95b] border-2'>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-black'>
                    {
                        products.map((cart) => (
                            <tr key={cart.id} className='border-[#2fa95b] border-2 text-center'>
                                <td className='border-[#2fa95b] border-2 p-2'>{cart.product_id}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.quantity}</td>
                                <td className='border-[#2fa95b] border-2'>{
                                    cart.status=="Pending" && <div className='text-black flex items-center justify-center gap-1'><MdPendingActions /> {cart.status} </div> ||
                                    cart.status=="Shipped" && <div className='text-[#2fa95b] flex items-center justify-center gap-1'><FcShipped /> {cart.status} </div> ||
                                    cart.status=="Delivered" && <div className='text-[#2fa95b] text-center'>{cart.status} </div> ||
                                    cart.status=="Cancelled" && <div className='text-[#2fa95b] flex items-center justify-center gap-1'><MdCancel />{cart.status} </div>
                                    }</td>
                                <td className='border-[#2fa95b] border-2'>{cart.Address}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.payment_method}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.transaction_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Track;