import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWorkout: {},
};

const userWorkoutSlice = createSlice({
  name: "userWorkout",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action) => {
      state.selectedWorkout = action.payload;
    },
  },
});

export const { setSelectedWorkout } = userWorkoutSlice.actions;
export default userWorkoutSlice.reducer;
