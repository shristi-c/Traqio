import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";

import PublicRoute from "../components/Common/PublicRoute";
import ProtectedRoute from "../components/Common/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Public Routes (Only for users who are NOT logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;