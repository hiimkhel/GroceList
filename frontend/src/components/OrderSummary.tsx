import { useEffect, useState } from "react";

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

  const userId = "6906e85e53679779b2beed7d";

  useEffect(() => {
    const fetchItems = async () => {
      try {
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
  if (loading) return <p className="text-center mt-4">Loading order summary...</p>;

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.productId?.price || 0) * item.quantity, 0);

  // VAT (12%)
  const VAT = subtotal * 0.12;

  // Total
  const total = subtotal + VAT + DELIVERY_FEE;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

      <hr className="my-2" />

      {/* Subtotal */}
      <div className="flex justify-between">
        <h4>Subtotal</h4>
        <p>₱{subtotal.toFixed(2)}</p>
      </div>

      <div className="flex justify-between">
        <h4>VAT (12%)</h4>
        <p>₱{VAT.toFixed(2)}</p>
      </div>

      <div className="flex justify-between">
        <h4>Delivery Fee</h4>
        <p>₱{DELIVERY_FEE.toFixed(2)}</p>
      </div>

      <hr className="my-2" />

     

      {/* Coupon Section */}
      <h4 className="font-medium mb-2">Add a coupon</h4>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code..."
        />
        <button>
          Apply {/* Change to submit icon */}
        </button>
      </div>

       {/* Total */}
       
      <hr className="my-2" />
      <div className="flex justify-between font-semibold text-lg">
        <h4>Total</h4>
        <p>₱{total.toFixed(2)}</p>
      </div>

      <button>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
