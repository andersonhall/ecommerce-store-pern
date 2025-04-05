import db from "./db/config.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return done(null, false, {
        message: "Incorrect username or password.",
      });
    }
    const correctPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!correctPassword) {
      return done(null, false, {
        message: "Incorrect username or password.",
      });
    }
    return done(null, { id: user.rows[0].id, username: user.rows[0].username });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  done(null, { id: user.rows[0].id, username: user.rows[0].username });
});
