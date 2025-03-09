import { Apple, Calendar, DollarSign, Leaf, Scale, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/components/ui/card";
import { Badge } from "@/components/components/ui/badge";
import { Progress } from "@/components/components/ui/progress";
import { Button } from "@/components/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DietaryProfile({
  id ,
  periodType,
  budgetRange ,
  weight,
  isVegetarian ,
  allergicTo,
  healthIssues,
}) {
  const navigate = useNavigate();

  // Helper function to get budget percentage based on range
  const getBudgetPercentage = (range) => {
    switch (range.toLowerCase()) {
      case "low":
        return 33;
      case "medium":
        return 66;
      case "high":
        return 100;
      default:
        return 50;
    }
  };

  // Helper function to get weight category
  const getWeightCategory = (weight) => {
    if (weight < 1500) return "Light";
    if (weight < 2500) return "Medium";
    return "Heavy";
  };

  const handleGeneratePlan = () => {
    console.log(id);
    
    navigate(`/meal-plan/${id}`);
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className={`h-1.5 ${isVegetarian ? "bg-green-500" : "bg-orange-500"}`} />
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Profile Header */}
          <div className="md:w-1/4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Dietary Profile</h3>
              {isVegetarian && (
                <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50 md:hidden">
                  <Leaf className="h-3 w-3" />
                  Vegetarian
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              {/* Period Type */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{periodType.charAt(0).toUpperCase() + periodType.slice(1)} planning</span>
              </div>

              {isVegetarian && (
                <Badge variant="outline" className="hidden md:flex items-center gap-1 text-green-600 border-green-200 bg-green-50">
                  <Leaf className="h-3 w-3" />
                  Vegetarian
                </Badge>
              )}

              <Button onClick={handleGeneratePlan} className="w-full mt-4 bg-primary hover:bg-primary/90">
                Generate Plan
              </Button>
            </div>
          </div>

          {/* Middle Section - Metrics */}
          <div className="md:w-1/3 space-y-4">
            {/* Budget Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Budget</span>
                </div>
                <span className="text-xs font-medium capitalize">{budgetRange}</span>
              </div>
              <Progress value={getBudgetPercentage(budgetRange)} className="h-1.5" />
            </div>

            {/* Weight Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Scale className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span>Weight</span>
                </div>
                <span className="text-xs font-medium">
                  {weight}g ({getWeightCategory(weight)})
                </span>
              </div>
              <Progress value={(weight / 3000) * 100} className="h-1.5" />
            </div>
          </div>

          {/* Right Section - Allergies & Health Issues */}
          <div className="md:w-5/12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Allergies */}
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span>Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allergicTo.length > 0 ? (
                  allergicTo.map((allergy) => (
                    <Badge key={allergy} variant="secondary" className="text-xs bg-amber-50 text-amber-700 hover:bg-amber-100">
                      {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">None</span>
                )}
              </div>
            </div>

            {/* Health Issues */}
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Apple className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span>Health Considerations</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {healthIssues.length > 0 ? (
                  healthIssues.map((issue) => (
                    <Badge key={issue} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                      {issue.charAt(0).toUpperCase() + issue.slice(1)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">None</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
