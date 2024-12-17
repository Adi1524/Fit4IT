function MealCard({ meal }) {
  if (!meal) return <p>No meal plan available for the selected preference.</p>;

  console.log("meal quantites", meal.quantity);
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg">{meal.item}</h2>
      <p>
        <strong>Quantity:</strong>
        {Object.entries(meal?.quantity).map(([ingredient, quantity], index) => (
          <li key={index}>
            {ingredient}: {quantity}
          </li>
        ))}
      </p>
      <p>
        <strong>Protein:</strong> {meal.protein}g | <strong>Carbs:</strong>{" "}
        {meal.carbs}g | <strong>Fats:</strong> {meal.fats}g
      </p>
      <p>
        <strong>Calories:</strong> {meal.calories} kcal
      </p>
    </div>
  );
}

export default MealCard;
