import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useState, useRef, useEffect, useCallback } from "react";

const Header = ({ loggedIn, name, email }) => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [size, setSize] = useState({});
  const ref = useRef();
  function openMenu() {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    } else setIsOpenMenu(true);
  }
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setIsOpenMenu(false);
  }

  function singIn() {
    navigate("/signin");
  }
  function singUp() {
    navigate("/signup");
  }

  const resizeHandler = useCallback(() => {
    const { clientWidth } = ref.current || {};
    setSize({ clientWidth });
    if (size.clientWidth > 500) {
      setIsOpenMenu(false);
    }
  }, [size.clientWidth]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <header className="header content__header">
      {isOpenMenu && (
        <div className={`header__menu-container`}>
          {loggedIn && <p className="header__navbar-email">{email}</p>}
          {loggedIn && (
            <button className={`header__navbar-button ${isOpenMenu && "header__navbar-button_menu_open"}`} onClick={signOut}>
              {"Выйти"}
            </button>
          )}
        </div>
      )}
      <div className="header__wrap" ref={ref}>
        <div className="header__logo" />
        <ul className="header__navbar">
          {!loggedIn && (
            <li>
              <button
                className="header__navbar-link"
                onClick={() => {
                  name === "signup" ? singIn() : singUp();
                }}
              >
                {name === "signup" ? "Войти" : name === "signin" ? "Регистрация" : ""}
              </button>
            </li>
          )}
          {size.clientWidth <= 500 && loggedIn ? (
            <BurgerMenu isOpen={isOpenMenu} onClick={openMenu} />
          ) : (
            <>
              {loggedIn && (
                <li>
                  <p className="header__navbar-email">{email}</p>
                </li>
              )}
              {loggedIn && (
                <li>
                  <button className="header__navbar-button" onClick={signOut}>
                    {"Выйти"}
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
