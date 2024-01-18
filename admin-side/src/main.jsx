import React from "react";
import ReactDOM from "react-dom/client";

// Router component
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

// Redux component
import { Provider as ReduxProvider } from "react-redux";
import store from "./stores/index.js";

// Bootstrap component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
);
