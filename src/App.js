import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./components/utility/Layout";
import RequireAuth from './components/utility/RequireAuth';

import AdminLogin from "./pages/admin/admin_login/Login";
import AdminDashboard from "./pages/admin/admin_dashboard/Dashboard";
import AdminServices from "./pages/admin/admin_services/Services";
import AdminProjects from "./pages/admin/admin_projects/Projects";
import NoRoutePage from "./components/utility/404";
import './pages/admin/admin.css';

const Home = () => <h1>Home (Public)</h1>;


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* admin panel */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/" element={<AdminLogin />} />

        <Route
          path="admin/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </RequireAuth>
          }
          />
        <Route
          path="admin/services"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AdminServices />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="admin/projects"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AdminProjects />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* Not found router */}
        <Route
          path="*"
          element={
            <NoRoutePage/>
          }
        />
      </Routes>
  );
}
export default App;