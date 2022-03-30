import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages
import Home from "./components/Home/Home";
import Footer from "./components/Foot/Foot";
import Navbar from "./components/Nav/Nav";
import Game from "./components/Game/Game";
import News from "./components/News/News";
import Suggestions from "./components/Suggestions/Suggestions";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Store from "./components/Store/Store";

function App({ list }) {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/news" element={<News />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
