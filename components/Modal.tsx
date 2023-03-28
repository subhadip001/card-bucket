import React from "react";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}

const Modal = ({ setShowModal, url }: Props) => {
  return (
    <div className="card">
      <div className="modal">
        <div
          className="modal-overlay"
          onClick={() => {
            setShowModal(false);
          }}
        ></div>
        <div className="modal-content">
          <iframe
            width="560"
            height="315"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;
