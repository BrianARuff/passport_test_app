const database = require("./database/database").database;
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      const user = database.query(
        "select * from users where user.username = $1 returning *",
        [username],
        (err, table) => {
          if (err) throw new Error(err.stack);
          if (table.rowCount < 1) {
            console.log("line 14");
            return done(null, false);
          } else {
            bcrypt.compareSync(password, password, (err, result) => {
              if (err) throw new Error(err);
              if (result) {
                console.log("line 20");
                return done(null, table.rows[0]);
              } else {
                console.log("line 23");
                return done(null, false);
              }
            });
          }
        }
      );
    })
  );
};
