// import { useNavigate, useParams } from 'react-router-dom';
// import React from 'react';

// const Admin = () => {
//     const { admin } =useParams();
//     const [carts, setCarts] = React.useState([]);
//     const [sellers, setSellers] = React.useState([]);
//     const [activeView, setActiveView] = React.useState("orders"); // "orders" or "sellers"
//     const [status, setStatus] = React.useState("");
//     const handleStatusChange = async(e,id) => {
//         console.log(status,id);
//         const response = await fetch("http://localhost:5000/update", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify({ status, id })
//         });
//         const data = await response.json();
//         console.log(data);
//     }
    
//     const handleDeleteSeller = async(sellerId) => {
//         if(window.confirm("Are you sure you want to delete this seller?")) {
//             try {
//                 const response = await fetch(`http://localhost:5000/sellers/${sellerId}`, {
//                     method: "DELETE",
//                     credentials: "include"
//                 });
//                 const data = await response.json();
//                 console.log(data);
//                 // Refresh sellers list
//                 fetchSellers();
//             } catch (error) {
//                 console.error("Error deleting seller:", error);
//             }
//         }
//     }

//     const fetchSellers = () => {
//         fetch("http://localhost:5000/sellers")
//             .then(response => response.json())
//             .then(data => setSellers(data))
//             .catch(error => console.error("Error fetching sellers:", error));
//     }

//     React.useEffect(() => {
//         fetch("http://localhost:5000/carts")
//             .then(response => response.json())
//             .then(data => setCarts(data))
//             .catch(error => console.error("Error fetching carts:", error));
        
//         fetchSellers();
//     }, []);
//     console.log(carts);
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         // Implement logout functionality here
//         console.log("Logging out...");
//         fetch("http://localhost:5000/logout",{
//         credentials: "include"
//         })
//         .then(navigate('/login'))
//         .catch(error => console.error("Error:", error));
//     }
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
//             <div className="flex items-center justify-between h-[80px] px-6 border-b border-white/10">
//                 <img
//                     className="w-[150px] brightness-0 invert"
//                     src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
//                     alt="Praachurjo"
//                 />
//                 <div className="flex items-center gap-8">
//                     <button 
//                         onClick={() => setActiveView("orders")}
//                         className={`font-bold transition-colors ${activeView === "orders" ? "text-pink-400" : "text-white hover:text-pink-300"}`}
//                     >
//                         Manage Products
//                     </button>
//                     <button 
//                         onClick={() => setActiveView("sellers")}
//                         className={`font-bold transition-colors ${activeView === "sellers" ? "text-pink-400" : "text-white hover:text-pink-300"}`}
//                     >
//                         Manage Sellers
//                     </button>
//                 </div>
//                 <div className={`flex items-center gap-8 ${admin ? '' : 'hidden'}`}>
//                     <span className={`text-white font-bold ${admin ? '' : 'hidden'}`}>{admin}</span>
//                     <button className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all font-semibold" onClick={handleLogout}>Log Out</button>
//                 </div>
//             </div>
            
