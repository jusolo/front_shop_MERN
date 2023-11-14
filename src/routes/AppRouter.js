import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/DashboardPage";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductEditPage from "../pages/ProductEditPage";
import ProductDeletePage from "../pages/ProductDeletePage";
import CartPage from "../pages/CartPage";
import Header from "../components/Header";

import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { state } = useAuth();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/dashboard"
          element={
            state.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/create-product"
          element={
            state.isAuthenticated ? <ProductPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            state.isAuthenticated ? (
              <ProductEditPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/delete-product/:id"
          element={
            state.isAuthenticated ? (
              <ProductDeletePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            state.isAuthenticated ? <CartPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
