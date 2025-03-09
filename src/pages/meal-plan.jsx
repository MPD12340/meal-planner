import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Flame, Utensils, Egg, Wheat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/components/ui/card";
import { Badge } from "@/components/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/components/ui/accordion";
import { baseApiUrl } from "../service/Api";

const getMealIcon = (mealType) => {
  switch (mealType.toLowerCase()) {
    case "breakfast": return <Egg className="h-5 w-5" />;
    case "lunch": return <Utensils className="h-5 w-5" />;
    case "dinner": return <Utensils className="h-5 w-5" />;
    case "snack": return <Wheat className="h-5 w-5" />;
    default: return <Utensils className="h-5 w-5" />;
  }
};

const getMealColor = (mealType) => {
  switch (mealType.toLowerCase()) {
    case "breakfast": return "bg-amber-100 text-amber-800 border-amber-200";
    case "lunch": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "dinner": return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "snack": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function MealPlanPage() {
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState({ days: [] });
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${baseApiUrl}/mealplans/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning":true
          },

        }); 

        if (response.ok) {
          const data = await response.json();
          setMealPlan(data);
        } else {
          console.error("Failed to fetch meal plan");
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!mealPlan.days.length) {
    return <div className="text-center py-10">Loading meal plan...</div>;
  }

  const currentDay = mealPlan?.days?.find((day) => day.day_number === activeDay) || mealPlan?.days?.[0] || {};
  const sortedMeals = [...(currentDay?.meals || [])].sort((a, b) => {
    const order = { Breakfast: 1, Lunch: 2, Dinner: 3, Snack: 4 };
    return (order[a.meal_type] || 5) - (order[b.meal_type] || 5);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profiles
        </Link>
        <h1 className="text-3xl font-bold mt-4">Your Meal Plan</h1>
      </div>

      <Tabs defaultValue={activeDay.toString()} className="mb-6" onValueChange={(value) => setActiveDay(Number(value))}>
        <TabsList>
          {mealPlan.days.map((day) => (
            <TabsTrigger key={day.day_number} value={day.day_number.toString()}>
              Day {day.day_number}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Day {currentDay.day_number} Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>{currentDay?.total_calories || 0} kcal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {sortedMeals.map((meal, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                {getMealIcon(meal.meal_type)}
                <CardTitle>{meal.meal_type}</CardTitle>
                <Badge className={getMealColor(meal.meal_type)}>{meal.calories} kcal</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {meal.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                    <AccordionTrigger>{item.name}</AccordionTrigger>
                    <AccordionContent>
                      <p>{item.preparation}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </Tabs>
    </div>
  );
}
