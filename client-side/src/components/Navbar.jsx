import "../assets/XXI.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header id="header" className="sticky-style-2">
      <div className="header-box">
        <div className="container clearfix">
          <div className="row align-items-center">
            <div className="col-6">
              <Link to="/">
                <div id="logo">
                  <img
                    src="https://21cineplex.com//theme/v5/assets/img/logo.png"
                    alt="21 Cineplex Logo"
                  />
                </div>
              </Link>
            </div>

            <div className="col-6"></div>
          </div>
        </div>
      </div>

      <div id="header-wrap" className="">
        <nav id="primary-menu" className="style-2">
          <div className="container clearfix">
            <ul className="sf-js-enabled" style={{ touchAction: "pan-y" }}>
              <li>
                <Link to="/">
                  <a
                    data-scrollto="#now-playing-section"
                    data-easing="easeInOutExpo"
                    data-speed="1250"
                    data-offset="65"
                  >
                    <div className="link-menu playing-menu">Movie</div>
                  </a>
                </Link>
              </li>
            </ul>

            <div className="menu-right">
              <a>
                <img
                  src="https://21cineplex.com//theme/v5/assets/img/imax-menu.png"
                  alt="IMAX"
                />
              </a>

              <a>
                <img
                  src="https://21cineplex.com//theme/v5/assets/img/dolby-menu.png"
                  alt="Dolby Atmos"
                />
              </a>

              <a>
                <img
                  src="https://21cineplex.com//theme/v5/assets/img/mtix-menu.png"
                  alt="M-TIX"
                />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
