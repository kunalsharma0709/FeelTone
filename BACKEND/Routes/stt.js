const { spawn } = require("child_process");

function speechtotext(audioPath) {
  return new Promise((resolve, reject) => {
    if (!audioPath) {
      return reject(new Error("Audio path missing"));
    }

    const process = spawn(
      "D:/COQUITTS/tts_venv/Scripts/python.exe",
      [
        "D:/COQUITTS/stt.py",
        audioPath
      ]
    );

    let finalText = "";
    let errorText = "";

    process.stdout.on("data", (data) => {
      finalText += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorText += data.toString();
      console.error("PYTHON:", data.toString());
    });

    process.on("error", (err) => {
      reject(
        new Error(
          "Failed to start Python process: " + err.message
        )
      );
    });

    process.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            errorText ||
            `STT process failed with code ${code}`
          )
        );
      }

      const cleaned = finalText
        .split("\n")
        .filter(
          (line) =>
            !line
              .toLowerCase()
              .startsWith("detected language")
        )
        .join(" ")
        .trim();

      resolve(cleaned);
    });
  });
}

module.exports = speechtotext;