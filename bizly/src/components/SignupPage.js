import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [role, setRole] = useState("");
  const [startupExperience, setStartupExperience] = useState(""); // New state for dropdown

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, age, role, startupExperience, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
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
        <h3>Role</h3>
        <input
          type="text"
          placeholder="Developer, Business Strategist, Designer, etc"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        {/* Startup Experience Dropdown */}
        <h3>Startup Experience</h3>
        <select
          value={startupExperience}
          onChange={(e) => setStartupExperience(e.target.value)}
          style={styles.select}
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
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  form: {
    display: "inline-block",
    textAlign: "left",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "250px",
  },
  select: {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "270px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SignupPage;
