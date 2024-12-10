import { useState } from "react";
import MealCard from "../components/MealCard";
import mealPlans from "../data/meal.json";
import { getClosestMealPlan } from "../utils/mealPlanUtils";

export default function MealPlanForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
  });
  const [calories, setCalories] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  // Update form data dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate Maintenance Calories and Deficit
  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel } = formData;

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      alert("Please select your gender");
      return;
    }

    // Activity level multipliers
    const activityMultiplier = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };

    const maintenanceCalories = bmr * activityMultiplier[activityLevel];
    const deficitCalories =
      maintenanceCalories > 2000
        ? maintenanceCalories - 500
        : maintenanceCalories - 300; // Subtract 300 for deficit

    const roundedCalories = Math.round(deficitCalories);
    setCalories(roundedCalories);

    const mealPlanResult = getClosestMealPlan(roundedCalories, mealPlans);
    setMealPlan(mealPlanResult);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Calculate Your Meal Plan</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          calculateCalories(); // Perform calculation
        }}
      >
        {/* Age Input */}
        <label className="block mb-2 font-medium">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter your age"
          required
        />

        {/* Gender Input */}
        <label className="block mb-2 font-medium">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Weight Input */}
        <label className="block mb-2 font-medium">Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter your weight in kg"
          required
        />

        {/* Height Input */}
        <label className="block mb-2 font-medium">Height (cm):</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter your height in cm"
          required
        />

        {/* Activity Level Input */}
        <label className="block mb-2 font-medium">Activity Level:</label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightly_active">Lightly Active (1-3 days/week)</option>
          <option value="moderately_active">
            Moderately Active (3-5 days/week)
          </option>
          <option value="very_active">Very Active (6-7 days/week)</option>
          <option value="extra_active">Extra Active (physical job)</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>

      {/* Display Results */}
      {calories && (
        <div className="mt-4 p-4 bg-green-100 border rounded">
          <h3 className="font-medium">Your daily calorie intake should be:</h3>
          <p className="text-2xl font-bold">{calories} kcal</p>
        </div>
      )}

      {mealPlan?.calorieRange && mealPlan?.meal ? (
        <MealCard calorieRange={mealPlan?.calorieRange} meal={mealPlan?.meal} />
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}
