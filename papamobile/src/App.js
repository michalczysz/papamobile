import React from 'react'
import General from "./components/pages/general/general-page";
import Settings from "./components/pages/settings/settings-page";
import About from "./components/pages/about/about-page"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<General />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;