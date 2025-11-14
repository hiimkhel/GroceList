import React from "react";
import Button from "../components/Button";
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
    <div className="border-secondary flex h-40 w-auto flex-row items-center justify-between gap-12 rounded-xl border p-4 shadow-lg">
      <section className="flex flex-row gap-2">
        {/* Item Image */}
        <div className="">
          <img
            className="mb-2 flex h-30 w-30 rounded-lg object-contain"
            src={image}
          ></img>
        </div>

        {/* Item name and quantity */}
        <div className="flex flex-col gap-2">
          <h4 className="font-secular text-lg font-medium">{name}</h4>
          {/* Quantity Button */}
          <div className="flex flex-row gap-1">
            <Button
              variant="primary"
              className="rounded-sm px-3 py-1"
              size="sm"
              onClick={handleDecrement}
            >
              -
            </Button>

            {/* quantity */}
            <div className="rounded-sm border border-gray-400 px-3 py-1">
              {quantity}
            </div>

            <Button
              className="rounded-sm px-3 py-1"
              variant="primary"
              size="sm"
              onClick={handleIncrement}
            >
              +
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-row">
        {/* Delete button and item price */}
        {/* Apply align self center sa tailwind css */}
        <div className="flex items-center space-x-2 pr-15">
          {/* Delete button */}
          <button className="text-2l flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-700">
            <img
              src={DeleteIcon}
              alt=""
              className="h-5 w-5"
              onClick={handleRemove}
            />
          </button>
          <p className="font-poppins pl-3 text-lg font-semibold">₱{price}</p>
        </div>
      </section>
    </div>
  );
};

export default CartItem;
