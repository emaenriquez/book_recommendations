import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";
import '../styles/Header.css'

const Header = () => {
  const { user, logout } = useContext(GlobalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleHamburger = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <h1 className="header__title">Books Recommendations</h1>
      <nav className={`header__nav ${isHamburgerOpen ? "header__nav--open" : ""}`}>
        {user ? (
          <div className="header__user">
            <img
              src="/perfil.jpeg"
              alt="Profile"
              className="header__profile-img"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="header__dropdown-menu">
                <ul className="header__dropdown-list">
                  <li className="header__dropdown-item">
                    <button className="header__logout-btn" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                  <li className="header__dropdown-item">
                    <Link className="header__link" to="/profile">
                      Mi perfil
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <ul className="header__list">
            <li className="header__item">
              <Link className="header__link" to="/login">
                Iniciar sesión
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/registrar">
                Registrarme
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="header__hamburger" onClick={toggleHamburger}>
        ☰
      </div>
    </header>
  );
};

export default Header;
