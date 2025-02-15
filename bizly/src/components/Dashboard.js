import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChat = async (e) => {
    e.preventDefault();

    navigate("/chat");
  };
  useEffect(() => {
    if (user) {
      fetchRoadmap();
    }
  }, [user]);

  const fetchRoadmap = async () => {
    try {
      // const response = await axios.post(
      //   "http://127.0.0.1:8080/api/startup/generate-roadmap",
      //   {
      //     startup_description: user.startupDescription,
      //     startup_phase: user.startupPosition,
      //     challenges_list: user.headaches,
      //   }
      // );

      setRoadmap(user.roadMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome, {user?.name}!</h1>
      <h2>Startup Roadmap</h2>

      {loading ? (
        <p>Generating your roadmap...</p>
      ) : (
        <>
          <h3>To-Do List</h3>
          {roadmap?.["To-Do List"] ? (
            Object.entries(roadmap["To-Do List"]).map(([category, tasks]) => (
              <div key={category} style={styles.category}>
                <h4>{category}</h4>
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index}>
                      <strong>
                        {task.task} ({task.priority})
                      </strong>
                      : {task.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No tasks generated.</p>
          )}

          <h3>Done List</h3>
          <ul>
            {roadmap?.["Done List"]?.map((item, index) => (
              <li key={index}>{item}</li>
            )) || <p>No completed tasks.</p>}
          </ul>
        </>
      )}
      <button onClick={logout} style={styles.button}>
        Logout
      </button>
      <button onClick={handleChat} style={styles.button}>
        Chat
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  category: {
    textAlign: "left",
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
    fontSize: "20px",
    padding: "10px",
    cursor: "pointer",
    size: "20px",
  },
};

export default Dashboard;
