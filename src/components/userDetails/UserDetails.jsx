import axios from "axios";
import { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mealData from "../../data/dynamicMeal.json";
import workoutData from "../../data/hiitWorkout.json";
import stretchesData from "../../data/stretches.json";
import { setMealPlanRedux } from "../../redux/slice/mealPlanSlice";
import { setUserDetails } from "../../redux/slice/userDetailsSlice";
import { setSelectedWorkout } from "../../redux/slice/userWorkoutSlice";
import { BASE_URL } from "../../utils/constants/constants";
import UserInfoPage1 from "./userInfo/UserInfoPage1";
import UserInfoPage2 from "./userInfo/UserInfoPage2";
import UserInfoPage3 from "./userInfo/UserInfoPage3";

const UserDetails = () => {
  const [pageNo, setPageNo] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    mealPreference: "",
    activityLevel: "sedentary",
  });

  const userDetails = useSelector((store) => store.userDetails);
  console.log("userdetailsinlog", userDetails);
  const [calories, setCalories] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    dispatch(setUserDetails({ ...userDetails, [name]: value }));
  };

  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel } = userDetails;

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
    console.log("did we get the meal?", mealPlanResult);
    generateWorkoutPlan(userDetails);

    dispatch(setMealPlanRedux({ ...mealPlanResult }));
  };

  const handleSubmit = async () => {
    calculateCalories();

    try {
      const res = await axios.post(
        BASE_URL + "/profile/setup",
        {
          gender: userDetails.gender,
          age: userDetails.age,
          weight: userDetails.weight,
          height: userDetails.height,
          mealPreference: userDetails.mealPreference,
          activityLevel: userDetails.activity_level,
          workoutExperience: userDetails.workoutExperience,
          walking: userDetails.walking,
        },
        { withCredentials: true }
      );
      console.log("res", res);
      navigate("/dashboard");
    } catch (error) {
      console.log("error in handleSubmit ", error.message);
    }
  };

  const generateWorkoutPlan = (userDetails) => {
    const { workoutExperience } = userDetails;

    const filterWorkout = workoutData?.home.filter(
      (workout) => workout.category === workoutExperience
    );

    const selectedWorkout =
      filterWorkout[Math.floor(Math.random() * filterWorkout.length)];

    const filteredStretched = stretchesData.filter(
      (stretch) => stretch.category === workoutExperience
    );

    const seletedStretches =
      filteredStretched[Math.floor(Math.random() * filteredStretched.length)];

    dispatch(
      setSelectedWorkout({
        workout: { ...selectedWorkout },
        stretches: { ...seletedStretches },
      })
    );
  };

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

  const validateFirstPage = () => {
    const { age, gender, weight, height } = userDetails;

    // Check all required fields
    if (!age || !gender || !weight || !height) {
      alert("Please fill out all fields before continuing.");
      return false;
    }

    // Check age range
    if (Number(age) > 60 || Number(age) < 1) {
      alert("Age must be between 1 and 60.");
      return false;
    }

    return true;
  };
  return (
    <div className="h-screen">
      <div className="flex h-[8%] items-center gap-2 w-full justify-center py-2 shadow-sm">
        <FaDumbbell />
        <p className=" text-lg">SouthFit</p>
      </div>

      <div className=" w-full h-[92%] flex justify-center  items-center  ">
        {pageNo === 1 && (
          <UserInfoPage1
            handleChange={handleChange}
            validateFirstPage={validateFirstPage}
            setPageNo={setPageNo}
            userDetails={userDetails}
          />
        )}

        {pageNo === 2 && (
          <UserInfoPage2
            handleChange={handleChange}
            validateFirstPage={validateFirstPage}
            setPageNo={setPageNo}
            userDetails={userDetails}
          />
        )}

        {pageNo === 3 && (
          <UserInfoPage3
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            validateFirstPage={validateFirstPage}
            setPageNo={setPageNo}
            userDetails={userDetails}
            calculateCalories={calculateCalories}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
