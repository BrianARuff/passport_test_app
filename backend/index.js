require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const helmet = require("helmet");
const morgan = require("morgan");
const uuid = require("uuid");
const database = require("./database/database").database;

const server = express();
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

server.get("/", (req, res) => {
  database.query("select * from users;", (err, table) => {
    if (err) {
      console.error(err.stack);
      res.json(err);
    } else {
      res.json(table.rows);
    }
  });
});

// *****LOGIN CONFIG HERE*****
server.use(cookieParser(process.env.SECRET));
server.use(passport.initialize());
server.use(passport.session());
require("./passportConfig")(passport);

// *****LOGIN ROUTE HERE*****
server.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json(req.user);
  return console.log("Passport Authentication Complete");
});

server.post("/register", (req, res) => {
  const hashedPsw = bcrypt.hashSync(req.body.password, 10);
  database.query(
    `select * from users where users.username = $1;`,
    [req.body.username],
    (err, table) => {
      if (err) return res.json(err);
      if (table.rowCount === 0) {
        database
          .query(
            "insert into users (username, password, email) values ($1, $2, $3) returning *",
            [req.body.username, hashedPsw, req.body.email]
          )
          .then((t) => {
            return res.json(t.rows[0]);
          })
          .catch((err) => {
            return res.json({
              error: err,
              message: "Username/Email already in use.",
            });
          });
      } else {
        return res.json({ message: "User already exists" });
      }
    }
  );
});

server.post("/user", (req, res) => {
  database.query(
    "select * from users where users.username = $1 and users.id = $2",
    [req.body.username, req.body.id],
    (err, table) => {
      if (err) throw err;
      if (table.rowCount < 1) return res.status(200).json(0);
      const { username, email, id } = table.rows[0];
      res.status(200).json({ username, email, id });
    }
  );
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
