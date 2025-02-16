import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const StartDesc = () => {
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState("");
  const [headache, setHeadache] = useState([]);

  const navigate = useNavigate();
  const { startdesc, user } = useContext(AuthContext);

  const handleStartDesc = async (e) => {
    e.preventDefault();
    try {
      await startdesc(user.email, desc, pos, headache);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setHeadache((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAiUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/startup/generate-desc",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: desc }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI-generated description");
      }

      const data = await response.json();
      setDesc(data.description);
      alert("AI description updated successfully");
    } catch (error) {
      console.error("Error fetching AI description:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Describe Your Startup</h2>
        <form onSubmit={handleStartDesc} style={styles.form}>
          <textarea
            placeholder="Describe your startup"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAiUpdate} className="ai-button" style={styles.aiButton}>
            Update with AI ✨
          </button>

          <h3 style={styles.label}>Where's your startup journey at?</h3>
          <select
            value={pos}
            onChange={(e) => setPos(e.target.value)}
            style={styles.select}
          >
            <option value="" disabled>Select your position</option>
            <option value="Ideation & Validation">Ideation & Validation</option>
            <option value="Execution & Growth">Execution & Growth</option>
            <option value="Market & Scaling">Market & Scaling</option>
          </select>

          <h3 style={styles.label}>What's your biggest headache right now?</h3>
          <div style={styles.checkboxContainer}>
            {["Finding Investors", "Building a Team", "Market Research", "Launching MVP", "Getting First Customers"].map((item) => (
              <label key={item} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleCheckboxChange}
                  style={styles.checkbox}
                />
                {item}
              </label>
            ))}
          </div>

          <button type="submit" className="submit-button" style={styles.button}>
            Submit 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "radial-gradient(circle, #001f3f, #000814)",
  },
  card: {
    background: "#002b55",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 0px 20px #00aaff",
    textAlign: "center",
    width: "400px",
  },
  title: {
    color: "#00aaff",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100px",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    background: "white",
    color: "black",
    outline: "none",
    boxSizing: "border-box",
    resize: "none",
  },
  aiButton: {
    background: "#00aaff",
    color: "white",
    fontSize: "16px",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
    marginBottom: "15px",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    background: "white",
    outline: "none",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    marginTop: "10px",
  },
  checkboxLabel: {
    color: "white",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "5px 0",
  },
  checkbox: {
    width: "16px",
    height: "16px",
  },
  button: {
    background: "orange",
    color: "white",
    fontSize: "18px",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
    marginTop: "15px",
  },
  label: {
    color: "#00aaff",
    textAlign: "left",
    width: "100%",
    fontSize: "16px",
    marginTop: "10px",
  },
};

// Add hover styles dynamically
const hoverEffect = `
  .ai-button:hover {
    background: #0088cc !important;
  }
  .submit-button:hover {
    background: darkorange !important;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = hoverEffect;
document.head.appendChild(styleSheet);

export default StartDesc;
