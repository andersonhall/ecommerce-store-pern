import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
import session from "express-session";
import passport from "passport";
import users from "./routes/users.js";
import "./passportConfig.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

app.listen(port, () => console.log(`Server listening on port ${port}...`));

app.get("/login", (req, res) => {
  res.send("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/store",
    failureRedirect: "/login",
  })
);

app.get("/store", (req, res) => {
  res.send("store");
});

app.use("/users", users); // Mount the users router on the /users path
