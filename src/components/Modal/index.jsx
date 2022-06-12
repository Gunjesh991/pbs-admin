import { useEffect, useState } from "react";
import deleteSvg from "../../assets/icons/delete.svg";

import "./styles.css";

const Modal = ({
  title = "",
  open = true,
  closable = true,
  toggleModal = () => {},
  children,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const closeModal = () => {
    setShowModal(false);
    toggleModal(false);
  };

  return showModal ? (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__header">
          <div className="modal__title">
            <h3>{title}</h3>
          </div>

          {closable && (
            <div className="modal__close">
              <img onClick={closeModal} src={deleteSvg} alt="close" />
            </div>
          )}
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
