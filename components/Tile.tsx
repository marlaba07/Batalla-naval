import React from "react";

export type TileProps = {
  checked: boolean;
  isOption: boolean;
  onClick: () => void;
};

const Tile = ({ checked, isOption, onClick }: TileProps) => {
  return (
    <div
      className={`Tile ${checked ? "checked" : ""} ${isOption ? "option" : ""}`}
      onClick={onClick}
    ></div>
  );
};

export default Tile;