//             {/* Orders View */}
//             {activeView === "orders" && (
//             <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5'>
//                 <h2 className='text-3xl font-bold mb-6 text-white text-center'>Ordered Products</h2>
//                 <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
//                     <table className='w-full'>
//                         <thead className='text-white bg-white/5'>
//                             <tr className='border-b border-white/20'>
//                                 <th className='border-r border-white/20 p-3'>Product ID</th>
//                                 <th className='border-r border-white/20 p-3'>Customer Username</th>
//                                 <th className='border-r border-white/20 p-3'>Quantity</th>
//                                 <th className='border-r border-white/20 p-3'>Status</th>
//                                 <th className='border-r border-white/20 p-3'>Update Status</th>
//                                 <th className='border-r border-white/20 p-3'>Address</th>
//                                 <th className='border-r border-white/20 p-3'>Payment Method</th>
//                                 <th className='border-r border-white/20 p-3'>Sender Number</th>
//                                 <th className='border-r border-white/20 p-3'>Transaction ID</th>
//                                 <th className='p-3'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className='text-white'>
//                         {
//                             carts.map((cart) => (
//                                 <tr key={cart.id} className='border-b border-white/10 hover:bg-white/5 transition-all'>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.product_id}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.username}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.quantity}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>
//                                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                             cart.status === 'Delivered' ? 'bg-green-500/20 text-green-300' :
//                                             cart.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300' :
//                                             cart.status === 'Cancelled' ? 'bg-red-500/20 text-red-300' :
//                                             'bg-yellow-500/20 text-yellow-300'
//                                         }`}>
//                                             {cart.status}
//                                         </span>
//                                     </td>
//                                     <td className='border-r border-white/10 p-3 text-center'>
//                                         <select 
//                                             defaultValue={cart.status} 
//                                             className="backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white px-3 py-2 rounded-xl transition-all" 
//                                             onChange={(e) => setStatus(e.target.value)}
//                                         >
//                                             <option className="bg-indigo-900" disabled={true}>{cart.status}</option>
//                                             <option className="bg-indigo-900">Pending</option>
//                                             <option className="bg-indigo-900">Shipped</option>
//                                             <option className="bg-indigo-900">Delivered</option>
//                                             <option className="bg-indigo-900">Cancelled</option>
//                                         </select>
//                                     </td>
//                                     <td className='border-r border-white/10 p-3'>{cart.Address}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.payment_method}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.sender_number}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{cart.transaction_id}</td>
//                                     <td className='p-3 text-center'>
//                                         <button 
//                                             className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all"  
//                                             onClick={(e) => handleStatusChange(e,cart.id)}
//                                         >
//                                             Submit
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             )}

//             {/* Sellers View */}
//             {activeView === "sellers" && (
//             <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5'>
//                 <h2 className='text-3xl font-bold mb-6 text-white text-center'>Manage Sellers</h2>
//                 <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
//                     <table className='w-full'>
//                         <thead className='text-white bg-white/5'>
//                             <tr className='border-b border-white/20'>
//                                 <th className='border-r border-white/20 p-3'>Seller Name</th>
//                                 <th className='border-r border-white/20 p-3'>Store Name</th>
//                                 <th className='border-r border-white/20 p-3'>Email</th>
//                                 <th className='border-r border-white/20 p-3'>Phone Number</th>
//                                 <th className='p-3'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className='text-white'>
//                         {
//                             sellers.map((seller) => (
//                                 <tr key={seller.id} className='border-b border-white/10 hover:bg-white/5 transition-all'>
//                                     <td className='border-r border-white/10 p-3 text-center'>{seller.name || seller.seller_name}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{seller.store_name}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{seller.email}</td>
//                                     <td className='border-r border-white/10 p-3 text-center'>{seller.phone || seller.phone_number}</td>
//                                     <td className='p-3 text-center'>
//                                         <button 
//                                             className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all"  
//                                             onClick={() => handleDeleteSeller(seller.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             )}
//         </div>
//     );
// };

// export default Admin;



