// SiteRoute.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Site from "../components/Site";
import Home from "../page/Home/Home";
import ProductOverview from "../page/ProductOverview/ProductOverview";
import CategoryPage from "../page/CategoryPage/CategoryPage";
import SearchPage from "../page/SearchPage/SearchPage";
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/Register";
import { AuthProvider } from "../context/AuthContext";
 // Example Dashboard component import
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../components/cart/Cart";
import User from "../components/User/User";
import UserDetail from "../components/User/UserDetail";
import Brand from "../page/brand/Brand";
import UserOrder from "../components/User/UserOrder";

const SiteRoute = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Site>
              <Home />
            </Site>
          }
        />

        <Route
          path="/login"
          element={
            <Site>
              <Login />
            </Site>
          }
        />
        
        <Route
          path="/register"
          element={
            <Site>
              <Register />
            </Site>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <Site>
              <ProductOverview />
            </Site>
          }
        />

        <Route
          path="/product/"
          element={
            <Site>
              <ProductOverview />
            </Site>
          }
        />

        <Route
          path="/category/:category"
          element={
            <Site>
              <CategoryPage />
            </Site>
          }
        />
         <Route
          path="/brand/:brand"
          element={
            <Site>
              <Brand />
            </Site>
          }
        />

        <Route
          path="/search"
          element={
            <Site>
              <SearchPage />
            </Site>
          }
        />

        {/* Protected Route example
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Site>
            <Dashboard />
          </Site>
        </ProtectedRoute>
        } /> */}

        {/* Protected Route example */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Site>
            <User activetab={0}>
              <UserDetail />
            </User>
          </Site>
        </ProtectedRoute>
        } />
          <Route path="/dashboard/order" element={
          <ProtectedRoute>
          <Site>
            <User activetab={2}>
              <UserOrder />
            </User>
          </Site>
        </ProtectedRoute>
        } />
        
          {/* Protected Route example */}
          <Route path="/cart" element={
          <ProtectedRoute>
          <Site>
            <Cart />
          </Site>
        </ProtectedRoute>
        } />

        </Routes>
    </AuthProvider>
  );
};

export default SiteRoute;
