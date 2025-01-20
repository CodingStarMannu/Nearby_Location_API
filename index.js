const express = require("express");
const app = express();
require("./config/database");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/", require("./routes"));

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not Found",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in running server ${err}`);
    return;
  }
  console.log(`Server is up and running on Port ${PORT}`);
});
