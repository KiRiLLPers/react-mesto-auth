import React from "react";
import useClosePopupByEsc from "../hooks/useClosePopupByEsc";

const ImagePopup = ({ onClose, selectedCard, isOpen }) => {
  const handleCloseByOverley = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useClosePopupByEsc(isOpen, onClose);

  return (
    <div className={`popup popup-img ${isOpen ? "popup_opened" : ""}`} onClick={handleCloseByOverley}>
      <div className="popup__container-image">
        <figure className="popup__figure">
          <img src={selectedCard.link} alt={selectedCard.name} className="popup__image" />
          <figcaption className="popup__caption">{selectedCard.name}</figcaption>
        </figure>
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </div>
  );
};
export default ImagePopup;
