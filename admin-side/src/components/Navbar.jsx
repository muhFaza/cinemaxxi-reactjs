import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js'
import '../assets/Navbar.css'
import { toast } from "react-toastify";

function Navbar () {
  const navigate = useNavigate()
  const location = useLocation()

  function logmeout(e) {
    e.preventDefault()
    localStorage.clear()
    navigate('/login')
    toast.success("success logout", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }
  
  return (
    <>
      <section className="ftco-section">
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container-fluid">
          
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars"></span> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav m-auto">
                <li className={location.pathname == '/' ? 'nav-item active' : 'nav-item'}><Link to="/" className="nav-link">Dashboard</Link></li>
                <li className={location.pathname == '/genre' ? 'nav-item active' : 'nav-item'}><Link to="/genre" className="nav-link">Genre</Link></li>
                <li className={location.pathname == '/register' ? 'nav-item active' : 'nav-item'}><Link to="/register" className="nav-link">Register Admin</Link></li>
                <li className="nav-item"><a href="" onClick={logmeout} className="nav-link">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}

export default Navbar