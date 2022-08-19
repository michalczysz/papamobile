import React from 'react'
import General from "./components/pages/general/general-page";
import Detail from './components/pages/detail/detail-page';
import Settings from "./components/pages/settings/settings-page";
import About from "./components/pages/about/about-page"
import TopBar from './components/TopBar/topbar-page';
// import Test from "./components/pages/test/test-page"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{minWidth: '480px',}}>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/">
            <Route index element={<General/>} />
            <Route path="detail" element={<Detail />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;