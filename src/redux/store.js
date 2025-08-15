import { configureStore } from "@reduxjs/toolkit";
import mealPlanReducer from "./slice/mealPlanSlice";
import userDetailsReducer from "./slice/userDetailsSlice";
import userWorkoutReducer from "./slice/userWorkoutSlice";

export const store = configureStore({
  reducer: {
    mealplan: mealPlanReducer,
    userWorkout: userWorkoutReducer,
    userDetails: userDetailsReducer,
  },
});
