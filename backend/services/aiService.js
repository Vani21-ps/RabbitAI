const axios = require("axios");

module.exports = async (data) => {

  const prompt = `
Analyze this sales dataset and create an executive summary.

Dataset:
${JSON.stringify(data)}

Provide:
- Total sales insight
- Top product
- Trend observation
- Business recommendation
`;

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log("Gemini API failed:", error.response?.status);

    // fallback summary so API never crashes
    return `
Sales dataset processed successfully.

Basic insights:
• Dataset uploaded and parsed correctly
• Multiple sales records detected
• Sales performance can be analyzed for trends

Business recommendation:
Review high-performing products and focus marketing on top-selling categories.

(Note: AI service temporarily unavailable, fallback summary generated.)
`;

  }
};