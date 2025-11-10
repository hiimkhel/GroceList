import CartSection from "../components/CartSection";
import SideBar from "../components/Sidebar";

const ShoppingCartPage = () => {
    return(
        <div className="flex">
            <SideBar/>
            {/* Main Section */}
            <div className="p-4">  
                <h2>Your Cart</h2>
                <div>
                    {/* Cart Items (Left Section) */}
                    <CartSection/>
                    {/* Order Summary (Right Section) */}
                </div>
                
            </div>
        </div>
    )
}

export default ShoppingCartPage;