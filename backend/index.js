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
const { database } = require("./database/database").database;

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
server.use(cookieParser(process.env.SECRET));
server.use(passport.initialize());
server.use(passport.session());
require("./passportConfig")(passport);

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

server.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

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
            res.json(t.rows[0]);
          })
          .catch((err) => res.json(err.detail));
      } else {
        return res.json({ message: "User already exists" });
      }
    }
  );
});

server.get("/user", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
