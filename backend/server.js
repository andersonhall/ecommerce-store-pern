import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import users from "./routes/users.js";
import products from "./routes/products.js";
import passport from "passport";
import carts from "./routes/carts.js";
import checkout from "./routes/checkout.js";
import orders from "./routes/orders.js";

app.listen(port, () => console.log(`Server listening on port ${port}...`));

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "secret",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);
app.use("/checkout", checkout);
app.use("/orders", orders);

app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});
