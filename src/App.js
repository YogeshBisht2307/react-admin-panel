import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./components/utility/Layout";
import RequireAuth from './components/utility/RequireAuth';

import AdminLogin from "./pages/admin/admin_login/Login";
import AdminDashboard from "./pages/admin/admin_dashboard/Dashboard";
import AdminServices from "./pages/admin/admin_services/Services";
import NoRoutePage from "./components/utility/404";

const Home = () => <h1>Home (Public)</h1>;


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />

        {/* blog application */}
        {/* <Route path="/blog" element={<Blog/>}/> */}

        {/* admin panel */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </RequireAuth>
          }
          />
        <Route
          path="/admin/services"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AdminServices />
              </DashboardLayout>
            </RequireAuth>
          }
          />
        <Route path="admin/login" element={<AdminLogin />} />

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