const generateMealPlan = (userMacros, mealData) => {
  // Define calorie distribution percentages
  const calorieDistribution = {
    breakfast: 0.25, // 25% of total calories
    lunch: 0.3, // 30% of total calories
    dinner: 0.3, // 30% of total calories
    snacks: 0.15, // 15% of total calories
  };

  const result = {};
  let totalPlannedCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  Object.entries(calorieDistribution).forEach(([category, percentage]) => {
    // Calculate max calories for the current category
    const maxCaloriesForCategory = userMacros.calories * percentage;

    // Check if mealData.meals[category] exists and is an array
    if (!mealData.meals[category] || !Array.isArray(mealData.meals[category])) {
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

    result[category] = mealData.meals[category].map((meal) => {
      const adjustedIngredients = meal.ingredients.map((ingredient) => {
        // Extract calories per gram from ingredient info
        const caloriesPerGram = ingredient.caloriesPer100g / 100;

        // Calculate the maximum quantity of the ingredient allowed
        const maxQuantity = Math.min(
          maxCaloriesForCategory / caloriesPerGram,
          ingredient.quantity * 2 // Limit scaling to 2x
        );

        // Calculate macros and calories for the adjusted quantity
        const adjustedCalories = maxQuantity * caloriesPerGram;
        const adjustedProtein = (ingredient.protein / 100) * maxQuantity;
        const adjustedCarbs = (ingredient.carbs / 100) * maxQuantity;
        const adjustedFats = (ingredient.fats / 100) * maxQuantity;

        // Add the adjusted macros to the category totals
        categoryCalories += adjustedCalories;
        categoryProtein += adjustedProtein;
        categoryCarbs += adjustedCarbs;
        categoryFats += adjustedFats;

        return {
          ingredient: ingredient.ingredient,
          quantity: Math.round(maxQuantity), // Adjusted quantity
          calories: Math.round(adjustedCalories), // Adjusted calories
          protein: adjustedProtein.toFixed(2), // Adjusted protein
          carbs: adjustedCarbs.toFixed(2), // Adjusted carbs
          fats: adjustedFats.toFixed(2), // Adjusted fats
        };
      });

      return {
        ...meal,
        ingredients: adjustedIngredients,
      };
    });

    // Ensure categoryCalories doesn't exceed maxCaloriesForCategory
    categoryCalories = Math.min(categoryCalories, maxCaloriesForCategory);

    // Add category macros and calories to total macros and calories
    totalPlannedCalories += categoryCalories;
    totalProtein += categoryProtein;
    totalCarbs += categoryCarbs;
    totalFats += categoryFats;

    // Add total macros and calories for the category to the result
    result[category].totalCalories = Math.round(categoryCalories);
    result[category].totalMacros = {
      protein: categoryProtein.toFixed(2),
      carbs: categoryCarbs.toFixed(2),
      fats: categoryFats.toFixed(2),
    };
  });

  // Add total planned calories and macros to the result
  result.totalCalories = Math.round(totalPlannedCalories);
  result.totalMacros = {
    protein: totalProtein.toFixed(2),
    carbs: totalCarbs.toFixed(2),
    fats: totalFats.toFixed(2),
  };

  return result;
};
