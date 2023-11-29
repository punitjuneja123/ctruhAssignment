const express = require("express");
const multer = require("multer");
const fs = require("fs");

const uploadRouter = express.Router();

// Configuring multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads",
  }),
});

// Handling POST request to upload file
uploadRouter.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  // writable stream to save the file
  const stream = fs.createWriteStream(`uploads/${file.originalname}`);

  // Piping the file data to the stream to save it
  fs.createReadStream(file.path).pipe(stream);

  console.log("uploading....");

  // Handling errors during file writing
  stream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Something went wrong");
  });

  // Sending a success response after the file is saved
  stream.on("finish", () => {
    res.status(201).send("File uploaded successfully");
  });
});

module.exports = { uploadRouter };
