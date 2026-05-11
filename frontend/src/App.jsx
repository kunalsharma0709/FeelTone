import React, { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const [recording, setRecording] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const [speechText, setSpeechText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const [form, setForm] = useState({
    gender: "female",
    emotion: "angry",
    language: "Hindi",
    agegroup: "adult"
  });

  // ---------------- RECORD START ----------------
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    const recorder = new MediaRecorder(stream);

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = uploadAudio;

    recorder.start();
    mediaRef.current = recorder;
    setRecording(true);
  };

  // ---------------- RECORD STOP ----------------
  const stopRecording = () => {
    mediaRef.current.stop();
    setRecording(false);
  };

  // ---------------- SEND AUDIO TO /audio ----------------
  const uploadAudio = async () => {
    setLoadingText(true);

    const blob = new Blob(chunksRef.current, {
      type: "audio/webm"
    });

    const fd = new FormData();
    fd.append("audio", blob, "voice.webm");

    const res = await fetch("http://localhost:3000/audio", {
      method: "POST",
      body: fd
    });

    const data = await res.json();

    setSpeechText(data.text);
    setLoadingText(false);
  };

  // ---------------- SEND TO /xoxo ----------------
  const generateVoice = async () => {
  setLoadingAudio(true);

  const res = await fetch("http://localhost:3000/xoxo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      text: speechText,   
      gender: form.gender,
      emotion: form.emotion,
      language: form.language,
      agegroup: form.agegroup
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    setLoadingAudio(false);
    return;
  }

  setTranslatedText(data.translatedText);
  setAudioUrl(data.outputpath);

  setLoadingAudio(false);
};
  return (
    <div className="main">
      <div className="card">
        <h1>AI Voice Translator</h1>
        <p>Speech → Text → Translate → Human Voice</p>

        <div className="record-box">
          {!recording ? (
            <button className="btn start" onClick={startRecording}>
              🎤 Start Recording
            </button>
          ) : (
            <button className="btn stop" onClick={stopRecording}>
              ⏹ Stop Recording
            </button>
          )}
        </div>

        {loadingText && <p className="status">Converting speech to text...</p>}

        {speechText && (
          <div className="box">
            <h3>Detected Speech</h3>
            <p>{speechText}</p>
          </div>
        )}

        <div className="grid">
          <select
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            onChange={(e) =>
              setForm({ ...form, emotion: e.target.value })
            }
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="surprised">Surprised</option>
            <option value="neutral">Neutral</option>

          </select>

          <select
            onChange={(e) =>
              setForm({ ...form, language: e.target.value })
            }
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Polish">Polish</option>
            <option value="Turkish">Turkish</option>
            <option value="Russian">Russian</option>
            <option value="Dutch">Dutch</option>
            <option value="Arabic">Arabic</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Korean">Korean</option>
            <option value="Hindi">Hindi</option>
          </select>

          <select
            onChange={(e) =>
              setForm({ ...form, agegroup: e.target.value })
            }
          >
            <option value="child">Young</option>
            <option value="adult">Adult</option>
            <option value="old">Old</option>
          </select>
        </div>

        <button className="btn generate" onClick={generateVoice} disabled={!speechText || loadingAudio}>
          Generate Voice
        </button>

        {loadingAudio && <p className="status">Generating AI Voice...</p>}

        {translatedText && (
          <div className="box">
            <h3>Translated Text</h3>
            <p>{translatedText}</p>
          </div>
        )}

        {audioUrl && (
          <div className="box">
            <h3>Output Audio</h3>
            <audio controls src={`http://localhost:3000${audioUrl}`} />
          </div>
        )}
      </div>
    </div>
  );
}