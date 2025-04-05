import db from "../config.js";

// Checkout and save order
export const checkout = async (req, res) => {
  const { cartId } = req.params;
  // Find the cart and it's items
  const cart = await db.query("SELECT * FROM cart WHERE id = $1", [cartId]);
  if (cart.rows.length === 0) {
    return res.json({ message: "Cart does not exist." });
  }
  const cartItems = await db.query(
    "SELECT * FROM cart_item WHERE cart_id = $1",
    [cartId]
  );
  // TODO: Process Payment
  // Create order details and order items
  const { user_id, total } = cart.rows[0];
  const orderDetails = await db.query(
    "INSERT INTO order_details (user_id, total, payment_id, created_at) VALUES ($1, $2, $3, now()) RETURNING *",
    [user_id, total, 1 /*Placeholder for now*/]
  );
  const order_id = orderDetails.rows[0].id;
  for (const cartItem of cartItems.rows) {
    const { product_id, quantity } = cartItem;
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, created_at) VALUES ($1, $2, $3, now()) RETURNING *",
      [order_id, product_id, quantity]
    );
  }
  await db.query("DELETE FROM cart WHERE id = $1", [cartId]);
  res.json({ cart: cart.rows[0], items: cartItems.rows });
};
