import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Language from './components/Language/Language';
import CrudComponent from './components/Insert/CrudComponent';
import EditScheduleComponent from "./components/Insert/EditScheduleComponent"


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Language />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/insert" element={<CrudComponent />} />
          <Route path="/list" element={<EditScheduleComponent/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
