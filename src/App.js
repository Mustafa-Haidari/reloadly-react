import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import './App.css'
import CredentialsProvider from "./store/CredentialsProvider";
import Login from "./components/Login";


function App() {

  return (
    <div className="App">
      <CredentialsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />}>Register</Route>
            <Route path="/login" element={<Login />}>Login</Route>
          </Routes>
        </Router>
      </CredentialsProvider>
    </div>
  );
}

export default App;
