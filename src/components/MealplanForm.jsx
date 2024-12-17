import { useState } from "react";
import mealPlans from "../data/dynamicMeal.json";
import MealCard from "./MealCard";

export default function MealPlanForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    mealPreference: "",
    activityLevel: "sedentary",
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const [calories, setCalories] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  // const [mealPlan, setMealPlan] = useState({
  //   calories: "",
  //   protein: "",
  //   fats: "",
  //   quantity: {},
  // });

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
    const mealPlanResult = getClosestMealPlan(
      roundedCalories,
      formData.mealPreference
    );
    setMealPlan(mealPlanResult);
    console.log(
      "after the meal plan has been selected it has been updated into the state",
      mealPlan
    );
  };

  const getClosestMealPlan = (calories, mealPreference) => {
    const plans = mealPlans[mealPreference];
    console.log("this is the plan from getClostestMealPlan function", plans);

    if (!plans) {
      console.error(`Meal plans for preference "${mealPreference}" not found.`);
      return null;
    }

    const selectedPlan = {};
    const targetCaloriesPerMeal = calories / 3; // Divide total calories into 3 meals

    // the keys here will be breakfast, lunch, dinner
    Object.keys(plans).forEach((mealType) => {
      console.log("this is inside another loop", plans[mealType]);
      const meals = plans[mealType];
      let closestMeal = null;
      let closestDiff = Infinity;

      Object.keys(meals).forEach((mealKey) => {
        console.log("this is inside another loop part-2", meals[mealKey]);
        const meal = meals[mealKey];
        const diff = Math.abs(meal.calories - targetCaloriesPerMeal);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestMeal = meal;
        }
      });

      if (closestMeal) {
        console.log(
          "we fucking found a closest meal plan(closestMeal)",
          closestMeal
        );
        console.log(
          "next iteration in closestMeal",
          Object.entries(closestMeal.quantity)
        );

        const scaleFactor = targetCaloriesPerMeal / closestMeal.calories;

        // Scale quantities
        const scaledQuantity = Object.entries(closestMeal.quantity).reduce(
          (scaled, [ingredient, baseQty]) => {
            const [value, unit] = baseQty.match(/([\d.]+)(\D+)/).slice(1); // Extract number and unit
            scaled[ingredient] = `${(parseFloat(value) * scaleFactor).toFixed(
              1
            )}${unit}`;
            return scaled;
          },
          {}
        );

        console.log("scaled Quantity", scaledQuantity);

        selectedPlan[mealType] = {
          ...closestMeal,
          protein: Math.round(closestMeal.protein * scaleFactor),
          carbs: Math.round(closestMeal.carbs * scaleFactor),
          fats: Math.round(closestMeal.fats * scaleFactor),
          calories: Math.round(closestMeal.calories * scaleFactor),
          quantity: scaledQuantity,
        };
      }
    });

    console.log("ta-daaaa the final meal plan", selectedPlan);
    return selectedPlan;
  };

  // const getClosestMealPlan = (calories, mealPreference) => {
  //   const plans = mealPlans[mealPreference];
  //   const selectedPlan = {};

  //   // Iterate over meal types: breakfast, lunch, dinner
  //   Object.keys(plans).forEach((mealType) => {
  //     const meals = plans[mealType];
  //     let closestMeal = null;
  //     let closestDiff = Infinity;
  //     console.log("hii");

  //     Object.keys(meals).forEach((mealKey) => {
  //       const meal = meals[mealKey];
  //       const diff = Math.abs(meal.calories - calories / 3); // Divide by 3 for 3 meals
  //       if (diff < closestDiff) {
  //         closestDiff = diff;
  //         closestMeal = meal;
  //       }
  //     });

  //     selectedPlan[mealType] = closestMeal;
  //   });

  //   return selectedPlan;
  // };

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

        <label className="block mb-2 font-medium"> Dietery Preferences: </label>
        <select
          name="mealPreference"
          value={formData.mealPreference}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="nonVeg"> Non-vegetarian</option>
          <option value="veg"> Vegetarian </option>
          <option value="eggetarian"> Eggetarian</option>
        </select>

        <label className="block mb-2 font-medium"> Preferred Breakfast:</label>
        <input
          name="breakfast"
          type="text"
          className="w-full mb-4 p-2 border rounded"
          value={formData.breakfast}
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium"> Preferred Lunch:</label>
        <input
          name="lunch"
          className="w-full mb-4 p-2 border rounded"
          type="text"
          value={formData.lunch}
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium"> Preferred Dinner:</label>
        <input
          name="dinner"
          type="text"
          value={formData.dinner}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

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

      {mealPlan &&
        Object.keys(mealPlan).map((meal, index) => (
          <MealCard key={index} meal={mealPlan[meal]} />
        ))}
    </div>
  );
}
