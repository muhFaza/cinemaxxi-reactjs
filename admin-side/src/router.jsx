import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Genre from "./pages/Genre";
import App from "./App";
import Register from "./pages/Register";
import AddForm from "./pages/AddForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          } else {
            return null;
          }
        },
      },
      {
        path: "genre",
        element: <Genre />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          } else {
            return null;
          }
        },
      },
      {
        path: "register",
        element: <Register />,
        loader: async () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          } else {
            return null;
          }
        },
      },
      {
        path: "add",
        element: <AddForm />,
      },
      {
        path: "login",
        element: <Login />,
        loader: async () => {
          if (!localStorage.access_token) {
            return null;
          } else {
            return redirect("/");
          }
        },
      },
    ],
  },
]);

export default router;
