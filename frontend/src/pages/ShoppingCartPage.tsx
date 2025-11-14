import CartSection from "../components/CartSection";
import OrderSummary from "../components/OrderSummary";
import SideBar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import { useState } from "react";

const ShoppingCartPage = () => {
  const [isOpen, setIsOpen] = useState(false); // state controlling sidebar
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page Content*/}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col">
          <section className="flex h-[calc(100vh-64px)] w-full flex-col gap-5 px-20 py-5">
            <h2>Your Cart</h2>
            <div className="grid h-[calc(100vh-50vh)] flex-1 grid-cols-[3fr_1fr] gap-5">
              <div className="flex-1 overflow-y-auto">
                <CartSection />
              </div>

              <div className="w-[300px] flex-shrink-0">
                <OrderSummary />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
