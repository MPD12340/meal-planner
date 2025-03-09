import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome</h1>
      <button className="px-8 py-4 text-2xl font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
        Create Your Plan
      </button>
    </div>
  );
}

export default Dashboard;
