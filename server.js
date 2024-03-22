const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app;

const PORT = process.env.PORT || 4001;
if (!process.env.IS_TEST_ENV) {
  app.use(morgan("short"));
}

// middleware for handling CORS requests from index.html
app.use(cors());

// middware for parsing request bodies here:
app.use(bodyParser.json());

// Mounting apiRouter at the '/api' path.
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
