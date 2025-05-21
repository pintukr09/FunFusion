import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/forgot_password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset_password/:token",
      element: <ResetPassword />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
