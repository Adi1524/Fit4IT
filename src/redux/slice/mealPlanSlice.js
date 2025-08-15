import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealplan: {},
};

const mealPlanSlice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    setMealPlanRedux: (state, action) => {
      state.mealplan = action.payload;
    },
  },
});

export const { setMealPlanRedux } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
