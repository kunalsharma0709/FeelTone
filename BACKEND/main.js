const express = require("express");
const cors = require("cors")
const multer = require("multer");
const path = require("path");

const app =express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/outputs",
  express.static("D:/COQUITTS/outputs")
);

const audioProcess =require("./Routes/audioProcess")
const controller =require("./Routes/controller");
const speechtotext =require("./Routes/stt")

const upload = multer({
  dest: "uploads/",
});

app.post("/audio", upload.single("audio"),audioProcess);

app.post("/xoxo",controller);

app.get("/",(req,res)=>{
    return res.json({
        msg:"server running"
    })
})

// app.post("/comma", async (req, res) => {
//     try {
//         const text = await speechtotext();
//         res.json({ text });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

app.listen(3000)