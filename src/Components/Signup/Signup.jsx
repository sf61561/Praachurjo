import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from "../Context/CartContext";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [fname, setfname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, username, phone, email, password })
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Sign Up successfully", {
        position: 'top-center',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between h-[80px] shadow-sm">
        <NavLink to={"/"}><img
          className="w-[250px]"
          src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
          alt="Jkkniu-Mart"
        /></NavLink>
      </div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh_-_80px)] gap-5">
        <h2 className="text-3xl text-[#2fa95b] font-bold">Sign up</h2>
        <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setfname(e.target.value)}
            required
          />
          <input
            className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
            type="email"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <input
            className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]*"
            minlength="11"
            maxlength="11"
            title="Must be 11 digits"
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <select defaultValue="Pick a Country" className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600">
            <option disabled={true}>Country</option>
            <option>Bangladesh</option>
            <option>India</option>
            <option>Pakistan</option>
          </select>
          <input
            className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
            type="text"
            placeholder="Address"
            onChange={(e) => setaddress(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Sign up"
            className=" btn border-0 bg-[#2fa95b] text-white py-2 rounded font-bold cursor-pointer"
          />
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Signup;
