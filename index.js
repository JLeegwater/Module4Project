// this allows to stash "artificial env variables" in a file
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000; // fallback is nice

const server = express();

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, "client/build")));

const users = [
  {
    user: "Jesse",
    password: "Password",
  },
  {
    user: "Admin",
    password: "admin",
  },
];

server.get("/", (req, res) => {
  res.send(`<h1>Web 45 ROCKS!</h1>`);
});

server.get("/api", (req, res) => {
  res.json({ message: "Web 45 is awesome!" });
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/api/register", (req, res) => {
  users.push(req.body);
  res.status(201).json(users[users.length - 1]);
});

server.post("/api/login", (req, res) => {
  res
    .status(200)
    .json(
      users.find((user) => user.user == req.body.user).password ===
        req.body.password
        ? res
            .status(200)
            .json({ message: `welcome to the site ${req.body.user}` })
        : res.status(400).json({ message: `Cannot find user ${req.body.user}` })
    );
});

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
