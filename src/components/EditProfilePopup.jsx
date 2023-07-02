import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const { errors, isInputValid, isValid, handleChangeInput, resetForm } = useForm();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    handleChangeInput(e);
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    handleChangeInput(e);
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      heading: name,
      subheading: description,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm name={"profile"} title={"Редактировать профиль"} isOpen={isOpen} onClose={onClose} isLoading={isLoading} onSubmit={handleSubmit} isValid={isValid}>
      <input
        type="text"
        className={`form__item form__item_el_heading ${isInputValid.heading === undefined || isInputValid.heading ? "" : "form__item_type_error"}`}
        id="heading"
        name="heading"
        placeholder="Введите Ваше имя"
        minLength={2}
        maxLength={40}
        required
        value={name || ""}
        disabled={isLoading}
        onChange={handleChangeName}
      />
      <span className={`form__item-error heading-error ${errors.heading && "form__item-error_active"}`}>{errors.heading}</span>
      <input
        type="text"
        className={`form__item form__item_el_subheading ${isInputValid.subheading === undefined || isInputValid.subheading ? "" : "form__item_type_error"}`}
        id="subheading"
        name="subheading"
        placeholder="Ваша профессия"
        minLength={2}
        maxLength={200}
        required
        value={description || ""}
        disabled={isLoading}
        onChange={handleChangeDescription}
      />
      <span className={`form__item-error subheading-error ${errors.subheading && "form__item-error_active"}`}>{errors.subheading}</span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
