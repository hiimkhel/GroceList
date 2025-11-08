import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar: React.FC = () => 
{
    return (
    <div>
        <div>
            <Link to="/">
                <img src="../assets/Hamburger.svg"></img> {/* Sidebar menu */}
            </Link>
            
            <div className='h-[200px] w-[400px] rounded-lg bg-white'></div> {/* User profile card */}
            <div> 
                {/* Menu */}
                <Link to="/marketplace">
                    <img src="../assets/Marketplace.svg"></img>
                    <h3>Marketplace</h3>
                </Link>
                <Link to="/checklist">
                    <img src="../assets/Checklist.svg"></img>
                    <h3>Checklist</h3>
                </Link>
                <Link to="/cart">
                    <img src="../assets/ShoppingCart.svg"></img>
                    <h3>Shopping Cart</h3>
                </Link>
            </div> 
        </div>
        {/* Lower Section */}
        <div>   
            <div className="w-4/5 mx-auto bg-cyan-500">
                <img></img>
                <h1>Logout</h1>
            </div>
            
        </div>
    </div>
    );
};
export default Sidebar;
