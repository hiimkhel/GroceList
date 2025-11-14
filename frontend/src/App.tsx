  // import { useState } from 'react'
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import LandingPage from "./pages/LandingPage";
  import MarketPlacePage from "./pages/MarketplacePage";
  import "./App.css";
  import "./index.css";
  import LoginPage from "./pages/LoginPage";
  import ShoppingCartPage from "./pages/ShoppingCartPage";
  import ProfilePage from "./pages/ProfilePage";
  import GroceryListPage from "./pages/GroceryListPage";
  import AddNewGroceryListPage from "./pages/AddNewGroceryListPage";
import PrivateRoutes from "./components/PrivateRoutes";
import ListPage from "./components/ListPage";
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        

          {/* All protected routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/marketplace" element={<MarketPlacePage />} />
            <Route path="/lists" element={<GroceryListPage />} /> 
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/user" element={<ProfilePage />} />

            {/* Sub Pages */}
            <Route path="/lists/add" element={<AddNewGroceryListPage />}/>
            <Route path="/lists/:listId" element={<ListPage />} />
          </Route>
       </Routes>
        
      </BrowserRouter>
    );
  }

  export default App;
