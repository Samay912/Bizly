import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const { user } = useContext(AuthContext);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  const toggleExpand = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/dashboard")} style={styles.backButton}>Back to Dashboard</button>
      <h1>Task Overview</h1>

      {/* To-Do List */}
      <div style={styles.box}>
        <h3 onClick={() => toggleExpand("ToDo")} style={styles.toggleHeader}>
          {expandedSections["ToDo"] ? "▼" : "▶"} To-Do List
        </h3>
        {expandedSections["ToDo"] && user?.roadMap?.["To-Do List"] && Object.keys(user.roadMap["To-Do List"]).length > 0 && (
          Object.entries(user.roadMap["To-Do List"]).map(([category, tasks]) => (
            <div key={category}>
              <h4>{category}</h4>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}><strong>{task.task} ({task.priority})</strong>: {task.description}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Done List */}
      <div style={styles.box}>
        <h3 onClick={() => toggleExpand("Done")} style={styles.toggleHeader}>
          {expandedSections["Done"] ? "▼" : "▶"} Done List
        </h3>
        {expandedSections["Done"] && user?.roadMap?.["Done List"] && user.roadMap["Done List"].length > 0 && (
          <ul>
            {user.roadMap["Done List"].map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  box: {
    textAlign: "left",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    padding: "15px",
    margin: "10px auto",
    borderRadius: "10px",
    width: "60%",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
  },
  toggleHeader: {
    cursor: "pointer",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "16px",
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default TasksPage;
