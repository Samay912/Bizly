import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./AuthContext";
import StartDesc from "./components/StartDesc";
import GroqChat from "./components/Chat";
import TasksPage from "./components/TasksPage"; // Ensure this file exists

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/startdesc"
          element={isLoggedIn ? <StartDesc /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isLoggedIn ? <GroqChat /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TasksPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
