import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter basename="/CPS_Tester">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
