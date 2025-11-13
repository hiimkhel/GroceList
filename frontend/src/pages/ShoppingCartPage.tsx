import CartSection from "../components/CartSection";
import OrderSummary from "../components/OrderSummary";
import SideBar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import { useState } from "react";

const ShoppingCartPage = () => {
  const [isOpen, setIsOpen] = useState(false); // state controlling sidebar
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page Content*/}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col">
          <section className="flex w-full flex-col gap-5 px-20 py-5">
            <h2>Your Cart</h2>
            <div className="flex w-full flex-row justify-between gap-5">
              <CartSection />
              <OrderSummary />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
