import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email || "User"}!</p>
      <p>Welcome to your AI-powered startup assistant!</p>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Dashboard;
