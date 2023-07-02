import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardsPopup = ({ isOpen, onClose, onDeleteCard, isLoading }) => {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard();

    onClose();
  }

  return <PopupWithForm name={"delete"} title={"Вы уверены?"} buttonText={"Да"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} />;
};
export default DeleteCardsPopup;
