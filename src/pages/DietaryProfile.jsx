"use client"

import { Apple, Calendar, DollarSign, Leaf, Scale, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/components/ui/card"
import { Badge } from "@/components/components/ui/badge"
import { Progress } from "@/components/components/ui/progress"

export default function DietaryProfile({
  periodType = "weekly",
  budgetRange = "medium",
  weight = 2000,
  isVegetarian = true,
  allergicTo = ["nuts", "shellfish"],
  healthIssues = ["diabetes"],
}) {
  // Helper function to get budget percentage based on range
  const getBudgetPercentage = (range) => {
    switch (range.toLowerCase()) {
      case "low":
        return 33
      case "medium":
        return 66
      case "high":
        return 100
      default:
        return 50
    }
  }

  // Helper function to get weight category
  const getWeightCategory = (weight) => {
    if (weight < 60) return "Light"
    if (weight < 80) return "Medium"
    return "Heavy"
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden">
        <div className={`h-2 ${isVegetarian ? "bg-green-500" : "bg-orange-500"}`} />
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center justify-between">
            Dietary Profile
            {isVegetarian && (
              <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50">
                <Leaf className="h-3.5 w-3.5" />
                Vegetarian
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {periodType.charAt(0).toUpperCase() + periodType.slice(1)} meal planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                Budget Range
              </div>
              <span className="text-sm font-semibold capitalize">{budgetRange}</span>
            </div>
            <Progress value={getBudgetPercentage(budgetRange)} className="h-2" />
          </div>

          {/* Weight Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Scale className="h-4 w-4 text-blue-600" />
                Weight
              </div>
              <span className="text-sm font-semibold">
                {weight}g ({getWeightCategory(weight)})
              </span>
            </div>
            <Progress value={(weight / 3000) * 100} className="h-2" />
          </div>

          {/* Allergies Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Allergies
            </div>
            <div className="flex flex-wrap gap-2">
              {allergicTo.length > 0 ? (
                allergicTo.map((allergy) => (
                  <Badge key={allergy} variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                    {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No allergies</span>
              )}
            </div>
          </div>

          {/* Health Issues Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Apple className="h-4 w-4 text-red-500" />
              Health Considerations
            </div>
            <div className="flex flex-wrap gap-2">
              {healthIssues.length > 0 ? (
                healthIssues.map((issue) => (
                  <Badge
                    key={issue}
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  >
                    {issue.charAt(0).toUpperCase() + issue.slice(1)}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No health issues</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
