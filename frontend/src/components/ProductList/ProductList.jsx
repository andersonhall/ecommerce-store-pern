import { useEffect, useState } from "react";
import ProductListItem from "../ProductListItem/ProductListItem";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/products", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
        return data; // Return the resolved data
      } catch (error) {
        console.error("Fetching data failed:", error);
        return undefined; // Handle errors gracefully
      }
    }
    fetchData();
  }, []);
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
