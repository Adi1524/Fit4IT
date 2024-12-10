import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import appRouter from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
