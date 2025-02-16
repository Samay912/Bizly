const express = require("express");
const router = express.Router();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are market analysis AI. Based on the given description of a startup, generate a market analysis. No preable, just the analysis. Make sure you start the JSON object with an opening curly brace '{' and end it with a closing curly brace '}'",
});
function stripJsonMarkers(input) {
  return input.replace(/^```json\s*/, "").replace(/\s*```$/, "");
}
router.post("/market", async (req, res) => {
  try {
    const { description, inst } = req.body;

    const prompt =
      "Startup Description: " + description + "User Instruction" + inst;

    const result = await model.generateContent(prompt);
    const cleanedJsonString = stripJsonMarkers(result.response.text());
    console.log(cleanedJsonString);
    res.json({ result: cleanedJsonString });
  } catch (error) {
    console.error("Error generating market analysis:", error.message);
    res.status(500).json({ error: "Failed to generate market analysis" });
  }
});

module.exports = router;
