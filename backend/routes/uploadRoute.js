const express = require("express");
const multer = require("multer");

const parseService = require("../services/parseService");
const aiService = require("../services/aiService");
const mailService = require("../services/mailService");

const router = express.Router();

// store uploaded file
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload sales data and generate AI summary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Summary generated and email sent
 */

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

    // STEP 3: Send email
    console.log("Sending email...");
    await mailService(email, summary);

    console.log("Process completed");

    res.json({
      success: true,
      message: "AI summary generated and email sent",
      summary
    });

  } catch (err) {

    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      error: err.message || "Processing failed"
    });

  }
});

module.exports = router;