import React from "react";
import Button from "../Button";

const LogoutPopup: React.FC = () => {
  return (
    <div className="fixed top-16 right-10 z-50 w-100 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl">Are you sure you would like to exit?</h2>
      </div>

      {/* Cart items */}
      <div className="flex flex-col">
        <p>
          Exiting Grocelist? You can come back anytime. Your cart will be right
          where you left it.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-row items-center justify-between border-t border-gray-200 pt-3">
        <Button variant="outline">No, continue shopping</Button>
        <Button variant="primary">Yes, exit Grocelist</Button>
      </div>
    </div>
  );
};

export default LogoutPopup;
