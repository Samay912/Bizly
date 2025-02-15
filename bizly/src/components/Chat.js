import { useState } from "react";
import "../GroqChat.css";
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const initialSystemPrompt = "You are a helpful AI assistant. Answer concisely.";

export default function GroqChat() {
  const [messages, setMessages] = useState([
    { role: "system", content: initialSystemPrompt },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: newMessages,
      });

      const reply =
        response.choices?.[0]?.message?.content || "Error: No response";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              {msg.content}
            </div>
          ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="send-button"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
