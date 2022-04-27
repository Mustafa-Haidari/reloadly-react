import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Register" element={<Register />}>Register</Route>
        </Routes>
      </Router>
  );
}

export default App;
