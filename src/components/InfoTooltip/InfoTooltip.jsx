import Popup from "../Popup/Popup";
import useClosePopupByEsc from "../../hooks/useClosePopupByEsc";

const InfoTooltip = ({ isOpenSuccessPopup, onClosePopup, isOpenNotSuccessPopup, title = "Вы успешно зарегистрировались!" }) => {
  const handleCloseByOverley = (e) => {
    if (e.target === e.currentTarget) {
      onClosePopup();
    }
  };

  useClosePopupByEsc(isOpenSuccessPopup || isOpenNotSuccessPopup, onClosePopup);
  return (
    <Popup isOpen={isOpenSuccessPopup || isOpenNotSuccessPopup} onClose={onClosePopup} handleCloseByOverley={handleCloseByOverley}>
      <div className="popup__infoTooltipe">
        <div className={`popup__infoTooltipe-image_success ${isOpenNotSuccessPopup && "popup__infoTooltipe-image_not-success"}`}></div>
        <p className="popup__infoTooltipe-heading">{isOpenSuccessPopup ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
