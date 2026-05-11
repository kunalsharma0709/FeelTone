const ttscontroller = require("./tts");
const translateText = require("./translate");

async function controller(req, res) {
  try {
    const {
      text,
      gender,
      emotion,
      language,
      agegroup
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Text missing"
      });
    }

    // translate text
    const translated = await translateText(
      text,
      language
    );

    // generate voice
    const result = await ttscontroller(
      translated,
      gender,
      emotion,
      language,
      agegroup
    );

    const fileName = result.outputPath.split("\\").pop();

    res.json({
      success: true,
      originalText: text,
      translatedText: translated,
      outputpath: `/outputs/${fileName}`,
      voice: result.voice
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports = controller;