import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //console.log(search);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/${user}/search/${search}`);
  }
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
    <div className="flex items-center justify-between h-[80px] shadow-sm">
      <NavLink to={"/"}><img
        className="w-[150px]"
        src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
        alt="Jkkniu-Mart"
      /></NavLink>
      <div className={`flex items-center gap-5  ${user && "ml-20"}`}>
        <div className="flex items-center">
          <input type="text" name="search" id="search" placeholder="Search..." className={`border-2 border-solid border-[#2fa95b] focus:border-[#2fa95b] focus:outline-none text-black p-5 w-70 h-5 rounded-l-xl`} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn h-11 bg-[#2fa95b] border-0 rounded-r-xl" onClick={(e) => handleSearchSubmit(e)}><CiSearch className="text-white" /></button>
        </div>
        <NavLink to={`/${user ? `${user}/cart` : 'login'}`}>
          <button className="btn bg-white border-0 shadow-none"><IoCartOutline className="text-[#2fa95b] text-2xl" /></button>
        </NavLink>
      </div>
      <div className={`flex gap-10 mr-20 ${user ? 'hidden' : ''}`}>
        <NavLink className="text-[#2fa95b] font-bold" to="/login">
          Log In
        </NavLink>
        <NavLink className="text-[#2fa95b] font-bold" to="/signup">
          Sign Up
        </NavLink>
      </div>
      <div className={`flex items-center gap-10 mr-20 ${user ? '' : 'hidden'}`}>
        <NavLink className={`text-[#2fa95b] font-bold`} to={`/${user}/track`}>Track Order</NavLink>
        <span className={`text-[#2fa95b] font-bold ${user ? '' : 'hidden'}`}>{user}</span>
        <button className={`btn text-black bg-white border-0 shadow-none ${user ? '' : 'hidden'}`} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;