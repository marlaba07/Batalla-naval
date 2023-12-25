# Batalla naval
Se trata de manejar iteraciones sobre una matriz de 8x8.
La matriz viene prevista por el desafio.

![Matriz de ejemplo en el código](https://i.imgur.com/fIkm8gX.png)

Dada la matriz conseguimos que se pueda:
* Clickear para marcar en un casillero y luego 3 clicks mas en casilleros aledaños para lograr dibujar una linea (4 casilleros), horizontal o vertical.
El primer click puede ser en cualquier lado dentro de la matriz, (define la posicion)
El segundo click puede ser para arriba, abajo, izquierda o derecha del primer click ( define la direccion )
El tercer y cuarto click estan obligados a continuar la direccion definida
* Debajo de la matriz de dibujar la linea, van a aparecer 3 botones: 
1) Boton Con una flecha para la izquierda ( rotacion anti-horaria // levogiro )
2) Boton Con una flecha a la derecha ( rotacion horaria // dextrogiro )
3) Boton Con un tacho de basura

* Los botones con flecha hacen la rotación de dicha linea previamente dibujada 90deg para el lado de la flecha. recorriendo la matriz y modificando la posicion de los casilleros marcados
* El boton con el tacho de basura borra el ultimo casillero dibujado

- Además agregué:

* UI responsive.
* Los botones estan habilitados o deshabilitados dependiendo de si la linea esta completa o de si hay algo para borrar.
* Degrade con opacidad en las celdas.
* Limite para cliclear afuera u en otro casillero que no continue con una linea.
* Queda resaltado las posiciones posibles para clickear.

#### Antes de empezar
:warning: **Advertencia:** El ejercicio viene con un proyecto base en React en typescript y un Eslint como linteador para mantener la prolijidad, con bootstrap usando el framework de NextJs. tiene configurado scss (Sass) y viene con Storybook. Los comandos para prender el proyecto estan mas abajo


## --- Proyect Info! ---
:information_source: **Nota:** 

## React 18
The proyect is Updated to use the last version of react with this new updates
Transition => https://17.reactjs.org/docs/concurrent-mode-patterns.html
Suspense => https://17.reactjs.org/docs/concurrent-mode-suspense.html

## Node Version
v14.16.1
  
## ENV CONFIG TEMPLATE
Create a .env.local and use this base config inside:
  
## NextJs
https://nextjs.org/docs/getting-started

## Storybook
https://storybook.js.org/

## Commands

```
# Install client dependencies with --legacy-peer-deps => Important for react 18 upgrade
npm install --legacy-peer-deps

# Start client on localhost:3000
npm run dev

# Start Storybook
npm run storybook

# Run your test
npm run test
```
