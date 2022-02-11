import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./Pages/Characters";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Card/CardDetails";
import "./Toolbox/General.css"

import { StateProvider } from './context/store';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <StateProvider>
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/:id" element={<CardDetails />} />

          <Route path="/episodes" element={<Episodes />} />
            <Route path="/episodes/:id" element={<CardDetails />} />

            <Route path="/location" element={<Location />} />
            <Route path="/location/:id" element={<CardDetails />} />
          </Routes>
        </StateProvider>
      </div>
    </Router>
  );
}

export default App;