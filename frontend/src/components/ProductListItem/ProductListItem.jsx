import "./ProductListItem.css";
import { Link } from "react-router";

const ProductListItem = ({ product }) => {
  const { product_name, product_desc, product_image, price, quantity } =
    product;
  return (
    <div className="product-list-item">
      <img
        className="image"
        src={product_image || "https://placehold.co/250x250"}
        alt={product_name}
      />
      <h3 className="name">
        <Link to={`/products/${product.id}`}>{product_name}</Link>
      </h3>
      <p className="desc">{product_desc}</p>
      <p className="price">{price}</p>
      <p>In stock: {quantity || 0}</p>
    </div>
  );
};

export default ProductListItem;
