// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import { useCart } from "../Context/CartContext";
// import { NavLink } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [fname, setfname] = useState("");
//   const [phone, setphone] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [address, setaddress] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/users/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fname, username, phone, email, password })
//     });
//     const data = await response.json();
//     console.log(data);
//     if (data.error) {
//       toast.error(data.error);
//     } else {
//       toast.success("Sign Up successfully", {
//         position: 'top-center',
//       });
//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     }
//   };
//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between h-[80px] shadow-sm">
//         <NavLink to={"/"}><img
//           className="w-[250px]"
//           src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
//           alt="Jkkniu-Mart"
//         /></NavLink>
//       </div>
//       <div className="flex flex-col items-center justify-center h-[calc(100vh_-_80px)] gap-5">
//         <h2 className="text-3xl text-[#2fa95b] font-bold">Sign up</h2>
//         <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="text"
//             placeholder="Full Name"
//             onChange={(e) => setfname(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setemail(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setpassword(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="tel"
//             placeholder="Phone Number"
//             pattern="[0-9]*"
//             minlength="11"
//             maxlength="11"
//             title="Must be 11 digits"
//             onChange={(e) => setphone(e.target.value)}
//             required
//           />
//           <select defaultValue="Pick a Country" className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600">
//             <option disabled={true}>Country</option>
//             <option>Bangladesh</option>
//             <option>India</option>
//             <option>Pakistan</option>
//           </select>
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="text"
//             placeholder="Address"
//             onChange={(e) => setaddress(e.target.value)}
//             required
//           />
//           <input
//             type="submit"
//             value="Sign up"
//             className=" btn border-0 bg-[#2fa95b] text-white py-2 rounded font-bold cursor-pointer"
//           />
//         </form>
//       </div>
//       <ToastContainer autoClose={1000} />
//     </div>
//   );
// };

// export default Signup;






import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [fname, setfname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fname || !email || !password || !phone || !address || !country) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    const response = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, phone, email, password, address, country }),
    });

    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Sign Up successful!", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    setIsLoading(false);
  };

  // Stars for background
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-black">
      {/* Glowing gradient rings */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500 to-purple-700 blur-3xl opacity-40 animate-spin-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-3xl opacity-30 animate-spin-slow-reverse"></div>

      {/* Floating stars */}
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute bg-white rounded-full shadow-lg"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-[90%] sm:w-[450px]"
      >
        <div className="text-center mb-8">
          <motion.img
            src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
            alt="Jkkniu-Mart"
            className="mx-auto w-24 mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Create Account
          </h2>
          <p className="text-gray-300 text-sm">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setfname(e.target.value)}
            required
          />

          {/* Email */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setemail(e.target.value)}
            required
          />

          {/* Password */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setpassword(e.target.value)}
            required
          />

          {/* Phone */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]*"
            minLength="11"
            maxLength="11"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setphone(e.target.value)}
            required
          />

          {/* Country */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option>Bangladesh</option>
            <option>India</option>
            <option>Pakistan</option>
          </motion.select>

          {/* Address */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setaddress(e.target.value)}
            required
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(255, 100, 200, 0.8)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <span>Already have an account? </span>
          <NavLink to="/login" className="text-pink-400 hover:underline">
            Log In
          </NavLink>
        </div>
      </motion.div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Signup;
