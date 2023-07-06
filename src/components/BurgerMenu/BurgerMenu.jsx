const BurgerMenu = ({ isOpen, onClick }) => {
  return <button type="button" className={`header__menu-btn ${isOpen && "header__menu-btn_active"}`} onClick={onClick}></button>;
};

export default BurgerMenu;
