const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get(
  "/fly/:flyId",
  (req, res, next) => {
    console.log("Hello World 1");
    res.sum = 1;
    next();
  },
  (req, res, next) => {
    console.log("Hello World 2");
    res.sum++;
    next();
  },
  (req, res, next) => {
    console.log("Hello World 3");
    res.sum++;
    next();
  },
  (req, res, next) => {
    console.log("Hello World 4");
    res.sum++;
    res.send(res.sum.toString());
    // next();
  }
);
app.get("/test", (req, res) => {
  res.send("Hello Test");
});
