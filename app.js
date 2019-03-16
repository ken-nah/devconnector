const express = require("express");

const app = express();

app.get("/", (req, res) =>
  res.send("<h1>Dev Connector Setup</h1>")
);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server Listening on port ${port}`)
);