import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const Admin = () => {
  const { admin } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState("dashboard"); // default view
  const [carts, setCarts] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [stats, setStats] = React.useState({
    users: 0,
    sellers: 0,
    orders: 0,
    products: 0,
  });

  const fetchStats = () => {
    fetch("http://localhost:5000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  };

  const fetchSellers = () => {
    fetch("http://localhost:5000/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch((err) => console.error("Error fetching sellers:", err));
  };

  React.useEffect(() => {
    fetch("http://localhost:5000/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error("Error fetching carts:", err));

    fetchSellers();
    fetchStats();
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", { credentials: "include" })
      .then(() => navigate("/login"))
      .catch((error) => console.error("Error:", error));
  };

  const handleStatusChange = async (e, id) => {
    const response = await fetch("http://localhost:5000/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status, id }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleDeleteSeller = async (sellerId) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      try {
        const response = await fetch(`http://localhost:5000/sellers/${sellerId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        fetchSellers();
        fetchStats();
      } catch (error) {
        console.error("Error deleting seller:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col justify-between">
        <div>
          <div className="p-5 flex items-center justify-center border-b border-white/20">
            <img
              className="w-[130px] brightness-0 invert"
              src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
              alt="Praachurjo"
            />
          </div>
          <nav className="flex flex-col mt-8 space-y-2">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`px-6 py-3 text-left font-semibold transition-all ${
                activeView === "dashboard"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 rounded-r-full"
                  : "hover:bg-white/10"
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveView("orders")}
              className={`px-6 py-3 text-left font-semibold transition-all ${
                activeView === "orders"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 rounded-r-full"
                  : "hover:bg-white/10"
              }`}
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveView("sellers")}
              className={`px-6 py-3 text-left font-semibold transition-all ${
                activeView === "sellers"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 rounded-r-full"
                  : "hover:bg-white/10"
              }`}
            >
              Manage Sellers
            </button>
          </nav>
        </div>

        <div className="p-5 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-white/20 hover:bg-white/30 transition-all rounded-xl font-semibold"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
          {admin && (
            <span className="text-lg font-semibold bg-white/10 px-4 py-1 rounded-xl">
              Welcome, {admin}
            </span>
          )}
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 🧮 Dashboard Overview */}
          {activeView === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Total Users", value: stats.users, color: "from-blue-500 to-blue-700" },
                  { title: "Total Sellers", value: stats.sellers, color: "from-pink-500 to-fuchsia-600" },
                  { title: "Total Orders", value: stats.orders, color: "from-green-500 to-emerald-600" },
                  { title: "Total Products", value: stats.products, color: "from-yellow-500 to-orange-600" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg text-center transform hover:scale-105 transition-all`}
                  >
                    <h3 className="text-lg font-semibold">{stat.title}</h3>
                    <p className="text-4xl font-bold mt-3">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🛒 Manage Products */}
          {activeView === "orders" && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Ordered Products</h2>
              <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {[
                        "Product ID",
                        "Customer Username",
                        "Quantity",
                        "Status",
                        "Update Status",
                        "Address",
                        "Payment Method",
                        "Sender Number",
                        "Transaction ID",
                        "Action",
                      ].map((head) => (
                        <th key={head} className="border-b border-white/20 p-3">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart) => (
                      <tr key={cart.id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                        <td className="p-3 text-center">{cart.product_id}</td>
                        <td className="p-3 text-center">{cart.username}</td>
                        <td className="p-3 text-center">{cart.quantity}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              cart.status === "Delivered"
                                ? "bg-green-500/20 text-green-300"
                                : cart.status === "Shipped"
                                ? "bg-blue-500/20 text-blue-300"
                                : cart.status === "Cancelled"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {cart.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <select
                            defaultValue={cart.status}
                            className="bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white px-3 py-2 rounded-xl"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option disabled>{cart.status}</option>
                            <option>Pending</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3 text-center">{cart.Address}</td>
                        <td className="p-3 text-center">{cart.payment_method}</td>
                        <td className="p-3 text-center">{cart.sender_number}</td>
                        <td className="p-3 text-center">{cart.transaction_id}</td>
                        <td className="p-3 text-center">
                          <button
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all"
                            onClick={(e) => handleStatusChange(e, cart.id)}
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 🏪 Manage Sellers */}
          {activeView === "sellers" && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Manage Sellers</h2>
              <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {["Seller Name", "Store Name", "Email", "Phone Number", "Action"].map(
                        (head) => (
                          <th key={head} className="border-b border-white/20 p-3">
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr
                        key={seller.id}
                        className="border-b border-white/10 hover:bg-white/5 transition-all"
                      >
                        <td className="p-3 text-center">
                          {seller.name || seller.seller_name}
                        </td>
                        <td className="p-3 text-center">{seller.store_name}</td>
                        <td className="p-3 text-center">{seller.email}</td>
                        <td className="p-3 text-center">
                          {seller.phone || seller.phone_number}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all"
                            onClick={() => handleDeleteSeller(seller.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="h-14 flex items-center justify-center bg-white/10 border-t border-white/20 text-sm font-medium">
          © {new Date().getFullYear()} Praachurjo Admin Dashboard — All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Admin;
