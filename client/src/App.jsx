import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import JobListings from "./pages/JobListings";
import Contact from "./pages/Contact";
import CompanyShowcase from "./pages/CompanyShowcase";
import Login from "./components/Login";

/**
 * Top-level App component with React Router and our five main pages + Login
 */
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* We'll handle the login route outside of the normal nav if you want */}
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/companies" element={<CompanyShowcase />} />
            </Routes>
        </Router>
    );
}

export default App;