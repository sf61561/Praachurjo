import { NavLink, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  console.log(address, paymentMethod);
  const { user } = useParams();
  const { cart } = useCart();
  const [cartCounts, setCartCounts] = useState(cart.map(() => 0));
  const handleCount = (index, operation) => {
    setCartCounts((prev) => {
      const newCounts = [...prev];
      if (operation === "increment") newCounts[index]++;
      if (operation === "decrement" && newCounts[index] > 0) newCounts[index]--;
      return newCounts;
    });
  };
  const handlecheckout = async () => {
    console.log(cartCounts);
    const response = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user,
        cart,
        cartCounts,
        address,
        paymentMethod,
        senderNumber,
        transactionId,
      }),
    });
    const data = await response.json();
    console.log(data)
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Ordered Placed Successfully", {
        position: 'top-center',
      });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    fetch("http://localhost:5000/logout", {
      credentials: "include",
    })
      .then(navigate("/"))
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center justify-between h-[80px] shadow-sm">
        <NavLink to={"/"}><img
          className="w-[250px]"
          src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
          alt="Jkkniu-Mart"
        /></NavLink>
        <div className="flex items-center gap-10 mr-20">
          <span className="text-[#2fa95b] font-bold">{user}</span>
          <button
            className={`btn text-black bg-white border-0 shadow-none ${user ? "" : "hidden"
              }`}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Cart Section */}
      <div className={`min-h-[calc(100vh_-_80px)] flex flex-col items-center justify-center gap-5 bg-white ${cart.length === 0 ? 'invisible' : ''}`}>
        <h2 className="text-3xl text-[#2fa95b] font-bold">Your Cart</h2>

        <table className="text-black border-2 border-[#2fa95b] min-w-[calc(100vw_-_15px)]">
          <thead>
            <tr>
              <th></th>
              <th className="p-3 border-2 border-[#2fa95b]">Product</th>
              <th className="p-3 border-2 border-[#2fa95b]">Price</th>
              <th className="p-3 border-2 border-[#2fa95b]">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-2 border-[#2fa95b]">
                <td className="flex justify-center">
                  <img
                    className="w-[50px] h-[50px]"
                    src={item.image}
                    alt={item.title}
                  />
                </td>
                <td className="p-3 border-2 border-[#2fa95b]">{item.title}</td>
                <td className="p-3 border-2 border-[#2fa95b]">{item.price}</td>
                <td className="p-3 border-0 flex items-center justify-center">
                  <button
                    className="btn"
                    onClick={() => handleCount(index, "increment")}
                  >
                    +
                  </button>
                  <span className="mx-2">{cartCounts[index]}</span>
                  <button
                    className="btn"
                    onClick={() => handleCount(index, "decrement")}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Address */}
        <label className="text-black font-semibold m-5 flex items-center justify-center">
          Address:
          <textarea
            className="text-black border-2 border-[#2fa95b] w-[300px] h-35 pl-2 rounded-xl focus:outline-none focus:border-yellow-600 m-5"
            placeholder="Enter Your Delivery Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        {/* Payment Method */}
        <div className="flex items-center justify-center">
          <select
            className="select select-success bg-white text-black focus:outline-none"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Pick a Payment Method
            </option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Show sender number + transaction only for mobile payments */}
        <div
          className={`flex flex-col items-center justify-center ${["Bkash", "Nagad", "Rocket"].includes(paymentMethod)
              ? ""
              : "hidden"
            }`}
        >
          <span className="font-semibold text-black mt-5">
            Payment Method: {paymentMethod} (0188051928)
          </span>
          <label className="text-black text-center">Sender's Number:
            <input
              type="tel"
              className="ml-3 text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600 mt-10"
              placeholder="Enter Sender's Number"
              onChange={(e) => setSenderNumber(e.target.value)}
            /></label>
          <label className="text-black text-center">Transaction Id:
            <input
              type="text"
              className="ml-3 text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600 mt-5"
              placeholder="Transaction Id"
              onChange={(e) => setTransactionId(e.target.value)}
            /></label>
        </div>

        {/* Checkout Button */}
        <button
          className="btn btn-success bg-white hover:bg-[#2fa95b] text-black hover:text-white m-5"
          onClick={handlecheckout}
        >
          Checkout
        </button>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Cart;
