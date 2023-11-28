const express = require("express");
const multer = require("multer");
const fs = require("fs");

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads",
  }),
});

uploadRouter.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const stream = fs.createWriteStream(`uploads/${file.originalname}`);

  fs.createReadStream(file.path).pipe(stream);

  console.log("uploading....");

  stream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Something went wrong");
  });

  stream.on("finish", () => {
    res.status(201).send("File uploaded successfully");
  });
});

module.exports = { uploadRouter };



