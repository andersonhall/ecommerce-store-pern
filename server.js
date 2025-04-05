import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
import session from "express-session";
import passport from "passport";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
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

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/users", users);
