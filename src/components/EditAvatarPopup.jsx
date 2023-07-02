import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const inputRef = useRef("");
  const { errors, isInputValid, isValid, handleChangeInput, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: inputRef.current.value,
    });

    inputRef.current.value = "";
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      inputRef.current.value = "";
    }
  }, [isOpen, resetForm]);

  const onCloseWithResetFormAvatarPopup = () => {
    onClose();
  };

  return (
    <PopupWithForm name={"avatar"} title={"Обновить аватар"} isOpen={isOpen} onClose={onCloseWithResetFormAvatarPopup} onSubmit={handleSubmit} isLoading={isLoading} isValid={isValid}>
      <input
        type="url"
        className={`form__item form__item_el_url ${isInputValid.link === undefined || isInputValid.link ? "" : "form__item_type_error"}`}
        id="avatar"
        name="link"
        placeholder="Ссылка на аватар"
        required
        disabled={isLoading}
        ref={inputRef}
        onChange={handleChangeInput}
      />
      <span className={`form__item-error avatar-error ${errors.link && "form__item-error_active"}`}>{errors.link}</span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
