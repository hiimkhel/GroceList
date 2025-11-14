import { useEffect, useState } from "react";
import { getUserId } from "../utils/authUtils";
import Button from "./Button";
import Input from "./Input";
import Send from "../assets/Send.svg";
const API_BASE = import.meta.env.VITE_API_BASE;

// Expected Response
interface Item {
  _id: string;
  productId: {
    name: string;
    price: number;
    imagePath: string;
  };
  quantity: number;
}

const DELIVERY_FEE = 50; // Temporary constant

const OrderSummary: React.FC = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userId = getUserId();
        const response = await fetch(`${API_BASE}/api/cart/${userId}`);
        if (!response.ok) {
          console.error("[ERROR]", response.status, await response.text());
          setLoading(false);
          return;
        }
        const data = await response.json();
        setCartItems(data.cart || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Prevent errors while loading
  if (loading)
    return <p className="mt-4 text-center">Loading order summary...</p>;

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0,
  );

  // VAT (12%)
  const VAT = subtotal * 0.12;

  // Total
  const total = subtotal + VAT + DELIVERY_FEE;

  return (
    <main className="bg-primary sticky flex h-140 flex-col justify-between rounded-lg px-6 py-8 text-white shadow-lg">
      <section className="w-full">
        <h3 className="mb-2 text-3xl font-semibold text-white">
          Order Summary
        </h3>

        <hr className="text-secondary my-2" />

        {/* Subtotal */}
        <div className="flex justify-between">
          <h4>Subtotal</h4>
          <p>₱{subtotal.toFixed(2)}</p>
        </div>

        <hr className="text-secondary my-2" />
        <div className="flex justify-between">
          <h4>VAT (12%)</h4>
          <p>₱{VAT.toFixed(2)}</p>
        </div>
        <hr className="text-secondary my-2" />
        <div className="flex justify-between">
          <h4>Delivery Fee</h4>
          <p>₱{DELIVERY_FEE.toFixed(2)}</p>
        </div>

        <hr className="text-secondary my-2" />

        {/* Coupon Section */}
        <h4 className="mb-2 font-medium">Add a coupon</h4>
        <div></div>
        <Input
          className="bg-white text-black"
          type="text"
          placeholder="Enter coupon code..."
          icon={Send}
          iconPosition="right"
          onIconClick={() => alert(" Coupon added!")}
        ></Input>

        {/* Total */}

        <hr className="text-secondary my-2" />

        <div className="flex justify-between text-lg font-semibold">
          <h4>Total</h4>
          <p>₱{total.toFixed(2)}</p>
        </div>
      </section>
      <section className="w-full">
        <Button className="w-full" variant="secondary">
          Proceed to Checkout
        </Button>
      </section>
    </main>
  );
};

export default OrderSummary;
