import React from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "../../images/close-icon.svg";

import "./modal.scss";
import { Fade, IconButton, Backdrop } from "@material-ui/core";

interface ModalProps {
  title: string;
  date?: Date;
  open: boolean;
  setClosed: Function;
  children: React.ReactNode;
}

const ContentModal = (props: ModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      disableScrollLock={false}
      open={props.open}
      onEscapeKeyDown={() => props.setClosed()}
      onClose={() => props.setClosed()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={props.open}>
        <div className="h-100 d-flex justify-content-center flex-column">
          <div className="art-modal d-flex flex-column container container-fluid">
            <div className="d-flex justify-content-between">
              <h2 className="mb-0 pb-0">{props.title}</h2>
              <IconButton color="inherit" aria-label="Close" className="close-button"
                          onClick={() => props.setClosed()}>
                <img src={CloseIcon} alt="Close icon"/>
              </IconButton>
            </div>
            {props.date && <span className="mb-3">{props.date.toDateString()}</span>}
            {props.children}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ContentModal;