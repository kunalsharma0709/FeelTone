const fs = require("fs");
const speechtotext = require("./stt");

async function audioProcess(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Audio file missing"
      });
    }

    const audioPath = req.file.path;

    // convert speech to text using whisper
    const text = await speechtotext(audioPath);

    // delete uploaded temp file
    fs.unlinkSync(audioPath);

    res.json({
      success: true,
      text
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports = audioProcess;