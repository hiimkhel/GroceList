// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/marketplace" element={<MarketplacePage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
