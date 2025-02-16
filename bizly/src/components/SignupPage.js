import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [role, setRole] = useState("");
  const [startupExperience, setStartupExperience] = useState("");

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, age, role, startupExperience, email, password);
      navigate("/startdesc");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
          />

          {/* <h3 style={styles.label}>Role</h3> */}
          <input
            type="text"
            placeholder="Role : Developer, Business Strategist, Designer, etc"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          />

          {/* <h3 style={styles.label}>Startup Experience</h3> */}
          <select
            value={startupExperience}
            onChange={(e) => setStartupExperience(e.target.value)}
            style={styles.input} // Dropdown now has the same styling as input fields
          >
            <option value="" disabled>
              Select your experience
            </option>
            <option value="Newbie">Newbie</option>
            <option value="Been here before">Been here before</option>
            <option value="Veteran Hustler">Veteran Hustler</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "radial-gradient(circle, #001f3f, #000814)",
  },
  signupBox: {
    background: "#002b55",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 0px 20px #00aaff",
    textAlign: "center",
    width: "400px",
  },
  title: {
    color: "#00aaff",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%", // Ensures all inputs and select have the same width
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    background: "white",
    color: "black",
    outline: "none",
    boxSizing: "border-box", // Fixes width inconsistency
  },
  button: {
    background: "orange",
    color: "white",
    fontSize: "18px",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
  },
  label: {
    color: "#00aaff",
    textAlign: "left",
    width: "100%",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default SignupPage;
