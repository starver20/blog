const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

app.use("/feed", feedRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.mesage;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://NewAmar:OfuAR4iKLMjZsQan@newamar.9xxre.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log("connected to port 3000");
  })
  .catch((err) => {
    console.log(err);
  });
