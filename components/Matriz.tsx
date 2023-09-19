import React from "react";
import Tile from "./Tile";
import Button from "./global/Button";
import {
  faTrashCan,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { board } from "../helpers/board";

const Matriz = () => {
  const {
    rotateTiles,
    handleClearClick,
    handleTileClick,
    optionsTiles,
    checkedTiles,
    selectedTiles,
    verifyRotateLine,
  } = board();

  // Esta función verifica si una celda en una posición dada es una celda de opción.
  const isOption = (i: number, size: number) => {
    // Calcula la fila y columna correspondiente a la posición dada.
    let row = Math.floor(i / size);
    let col = i % size;

    // Verifica si existe una celda de opción en la posición calculada.
    let isOption = optionsTiles.some(
      (option) => option.row === row && option.col === col
    );

    // Devuelve verdadero si es una celda de opción, de lo contrario, falso.
    return isOption;
  };

  return (
    <>
      <div className="Matriz">
        {checkedTiles.map((tile, i) => (
          <Tile
            key={i}
            checked={checkedTiles[i]}
            onClick={() => handleTileClick(i)}
            isOption={isOption(i, 8)}
          />
        ))}
      </div>
      <div className="buttons-container">
        <Button
          buttonType="rotate"
          text="Left"
          icon={faRotateLeft}
          onClick={() => rotateTiles(selectedTiles, "left")}
          isDisabled={verifyRotateLine(selectedTiles, "left") ? false : true}
        />
        <Button
          buttonType="clear"
          text="Delete"
          icon={faTrashCan}
          onClick={handleClearClick}
          isDisabled={selectedTiles.length === 0 ? true : false}
        />
        <Button
          buttonType="rotate"
          text="Right"
          icon={faRotateRight}
          onClick={() => rotateTiles(selectedTiles, "right")}
          isDisabled={verifyRotateLine(selectedTiles, "right") ? false : true}
        />
      </div>
    </>
  );
};

export default Matriz;
