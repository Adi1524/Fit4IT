export function getClosestMealPlan(calorieDeficit, mealPlans) {
  const mealPlanCalories = Object.keys(mealPlans).map((key) => parseInt(key));
  const closestMealPlan = mealPlanCalories.reduce((prev, curr) => {
    return Math.abs(prev - calorieDeficit) < Math.abs(curr - calorieDeficit)
      ? prev
      : curr;
  });

  return {
    calorieRange: `${closestMealPlan}`,
    meal: mealPlans[`${closestMealPlan}kcal`],
  };
}

export function getMealPlan(mealData, dietType, calorieTarget) {
  const meals = mealData[dietType]; // Get meals for the chosen diet type
  const calorieBreakdown = { breakfast: 0.27, lunch: 0.4, dinner: 0.33 }; // Meal calorie percentages
  const mealPlan = {};
  let totalCalories = 0;
  let totalProtein = 0;

  // Protein target range (50-60g)
  const proteinMin = 50;
  const proteinMax = 60;

  for (const [mealType, mealsOfType] of Object.entries(meals)) {
    const targetCalories = Math.round(
      calorieTarget * calorieBreakdown[mealType]
    );
    let chosenMeal = null;

    // Find the meal closest to the target calories
    for (const mealKey in mealsOfType) {
      const meal = mealsOfType[mealKey];
      if (
        !chosenMeal ||
        Math.abs(targetCalories - meal.calories) <
          Math.abs(targetCalories - chosenMeal.calories)
      ) {
        chosenMeal = meal;
      }
    }

    // Adjust the number of eggs (limit to max 6)
    if (chosenMeal.item.toLowerCase().includes("egg")) {
      let eggCount = parseFloat(chosenMeal.quantity.match(/\d+/)[0]); // Extract number of eggs
      eggCount = Math.min(eggCount, 6); // Enforce egg limit of 6 eggs
      chosenMeal.quantity = `${eggCount} eggs`; // Update quantity to within limit
    }

    // Calculate scale factor for meal
    const scaleFactor = targetCalories / chosenMeal.calories;
    mealPlan[mealType] = {
      item: chosenMeal.item,
      quantity: chosenMeal.quantity,
      protein: (chosenMeal.protein * scaleFactor).toFixed(1),
      carbs: (chosenMeal.carbs * scaleFactor).toFixed(1),
      fats: (chosenMeal.fats * scaleFactor).toFixed(1),
      calories: targetCalories,
    };

    // Track total protein
    totalProtein += parseFloat(mealPlan[mealType].protein);
    totalCalories += targetCalories;
  }

  // Adjust the protein to stay within the target range (50-60g)
  if (totalProtein < proteinMin) {
    // Add protein-rich foods like tofu, beans, or extra protein sources
    mealPlan.breakfast.item += " + Tofu";
    mealPlan.breakfast.protein = (
      parseFloat(mealPlan.breakfast.protein) + 10
    ).toFixed(1);
    totalProtein += 10;
  } else if (totalProtein > proteinMax) {
    // Adjust servings to lower protein
    mealPlan.dinner.item = mealPlan.dinner.item.replace(
      "Egg Curry",
      "Veg Curry"
    );
    mealPlan.dinner.protein = (parseFloat(mealPlan.dinner.protein) - 5).toFixed(
      1
    );
    totalProtein -= 5;
  }

  // Return the adjusted meal plan with total calories and protein
  return { mealPlan, totalCalories, totalProtein };
}
