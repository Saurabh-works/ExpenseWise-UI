import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Expenses from "../Pages/Expenses";
import Income from "../Pages/Income";
import Report from "../Pages/Report";
import Alert from "../Pages/Alert";
import Layout from "../Components/Layout";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/expenses"
            element={
              <Layout>
                <Expenses />
              </Layout>
            }
          />
          <Route
            path="/income"
            element={
              <Layout>
                <Income />
              </Layout>
            }
          />
          <Route
            path="/report"
            element={
              <Layout>
                <Report />
              </Layout>
            }
          />
          <Route
            path="/alert"
            element={
              <Layout>
                <Alert />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};
export default AppRoutes;
