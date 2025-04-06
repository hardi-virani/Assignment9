// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

// Import components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import CompanyShowcase from "./components/CompanyShowcase";
import Login from "./components/Login";
import Register from "./components/Register";
import JobListings from "./components/JobListings";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import EmployeeRoute from "./components/EmployeeRoute";
import EmployeesList from "./components/admin/EmployeesList";
import AddJob from "./components/admin/AddJob";

function App() {
    const auth = useSelector(state => state.auth);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* PUBLIC routes (no auth required) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* EVERYTHING ELSE needs a logged-in user */}
                <Route element={<PrivateRoute />}>
                    {/* Non-admin, non-employee specific routes (but still require login) */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/companies" element={<CompanyShowcase />} />

                    {/* Admin-only routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin/employees" element={<EmployeesList />} />
                        <Route path="/admin/add-job" element={<AddJob />} />
                    </Route>

                    {/* Employee-only routes */}
                    <Route element={<EmployeeRoute />}>
                        <Route path="/jobs" element={<JobListings />} />
                    </Route>

                    {/* Optionally, if you want a 404 or fallback route */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;