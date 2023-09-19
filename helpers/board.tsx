import { useState } from "react";
import { lib } from "./lib";
const { convertToIndex } = lib();

type Tile = {
  row: number;
  col: number;
  direccion?: string;
};

export const board = () => {
  const [optionsTiles, setOptionsTiles] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [checkedTiles, setCheckedTiles] = useState(Array(8 * 8).fill(false));
  const [size] = useState(8);
  const [lineSize] = useState(4);

  // Esta función maneja el clic en una celda de la cuadrícula.
  const handleTileClick = (index: number) => {
    // Calcula la fila y columna correspondientes al índice en la cuadrícula.
    const row = Math.floor(index / size);
    const col = index % size;

    // Define acciones específicas para diferentes cantidades de celdas seleccionadas.
    const clickActions = {
      0: () => displayOptions(row, col), // Si no hay celdas seleccionadas, muestra opciones.
      1: () => optionsSecondClick(row, col), // Si hay una celda seleccionada, realiza una acción específica.
      2: () => handleOptionsClick(row, col), // Si hay dos celdas seleccionadas, maneja opciones.
      3: () => handleOptionsClick(row, col), // Si hay tres celdas seleccionadas, también maneja opciones.
    };

    // Obtiene la cantidad de celdas seleccionadas.
    const selectedTilesCount = selectedTiles.length;

    // Si existe una acción correspondiente en clickActions, ejecútala.
    if (clickActions[selectedTilesCount]) {
      clickActions[selectedTilesCount]();
    }
  };

  // Esta función maneja el clic en una celda de opciones en la cuadrícula.
  const handleOptionsClick = (row: number, col: number) => {
    // Verifica si la celda clicada es una celda de opción.
    const isOptionTile = optionsTiles.some(
      (option) => option.row === row && option.col === col
    );

    // Si la celda clicada es una celda de opción, realiza acciones para los clics subsiguientes.
    if (isOptionTile) {
      optionsNextClicks(row, col);
    }
  };

  // Esta función se encarga de mostrar las opciones en la cuadrícula y actualizar los estados relacionados.
  const displayOptions = (row: number, col: number) => {
    // Agrega la celda clicada a la lista de celdas seleccionadas.
    setSelectedTiles([...selectedTiles, { row, col }]);
    // Actualiza las celdas verificadas en la cuadrícula con la celda clicada.
    setCheckedTiles(updateCheckedTiles(checkedTiles, row, col, size));
    // Genera y muestra las celdas de opciones en función de la celda clicada y parámetros relacionados.
    setOptionsTiles(generateOptions(row, col, size, lineSize));
  };

  // Esta función actualiza el estado de las celdas verificadas en la cuadrícula después de un clic en una celda.
  const updateCheckedTiles = (checkedTiles, row, col, size) => {
    // Mapea el arreglo de celdas verificadas y actualiza la celda clicada a "verificada".
    return checkedTiles.map((checked, i) =>
      i === convertToIndex(row, col, size) ? true : checked
    );
  };

  // Esta función genera y devuelve las celdas de opciones disponibles en la cuadrícula a partir de la celda clicada.
  const generateOptions = (row, col, size, lineSize) => {
    // Inicializa un arreglo vacío para almacenar las celdas de opciones.
    const options: Tile[] = [];

    // Verifica y agrega celdas a la derecha como opción si no exceden los límites de la cuadrícula y línea.
    if (col + 1 < size && col + (lineSize - 1) < size)
      options.push({ row, col: col + 1, direccion: "Right" });

    // Verifica y agrega celdas a la izquierda como opción si no exceden los límites de la cuadrícula y línea.
    if (col - 1 > -1 && col - (lineSize - 1) > -1)
      options.push({ row, col: col - 1, direccion: "Left" });

    // Verifica y agrega celdas arriba como opción si no exceden los límites de la cuadrícula y línea.
    if (row - 1 > -1 && row - (lineSize - 1) > -1)
      options.push({ row: row - 1, col, direccion: "Up" });

    // Verifica y agrega celdas abajo como opción si no exceden los límites de la cuadrícula y línea.
    if (row + 1 < size && row + (lineSize - 1) < size)
      options.push({ row: row + 1, col, direccion: "Down" });

    // Devuelve el arreglo de celdas de opciones generadas.
    return options;
  };

  // Esta función maneja las acciones después del segundo clic en una celda de opciones.
  const optionsSecondClick = (row: number, col: number) => {
    // Agrega la celda clicada a las celdas seleccionadas.
    setSelectedTiles([...selectedTiles, { row, col }]);
    // Actualiza las celdas verificadas para marcar la celda clicada.
    setCheckedTiles(
      checkedTiles.map((checked, i) =>
        i === convertToIndex(row, col, size) ? true : checked
      )
    );

    // Encuentra la celda de opción seleccionada.
    const selected = optionsTiles.find(
      (option) => option.row === row && option.col === col
    );
    // Si no se encuentra una celda seleccionada, termina la función.
    if (!selected) return;

    // Inicializa un arreglo para almacenar las nuevas celdas de opciones.
    let options: Tile[] = [];
    // Actualiza las celdas de opciones basadas en la celda seleccionada.
    options = updateOptions(selected, options);

    // Actualiza el arreglo de celdas de opciones.
    setOptionsTiles(options);

    // Agrega la celda clicada y su dirección a las celdas seleccionadas.
    setSelectedTiles([
      ...selectedTiles,
      { row, col, direccion: options[options.length - 1].direccion },
    ]);

    // Actualiza las celdas verificadas nuevamente.
    setCheckedTiles(
      checkedTiles.map((checked, i) =>
        i === convertToIndex(row, col, size) ? true : checked
      )
    );
  };

  // Esta función maneja las acciones en los clics subsiguientes en celdas de opciones.
  const optionsNextClicks = (row: number, col: number) => {
    // Encuentra la celda de opción seleccionada.
    const selected = optionsTiles.find(
      (option) => option.row === row && option.col === col
    );

    // Si no se encuentra una celda seleccionada, termina la función.
    if (!selected) return;

    // Inicializa un arreglo para almacenar las nuevas celdas de opciones.
    let options: Tile[] = [];
    // Actualiza las celdas de opciones basadas en la celda seleccionada.
    options = updateOptions(selected, options);

    // Actualiza el arreglo de celdas de opciones en función de la longitud de las celdas seleccionadas.
    setOptionsTiles(selectedTiles.length + 1 === lineSize ? [] : options);
    // Agrega la celda clicada a las celdas seleccionadas.
    setSelectedTiles([...selectedTiles, { row, col }]);
    // Actualiza las celdas verificadas para marcar la celda clicada.
    setCheckedTiles(
      checkedTiles.map((checked, i) =>
        i === convertToIndex(row, col, size) ? true : checked
      )
    );
  };

  // Esta función actualiza y agrega nuevas celdas de opciones basadas en una celda de opción seleccionada.
  const updateOptions = (selected: Tile, options: Tile[]) => {
    // Mapeo de direcciones a incrementos de fila y columna.
    const directionMappings = {
      Right: { col: 1, row: 0 },
      Left: { col: -1, row: 0 },
      Up: { col: 0, row: -1 },
      Down: { col: 0, row: 1 },
    };

    // Obtiene la dirección de la celda seleccionada.
    const direction = selected.direccion;

    // Obtiene los incrementos de fila y columna basados en la dirección.
    const directionMapping = directionMappings[direction!];

    // Crea una celda de opción actualizada con nuevos valores.
    const updatedOption = {
      ...selected,
      col: selected.col + directionMapping.col,
      row: selected.row + directionMapping.row,
      direccion: direction,
    };

    // Agrega la celda actualizada al arreglo de opciones.
    options.push(updatedOption);

    // Devuelve el arreglo de opciones actualizado.
    return options;
  };

  // Esta función maneja el clic en el botón "Limpiar" y realiza acciones según el estado de selecciones.
  const handleClearClick = () => {
    // Verifica si hay celdas seleccionadas.
    if (selectedTiles.length > 0) {
      // Crea una copia nueva del arreglo de celdas seleccionadas.
      const newSelectedTiles = [...selectedTiles];

      // Obtiene y elimina la última celda seleccionada.
      const lastSelectedTile = newSelectedTiles.pop();

      // Actualiza el arreglo de celdas seleccionadas.
      setSelectedTiles(newSelectedTiles);

      // Si hay una última celda seleccionada, actualiza el estado de celdas verificadas.
      if (lastSelectedTile) {
        setCheckedTiles(
          checkedTiles.map((checked, i) =>
            i === lastSelectedTile.row * size + lastSelectedTile.col
              ? false
              : checked
          )
        );
      }

      // Si no quedan celdas seleccionadas, vacía las celdas de opciones.
      if (newSelectedTiles.length === 0) {
        setOptionsTiles([]);
      }
      // Si solo queda una celda seleccionada, actualiza las celdas de opciones disponibles.
      else if (newSelectedTiles.length === 1) {
        const lastSelectedTile = newSelectedTiles[newSelectedTiles.length - 1];
        const options: Tile[] = [];

        // Verifica y agrega celdas a las opciones en diferentes direcciones.
        if (
          lastSelectedTile.col + 1 < size &&
          lastSelectedTile.col + (lineSize - 1) < size
        )
          options.push({
            row: lastSelectedTile.row,
            col: lastSelectedTile.col + 1,
            direccion: "Right",
          });

        if (
          lastSelectedTile.col - 1 > -1 &&
          lastSelectedTile.col - (lineSize - 1) > -1
        )
          options.push({
            row: lastSelectedTile.row,
            col: lastSelectedTile.col - 1,
            direccion: "Left",
          });

        if (
          lastSelectedTile.row - 1 > -1 &&
          lastSelectedTile.row - (lineSize - 1) > -1
        )
          options.push({
            row: lastSelectedTile.row - 1,
            col: lastSelectedTile.col,
            direccion: "Up",
          });

        if (
          lastSelectedTile.row + 1 < size &&
          lastSelectedTile.row + (lineSize - 1) < size
        )
          options.push({
            row: lastSelectedTile.row + 1,
            col: lastSelectedTile.col,
            direccion: "Down",
          });

        setOptionsTiles(options);
      }
      // Si hay más de una celda seleccionada, actualiza las celdas de opciones con la dirección de la segunda celda.
      else {
        if (!lastSelectedTile) return;
        console.log(lastSelectedTile);
        setOptionsTiles([
          { ...lastSelectedTile, direccion: selectedTiles[1].direccion },
        ]);
      }
    }
  };

  // Esta función rota un conjunto de celdas en una línea específica según la dirección dada.
  const rotateTiles = (line: Tile[], direction) => {
    // Si la longitud de la línea no coincide con el tamaño de línea esperado, no hace nada.
    if (line.length !== lineSize) {
      return;
    }

    // Calcula el centro de rotación en términos de fila y columna.
    const centerX = line[0].row;
    const centerY = line[0].col;

    // Crea una nueva línea de celdas rotadas basada en la dirección proporcionada.
    const newLine: Tile[] = line.map((tile) => {
      const newRow =
        direction === "left"
          ? Math.round(centerX - centerY + tile.col)
          : Math.round(centerX + centerY - tile.col);
      const newCol =
        direction === "left"
          ? Math.round(centerY + centerX - tile.row)
          : Math.round(centerY - centerX + tile.row);
      return { row: newRow, col: newCol };
    });

    // Verifica si las nuevas celdas están dentro de los límites de la cuadrícula.
    if (
      newLine.some(
        (tile) =>
          tile.row < 0 || tile.row >= size || tile.col < 0 || tile.col >= size
      )
    ) {
      return;
    }

    // Si la segunda celda en la línea tiene una dirección, la actualiza según la rotación.
    if (line[1].direccion) {
      let newDirection: string = "";

      switch (line[1].direccion) {
        case "Right":
          newDirection = direction === "left" ? "Down" : "Up";
          break;
        case "Left":
          newDirection = direction === "left" ? "Up" : "Down";
          break;
        case "Up":
          newDirection = direction === "left" ? "Right" : "Left";
          break;
        case "Down":
          newDirection = direction === "left" ? "Left" : "Right";
          break;
      }
      newLine[1].direccion = newDirection;
    }

    // Actualiza las celdas seleccionadas y las celdas verificadas según la rotación.
    setSelectedTiles(newLine);
    setCheckedTiles(
      checkedTiles.map((checked, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        return newLine.some((tile) => tile.row === row && tile.col === col);
      })
    );
  };

  // Esta función verifica si una línea de celdas puede ser rotada en la dirección dada.
  const verifyRotateLine = (line: Tile[], direction): boolean => {
    // Si la longitud de la línea no coincide con el tamaño de línea esperado, devuelve falso.
    if (line.length !== lineSize) {
      return false;
    }

    // Calcula el centro de rotación en términos de fila y columna.
    const centerX = line[0].row;
    const centerY = line[0].col;

    // Crea una nueva línea de celdas rotadas basada en la dirección proporcionada.
    const newLine: Tile[] = line.map((tile) => {
      const newRow =
        direction === "left"
          ? Math.round(centerX - centerY + tile.col)
          : Math.round(centerX + centerY - tile.col);
      const newCol =
        direction === "left"
          ? Math.round(centerY + centerX - tile.row)
          : Math.round(centerY - centerX + tile.row);
      return { row: newRow, col: newCol };
    });

    // Verifica si las nuevas celdas están dentro de los límites de la cuadrícula.
    if (
      newLine.some(
        (tile) =>
          tile.row < 0 || tile.row >= size || tile.col < 0 || tile.col >= size
      )
    ) {
      return false;
    }

    return true;
  };

  // Retorno las funciones y utilidades que utilizaré en la Matriz.
  return {
    rotateTiles,
    handleClearClick,
    handleTileClick,
    optionsTiles,
    checkedTiles,
    selectedTiles,
    verifyRotateLine,
  };
};
