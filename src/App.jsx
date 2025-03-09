import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import MealPlannerForm from "./pages/mealplanform";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dietrypreferences" element={<MealPlannerForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
