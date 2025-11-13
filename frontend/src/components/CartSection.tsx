import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getAuthHeaders, getUserId } from "../utils/authUtils";
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

const CartSection: React.FC = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Apply utility
  const userId = getUserId();
  const headers = getAuthHeaders();

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`${API_BASE}/api/cart/${userId}/`, {
          headers,
        });
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch cart");
        setCartItems(data.cart || []);
      } catch (err) {
        console.error("Fetch cart failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Remove item
  const handleRemoveFromCart = async (itemId: string) => {
    try {
      const item = cartItems.find((i) => i._id === itemId);
      if (!item) return;

      const response = await fetch(
        `${API_BASE}/api/cart/${userId}/remove/${item.productId._id}`,
        { method: "DELETE", headers },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Remove failed");
      
      setCartItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  // Update quantity
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      const item = cartItems.find((i) => i._id === itemId);
      if (!item) return;

      const response = await fetch(
        `${API_BASE}/api/cart/${userId}/update/${item.productId._id}`,
        {
          method: "PATCH",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      setCartItems(data.cart || []);
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  // UI states
  if (loading) return <p className="mt-4 text-center">Loading your cart...</p>;
  if (cartItems.length === 0)
    return (
      <p className="mt-4 text-center text-gray-500">Your cart is empty.</p>
    );

  return (
    <div className="flex grow flex-col gap-5">
      {cartItems
        .filter((item) => item.productId) // only keep items with a valid product
        .map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            name={item.productId.name}
            image={item.productId.image}
            quantity={item.quantity}
            price={item.productId.price}
            onRemoveProduct={() => handleRemoveFromCart(item._id)}
            onQuantityChange={handleQuantityChange}
          />
        ))}
    </div>
  );
};
export default CartSection;
