import whisper
import sys
import os

# unicode fix
sys.stdout.reconfigure(encoding="utf-8")

# ---------------- CONFIG ----------------
MODEL_SIZE = "base"

# ---------------- CHECK ARGUMENT ----------------
if len(sys.argv) < 2:
    print("Audio path missing", file=sys.stderr)
    sys.exit(1)

audio_path = sys.argv[1]

if not os.path.exists(audio_path):
    print("Audio file not found", file=sys.stderr)
    sys.exit(1)

# ---------------- LOAD MODEL ----------------
print("Loading Whisper model...", file=sys.stderr)
model = whisper.load_model(MODEL_SIZE)
print("Model loaded", file=sys.stderr)

# ---------------- TRANSCRIBE ----------------
try:
    result = model.transcribe(
        audio_path,
        language=None,
        fp16=False,
        verbose=False
    )

    text = result["text"].strip()

    # only stdout for node.js
    print(text)

except Exception as e:
    print("Whisper Error:", str(e), file=sys.stderr)
    sys.exit(1)