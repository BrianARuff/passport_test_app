const express = require("express");
const server = express();
const { database } = require("./database/database");

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

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
