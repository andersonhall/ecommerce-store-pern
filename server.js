import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import users from "./routes/users.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

const authUser = (user, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${user}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will popuplate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  let authenticated_user = { id: 123, name: "Kyle" };
  //Let's assume that DB search that user found and password matched for Kyle

  return done(null, authenticated_user);
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  done(null, { name: "Kyle", id: 123 });

  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

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
