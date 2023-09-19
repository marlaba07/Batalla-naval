import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  buttonType: string;
  onClick?: any;
  text: string;
  icon?: IconDefinition; // Nombre de la clase del icono
  isDisabled?: boolean;
};

const Button = ({
  buttonType,
  onClick,
  text,
  icon,
  isDisabled = false,
}: ButtonProps) => {
  const handlerClick = () => {
    if (isDisabled === false) onClick();
  };

  return (
    <div
      className={`Button ${buttonType} ${isDisabled ? "disabled" : ""}`}
      onClick={handlerClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <p className="f-Quicksand-light f-16 f-mobile-16 mb-0">{text}</p>
    </div>
  );
};

export default Button;
