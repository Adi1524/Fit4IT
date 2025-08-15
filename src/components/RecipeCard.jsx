import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function RecipeCard() {
  // const recipe = {
  //   ingredients: [
  //     "1 large Onion (finely chopped)",
  //     "2 medium Tomatoes (pureed)",
  //     "1 tsp Ginger-Garlic Paste",
  //     "1 Green Chili (optional)",
  //     "½ tsp Turmeric Powder",
  //     "1 tsp Red Chili Powder",
  //     "½ tsp Garam Masala",
  //     "1 tsp Coriander Powder",
  //     "½ tsp Cumin Seeds",
  //     "½ cup Low-fat Curd/Yogurt",
  //     "1 tsp Besan (Gram Flour)",
  //     "1 tsp Oil (Olive oil or Ghee)",
  //     "Salt to taste",
  //     "Handful of Coriander Leaves (for garnish)",
  //   ],
  //   instructions: [
  //     "Heat 1 tsp oil in a pan and add cumin seeds.",
  //     "Add chopped onions and sauté until golden brown.",
  //     "Mix in ginger-garlic paste and cook for 30 seconds.",
  //     "Add turmeric, red chili powder, coriander powder, and mix well.",
  //     "Pour in pureed tomatoes and cook until oil separates (~5 minutes).",
  //     "Add besan to thicken the gravy and mix well.",
  //     "Reduce heat and stir in low-fat curd slowly to prevent curdling.",
  //     "Add paneer cubes, garam masala, and salt. Simmer for 5 minutes.",
  //     "Garnish with fresh coriander leaves and serve hot.",
  //   ],
  // };

  const location = useLocation();
  const mealName = location.state?.mealName;
  const img = location.state?.img;
  const recipe = location.state?.recipe;

  console.log("here is the meal name in recipe", mealName, img, recipe);

  return (
    <div className="">
      <div className="bg-white relative  w-full flex flex-col h-full shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative  bg-white">
          <buttson
            type="button"
            className=" ml-3 mt-3  cursor-pointer rounded-full absolute w-fit"
          >
            <ChevronLeft color="black" />
          </buttson>
          <img
            src={img}
            alt="Apple Dish"
            className="w-full h-[25vh] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-lg font-bold drop-shadow-md">
              {mealName}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 flex-1 overflow-auto">
          {/* Ingredients Section */}
          <div className="mb-4">
            <h2 className="text-md font-semibold text-gray-800 border-b border-gray-300 pb-1">
              Ingredients
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 text-sm">
              {recipe ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="pl-2">
                    {ingredient}
                  </li>
                ))
              ) : (
                <h1>meal plan is loading....</h1>
              )}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mb-4">
            <h2 className="text-md font-semibold text-gray-800 border-b border-gray-300 pb-1">
              Instructions
            </h2>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700 text-sm">
              {recipe?.instructions?.map((step, index) => (
                <li key={index} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
