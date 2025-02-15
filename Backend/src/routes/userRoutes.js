const express = require("express");
const User = require("../models/User");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const router = express.Router();

// Get all users (protected route)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/startdesc", async (req, res) => {
  try {
    const { user, desc, pos, headache } = req.body; // key1 and key2 are strings, key3 is a list

    if (!user || !desc || !pos || !Array.isArray(headache)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

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
        - *Startup Description:* "${desc}"  
        - *Current Phase:* "${pos}"  
        - *Biggest Challenges:* ${JSON.stringify(headache)}  
        `,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

    const roadmap = JSON.parse(response.choices[0]?.message?.content || "{}");

    const email = user.email;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        startupPosition: pos,
        startupDescription: desc,
        headaches: headache,
        roadMap: roadmap,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Startup description added", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
