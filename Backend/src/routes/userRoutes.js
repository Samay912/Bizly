const express = require("express");
const User = require("../models/User");

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
    const email = user.email;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { startupPosition: pos, startupDescription: desc, headaches: headache },
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
