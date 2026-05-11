const { emotions, languages } = require("../database/db");
const runTTS = require("../Execution/runtts");
const path = require("path");

async function ttscontroller(text, gender, emotion, language, agegroup) {

    const languagedoc = await languages.findById("languages_map");

    if (!languagedoc) {
        throw new Error("language data not found");
    }

    const languagecode = languagedoc.languages.get(language);

    if (!languagecode) {
        throw new Error("language mapping not found");
    }

    const voice = await emotions.findOne({
        gender: gender.toLowerCase(),
        emotion: emotion.toLowerCase(),
        agegroup: agegroup.toLowerCase()
    });

    if (!voice) {
        throw new Error("voice not found for given parameters");
    }

    const fullPath = path.join(
        "D:/COQUITTS/voices",
        voice.filePath.replace(/^\/+/, "")
    );

    const outputPath = await runTTS(text, fullPath, languagecode);

    return {
        outputPath,
        voice
    };
}

module.exports = ttscontroller;  