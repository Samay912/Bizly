import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../images/landingpage.png"; // Use the latest uploaded image

const LandingPage = () => {
  useEffect(() => {
    document.querySelectorAll("button").forEach((btn) => {
      btn.onmouseover = () => (btn.style.backgroundColor = "#e69500");
      btn.onmouseout = () => (btn.style.backgroundColor = "orange");
    });
  }, []);

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${background})` }}>
      <div style={styles.overlay}></div> {/* Dark Overlay for Readability */}

      {/* Navigation Buttons */}
      <div style={styles.navButtons}>
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={styles.button}>Sign Up</button>
        </Link>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Entrepreneur AI Assistant</h1>
        <p style={styles.subheading}>Your AI-powered startup assistant</p>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for contrast
  },
  navButtons: {
    position: "absolute",
    top: "20px",
    right: "30px",
    display: "flex",
    gap: "15px",
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    zIndex: 2,
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "15px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
  },
  subheading: {
    fontSize: "20px",
    fontWeight: "500",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default LandingPage;
