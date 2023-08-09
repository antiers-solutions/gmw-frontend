import React from "react";
import Modal from "react-bootstrap/Modal";
import "./CommonModal.scss";
import { CloseIcon } from "../../../../assets/svg/SvgIcon";

const CommonModal = (props: any) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      className={`common-modal ${props.className}`}
    >
      {props.headerHide ? (
        ""
      ) : (
        <Modal.Header>
          {props.title && <Modal.Title>{props.title}</Modal.Title>}
          <button className="close_btn" onClick={props.onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>
      )}
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default CommonModal;
