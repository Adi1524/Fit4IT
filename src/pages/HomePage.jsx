import MealPlanForm from "../components/MealplanForm";

export default function HomePage() {
  // function to find the closest meal plan with the deficit in the meal.json
  return (
    <>
      <div className="main-container">
        <MealPlanForm />
      </div>
    </>
  );
}
