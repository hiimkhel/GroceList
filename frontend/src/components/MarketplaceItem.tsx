//item card for each item in market place
import React, { useState } from "react";
import Button from "./Button";
import Cart from "../components/Cart";

interface ItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onAddToCart?: (id: string) => void;
}

const MarketplaceItem: React.FC<ItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  quantity,
  onAddToCart,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // track description toggle
  return (
    // Item Card
    <div className="border-secondary flex flex-col items-center justify-between gap-2 rounded-3xl border-2 p-4 shadow-lg transition-all duration-300">
      {/* Upper section */}
      <section className="flex flex-col gap-2">
        {/* Image */}
        <div className="flex w-full items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="mb-2 flex h-50 w-auto rounded-lg object-contain"
          ></img>
        </div>

        {/* Product Title */}
        <h3>{name}</h3>

        {/* Price and Quantity */}
        <div className="flex w-full flex-row items-center justify-start gap-2">
          {/* Price */}
          <p className="text-primary text-lg font-semibold">
            ${price.toFixed(2)}
          </p>

          {/* Check stock if available */}
          {quantity ? (
            <>
              {/* Display green if available */}
              <div className="bg-secondary/30 flex h-max items-center justify-center rounded-2xl px-4 py-0.5">
                <p className="text-primary text-xs italic">
                  In stock: {quantity}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Display gray if not available */}
              <div className="flex h-max items-center justify-center rounded-2xl bg-gray-200 px-4 py-0.5">
                <p className="text-xs text-gray-700 italic">Out of Stock</p>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <div className="relative w-full">
          <p
            className={`text-sm text-gray-600 transition-all duration-300 ${
              isExpanded ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {description}
          </p>

          {/* Toggle Button */}
          {description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:text-secondary mt-1 cursor-pointer text-xs text-blue-400 underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </section>
      {/* Lower Section */}
      <section className="w-full">
        {/* Add to Cart Button */}
        {onAddToCart && (
          <Button
            variant="primary"
            size="md"
            className="flex w-full flex-row items-center justify-center gap-4 text-white"
            onClick={() => onAddToCart(id)}
          >
            <Cart className="h-4 w-4 text-white"></Cart>
            Add to Cart
          </Button>
        )}
      </section>
    </div>
  );
};

export default MarketplaceItem;
