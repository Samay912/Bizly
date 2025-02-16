import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; // Import Recharts components
import GroqChat from "../components/Chat"; // Import chat component

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

  // Define startup phases in order
  const startupPhases = ["Idea", "MVP", "Launch", "Growth", "Scaling"];
  const currentPhaseIndex = startupPhases.indexOf(user?.startupPosition);
  const progressData = startupPhases.map((phase, index) => ({
    phase,
    progress: index <= currentPhaseIndex ? (index + 1) * 20 : 0, // Progress in percentage
  }));

  return (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
      <h1>Welcome, {user?.name}!</h1>

      {/* Two separate boxes for startup details */}
      <div style={styles.detailsContainer}>
        <div style={styles.detailBox}>
          <h3>Startup Description</h3>
          <p>{user?.startupDescription || "Not available (Check API response)"}</p>
        </div>

        <div style={styles.detailBox}>
          <h3>Current Phase</h3>
          <p>{user?.startupPosition || "Not available (Check API response)"}</p>
        </div>
      </div>

      {/* Market Analysis Button */}
      <button onClick={() => navigate("/market")} style={styles.marketButton}>
        Market Analysis
      </button>

      {/* Progress Graph */}
      <div style={styles.progressContainer}>
        <h3>Startup Progress</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={progressData}>
            <XAxis dataKey="phase" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="progress" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
  detailsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  detailBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    width: "30%",
    minWidth: "250px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  progressContainer: {
    marginTop: "20px",
    width: "50%",
    minWidth: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  importantTaskBox: {
    background: "linear-gradient(135deg, #FFB703, #FF8800)",
    color: "#000",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "10px",
    width: "40%",
    minWidth: "300px",
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
  },
  importantTaskBoxHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
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
  marketButton: {
    marginTop: "20px",
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background 0.3s ease, transform 0.2s",
  },
  marketButtonHover: {
    backgroundColor: "#218838",
    transform: "scale(1.05)",
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
