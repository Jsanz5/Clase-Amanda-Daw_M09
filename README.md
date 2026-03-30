# Clase Amanda DAW M09

Proyecto academico de interactividad web (Practica 13) basado en una tematica anime. Incluye animaciones de interfaz, grafico dinamico y simulacion de particulas en Canvas.

## Repositorio

URL para clonar este proyecto:

```bash
git clone https://github.com/Jsanz5/Clase-Amanda-Daw_M09.git
```

## Objetivo de la practica

Implementar una seccion interactiva en la web manteniendo el estilo existente y evitando conflictos entre CSS/JavaScript del proyecto base.

## Funcionalidades implementadas

- Animacion escalonada de tarjetas (`.anime-card`).
- Microinteracciones en botones (`.btn-ver-ahora`) con hover y click.
- Grafico interactivo en canvas (`#js-interact-p13-chart`) con cambio de tipo (barras/lineas).
- Simulador de particulas en canvas (`#js-interact-p13-canvas`) con reaccion al movimiento del cursor.
- Soporte de idioma para textos del grafico (si existen traducciones en `js/language.js`).
- Persistencia del tipo de grafico en `localStorage` (`currentChartType`).

## Stack tecnologico

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- jQuery y jQuery UI
- Chart.js (CDN)
- Anime.js (CDN)

## Estructura del proyecto

```text
index.html
registrar.html
README.md

audio/
css/
        interactividad_practica13.css
estilos/
        styleIndex.css
        styleRegistrar.css
fonts/
imagenes/
js/
        interactividad_practica13.js
        jquery.js
        language.js
video/
```

## Integracion tecnica

La interactividad se monta sobre estos anclajes de la pagina principal:

- Seccion: `.js-interact-p13-section`
- Canvas del grafico: `#js-interact-p13-chart`
- Boton de cambio de grafico: `#js-interact-p13-btn-chart`
- Canvas de particulas: `#js-interact-p13-canvas`
- Elementos animados: `.anime-card`, `.btn-ver-ahora`

## Encapsulamiento y mantenimiento

- La logica de la practica se concentra en `js/interactividad_practica13.js` dentro de una IIFE para evitar contaminar el scope global.
- Los estilos se aislan en `css/interactividad_practica13.css` usando prefijos `js-interact-p13-*`.

## Ejecucion local

1. Clona el repositorio.
2. Abre la carpeta en VS Code.
3. Ejecuta un servidor local estatico (recomendado) o abre `index.html`.

Opcion recomendada con Live Server:

1. Instala la extension Live Server.
2. Haz clic derecho en `index.html`.
3. Selecciona Open with Live Server.

## Archivos principales

- `index.html`: estructura principal y anclajes de la practica.
- `css/interactividad_practica13.css`: estilos del modulo interactivo.
- `js/interactividad_practica13.js`: animaciones, grafico y particulas.
- `js/language.js`: traducciones utilizadas por el grafico.

## Consideraciones

- El proyecto depende de librerias por CDN, por lo que necesita conexion a Internet.
- Si se renombran IDs o clases ancladas, las funciones interactivas pueden dejar de funcionar.

## Autor

Jsanz - Proyecto academico para el modulo M09 (DAW).
