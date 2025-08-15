import { createBrowserRouter } from "react-router-dom";
import MeditationTrack from "../components/MeditationTrack";
import RecipeCard from "../components/RecipeCard";
import WorkoutDetailSection from "../components/workoutComponent/workoutDetailSection/WorkoutDetailSection";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import MainLayout from "../pages/MainLayout";
import MealFormPage from "../pages/MealFormPage";
import MealPlanPage from "../pages/MealPlanPage";
import MeditationPage from "../pages/MeditationPage";
import SignupPage from "../pages/SignupPage";
import WorkoutPage from "../pages/WorkoutPage";
import FitnessProgram from "../pages/fitnessProgram/FitnessProgram";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <Error />,
  },
  {
    path: "/workout",
    element: <WorkoutPage />,
  },
  {
    path: "/workout-detail",
    element: <WorkoutDetailSection />,
  },
  {
    path: "/meal-form",
    element: <MealFormPage />,
  },
  {
    path: "/meal-plan",
    element: <MealPlanPage />,
  },
  {
    path: "/recipe-description",
    element: <RecipeCard />,
  },
  {
    path: "/meditation",
    element: <MeditationPage />,
  },
  {
    path: "/meditation-detail/:id",
    element: <MeditationTrack />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "program",
        element: <FitnessProgram />,
      },
    ],
  },
]);

export default appRouter;
