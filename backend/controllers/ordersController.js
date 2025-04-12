import db from "../config/dbConfig.js";

// Get order by id
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await db.query("SELECT * FROM order_details WHERE id = $1", [
    orderId,
  ]);
  if (order === undefined) {
    return res.json({ message: "Order with that Id does not exist." });
  }
  const items = await db.query(
    "SELECT * FROM order_items WHERE order_id = $1",
    [orderId]
  );
  let result = {};
  result.order = order.rows[0];
  result.items = items.rows;
  res.json(result);
};

// Get orders by user id
export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  if (userId === undefined) {
    return res.json({ message: "User Id not provided." });
  }
  const orders = await db.query(
    "SELECT * FROM order_details WHERE user_id = $1",
    [userId]
  );
  let result = [];
  for (const order of orders.rows) {
    const items = await db.query(
      "SELECT * FROM order_items WHERE order_id = $1",
      [order.id]
    );
    order.items = items.rows;
    result.push(order);
  }
  res.json(result);
};
