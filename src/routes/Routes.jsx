import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <Error />,
  },
]);

export default appRouter;
