const express = require("express");
const router = express.Router();
require("dotenv").config();

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate-desc", async (req, res) => {
  try {
    const { description } = req.body;

    let response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Rewrite the following startup description to make it more compelling, clear, and engaging. Ensure the tone is professional yet approachable, highlighting innovation.
          ### Instructions:  
          - Return ONLY JSON format. Do NOT include any preamble, introduction, or explanation.
          Requirements:
          1. Make it concise yet impactful.
          2. Highlight the startup's unique value proposition.
          3. Ensure clarity and readability.
          4. Keep the tone aligned with a professional and modern audience.
          5. Dont change the meaning of the given description.
          Make sure you start the JSON object with an opening curly brace '{' and end it with a closing curly brace '}'
          give output in a single paragraph.
          use description as the key.
          ---
          Original Description:
          ${description}
          `,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

    const descp = JSON.parse(response.choices[0]?.message?.content || "{}");
    console.log(descp);
    res.json({ description: descp.description });
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

module.exports = router;