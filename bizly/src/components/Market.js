import React, { useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./market.css"; // Import the CSS file

export default function Market() {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState(null);
  const navigate = useNavigate();

  const handleAiUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8080/api/market/market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: user?.startupDescription || "",
          inst: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI-generated description");
      }

      const data = await response.json();
      console.log("Market Analysis Response:", data);
      setMarketAnalysis(data.result);
    } catch (error) {
      console.error("Error fetching AI description:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      alert("You need to be logged in to access the dashboard.");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>Market Analysis Chat</h2>
        <p>Chat with the AI to generate market analysis</p>
        <form onSubmit={handleAiUpdate}>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" disabled={loading} className="send-button">
              {loading ? "..." : "Send"}
            </button>
          </div>
        </form>

        {marketAnalysis && (
          <div className="output-container">
            <h3>Market Analysis Report</h3>
            <ReactMarkdown>{marketAnalysis}</ReactMarkdown>
          </div>
        )}

        <button onClick={goToDashboard} className="dashboard-button">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
