import CartSection from "../components/CartSection";
import OrderSummary from "../components/OrderSummary";
import SideBar from "../components/Sidebar";
import { useState } from "react";

const ShoppingCartPage = () => {
    const [isOpen, setIsOpen] = useState(false); // state controlling sidebar
    return(
        <div className="flex">
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
            {/* Main Section */}
            <div className="p-4">  
                <h2>Your Cart</h2>
                <div className="flex">
                    {/* Cart Items (Left Section) */}
                    <CartSection/>
                    {/* Order Summary (Right Section) */}
                    <OrderSummary/>
                </div>
                
            </div>
        </div>
    )
}

export default ShoppingCartPage;