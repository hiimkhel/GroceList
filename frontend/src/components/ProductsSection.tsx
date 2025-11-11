// Section of all Products
// src/pages/Marketplace.tsx
import React, { useEffect, useState } from "react";
import MarketplaceItem from "../components/MarketplaceItem";

const API_BASE = import.meta.env.VITE_API_BASE; // BACKEND API
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
          console.error("Failed to fetch products:", response.status);
          setLoading(false);
          return;
        }
        const data = await response.json();

        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart clicked for product:", productId);
    // TODO: Implement add to cart logic
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid w-auto grid-cols-2 gap-2 md:grid-cols-5">
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
