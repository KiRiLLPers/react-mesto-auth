import React from "react";
import CircularIndeterminate from "./CircularIndeterminate";
import useClosePopupByEsc from "../hooks/useClosePopupByEsc";

const PopupWithForm = ({ title, name, isOpen, buttonText, onClose, children, onSubmit, isLoading, isValid = true }) => {
  const handleCloseByOverley = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useClosePopupByEsc(isOpen, onClose);

  return (
    <>
      <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={handleCloseByOverley}>
        <div className="popup__container">
          <form className={`form popup__form popup-form-${name}`} name={`form-${name}`} noValidate onSubmit={onSubmit}>
            <h2 className="form__heading">{title}</h2>
            <fieldset className="form__profile-info">{children}</fieldset>
            <button type="submit" className={`form__btn ${!isValid && "form__btn_inactive"}`} disabled={(!isValid && true) || (isLoading && true)}>
              {isLoading ? <CircularIndeterminate /> : buttonText || "Сохранить"}
            </button>
          </form>
          <button type="button" className="popup__close-btn" onClick={onClose} />
        </div>
      </div>
    </>
  );
};
export default PopupWithForm;
