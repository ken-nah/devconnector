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

app.get("/", (req, res) =>
  res.send("<h1>Dev Connector Setup</h1>")
);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

//connect to mongodb and only spin the server when connected
mongoose
  .connect(MONGO_URI_LOCAL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB..");
    app.listen(port, () =>
      console.log(`Server Listening on port ${port}`)
    );
  })
  .catch(err => console.log(err.message));
