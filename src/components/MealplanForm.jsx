import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import mealData from "../data/dynamicMeal.json";
import { setMealPlanRedux } from "../redux/slice/mealPlanSlice";

export default function MealPlanForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    mealPreference: "",
    activityLevel: "sedentary",
  });
  const [calories, setCalories] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleQuickMealGeneration = () => {
    const roundedCalories = 1800;
    const userMacros = {
      calories: roundedCalories,
      protein: Math.round((roundedCalories * 0.25) / 4), // 25% of calories from protein
      carbs: Math.round((roundedCalories * 0.5) / 4), // 50% of calories from carbs
      fats: Math.round((roundedCalories * 0.25) / 9), // 25% of calories from fats
    };
    const mealType = "veg";
    const resultMealPlan = generateMealPlan(userMacros, mealData, mealType);
    console.log("the result meal plan from quick generation", resultMealPlan);
    setMealPlan(resultMealPlan);
  };
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate maintenance calories and deficit
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
    console.log("total rounded calories", roundedCalories);
    setCalories(roundedCalories);

    // Macro distribution (example percentages)
    const userMacros = {
      calories: roundedCalories,
      protein: Math.round((roundedCalories * 0.25) / 4), // 25% of calories from protein
      carbs: Math.round((roundedCalories * 0.5) / 4), // 50% of calories from carbs
      fats: Math.round((roundedCalories * 0.25) / 9), // 25% of calories from fats
    };

    const mealPlanResult = generateMealPlan(userMacros, mealData); //meal type is required here
    setMealPlan(mealPlanResult);
  };

  // Generate meal plan based on macros and updated meal data
  const generateMealPlan = (userMacros, mealData, mealType) => {
    const calorieDistribution = {
      breakfast: 0.25,
      lunch: 0.4,
      dinner: 0.2,
      snacks: 0.15,
    };

    const result = {};
    let totalPlannedCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    let selectedLunch = null;

    Object.entries(calorieDistribution).forEach(([category, percentage]) => {
      const maxCaloriesForCategory = userMacros.calories * percentage;

      if (
        !mealData.meals[category] ||
        !Array.isArray(mealData.meals[category])
      ) {
        console.warn(`No valid meals found for category: ${category}`);
        result[category] = {
          meals: [],
          totalCalories: 0,
          totalMacros: { protein: 0, carbs: 0, fats: 0 },
        };
        return;
      }

      let categoryCalories = 0;
      let categoryProtein = 0;
      let categoryCarbs = 0;
      let categoryFats = 0;

      let mealOptions;
      if (mealType === "veg") {
        mealOptions = mealData.meals[category].filter(
          (meal) => meal.type === mealType
        );
      } else {
        mealOptions = mealData.meals[category];
      }
      console.log("give me all the categories", mealOptions);

      if (category === "lunch" && !selectedLunch) {
        selectedLunch =
          mealOptions[Math.floor(Math.random() * mealOptions.length)];
      }

      let meal;
      console.log("selectedMealProtein", selectedLunch);
      if (category === "lunch" && selectedLunch) {
        meal = selectedLunch;
      } else if (selectedLunch?.protein === 1 && category === "dinner") {
        meal = mealOptions.filter((meal) => meal.protein === 0)[0];
      } else {
        meal = mealOptions[Math.floor(Math.random() * mealOptions.length)];
      }

      const adjustedIngredients = meal.ingredients.map((ingredient) => {
        console.log("maxCaloriesForCategory", maxCaloriesForCategory);
        const adjustedCalories = Math.min(
          maxCaloriesForCategory * ingredient.qualifier
        );
        const maxQuantity =
          (adjustedCalories * 100) / ingredient.caloriesPer100g;
        const adjustedProtein = (ingredient.protein / 100) * maxQuantity;
        const adjustedCarbs = (ingredient.carbs / 100) * maxQuantity;
        const adjustedFats = (ingredient.fats / 100) * maxQuantity;

        categoryCalories += adjustedCalories;
        categoryProtein += adjustedProtein;
        categoryCarbs += adjustedCarbs;
        categoryFats += adjustedFats;

        return {
          ingredient: ingredient.ingredient,
          quantity: Math.round(maxQuantity),
          calories: Math.round(adjustedCalories),
          protein: adjustedProtein.toFixed(2),
          carbs: adjustedCarbs.toFixed(2),
          fats: adjustedFats.toFixed(2),
        };
      });

      result[category] = {
        ...meal,
        ingredients: adjustedIngredients,
      };

      categoryCalories = Math.min(categoryCalories, maxCaloriesForCategory);
      totalPlannedCalories += categoryCalories;
      totalProtein += categoryProtein;
      totalCarbs += categoryCarbs;
      totalFats += categoryFats;

      result[category].totalCalories = Math.round(categoryCalories);
      result[category].totalMacros = {
        protein: categoryProtein.toFixed(2),
        carbs: categoryCarbs.toFixed(2),
        fats: categoryFats.toFixed(2),
      };
    });

    result.totalCalories = Math.round(totalPlannedCalories);
    result.totalMacros = {
      protein: totalProtein.toFixed(2),
      carbs: totalCarbs.toFixed(2),
      fats: totalFats.toFixed(2),
    };

    return result;
  };

  const handleMealPlan = () => {
    dispatch(setMealPlanRedux({ ...mealPlan }));

    navigate("/dashboard/program");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Calculate Your Meal Plan</h2>
      <button
        className="border rounded-sm bg-red-500"
        onClick={handleQuickMealGeneration}
      >
        hello click here to make the function work
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          calculateCalories(); // Perform calculation
        }}
      >
        {/* Form Inputs */}
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>
      {calories && <h1>{calories}</h1>}
      {mealPlan && (
        <button
          onClick={handleMealPlan}
          className="border bg-slate-700 text-white"
        >
          Show Meal Plan
        </button>
      )}
    </div>
  );
}
