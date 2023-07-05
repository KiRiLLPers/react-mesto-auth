const Popup = ({ isOpen, handleCloseByOverley, onClose, children }) => {
  
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={handleCloseByOverley}>
      <div className="popup__container">
        {children}
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
