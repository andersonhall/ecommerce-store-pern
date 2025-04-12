import db from "../config/dbConfig.js";

// Get cart by id
export const getCartByUserId = async (req, res) => {
  try {
    const cart = await db.query("SELECT * FROM cart WHERE user_id = $1", [
      req.params.userId,
    ]);
    res.json(cart.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving cart" });
  }
};

// Create cart
export const createCart = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res
      .status(401)
      .json({ message: "User must be authenticated to create cart" });
  }
  const findUserCart = await db.query("SELECT * FROM cart WHERE user_id = $1", [
    user.id,
  ]);
  const userCart = findUserCart.rows[0];
  if (userCart) {
    req.session.cart = userCart;
    return res.status(400).json({ message: "Users may only have one cart" });
  }
  try {
    const cartToInsert = await db.query(
      "INSERT INTO cart (user_id, created_at) VALUES ($1, now()) RETURNING *",
      [user.id]
    );
    const newCart = cartToInsert.rows[0];
    req.session.cart = newCart;
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cart" });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const cart = await db.query("SELECT * FROM cart WHERE id = $1", [cartId]);
  const product = await db.query("SELECT * FROM product WHERE id = $1", [
    productId,
  ]);
  if (cart.rows.length === 0) {
    return res.status(500).json({ message: "No cart with that id exists" });
  }
  if (product.rows.length === 0) {
    return res.status(500).json({ message: "No item with that Id exists." });
  }
  const productInCart = await db.query(
    "SELECT * FROM cart_item WHERE product_id = $1 AND cart_id = $2",
    [productId, cartId]
  );
  let productToAdd;
  if (productInCart.rows.length === 0) {
    productToAdd = await db.query(
      "INSERT INTO cart_item (cart_id, product_id, quantity, created_at) VALUES ($1, $2, $3, now()) RETURNING *",
      [cartId, productId, 1]
    );
  } else {
    productToAdd = await db.query(
      "UPDATE cart_item SET quantity = cart_item.quantity + 1, modified_at = now() WHERE product_id = $1 AND cart_id = $2 RETURNING *",
      [productId, cartId]
    );
  }
  const price = productToAdd.rows[0].price;
  await db.query(
    "UPDATE cart SET total = cart.total + $1, modified_at = now() WHERE id = $2",
    [price, cartId]
  );
  res.json({ message: "Item added to cart.", item: productToAdd.rows[0] });
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const product = await db.query(
    "SELECT * FROM cart_item WHERE product_id = $1 AND cart_id = $2",
    [productId, cartId]
  );
  if (product.rows.length === 0) {
    return res.json({
      message: "A product with that id does not exist in the cart.",
    });
  }
  const updatedCart = await db.query(
    "UPDATE cart_item SET quantity = cart_item.quantity - 1, modified_at = now() WHERE cart_id = $1 AND product_id = $2 RETURNING *",
    [cartId, productId]
  );
  const price = await db.query("SELECT price FROM product WHERE id = $1", [
    productId,
  ]);
  await db.query("DELETE FROM cart_item WHERE quantity = 0");
  await db.query("UPDATE cart SET total = cart.total - $1 WHERE id = $2", [
    price.rows[0].price,
    cartId,
  ]);
  res.json({ message: "Item removed from cart.", cart: updatedCart.rows });
};

// Delete cart
export const deleteCart = async (req, res) => {
  const { cartId } = req.params;
  const cartToDelete = await db.query("SELECT * FROM cart WHERE id = $1", [
    cartId,
  ]);
  if (cartToDelete.rows.length === 0) {
    return res.json({ message: "Cart with that Id does not exist." });
  }
  await db.query("DELETE FROM cart WHERE id = $1", [cartId]);
  res.json({ message: "Cart deleted." });
};
