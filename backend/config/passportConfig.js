import db from "./dbConfig.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const findUser = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = findUser.rows[0];
    if (!user) {
      return done(null, false);
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return done(null, false);
    }
    return done(null, user.id);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const findUser = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = findUser.rows[0];
  done(null, { id: user.id, username: user.username });
});
