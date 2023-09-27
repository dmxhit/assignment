import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Routes instead of Switch
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import socketIO from "socket.io-client";
import ChatPage from "./components/chat";
const socket = socketIO.connect("http://localhost:5000");
function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Home socket={socket} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
