import React, { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const startdesc = async (email, desc, pos, headache) => {
    const base = "http://127.0.0.1:8080/api/user";
    try {
      const response = await axios.put(`${base}/startdesc`, {
        user: { email },
        desc,
        pos,
        headache,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("StartDesc failed", error);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    const base = "http://127.0.0.1:8080/api/auth";
    try {
      const response = await axios.post(`${base}/login`, { email, password });
      setIsLoggedIn(true);
      setUser(response.data.user); // Assuming the backend returns user data
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (
    name,
    age,
    role,
    startupExperience,
    email,
    password
  ) => {
    const base = "http://127.0.0.1:8080/api/auth";
    try {
      const response = await axios.post(`${base}/signup`, {
        name,
        age,
        email,
        password,
        startupExperience,
        role,
      });
      setIsLoggedIn(true);
      setUser(response.data.user); // Assuming the backend returns user data
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, signup, logout, startdesc }}
    >
      {children}
    </AuthContext.Provider>
  );
};
