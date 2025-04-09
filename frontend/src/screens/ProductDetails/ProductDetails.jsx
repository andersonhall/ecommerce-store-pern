import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
        return data; // Return the resolved data
      } catch (error) {
        console.error("Fetching data failed:", error);
        return undefined; // Handle errors gracefully
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="product-details">
      <img
        className="image"
        src={product.product_image || "https:/placehold.co/250x250"}
        alt={product.product_name}
      />
      <h1 className="name">{product.product_name}</h1>
      <p className="desc">{product.product_desc}</p>
      <p className="price">{product.price}</p>
      <p className="quantity">In Stock: {product.quantity || 0}</p>
      <button className="add-to-cart-btn" disabled={product.quantity < 1}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetails;
