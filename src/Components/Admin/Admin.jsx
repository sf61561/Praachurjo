import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

const Admin = () => {
    const { admin } =useParams();
    const [carts, setCarts] = React.useState([]);
    const [status, setStatus] = React.useState("");
    const handleStatusChange = async(e,id) => {
        console.log(status,id);
        const response = await fetch("http://localhost:5000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status, id })
        });
        const data = await response.json();
        console.log(data);
    }
    React.useEffect(() => {
        fetch("http://localhost:5000/carts")
            .then(response => response.json())
            .then(data => setCarts(data))
            .catch(error => console.error("Error fetching carts:", error));
    }, []);
    console.log(carts);
    const navigate = useNavigate();
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
                <img
                    className="w-[250px]"
                    src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
                    alt="Jkkniu-Mart"
                />
                <a href='' className='text-[#2fa95b] font-bold'>Manage Products</a>
                <div className={`flex items-center gap-10 mr-20 ${admin ? '' : 'hidden'}`}>
                    <span className={`text-[#2fa95b] font-bold ${admin ? '' : 'hidden'}`}>{admin}</span>
                    <button className={`btn text-black bg-white border-0 shadow-none ${admin ? '' : 'hidden'}`} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5 bg-white'>
                <h2 className='text-2xl font-bold mb-4 text-black text-center'>Ordered Products</h2>
                <table className='border-[#2fa95b] border-2 w-full'>
                    <thead className='text-black'>
                        <tr className='border-[#2fa95b] border-2'>
                            <th className='border-[#2fa95b] border-2'>Product ID</th>
                            <th className='border-[#2fa95b] border-2'>Customer Username</th>
                            <th className='border-[#2fa95b] border-2'>Quantity</th>
                            <th className='border-[#2fa95b] border-2'>Status</th>
                            <th className='border-[#2fa95b] border-2'></th>
                            <th className='border-[#2fa95b] border-2'>Address</th>
                            <th className='border-[#2fa95b] border-2'>Payment Method</th>
                            <th className='border-[#2fa95b] border-2'>Sender Number</th>
                            <th className='border-[#2fa95b] border-2'>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-black'>
                    {
                        carts.map((cart) => (
                            <tr key={cart.id} className='border-[#2fa95b] border-2'>
                                <td className='border-[#2fa95b] border-2'>{cart.product_id}</td>
                                <td  className='border-[#2fa95b] border-2'>{cart.username}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.quantity}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.status}</td>
                                <td className='border-[#2fa95b] border-2'><select defaultValue="Pick a Status" className="select select-success bg-white" onClick={(e) => setStatus(e.target.value)}>
                                    <option disabled={true}>{cart.status}</option>
                                    <option>Pending</option>
                                    <option>Shipped</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>
                                </select></td>
                                <td className='border-[#2fa95b] border-2'>{cart.Address}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.payment_method}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.sender_number}</td>
                                <td className='border-[#2fa95b] border-2'>{cart.transaction_id}</td>
                                <td className='border-[#2fa95b] border-2'><button className="btn w-full bg-white text-[#2fa95b] border-[#2fa95b] hover:bg-[#2fa95b] hover:text-white"  onClick={(e) => handleStatusChange(e,cart.id)}>
                                    Submit
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;