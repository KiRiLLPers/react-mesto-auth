import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import useForm from "../../hooks/useForm";

const Register = () => {
  const { errors, isInputValid, isValid, handleChangeInput } = useForm();
  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
  const [isOpenNotSuccessPopup, setIsOpenNotSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    email: "",
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
    const { email, password } = formValue;
    auth
      .register(email, password)
      .then((res) => {
        if (res.error) {
          setIsOpenNotSuccessPopup(true);
        } else setIsOpenSuccessPopup(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    if (isOpenSuccessPopup) {
      setIsOpenSuccessPopup(false);
      navigate("/signin", { replace: true });
    } else {
      setIsOpenNotSuccessPopup(false);
      setFormValue({ ...formValue, email: "", password: "" });
    }
  };

  return (
    <>
      <Form
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        classHeading={"form__login-heading"}
        classBtnLog={"form__btn_theme_login"}
        isValid={isValid}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input
          className={`form__item form_item_el_email ${isInputValid.email === undefined || isInputValid.email ? "" : "form__item_type_error"}`}
          type="email"
          id="email-reg"
          name="email"
          placeholder="Email"
          required
          value={formValue.email}
          disabled={isLoading}
          onChange={handleChange}
        />
        <span className={`form__item-error ${errors.email && "form__item-error_active"}`}>{errors.email}</span>
        <input
          className={`form__item form_item_el_password ${isInputValid.password === undefined || isInputValid.password ? "" : "form__item_type_error"}`}
          type="password"
          id="password-reg"
          name="password"
          placeholder="Пароль"
          minLength={6}
          maxLength={30}
          required
          value={formValue.password}
          disabled={isLoading}
          onChange={handleChange}
        />
        <span className={`form__item-error ${errors.password && "form__item-error_active"}`}>{errors.password}</span>
      </Form>
      <InfoTooltip isOpenSuccessPopup={isOpenSuccessPopup} onClosePopup={handleClosePopup} isOpenNotSuccessPopup={isOpenNotSuccessPopup} />
    </>
  );
};

export default Register;
