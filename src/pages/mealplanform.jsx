import React, { useState } from "react";
import { Button } from "@/components/components/ui/button";
import { Plus, X } from "lucide-react";
import { baseApiUrl } from "../service/Api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const MealPlannerForm = () => {
  const [periodType, setPeriodType] = useState("weekly");
  const [budgetRange, setBudgetRange] = useState("medium");
  const [weight, setWeight] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [allergic, setAllergic] = useState([""]);
  const [healthIssues, setHealthIssues] = useState([""]);
  const [errorMessage, setErrorMessage] = useState(""); // Error state

  const navigate = useNavigate(); // Initialize navigate function

  const handleAllergicChange = (e, index) => {
    const newAllergic = [...allergic];
    newAllergic[index] = e.target.value;
    setAllergic(newAllergic);
  };

  const handleHealthIssuesChange = (e, index) => {
    const newHealthIssues = [...healthIssues];
    newHealthIssues[index] = e.target.value;
    setHealthIssues(newHealthIssues);
  };

  const addAllergic = (e) => {
    e.preventDefault();
    setAllergic([...allergic, ""]);
  };

  const addHealthIssues = (e) => {
    e.preventDefault();
    setHealthIssues([...healthIssues, ""]);
  };

  const removeAllergic = (index) => {
    const newAllergic = allergic.filter((_, i) => i !== index);
    setAllergic(newAllergic);
  };

  const removeHealthIssue = (index) => {
    const newHealthIssues = healthIssues.filter((_, i) => i !== index);
    setHealthIssues(newHealthIssues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      period_type: periodType,
      budget_range: budgetRange,
      weight: weight,
      is_vegetarian: isVegetarian,
      allergic_to: allergic.filter((item) => item !== ""),
      health_issues: healthIssues.filter((item) => item !== ""),
    };

    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      const response = await fetch(`${baseApiUrl}/mealplans/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Meal plan created:", data);
        setErrorMessage(""); 
        navigate("/dashboard"); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "An error occurred. Please try again."); // Set error message
        console.error("Error creating meal plan:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      {/* Show error notification if there's an error message */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          <strong>Error: </strong>{errorMessage}
        </div>
      )}

      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Dietary Preferences</CardTitle>
          <CardDescription>
            Set your meal planning preferences and dietary restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Planning Period</Label>
                <Select value={periodType} onValueChange={setPeriodType}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Planning Period" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Budget Range</Label>
                <Select value={budgetRange} onValueChange={setBudgetRange}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select your range" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Weight</Label>
                <Input
                  id="name"
                  type="number"
                  placeholder="Enter your weight in Kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Are you vegetarian?</Label>
                <Select value={isVegetarian ? "yes" : "no"} onValueChange={(value) => setIsVegetarian(value === "yes")}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">You are allergic to:</Label>
                {allergic.map((allergy, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      onChange={(e) => handleAllergicChange(e, index)}
                      value={allergy}
                      placeholder="Example: Nuts"
                    />
                    <Button className="w-6" variant="outline" onClick={() => removeAllergic(index)}>
                      <X />
                    </Button>
                  </div>
                ))}
                <Button className="w-10" variant="outline" onClick={addAllergic}>
                  <Plus />
                </Button>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Health issues:</Label>
                {healthIssues.map((healthIssue, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      onChange={(e) => handleHealthIssuesChange(e, index)}
                      value={healthIssue}
                      placeholder="Example: Diabetes"
                    />
                    <Button className="w-6" variant="outline" onClick={() => removeHealthIssue(index)}>
                      <X />
                    </Button>
                  </div>
                ))}
                <Button className="w-10" variant="outline" onClick={addHealthIssues}>
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="flex mt-5">
              <Button type="submit">Submit</Button>
              <Button
                variant="outline"
                className="ml-5"
                onClick={() => navigate("/dashboard")} // Wrap navigate in a function
              >
                Already Done
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlannerForm;
