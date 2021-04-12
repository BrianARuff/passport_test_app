const LocalStrategy = require("passport-local").Strategy;
const database = require("./database/database").database;
const bcrypt = require("bcryptjs");

function initialize(passport) {
  console.log("Passport Auth Initialized");

  const authenticateUser = (username, password, done) => {
    database.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          return done(null, false, {
            message: "No user with that username address",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    database.query(
      `SELECT * FROM users WHERE id = $1`,
      [id],
      (err, results) => {
        if (err) {
          return done(err);
        }
        return done(null, results.rows[0]);
      }
    );
  });
  console.log("Passport Auth Middleware Complete");
}

module.exports = initialize;
