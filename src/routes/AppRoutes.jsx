import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}