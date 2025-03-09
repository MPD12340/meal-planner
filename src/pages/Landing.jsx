import React, { useEffect, useState } from "react";
import DietaryProfile from "./DietaryProfile";
import { baseApiUrl } from "../service/Api";


const mealPlans=[
  {
    "id": 7,
    "user": 4,
    "period_type": "weekly",
    "budget_range": "medium",
    "weight": 100,
    "is_vegetarian": false,
    "allergic_to": [],
    "health_issues": []
},
{
    "id": 8,
    "user": 4,
    "period_type": "weekly",
    "budget_range": "medium",
    "weight": 100,
    "is_vegetarian": false,
    "allergic_to": [
        "Nuts"
    ],
    "health_issues": [
        "Cancer"
    ]
},
{
    "id": 9,
    "user": 4,
    "period_type": "weekly",
    "budget_range": "medium",
    "weight": 100,
    "is_vegetarian": false,
    "allergic_to": [
        "Nuts"
    ],
    "health_issues": [
        "Cancer"
    ]
},
{
    "id": 10,
    "user": 4,
    "period_type": "weekly",
    "budget_range": "medium",
    "weight": 100,
    "is_vegetarian": false,
    "allergic_to": [],
    "health_issues": []
},
{
    "id": 11,
    "user": 4,
    "period_type": "weekly",
    "budget_range": "medium",
    "weight": 100,
    "is_vegetarian": true,
    "allergic_to": [
        "nuts"
    ],
    "health_issues": []
}
]
function Dashboard() {
  const [mealPlans, setMealPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch meal plans
  const fetchMealPlans = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("No token found. Please log in.");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${baseApiUrl}/mealplans/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning":true
        },
      });
      

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setErrorMessage(`Server error: ${response.status}. Please try again later.`);
        setIsLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log(data);
      setMealPlans(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please check your connection or API endpoint.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Loading state */}
      {isLoading && (
        <div className="text-gray-600 mb-4">
          Loading meal plans...
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          <strong>Error: </strong>{errorMessage}
        </div>
      )}
      
      {/* If meal plans are available, render DietaryProfile */}

      <h2 className="text-2xl font-bold mb-6">Dietary Profiles</h2>
      <div className="space-y-6">

      {!isLoading && mealPlans.length > 0 ? (
        mealPlans.map((mealPlan) => (
          <DietaryProfile 
            key={mealPlan.id} 
            id={mealPlan.id}
            periodType={mealPlan.period_type.toLowerCase()} // Convert period_type to lowercase
            budgetRange={mealPlan.budget_range}
            weight={mealPlan.weight}
            isVegetarian={mealPlan.is_vegetarian}
            allergicTo={mealPlan.allergic_to}
            healthIssues={mealPlan.health_issues}
          />
        ))
      ) : (
        !isLoading && <p>No meal plans available.</p>
      )}
      </div>
     
    </div>
  );
}

export default Dashboard;