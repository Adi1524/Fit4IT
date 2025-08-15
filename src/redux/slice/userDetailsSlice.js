import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  age: "",
  gender: "",
  weight: "",
  height: "",
  mealPreference: "",
  workoutExperience: "",
  walking: null,
  currentMood: null,
  activityLevel: "sedentary",
  mealsCompleted: {
    BREAKFAST: false,
    LUNCH: false,
    DINNER: false,
    SNACKS: false,
  },
};

const userDetailsSlice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    markMealCompleted: (state, action) => {
      const meal = action.payload; // e.g., "BREAKFAST"
      if (state.mealsCompleted.hasOwnProperty(meal)) {
        state.mealsCompleted[meal] = true;
      }
    },
  },
});

export const { setUserDetails, markMealCompleted } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
