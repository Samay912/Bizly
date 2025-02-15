import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const StartDesc = () => {
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState("");
  const [headache, setHeadache] = useState([]);

  const navigate = useNavigate();
  const { startdesc, user } = useContext(AuthContext);

  const handleStartDesc = async (e) => {
    e.preventDefault();
    try {
      await startdesc(user.email, desc, pos, headache);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setHeadache((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
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
        <h3>Where's your startup journey at ?</h3>
        <select
          value={pos}
          onChange={(e) => setPos(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Select your position
          </option>
          <option value="Ideation & Validation">Ideation & Validation</option>
          <option value="Execution & Growth">Execution & Growth</option>
          <option value="Market & Scaling">Market & Scaling</option>
        </select>
        <h3>What's your biggest headache right now?</h3>
        <div style={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              value="Finding Investors"
              onChange={handleCheckboxChange}
            />
            Finding Investors
          </label>
          <label>
            <input
              type="checkbox"
              value="Building a Team"
              onChange={handleCheckboxChange}
            />
            Building a Team
          </label>
          <label>
            <input
              type="checkbox"
              value="Market Research"
              onChange={handleCheckboxChange}
            />
            Market Research
          </label>
          <label>
            <input
              type="checkbox"
              value="Launching MVP"
              onChange={handleCheckboxChange}
            />
            Launching MVP
          </label>
          <label>
            <input
              type="checkbox"
              value="Getting First Customers"
              onChange={handleCheckboxChange}
            />
            Getting First Customers
          </label>
        </div>
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
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default StartDesc;
