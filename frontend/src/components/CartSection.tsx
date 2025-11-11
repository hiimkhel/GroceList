import { useEffect, useState } from "react";
import CartItem from "./CartItem";

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

    const userId = "6906e85e53679779b2beed7d"; // temporary mock user

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // Remove trailing slash
                const response = await fetch(`${API_BASE}/api/cart/${userId}/`);

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

        fetchCartItems();
    }, []);

    if (loading) return <p className="text-center mt-4">Loading your cart...</p>;
    if (cartItems.length === 0)
        return <p className="text-center mt-4 text-gray-500">Your cart is empty.</p>;

    return (
        <div className="space-y-4">
            {cartItems
            .filter(item => item.productId) // only keep items with a valid product
            .map(item => (
                <CartItem
                key={item._id}
                name={item.productId.name}
                image={item.productId.image}
                quantity={item.quantity}
                price={item.productId.price}
                />
            ))}
        </div>
    );
};

export default CartSection;
