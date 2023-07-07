import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import useForm from "../../hooks/useForm";

const Login = ({ handleLogin }) => {
  const { errors, isInputValid, isValid, handleChangeInput } = useForm();
  const [isOpenNotSuccessPopup, setIsOpenNotSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    handleChangeInput(e);
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formValue.username || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.username, formValue.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return data;
      })
      .then((data) => {
        if (data.message) {
          setIsOpenNotSuccessPopup(true);
          return;
        }
        if (localStorage.getItem("jwt") === data.token) {
          setFormValue({ username: "", password: "" });
          handleLogin({
            username: formValue.username,
          });
          navigate("/", { replace: true });
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    setIsOpenNotSuccessPopup(false);
    setFormValue({ ...formValue, username: "", password: "" });
  };

  return (
    <>
      <main className="main content__main">
        <section>
          <Form title="Вход" buttonText="Войти" classHeading="form__login-heading" classBtnLog="form__btn_theme_login" isValid={isValid} onSubmit={handleSubmit} isLoading={isLoading}>
            <input
              className={`form__item form_item_el_email ${isInputValid.username === undefined || isInputValid.username ? "" : "form__item_type_error"}`}
              type="email"
              id="email-log"
              name="username"
              placeholder="Email"
              required
              disabled={isLoading}
              value={formValue.username}
              onChange={handleChange}
            />
            <span className={`form__item-error ${errors.username && "form__item-error_active"}`}>{errors.username}</span>
            <input
              className={`form__item form_item_el_password ${isInputValid.password === undefined || isInputValid.password ? "" : "form__item_type_error"}`}
              type="password"
              id="password-log"
              name="password"
              placeholder="Пароль"
              minLength={6}
              maxLength={30}
              required
              disabled={isLoading}
              value={formValue.password}
              onChange={handleChange}
            />
            <span className={`form__item-error ${errors.password && "form__item-error_active"}`}>{errors.password}</span>
          </Form>
        </section>
      </main>
      <InfoTooltip onClosePopup={handleClosePopup} isOpenNotSuccessPopup={isOpenNotSuccessPopup} />
    </>
  );
};

export default Login;
