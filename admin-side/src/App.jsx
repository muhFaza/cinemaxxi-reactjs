import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {location.pathname == "/login" ? "" : <Navbar page={location.pathname} />}
      <Outlet />
    </>
  );
}

export default App;
