import { createBrowserRouter } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import Board from "~/pages/Boards/_id";


const router = createBrowserRouter([
  {
    path: "/:id",
    element: <Board />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
