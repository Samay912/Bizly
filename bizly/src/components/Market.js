import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Market() {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState(null);

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
      setMarketAnalysis(data.result); // Save the dynamic response
    } catch (error) {
      console.error("Error fetching AI description:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recursive function to render any JSON object dynamically
  const renderJson = (data) => {
    if (typeof data === "object" && data !== null) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{" "}
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>
                      {typeof item === "object"
                        ? renderJson(item)
                        : item.toString()}
                    </li>
                  ))}
                </ul>
              ) : typeof value === "object" ? (
                renderJson(value)
              ) : (
                value.toString()
              )}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p>{data}</p>;
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
            {renderJson(marketAnalysis)}
          </div>
        )}
      </div>
    </div>
  );
}
