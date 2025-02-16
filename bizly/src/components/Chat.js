import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function GroqChat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([{ role: "system", content: `You are a helpful AI assistant. Answer concisely ${user.name}.` }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

      const reply = response.choices?.[0]?.message?.content || "Error: No response";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          .chat-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #007bff;
            color: white;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .chat-button:hover {
            background: #0056b3;
            transform: scale(1.1);
          }

          .chat-container {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 350px;
            max-width: 90%;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            transform: translateY(20px);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          .chat-container.open {
            transform: translateY(0);
            opacity: 1;
          }

          .chat-box {
            height: 300px;
            overflow-y: auto;
            padding: 10px;
            background: #f9f9f9;
            display: flex;
            flex-direction: column;
          }

          .message {
            padding: 10px 12px;
            margin: 5px 0;
            border-radius: 10px;
            max-width: 75%;
            word-wrap: break-word;
            font-size: 14px;
          }

          .user-message {
            background: #007bff;
            color: white;
            align-self: flex-end;
            text-align: right;
            border-top-right-radius: 0;
          }

          .assistant-message {
            background: #e0e0e0;
            color: black;
            align-self: flex-start;
            border-top-left-radius: 0;
          }

          .input-container {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ccc;
            background: white;
          }

          .chat-input {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
            font-size: 14px;
          }

          .send-button {
            margin-left: 5px;
            padding: 8px 12px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;
            transition: background 0.3s ease;
          }

          .send-button:hover {
            background: #0056b3;
          }

          .send-button:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        `}
      </style>

      {/* Floating Chat Button */}
      <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat Box */}
      <div className={`chat-container ${isOpen ? "open" : ""}`}>
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
          <button onClick={sendMessage} disabled={loading} className="send-button">
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}
