import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen  w-full flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Our Meal Planner
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center px-6">
        Join us to access amazing features. Sign up to get started or log in if
        you already have an account.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
