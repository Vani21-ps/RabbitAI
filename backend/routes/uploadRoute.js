const express = require("express")
const multer = require("multer")

const parseService = require("../services/parseService")
const aiService = require("../services/aiService")
const mailService = require("../services/mailService")

const router = express.Router()

const upload = multer({ dest: "uploads/" })
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

  const email = req.body.email

  if (!req.file) {
   return res.status(400).json({ error: "File missing" })
  }

  const parsedData = await parseService(req.file.path)

  const summary = await aiService(parsedData)

  await mailService(email, summary)

  res.json({
   message: "AI summary generated and email sent",
   summary
  })

 } catch (err) {

  console.error(err)

  res.status(500).json({
   error: "Processing failed"
  })
 }

})

module.exports = router