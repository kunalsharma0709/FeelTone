const translate = require("google-translate-api-x");

async function translateText(text, targetLang) {
    const result = await translate(text, { to: targetLang });
    return result.text;
}

module.exports = translateText;