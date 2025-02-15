const express = require("express");
const router = express.Router();
require("dotenv").config();

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function removeBackticks(str) {
  return str.replace(/```json|```/g, "").trim();
}

// Route to generate structured startup roadmap
router.post("/generate-roadmap", async (req, res) => {
  try {
    const { startup_description, startup_phase, challenges_list } = req.body;

    let response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are an AI assistant helping solo founders create a structured *Startup Roadmap. Based on the details provided, generate a categorized **To-Do List* (tasks for the future) and a *Done List* (general categories of what may have already been completed).  

        ### *Instructions:*  
        - *Return ONLY JSON format. Do NOT include any preamble, introduction, or explanation.*  
        - Focus on generating a *structured roadmap of tasks that the founder still needs to complete.*  
        - Categorize To-Do tasks under the following three key startup areas:  
          ⿡ *Product & Development*  
          ⿢ *Business & Strategy*  
          ⿣ *Funding & Growth*  
        - Each task in the To-Do List must include:  
          - *task* → A short title for the action item.  
          - *priority* → One of ["High", "Medium", "Low"], based on its importance.  
          - *description* → A short explanation covering:  
            - *Why it is important*  
            - *How the founder can approach it*  
        - The Done List should only contain *general categories* of what may have already been completed (e.g., "Basic market research," "Initial product brainstorming").  
        - Format the output as structured JSON.  
        - Ensure tasks are *actionable, clear, and relevant* to the startup journey.  
        Make sure you start the JSON object with an opening curly brace '{' and end it with a closing curly brace '}'.
        ---  

        ### *Founder's Startup Details:*  
        - *Startup Description:* "${startup_description}"  
        - *Current Phase:* "${startup_phase}"  
        - *Biggest Challenges:* ${JSON.stringify(challenges_list)}  
        `,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

    const roadmap = JSON.parse(response.choices[0]?.message?.content || "{}");

    res.json(roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

module.exports = router;
