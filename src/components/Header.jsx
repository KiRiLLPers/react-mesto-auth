import { useNavigate } from "react-router-dom";

const Header = ({ loggedIn, name, email }) => {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  function singIn() {
    navigate("/signin");
  }
  function singUp() {
    navigate("/signup");
  }

  return (
    <header className="header content__header">
      <div className="header__wrap">
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
