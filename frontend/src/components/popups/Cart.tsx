import React from "react";

const CartPopup: React.FC = () => {
  // Sample cart items
  const cartItems = [
    { id: 1, name: "Apple", quantity: 2, price: 50 },
    { id: 2, name: "Banana", quantity: 5, price: 20 },
    { id: 3, name: "Orange", quantity: 3, price: 30 },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <div
      // ref={popupRef}
      className="fixed top-16 right-10 z-50 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl">Your Cart</h2>
      </div>

      {/* Cart items */}
      <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 pb-2"
          >
            <div>
              <p className="font-medium text-gray-700">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-800">
              ₱{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
        <p className="font-semibold text-gray-800">Total: ₱{totalPrice}</p>
        <button className="bg-primary hover:bg-primary/90 rounded-xl px-4 py-2 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
