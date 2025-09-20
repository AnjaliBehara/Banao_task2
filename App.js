import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Post from "./components/Post";
import PostItem from './components/PostItem'; // correct path
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/PostItem" element={<PostItem />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
