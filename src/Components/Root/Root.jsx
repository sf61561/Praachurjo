import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Slider from '../Slider/Slider';
import Categories from '../Categories/Categories';
import Justforyou from '../Justforyou/Justforyou';

const Root = () => {
    const [user, setUser] = React.useState(null); 
    const [carts , setCarts] = React.useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data.user))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    return (
        <div>
            <Navbar user={user} carts={carts} setCarts={setCarts} />
            <Slider />
            <Categories />
            <Justforyou />   
        </div>
    );
};

export default Root;