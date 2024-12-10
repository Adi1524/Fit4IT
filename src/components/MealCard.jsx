function MealCard({ calorieRange, meal }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg">{calorieRange} Plan</h2>

      <p>
        <strong>Breakfast:</strong> {meal.breakfast.item} (
        {meal.breakfast.quantity})
        <span> protein: {meal?.breakfast?.protein}</span>
        <span> carbs: {meal?.breakfast?.carbs}</span>
        <span> fats: {meal?.breakfast?.fats}</span>
      </p>
      <p>
        <strong>Lunch:</strong> {meal.lunch.item} ({meal.lunch.quantity})
        <span> protein: {meal?.lunch?.protein}</span>
        <span> carbs: {meal?.lunch?.carbs}</span>
        <span> fats: {meal?.lunch?.fats}</span>
      </p>
      <p>
        <strong>Dinner:</strong> {meal.dinner.item} ({meal.dinner.quantity})
        <span> protein: {meal?.dinner?.protein}</span>
        <span> carbs: {meal?.dinner?.carbs}</span>
        <span> fats: {meal?.dinner?.fats}</span>
      </p>
      <p>
        <strong>Snack:</strong> {meal.snack.item} ({meal.snack.quantity})
        <span> protein: {meal?.snack?.protein}</span>
        <span> carbs: {meal?.snack?.carbs}</span>
        <span> fats: {meal?.snack?.fats}</span>
      </p>
    </div>
  );
}

export default MealCard;
