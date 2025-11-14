import Button from "./Button";
import Input from "./Input";
import Send from "../assets/Send.svg";

interface Item {
  _id: string;
  productId: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

const DELIVERY_FEE = 50;

const OrderSummary: React.FC<{ cart: Item[] }> = ({ cart }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const VAT = subtotal * 0.12;
  const total = subtotal + VAT + DELIVERY_FEE;

  return (
    <main className="bg-primary sticky flex h-140 flex-col justify-between rounded-lg px-6 py-8 text-white shadow-lg">
      <section className="w-full">
        <h3 className="mb-2 text-3xl font-semibold text-white">Order Summary</h3>

        <hr className="text-secondary my-2" />

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
        <Input
          className="bg-white text-black"
          type="text"
          placeholder="Enter coupon code..."
          icon={Send}
          iconPosition="right"
          onIconClick={() => alert("Coupon added!")}
        />

        <hr className="text-secondary my-2" />

        {/* Total */}
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
