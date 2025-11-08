// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import './App.css';
import './index.css';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/auth/login" element={<LoginPage>} /> */}
        {/* <Route path="/auth/register" element={<RegisterPage/>} /> */}
        {/* <Route path="/marketplace" element={<Marketplace />} /> */}
        {/* <Route path="/lists" element={<GroceryListPage />} /> */}
        {/* <Route path="/user" element={<CartPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
