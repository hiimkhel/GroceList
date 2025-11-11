import CartSection from "../components/CartSection";
import OrderSummary from "../components/OrderSummary";
import SideBar from "../components/Sidebar";

const ShoppingCartPage = () => {
    return(
        <div className="flex">
            <SideBar/>
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