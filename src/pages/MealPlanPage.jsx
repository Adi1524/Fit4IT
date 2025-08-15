import { useSelector } from "react-redux";
import riceChickenImg from "../assets/ChickenRice.png";
import appleAlmond from "../assets/appleAlmond.jpeg";
import chapatiVeggies from "../assets/chapatiVeggies.jpg";
import kiwi from "../assets/kiwi.jpg";
import oatsImg from "../assets/oats.png";
import MealOptionCard from "../components/MealOptionCard";
import CircularProgress from "../components/styling/CircularProgress";

const MealPlanPage = () => {
  const mealPlan = useSelector((store) => store.mealplan.mealplan);
  const mealsCompleted = useSelector(
    (store) => store.userDetails.mealsCompleted
  );

  // const [mealsCompleted, setMealsCompleted] = useState({
  //   BREAKFAST: false,
  //   LUNCH: false,
  //   DINNER: false,
  //   SNACKS: false,
  // });

  return (
    <div className=" bg-slate-400 w-full ">
      {mealPlan ? (
        <div className="bg-white relative  w-full flex flex-col h-full">
          {/* <div className="mb-5 p-4">
          <p className="text-sm text-gray-500">EVERYDAY WE'RE MUSCLE'N</p>
          <h3 className="text-3xl font-bold">Hello, Aditya Kumar</h3>
        </div> */}
          <div
            style={{ backgroundImage: `url(${kiwi})` }}
            className="relative h-[20vh] bg-cover bg-center"
          ></div>

          <div className="absolute top-[3rem] left-4 w-[90%] h-[15rem] bg-white border-2 shadow-md p-3">
            <p className="text-center font-bold">
              CALORIES: {mealPlan?.totalCalories ? mealPlan?.totalCalories : 0}
            </p>
            <hr className="border-t-2 border-[#dcdcdb] my-1 w-full " />
            <div className="flex items-center justify-between px-14 ">
              <div>
                <p className="text-center font-bold my-2">carbs</p>
                <CircularProgress
                  progress={60}
                  grams={`${Math.round(mealPlan?.totalMacros?.carbs)}g`}
                />
              </div>
              <div>
                <p className="text-center font-bold my-2">protein</p>
                <CircularProgress
                  progress={30}
                  color={"green"}
                  grams={`${Math.round(mealPlan?.totalMacros?.protein)}g`}
                />
              </div>
              <div>
                <p className="text-center font-bold my-2">fats</p>
                <CircularProgress
                  progress={20}
                  color={"red"}
                  grams={`${Math.round(mealPlan?.totalMacros?.fats)}g`}
                />
              </div>
            </div>
          </div>
          <div className="  w-full h-[11rem] bg-white"></div>

          {mealPlan ? (
            <div className=" bg-white border-2 mx-1 mt-3  p-3 pt-4 shadow-md">
              <div
                className={` ${
                  mealsCompleted.BREAKFAST === true
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
              >
                <MealOptionCard
                  mealsCompleted={mealsCompleted}
                  option={"BREAKFAST"}
                  mealName={mealPlan.breakfast?.name.toUpperCase()}
                  img={oatsImg}
                  macros={mealPlan.breakfast?.totalMacros}
                  ingredients={mealPlan?.breakfast?.ingredients}
                  recipe={
                    mealPlan.dinner.recipe ? mealPlan.breakfast.recipe : null
                  }
                />
              </div>

              <div
                className={` ${
                  mealsCompleted.LUNCH === true ? "opacity-40" : ""
                }`}
              >
                <MealOptionCard
                  mealsCompleted={mealsCompleted}
                  option={"LUNCH"}
                  mealName={mealPlan.lunch?.name.toUpperCase()}
                  img={riceChickenImg}
                  macros={mealPlan.lunch?.totalMacros}
                  ingredients={mealPlan?.lunch?.ingredients}
                  recipe={mealPlan.dinner.recipe ? mealPlan.lunch.recipe : null}
                />
              </div>

              <div
                className={` ${
                  mealsCompleted.DINNER === true ? "opacity-40" : ""
                }`}
              >
                <MealOptionCard
                  mealsCompleted={mealsCompleted}
                  option={"DINNER"}
                  mealName={mealPlan.dinner?.name.toUpperCase()}
                  img={chapatiVeggies}
                  macros={mealPlan.dinner?.totalMacros}
                  ingredients={mealPlan?.dinner?.ingredients}
                  recipe={
                    mealPlan.dinner.recipe ? mealPlan.dinner.recipe : null
                  }
                />
              </div>

              <div
                className={` ${
                  mealsCompleted.SNACKS === true ? "opacity-40" : ""
                }`}
              >
                <MealOptionCard
                  mealsCompleted={mealsCompleted}
                  option={"SNACKS"}
                  mealName={mealPlan.snacks?.name.toUpperCase()}
                  img={appleAlmond}
                  macros={mealPlan.snacks?.totalMacros}
                  ingredients={mealPlan.snacks?.ingredients}
                  recipe={
                    mealPlan.dinner.recipe ? mealPlan.snacks.recipe : null
                  }
                />
              </div>
            </div>
          ) : (
            <h1>meal plan not available</h1>
          )}

          <div className="mt-8"></div>
        </div>
      ) : (
        "No plan bud!! Go back to eating junk!!"
      )}
    </div>
  );
};

export default MealPlanPage;
