import React from "react";
import useClosePopupByEsc from "../hooks/useClosePopupByEsc";
import Form from "./Form";
import Popup from "./Popup/Popup";

const PopupWithForm = ({ title, name, isOpen, buttonText, onClose, children, onSubmit, isLoading, isValid = true }) => {
  const handleCloseByOverley = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useClosePopupByEsc(isOpen, onClose);
  return (
    <Popup isOpen={isOpen} onClose={onClose} handleCloseByOverley={handleCloseByOverley}>
      <Form title={title} name={name} buttonText={buttonText} children={children} onSubmit={onSubmit} isLoading={isLoading} isValid={isValid} />
    </Popup>
  );
};
export default PopupWithForm;
