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
