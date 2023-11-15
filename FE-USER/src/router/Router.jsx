import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Room from "../pages/Room";
import RoomDetail from "../pages/RoomDetail";
import BookingInformation from "../pages/BookingInformation";
import PrivateRoutes from "./../utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/rooms",
    element: <Room />,
  },
  {
    path: "/room/:id",
    element: (
      <PrivateRoutes>
        <RoomDetail />
      </PrivateRoutes>
    ),
  },
  {
    path: "/bookingInformation",
    element: (
      <PrivateRoutes>
        <BookingInformation />
      </PrivateRoutes>
    ),
  },
]);
export default router;
