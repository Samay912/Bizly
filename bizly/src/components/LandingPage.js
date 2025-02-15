import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Entrepreneur AI Assistant</h1>
      <p>Your AI-powered startup assistant</p>
      <div style={styles.buttonContainer}>
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={styles.button}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default LandingPage;
