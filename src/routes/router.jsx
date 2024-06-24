import Home from "./../pages/Home.jsx";
import Categories from "../pages/Categories";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Rutas
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Categories />,
  },
]);

export default router;
