import React, { FC, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Link } from "react-router-dom";
import Header from "./app/Organisms/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <div className="App-logo">press to start</div>
        <Link to="/About">About</Link>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;
