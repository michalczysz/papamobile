import React from "react";
// import "./styles.css";
import General from "./general-page";
import { Route, Routes, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
