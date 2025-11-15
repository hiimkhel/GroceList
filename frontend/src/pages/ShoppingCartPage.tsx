import CartSection from "../components/CartSection";
import OrderSummary from "../components/OrderSummary";
import SideBar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import { useState, useEffect } from "react";
import { getUser, getUserId, getAuthHeaders } from "../utils/authUtils";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const API_BASE = import.meta.env.VITE_API_BASE;

interface Item {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
    tag: string;
    stock: number;
    description: string;
  };
  quantity: number;
  addedAt: string;
}

interface Coupon {
  code: string;
  discountPercentage: number; // 100 for free, 50 for half, etc.
}

const coupons: Coupon[] = [{ code: "ADRIAN100", discountPercentage: 100 }];

const ShoppingCartPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Item[]>([]);
  const userId = getUserId();
  const headers = getAuthHeaders();

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/${userId}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      const item = cart.find((i) => i._id === itemId);
      if (!item) return;

      const res = await fetch(
        `${API_BASE}/api/cart/${userId}/update/${item.productId._id}`,
        {
          method: "PATCH",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      // Success notification
      toastr.success("Product updated successfully");
      fetchCart(); // refresh cart after update
    } catch (err) {
      // Error notification
      toastr.error("Product update failed!");
      console.error(err);
    }
  };

  const handleRemoveProduct = async (itemId: string) => {
    try {
      const item = cart.find((i) => i._id === itemId);
      if (!item) return;

      const res = await fetch(
        `${API_BASE}/api/cart/${userId}/remove/${item.productId._id}`,
        { method: "DELETE", headers },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Remove failed");

      fetchCart(); // refresh cart after remove
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 flex-col transition-all duration-300">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex flex-col">
          <section className="flex h-[calc(100vh-64px)] w-full flex-col gap-5 px-20 py-5">
            <h2>Your Cart</h2>
            <div className="grid h-[calc(100vh-50vh)] flex-1 grid-cols-[3fr_1fr] gap-5">
              <div className="flex-1 overflow-y-auto">
                <CartSection
                  cart={cart}
                  onQuantityChange={handleQuantityChange}
                  onRemoveProduct={handleRemoveProduct}
                />
              </div>
              <div className="w-[300px] flex-shrink-0">
                <OrderSummary cart={cart} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
