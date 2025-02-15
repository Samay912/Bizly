require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
