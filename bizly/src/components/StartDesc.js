import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const StartDesc = () => {
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState("");
  const [headache, setHeadache] = useState("");

  const navigate = useNavigate();
  const { startdesc } = useContext(AuthContext);

  const handleStartDesc = async (e) => {
    e.preventDefault();
    try {
      await startdesc(desc);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Describe your startup</h2>
      <form onSubmit={handleStartDesc} style={styles.form}>
        <textarea
          type="text"
          placeholder="Describe your startup"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={styles.input}
        />
        <h3>Startup Position</h3>
        <select
          value={pos}
          onChange={(e) => setPos(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Select your position
          </option>
          <option value="Newbie">New</option>
          <option value="Been here before">Old</option>
          <option value="Veteran Hustler">Very Old</option>
        </select>
        <textarea
          type="text"
          placeholder="What is your headache right now?"
          value={headache}
          onChange={(e) => setHeadache(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit
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
