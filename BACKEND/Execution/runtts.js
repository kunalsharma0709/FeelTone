const { spawn } = require("child_process");

const runTTS = (text, voicePath, language) => {
    return new Promise((resolve, reject) => {
        const outputPath = `D:/COQUITTS/outputs/output_${Date.now()}.wav`;

        

        const py = spawn("D:/COQUITTS/tts_venv/Scripts/python.exe", [
            "D:/COQUITTS/test.py",
            text,
            voicePath,
            language,
            outputPath
        ], {
            env: {
                ...process.env,
                PYTHONIOENCODING: "utf-8"
            }
        });
        
        py.stdout.on("data", (data) => {
            console.log("Python TTS:", data.toString());
        });

        py.stderr.on("data", (data) => {
            console.warn("Python TTS warning:", data.toString());
        });

        py.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error("TTS script failed with code " + code));
            }
            resolve(outputPath);
        });

        py.on("error", (err) => {
            reject(new Error("Failed to start TTS process: " + err.message));
        });
    });
};

module.exports = runTTS;
