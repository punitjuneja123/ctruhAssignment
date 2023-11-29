const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// importing route files
const { uploadRouter } = require("./routes/upload.route");

// basic route
app.get("/", (req, res) => {
  res.send("Hello :)");
});

// handling specific routes
app.use(uploadRouter);

// Starting the Express app
app.listen(process.env.PORT, () => {
  console.log(`port is rocking at ${process.env.PORT}`);
});
