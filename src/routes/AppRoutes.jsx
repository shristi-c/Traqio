import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Applications from "../pages/Application/Applications";
import NewApplication from "../pages/Application/NewApplication";
import Analytics from "../pages/Analytics/Analytics";
import Interviews from "../pages/Interviews/Interviews";
import NewInterview from "../pages/Interviews/NewInterview";
import EditInterview from "../pages/Interviews/EditInterview";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import PublicRoute from "../components/Common/PublicRoute";
import ProtectedRoute from "../components/Common/ProtectedRoute";
import ApplicationDetails from "../pages/Application/ApplicationDetails";
import EditApplication from "../pages/Application/EditApplication";


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
          <Route
                path="applications"
               element={<Applications />}
               />
   <Route
    path="applications/new"
    element={<NewApplication />}
/>
<Route
  path="applications/:id"
  element={<ApplicationDetails />}
/>

                           <Route
  path="applications/:id/edit"
  element={<EditApplication />}
/>
      
<Route
  path="analytics"
  element={<Analytics />}
/>

<Route
  path="interviews"
  element={<Interviews />}
/>
<Route
  path="interviews/new"
  element={<NewInterview />}
/>

<Route
  path="interviews/:id/edit"
  element={<EditInterview />}
/>

<Route
  path="profile"
  element={<Profile />}
/>

<Route
  path="settings"
  element={<Settings />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;