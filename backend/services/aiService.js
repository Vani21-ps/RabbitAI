const axios = require("axios")

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
`

 const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
  {
   contents: [
    {
     parts: [{ text: prompt }]
    }
   ]
  }
 )

 return response.data.candidates[0].content.parts[0].text
}