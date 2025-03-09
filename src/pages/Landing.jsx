import React, { useEffect, useState } from "react";

function Dashboard() {
  const [mealPlans, setMealPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  

  const fetchMealPlans = async () => {
    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/mealplans/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMealPlans(data); 
        setErrorMessage(""); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "An error occurred while fetching meal plans.");
        console.error("Error fetching meal plans:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  useEffect(() => {
    fetchMealPlans(); 
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
    
    </div>
  );
}

export default Dashboard;
