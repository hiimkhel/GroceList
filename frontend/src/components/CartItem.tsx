import React from "react";
import DeleteIcon from "../assets/Delete.svg";

interface Item {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveProduct: (id: string) => void;
}

const CartItem: React.FC<Item> = ({
  id,
  name,
  image,
  quantity,
  price,
  onQuantityChange,
  onRemoveProduct,
}) => {
  // Function to handle product quantity value change
  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) onQuantityChange(id, quantity - 1);
  };

  const handleRemove = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove "${name}" from your cart?`,
    );
    if (confirmDelete) {
      onRemoveProduct(id);
    }
  };

  return (
    <div className="border-secondary flex h-40 w-auto flex-row items-center gap-12 rounded-xl border p-4 shadow-lg">
      {/* Item Image */}
      <div>
        <img
          className="mb-2 flex h-30 w-30 rounded-lg object-contain"
          src={image}
        ></img>
      </div>

      {/* Item name and quantity */}
      <div>
        <h4>{name}</h4>
        {/* Quantity Button */}

        <div className="flex">
          <button onClick={handleDecrement}>-</button>

          {/* quantity */}

          <div>{quantity}</div>

          <button onClick={handleIncrement}>+</button>
        </div>
      </div>

      {/* Delete button and item price */}
      {/* Apply align self center sa tailwind css */}
      <div className="flex items-center justify-end space-x-2">
        {/* Delete button */}
        <button className="text-2l flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
          <img
            src={DeleteIcon}
            alt=""
            className="h-5 w-5"
            onClick={handleRemove}
          />
        </button>
        <p>₱{price}</p>
      </div>
    </div>
  );
};

export default CartItem;
