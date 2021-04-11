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
const { database } = require("./database/database");

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

server.post("/login", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

server.post("/register", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

server.get("/user", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
