const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

async function finalAudio(req, res) {
  try {
    const { filename } = req.params;

    // basic security
    if (filename.includes("..")) {
      return res.status(400).json({
        error: "Invalid filename",
      });
    }

    const filePath = path.join(
      "D:/COQUITTS/outputs",
      filename
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: "Audio file not found",
      });
    }

    res.sendFile(path.resolve(filePath));

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = finalAudio;