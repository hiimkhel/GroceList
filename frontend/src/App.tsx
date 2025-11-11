// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MarketPlacePage from "./pages/MarketplacePage";
import "./App.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/marketplace" element={<MarketPlacePage />} />
        {/* <Route path="/lists" element={<GroceryListPage />} /> */}
        <Route path="/cart" element={<ShoppingCartPage />} />
        {/* <Route path="/user" element={<ProfilePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
