import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Products from "./pages/Products";
import LoginComponent from "./components/LoginComponent";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Catefories";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/user" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:slug" element={<Products />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
