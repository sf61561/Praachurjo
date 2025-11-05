import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Justforyoucard from '../Justforyoucard/Justforyoucard';
import { NavLink } from 'react-router-dom';

const Search = () => {
    const { srch, user } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/search/${srch}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
    console.log(products);
    console.log(user);
    const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    fetch("http://localhost:5000/logout", {
      credentials: "include"
    })
      .then(window.location.reload(true))
      .catch(error => console.error("Error:", error));
  }
    return (
        <div>
            <div className="flex items-center justify-between h-[80px] shadow-sm">
                <NavLink to={"/"}><img
                    className="w-[250px]"
                    src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
                    alt="Jkkniu-Mart"
                /></NavLink>
                <div className={`flex items-center gap-10 mr-20 ${user ? '' : 'hidden'}`}>
                    <NavLink className={`text-[#2fa95b] font-bold`} to={`/${user}/track`}>Track Order</NavLink>
                    <span className={`text-[#2fa95b] font-bold ${user ? '' : 'hidden'}`}>{user}</span>
                    <button className={`btn text-black bg-white border-0 shadow-none ${user ? '' : 'hidden'}`} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <h2 className='text-2xl text-black ml-5 mt-5'>Search as {srch}:</h2>
            <div className="grid grid-cols-4 gap-5 mt-5 text-black">
                {
                    products.length > 0 ? products.map((product) => <Justforyoucard key={product.id} product={product} />) : <p>No products found</p>
                }
            </div>
        </div>
    );
};

export default Search;