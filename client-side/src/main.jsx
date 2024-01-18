import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { Provider } from "react-redux";
import store from "./stores/stores.js";

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
