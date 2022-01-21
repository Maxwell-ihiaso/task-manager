import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";

// compomemt
import Task from "./Task";

function App() {
  return (
    <Router>
      <header className="header">
        <h1>task manager</h1>
      </header>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/list/:id" element={<List />} />
      </Routes>
      <Task />
    </Router>
  );
}

export default App;
