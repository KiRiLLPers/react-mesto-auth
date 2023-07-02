import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { values, errors, isInputValid, isValid, handleChangeInput, resetForm } = useForm();

  function handleChangeName(e) {
    handleChangeInput(e);
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    handleChangeInput(e);
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(
      {
        name,
        link,
      }
    );
  }
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm name={"cards"} title={"Новое место"} buttonText={"Создать"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid}>
      <input
        type="text"
        className={`form__item form__item_el_place-name ${isInputValid.name === undefined || isInputValid.name ? "" : "form__item_type_error"}`}
        id="place-name"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        disabled={isLoading}
        value={values.name ? values.name : ""}
        onChange={handleChangeName}
      />
      <span className={`form__item-error place-name-error ${errors.name && "form__item-error_active"}`}>{errors.name}</span>
      <input
        type="url"
        className={`form__item form__item_el_url ${isInputValid.link === undefined || isInputValid.link ? "" : "form__item_type_error"}`}
        id="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        disabled={isLoading}
        value={values.link ? values.link : ""}
        onChange={handleChangeLink}
      />
      <span className={`form__item-error url-error ${errors.link && "form__item-error_active"}`}>{errors.link}</span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
