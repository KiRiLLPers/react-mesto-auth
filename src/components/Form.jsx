import CircularIndeterminate from "./CircularIndeterminate";
import { useNavigate } from "react-router-dom";

const Form = ({ name, onSubmit, title, children, isLoading, buttonText, isValid, classHeading, classBtnLog }) => {
  const navigate = useNavigate();
  function singIn() {
    navigate("/signin");
  }
  return (
    <form className={`form popup__form popup-form-${name}`} name={`form-${name}`} noValidate onSubmit={onSubmit}>
      <h2 className={`form__heading ${classHeading}`}>{title}</h2>
      <fieldset className="form__profile-info">{children}</fieldset>
      <button type="submit" className={`form__btn ${!isValid && "form__btn_inactive"} ${classBtnLog}`} disabled={(!isValid && true) || (isLoading && true)}>
        {isLoading ? <CircularIndeterminate /> : buttonText || "Сохранить"}
      </button>
      {title === "Регистрация" && (
        <button type="button" className="form__item_question" onClick={singIn}>
          Уже зарегистрированы? Войти
        </button>
      )}
    </form>
  );
};

export default Form;
