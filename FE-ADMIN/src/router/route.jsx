import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/dashBoard/Home";
import PrivateRoutes from "../utils/PrivateRoute";
import User from "../pages/dashBoard/User";
import Gallery from "../pages/dashBoard/Gallery";
import Booking from "../pages/dashBoard/Booking";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoutes>
        <Home />
      </PrivateRoutes>
    ),
  },
  {
    path: "/user",
    element: (
      <PrivateRoutes>
        <User />
      </PrivateRoutes>
    ),
  },
  {
    path: "/gallery",
    element: (
      <PrivateRoutes>
        <Gallery />
      </PrivateRoutes>
    ),
  },
  {
    path: "/booking",
    element: (
      <PrivateRoutes>
        <Booking />
      </PrivateRoutes>
    ),
  },
]);

export default route;
