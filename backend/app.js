const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();

//db config -> i have a config file with my mongo_db uri
//create one if you don't have -> e.g mongodb://localhost/<database name>
const { MONGO_URI_LOCAL } = require("./config/keys");

//routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//body parser middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//CORS rules
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

app.use("/api/users", users);
app.use("/api/post", posts);
app.use("/api/profile", profile);

//error middleware
app.use((error, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    msg: message
  });
});

const port = process.env.PORT || 5000;

//connect to mongodb and only start the server then
mongoose
  .connect(MONGO_URI_LOCAL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB..");
    app.listen(port, () =>
      console.log(`Server Listening on port ${port}`)
    );
  })
  .catch(err => console.log(err.message));
