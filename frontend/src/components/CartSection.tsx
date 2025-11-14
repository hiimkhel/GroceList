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

interface CartSectionProps {
  cart: Item[];
  onQuantityChange: (id: string, newQty: number) => void;
  onRemoveProduct: (id: string) => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  onQuantityChange,
  onRemoveProduct,
}) => {
  if (cart.length === 0) return <p className="text-center">Your cart is empty.</p>;

  return (
    <div className="flex flex-col gap-5">
      {cart.map((item) => (
        <CartItem
          key={item._id}
          id={item._id}
          name={item.productId.name}
          image={item.productId.image}
          quantity={item.quantity}
          price={item.productId.price}
          onQuantityChange={onQuantityChange}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
    </div>
  );
};

export default CartSection;
