import { createBrowserRouter } from "react-router-dom";
import CustomMeditation from "../components/CustomMeditation/CustomMeditation";
import Login from "../components/Login/Login";
import MeditationTrack from "../components/MeditationTrack";
import RecipeCard from "../components/RecipeCard";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
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
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workout",
    element: (
      <ProtectedRoute>
        <WorkoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workout-detail",
    element: (
      <ProtectedRoute>
        <WorkoutDetailSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/meal-form",
    element: (
      <ProtectedRoute>
        <MealFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/meal-plan",
    element: (
      <ProtectedRoute>
        <MealPlanPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipe-description",
    element: (
      <ProtectedRoute>
        <RecipeCard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/meditation",
    element: (
      <ProtectedRoute>
        <MeditationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/meditation-detail/:id",
    element: (
      <ProtectedRoute>
        <MeditationTrack />
      </ProtectedRoute>
    ),
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
      { path: "meditation", element: <CustomMeditation /> },
    ],
  },
]);

export default appRouter;
