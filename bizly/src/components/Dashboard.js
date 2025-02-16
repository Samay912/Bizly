import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroqChat from "../components/Chat"; // Import the chat component

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchRoadmap();
    }
  }, [user]);

  const fetchRoadmap = async () => {
    try {
      setRoadmap(user.roadMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setLoading(false);
    }
  };

  const getMostImportantTask = () => {
    if (!roadmap || !roadmap["To-Do List"]) return null;
    let importantTask = null;
    Object.values(roadmap["To-Do List"]).forEach((tasks) => {
      tasks.forEach((task) => {
        if (!importantTask || task.priority === "High") {
          importantTask = task;
        }
      });
    });
    return importantTask;
  };

  const mostImportantTask = getMostImportantTask();

  return (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
      <h1>Welcome, {user?.name}!</h1>
      <h2>Startup Roadmap</h2>

      {loading ? (
        <p>Generating your roadmap...</p>
      ) : (
        <>
          {mostImportantTask && (
            <div
              style={styles.importantTaskBox}
              onClick={() => navigate("/tasks")}
            >
              <h3>{mostImportantTask.task} ({mostImportantTask.priority})</h3>
              <p>{mostImportantTask.description}</p>
            </div>
          )}
        </>
      )}

      {/* Floating Chat Button */}
      <button onClick={() => setIsChatOpen(!isChatOpen)} style={styles.chatButton}>
        {isChatOpen ? "✖" : "💬"}
      </button>

      {/* Chat Box */}
      {isChatOpen && <GroqChat />}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    position: "relative",
  },
  importantTaskBox: {
    backgroundColor: "#FFD700",
    color: "#000",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "10px",
    width: "40%",
    minWidth: "300px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  logoutButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "16px",
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#007bff",
    color: "white",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default Dashboard;
