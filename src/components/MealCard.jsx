function MealCard({ meal }) {
  if (!meal) return <p>No meal plan available for the selected preference.</p>;
  console.log("meals", meal);

  console.log("meal name", meal.breakfast[0].name);

  // const result = Object.entries(meal?.ingredients);
  // console.log("ingredients", result);
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg"> Breakfast: </h2>
      <p className="font-bold">{meal.breakfast[0].name?.toUpperCase()}</p>
      <p>INGREDIENTS:</p>
      {meal.breakfast[0].ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient.ingredient} quantity: {ingredient.quantity} calories:{" "}
          {ingredient.calories} protein: {ingredient.protien} carbs:{" "}
          {ingredient.carbs} fats: {ingredient.fats}
        </li>
      ))}
      <br></br>

      <h2 className="font-bold text-lg"> Lunch: </h2>
      <p className="font-bold">{meal.lunch[0].name.toUpperCase()}</p>
      <p>INGREDIENTS:</p>
      {meal.lunch[0].ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient.ingredient} quantity: {ingredient.quantity} calories:{" "}
          {ingredient.calories} protein: {ingredient.protien} carbs:{" "}
          {ingredient.carbs} fats: {ingredient.fats}
        </li>
      ))}
      <br></br>
      <h2 className="font-bold text-lg"> Dinner: </h2>
      <p className="font-bold">{meal.dinner[0].name.toUpperCase()}</p>
      <p>INGREDIENTS:</p>
      {meal.dinner[0].ingredients.map((ingredient, index) => (
        <li>
          {ingredient.ingredient} quantity: {ingredient.quantity}g calories:
          {ingredient.calories}kcal protein: {ingredient.protien}g carbs:{" "}
          {ingredient.carbs}g fats: {ingredient.fats}g
        </li>
      ))}
      <br></br>

      <h2 className="font-bold text-lg"> Snacks: </h2>
      <p className="font-bold">{meal.snacks[0].name.toUpperCase()}</p>
      <p>INGREDIENTS:</p>
      {meal.snacks[0].ingredients.map((ingredient, index) => (
        <li>
          {ingredient.ingredient} quantity: {ingredient.quantity} calories:{" "}
          {ingredient.calories} protein: {ingredient.protien} carbs:{" "}
          {ingredient.carbs} fats: {ingredient.fats}
        </li>
      ))}
    </div>
  );
}

export default MealCard;
