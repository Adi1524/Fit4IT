import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // you forgot to import axios
import { BASE_URL } from "../../utils/constants/constants";

// Async thunk to fetch user
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/protected`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

// Initial state
const initialState = {
  user: {
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
  },
  status: "idle",
  error: null,
};

const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    markMealCompleted: (state, action) => {
      const meal = action.payload; // e.g., "BREAKFAST"
      if (state.user.mealsCompleted.hasOwnProperty(meal)) {
        state.user.mealsCompleted[meal] = true;
      }
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUserDetails, markMealCompleted, clearUser } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
