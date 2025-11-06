// import React, { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const navigate = useNavigate();
//   const validateField = (field) => {
//     const newErrors = {};
//     if (field === 'email' || !field) {
//       if (!email) newErrors.email = 'Email is required';
//       else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
//     }
//     if (field === 'password' || !field) {
//       if (!password) newErrors.password = 'Password is required';
//       else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     }
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleBlur = (field) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//     validateField(field);
//   };

//   const showError = (field) => touched[field] && errors[field];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });
    
//     if (!validateField()) return;

//     setIsLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/users/login', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password })
//       });
      
//       const data = await response.json();
      
//       if (data.error === "Invalid email or password") {
//         toast.error(data.error, { position: 'top-center' });
//         setErrors({ email: data.error });
//       } else {
//         toast.success('Login successful!', { position: 'top-center' });
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       }
//     } catch {
//       toast.error('Connection error. Please try again.', { position: 'top-center' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <NavLink to="/" className="login-logo-link">
//             <img
//               src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
//               alt="Jkkniu-Mart"
//               className="login-logo"
//             />
//           </NavLink>
//           <h2 className="login-title">Welcome Back</h2>
//           <p className="login-subtitle">Sign in to your account</p>
//         </div>

//           <form className="login-form" onSubmit={handleSubmit} noValidate>
//             {/* Email field */}
//             <div className="input-group">
//               <label htmlFor="email" className="input-label">
//                 Email <span className="required" aria-label="required">*</span>
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className={`input-field ${showError('email') ? 'error' : ''}`}
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onBlur={() => handleBlur('email')}
//                 autoComplete="email"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!showError('email')}
//                 aria-describedby={showError('email') ? 'email-error' : undefined}
//               />
//               {showError('email') && (
//                 <span id="email-error" className="error-message" role="alert">
//                   {errors.email}
//                 </span>
//               )}
//             </div>

//             {/* Password field */}
//             <div className="input-group">
//               <label htmlFor="password" className="input-label">
//                 Password <span className="required" aria-label="required">*</span>
//               </label>
//               <div className="input-wrapper">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   className={`input-field ${showError('password') ? 'error' : ''}`}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onBlur={() => handleBlur('password')}
//                   autoComplete="current-password"
//                   required
//                   aria-required="true"
//                   aria-invalid={!!showError('password')}
//                   aria-describedby={showError('password') ? 'password-error' : undefined}
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(v => !v)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   tabIndex={0}
//                 >
//                   {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
//                 </button>
//               </div>
//               {showError('password') && (
//                 <span id="password-error" className="error-message" role="alert">
//                   {errors.password}
//                 </span>
//               )}
//             </div>

//             {/* Remember me & Forgot password */}
//             <div className="form-options">
//               <div className="checkbox-group">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label htmlFor="remember" className="checkbox-label">
//                   Remember me
//                 </label>
//               </div>
//               <NavLink to="/forgot-password" className="link forgot-link">
//                 Forgot password?
//               </NavLink>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="btn-login"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="spinner" aria-hidden="true" />
//                   <span>Logging in...</span>
//                 </>
//               ) : (
//                 'Log In'
//               )}
//             </button>
//           </form>

//         {/* Sign up link */}
//         <div className="signup-prompt">
//           <span className="signup-text">Don't have an account?</span>
//           <NavLink to="/signup" className="link signup-link">
//             Sign Up
//           </NavLink>
//         </div>
//       </div>
      
//       <ToastContainer autoClose={2000} />
//     </div>
//   );
// };

// export default Login;







import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) {
        toast.error(data.error, { position: "top-center" });
      } else {
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => navigate("/"), 1000);
      }
    } catch {
      toast.error("Connection error. Please try again.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  // Create background stars dynamically
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
      {/* Floating gradient rings */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500 to-purple-700 blur-3xl opacity-40 animate-spin-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-3xl opacity-30 animate-spin-slow-reverse"></div>

      {/* Stars animation */}
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

      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-[90%] sm:w-[420px]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.img
            src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
            alt="Logo"
            className="mx-auto w-20 mb-3"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-sm">Log in to your universe</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div whileHover={{ scale: 1.03 }}>
            <label className="text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <label className="text-gray-300 font-semibold">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-gray-300 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Remember / Forgot */}
          <div className="flex justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-xs checkbox-pink-500" />
              Remember me
            </label>
            <NavLink to="/forgot-password" className="hover:underline hover:text-white">
              Forgot password?
            </NavLink>
          </div>

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
            {isLoading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        {/* Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-gray-300"
        >
          <span>New here? </span>
          <NavLink to="/signup" className="text-pink-400 hover:underline">
            Create Account
          </NavLink>
        </motion.div>
      </motion.div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;
