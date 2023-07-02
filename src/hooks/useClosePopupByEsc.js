import { useEffect } from "react";

const useClosePopupByEsc = (isOpen, onClose) => {
  useEffect(() => {
    function closePopupByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closePopupByEsc);
    }

    return () => {
      document.removeEventListener("keydown", closePopupByEsc);
    };
  }, [isOpen, onClose]);
};

export default useClosePopupByEsc;
