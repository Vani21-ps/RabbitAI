const express = require("express");
const multer = require("multer");

const parseService = require("../services/parseService");
const aiService = require("../services/aiService");
// const mailService = require("../services/mailService"); // temporarily disabled

const router = express.Router();

// store uploaded file
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {

    console.log("Upload request received");

    const email = req.body.email;

    // validation
    if (!req.file) {
      return res.status(400).json({
        error: "File missing"
      });
    }

    if (!email) {
      return res.status(400).json({
        error: "Email missing"
      });
    }

    console.log("File path:", req.file.path);

    // STEP 1: Parse CSV
    console.log("Parsing CSV...");
    const parsedData = await parseService(req.file.path);

    // STEP 2: Generate AI summary
    console.log("Generating AI summary...");
    const summary = await aiService(parsedData);

    console.log("Process completed");

    // email disabled for now
    // await mailService(email, summary);

    res.json({
      success: true,
      message: "AI summary generated successfully",
      summary
    });

  } catch (err) {

    console.error("UPLOAD ERROR:", err);

 res.status(200).json({
  message: "File uploaded but AI summary unavailable due to API limit",
  summary: "AI service quota reached. Please try again later."
});

  }
});

module.exports = router;