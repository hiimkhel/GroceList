// src/pages/Marketplace.tsx
import React, { useEffect, useState } from "react";
import MarketplaceItem from "../components/MarketplaceItem";
import { getUserId, getAuthHeaders } from "../utils/authUtils";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const API_BASE = import.meta.env.VITE_API_BASE;

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/marketplace/`);
        if (!response.ok) {
          toastr.error("Failed to fetch products");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        toastr.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    const userId = getUserId();
    try {
      const response = await fetch(`${API_BASE}/api/cart/${userId}/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Add to cart failed");

      // Success notification
      toastr.success("Product added to cart successfully");
    } catch (err) {
      console.error(err);
      // Error notification
      toastr.error("Add to cart failed");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid w-auto grid-cols-2 gap-4 md:grid-cols-5 md:gap-x-2 md:gap-y-4">
      {products.map((product) => (
        <MarketplaceItem
          key={product._id}
          id={product._id}
          name={product.name}
          quantity={product.stock}
          price={product.price}
          imageUrl={product.image}
          description={product.description}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductsSection;
