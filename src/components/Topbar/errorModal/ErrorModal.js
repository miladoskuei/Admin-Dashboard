import React from "react";
import "./Error.css"; // برای استایلهای مدال

const ErrorModal = ({ message = "An error occurred", onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          {" "}
          ×
        </span>{" "}
        <p> {message} </p>{" "}
      </div>{" "}
    </div>
  );
};

export default ErrorModal;
