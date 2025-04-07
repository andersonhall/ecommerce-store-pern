import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
import cors from "cors";
import session from "express-session";
import passport from "passport";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import users from "./routes/users.js";
import products from "./routes/products.js";
import carts from "./routes/carts.js";
import checkout from "./routes/checkout.js";
import orders from "./routes/orders.js";
import "./passportConfig.js";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

app.listen(port, () => console.log(`Server listening on port ${port}...`));

app.use("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send({ message: "User unauthorized" });
  }
  next();
};

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/users", auth, users);
app.use("/products", auth, products);
app.use("/carts", auth, carts);
app.use("/checkout", auth, checkout);
app.use("/orders", auth, orders);
