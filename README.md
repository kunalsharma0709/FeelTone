# FeelTone 🎙️🌍😊

> Emotion-Aware Multilingual Speech-to-Speech Translation System

FeelTone is an AI-powered multilingual speech-to-speech translation system that converts spoken audio from one language into another while preserving emotional tone in the generated voice output.

The project uses:

- 🎤 Whisper Base Model for Speech-to-Text
- 🌐 Google Translate API for Language Translation
- 😊 Emotion-based Voice Sample Selection
- 🗣️ Coqui TTS for Text-to-Speech Generation
- ⚙️ Node.js + Express backend using Child Processes to execute Python scripts
- ⚛️ React frontend for user interaction

---

# 🚀 Features

- Speech-to-text transcription using Whisper
- Multilingual text translation
- Emotion-aware speech synthesis
- Voice sample categorization based on:
  - Emotion
  - Output Language
- Node.js backend integration with Python scripts
- React frontend interface
- Audio upload and generated audio playback
- End-to-end speech-to-speech pipeline

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| Python | AI Processing |
| Whisper Base Model | Speech Recognition |
| Google Translate API | Text Translation |
| Coqui TTS | Speech Synthesis |
| Child Process | Node ↔ Python Communication |
| FFmpeg | Audio Processing |

---

# 🧠 System Workflow

```text
Input Speech
      ↓
React Frontend
      ↓
Express Backend
      ↓
Child Process Executes Python
      ↓
Whisper Base Model
(Speech → Text)
      ↓
Google Translate API
(Text Translation)
      ↓
Emotion + Language Voice Selection
      ↓
Coqui TTS
(Text → Speech)
      ↓
Generated Audio Output
      ↓
React Frontend Playback
```

---

# 🏗️ Architecture

```text
+------------------+
| React Frontend   |
+------------------+
         │
         ▼
+------------------+
| Express Backend  |
+------------------+
         │
         ▼
+-----------------------------+
| Node.js Child Process       |
| (Executes Python Scripts)   |
+-----------------------------+
         │
         ▼
+------------------+
| Whisper Model    |
+------------------+
         │
         ▼
+----------------------+
| Google Translate API |
+----------------------+
         │
         ▼
+---------------------------+
| Emotion Voice Selector    |
+---------------------------+
         │
         ▼
+------------------+
| Coqui TTS        |
+------------------+
         │
         ▼
Generated Audio Output
```

---

# 📂 Project Structure

```bash
FeelTone/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── database/
│   ├── Execution/
│   ├── routes/
│   ├── uploads/
│   ├── main.js
│   
├── outputs/
│   
├── tts_venv
│ 
├── voices/  
│   
├── stt.py
│   
├── test.py
│
├── README.md
└── requirements.txt
```

---

# How It Works

## 1️. Speech-to-Text

The uploaded speech audio is sent to a Python script from the Express backend using Node.js child processes.

Whisper Base Model converts the audio into text.

```python
model = whisper.load_model("base")
result = model.transcribe(audio_path)
```

---

## 2️. Text Translation

The transcribed text is translated into the target language using Google Translate API.

```python
translated = translator.translate(text, dest='hi')
```

---

## 3️. Emotion-Based Voice Selection

Voice samples are categorized according to:

- Emotion
- Language

Example:

```text
voices/
    happy/

    sad/

```

The system selects the most suitable voice sample before synthesis.

---

## 4. Text-to-Speech Generation

The translated text and selected voice sample are passed to Coqui TTS to generate final speech output.

```python
tts.tts_to_file(
    text=translated_text,
    speaker_wav=voice_sample,
    file_path=output_path
)
```

---

#  Node.js Child Process Integration

The Express backend communicates with Python scripts using child processes.

Example:

```javascript
const { exec } = require("child_process");

exec("python whisper_transcribe.py", (error, stdout, stderr) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(stdout);
});
```

This allows JavaScript to handle:

- API requests
- File uploads
- Frontend communication

while Python handles:

- AI processing
- Whisper inference
- Translation
- Coqui TTS generation

---

# Frontend

The frontend is built using React.js.

Features:

- Upload speech audio
- Select target language
- Select emotion
- Generate translated speech
- Play generated audio

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/FeelTone.git

cd FeelTone
```

---

# Backend Setup

## Install Node.js Dependencies

```bash
cd backend

npm install
```

---

# Python Environment Setup

## Create Virtual Environment

```bash
python -m venv tts_venv
```

### Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

---

# Running the Project

## Start Backend

```bash
cd backend

node main.js
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

---

# Node.js Dependencies

```bash
npm install express cors multer child_process dotenv
```

---

# Example Flow

## Input

- User speaks in English with happy emotion

## Processing

- Whisper converts speech → text
- Google Translate converts English → Hindi
- voice sample selected
- Coqui TTS generates Hindi speech

## Output

- Emotion-aware audio generated successfully

---
