const express = require("express");
const router = express.Router();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are a market analysis AI. Based on the given startup description and user instructions, generate a structured and detailed market analysis in a **human-readable** format.

    **Guidelines for Output Formatting:**
    
    1. **Introduction**: Start with a short executive summary (3-4 sentences).
    2. **Market Overview**: Provide estimated market size, projected growth, and key trends. If data is unavailable, state ‘Data not available’.
    3. **Target Audience**: Clearly define ideal customers and their needs.
    4. **Competitive Analysis**: List key competitors and compare strengths/weaknesses.
    5. **Unique Selling Points (USPs)**: Explain how this startup differentiates itself.
    6. **Revenue Model & Growth Potential**: Describe monetization strategies and scaling potential.
    7. **Challenges & Opportunities**: Mention potential roadblocks and areas of opportunity.
    8. **Conclusion**: End with actionable insights on how to position the startup for success.

    Use **bullet points, paragraphs, and headings** to ensure readability.

    **Startup Description**: {description}

    **User Instruction**: {inst}
  `,
});

router.post("/market", async (req, res) => {
  try {
    const { description, inst } = req.body;

    const prompt = `
      **Startup Description**: ${description}

      **User Instruction**: ${inst}
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text()); // Logging for debugging
    res.json({ result: result.response.text() });
  } catch (error) {
    console.error("Error generating market analysis:", error.message);
    res.status(500).json({ error: "Failed to generate market analysis" });
  }
});

module.exports = router;
