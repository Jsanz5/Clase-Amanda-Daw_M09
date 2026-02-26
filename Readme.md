# 📺 Práctica 11: Interactividad con jQuery

## Descripción General

He integrado **jQuery** en mi proyecto web sobre anime **"Z Animation"**, dándole una **interactividad y dinamismo reales**. Todo el código está organizado en un archivo separado (`jquery.js`) para mantener una estructura limpia y profesional.

---

## 📋 Tabla de Contenidos

1. [Misión 1: Selección](#misión-1-selección)
2. [Misión 2: Añadir y Borrar del DOM](#misión-2-añadir-y-borrar-del-dom)
3. [Misión 3: Eventos](#misión-3-eventos)
4. [Misión 4: Animaciones](#misión-4-animaciones)
5. [Misión 5: jQuery UI](#misión-5-jquery-ui)

---

## ✨ Misión 1: Selección

### 📍 Ubicación

- Título principal (`h2`)
- Subtítulo (clase `.hero-subtitle`)
- Enlace de Inicio (ID `#nav-inicio`)
- Filas impares de la lista de episodios

### 🔧 Implementación

Utilicé **cuatro tipos de selectores diferentes**:

- **Selector de etiqueta**: `h2`
- **Selector de clase**: `.hero-subtitle`
- **Selector de ID**: `#nav-inicio`
- **Selector avanzado**: `:odd` para las filas impares

Apliqué cambios visuales con `.css()` al cargar la página.

### 💡 Justificación

Quería darle un **toque distintivo** a la página al entrar y demostrar dominio de los diferentes tipos de selectores que pedía la práctica.

---

## ➕ Misión 2: Añadir y Borrar del DOM

### 📍 Ubicación

Sección nueva en la barra lateral: **"Mis Favoritos"**

### 🔧 Implementación

- **Input + Botón**: Para escribir y añadir animes a la lista
- **`.append()`**: Inserta dinámicamente los animes nuevos
- **`.remove()`**: Cada anime incluye un botón individual para eliminarlo
- **Eventos delegados**: Usado para manejar los botones de borrar que se crean dinámicamente

### ⭐ Punto Bonus

Como los botones de eliminar se generan en tiempo real, implementé **eventos delegados**. Coloqué el listener en el contenedor principal de la lista, no directamente en los botones.

### 💡 Justificación

Una lista personalizada de favoritos permite que los usuarios creen **su propio top de animes** sin recargar la página, mejorando significativamente la experiencia.

---

## 🎯 Misión 3: Eventos

### 📍 Ubicación

- Tarjetas de animes
- Input del formulario
- Botón de envío

### 🔧 Implementación

| Evento                      | Elemento         | Función                            |
| --------------------------- | ---------------- | ---------------------------------- |
| `mouseenter` / `mouseleave` | Tarjetas         | Cambia el borde al pasar el ratón  |
| `keyup`                     | Input formulario | Actualiza el título en tiempo real |
| `submit`                    | Formulario       | Intercepta el envío sin recargar   |

Utilizé **`.on()`** para capturar eventos y **`$(this)`** para apuntar al elemento específico.

### 💡 Justificación

La interactividad **instantánea** mejora la experiencia del usuario, haciendo la página más **responsiva y moderna**.

---

## 🎬 Misión 4: Animaciones

### 📍 Ubicación

- Sección "Sobre la página"
- Logo superior izquierdo
- Botón de acceso

### 🔧 Implementación

| Elemento                 | Método                     | Efecto                                 |
| ------------------------ | -------------------------- | -------------------------------------- |
| Título "Sobre la página" | `.slideToggle()`           | Muestra/oculta contenido al hacer clic |
| Logo                     | `.fadeOut()` + `.fadeIn()` | Efecto de parpadeo suave               |
| Botón de acceso          | `.animate()`               | Cambia tamaño y márgenes suavemente    |

### 💡 Justificación

Las animaciones **añaden vida** a la interfaz, evitando una navegación estática y aburrida. Crean una experiencia visual más atractiva y coherente con el diseño.

---

## 🎮 Misión 5: jQuery UI

### 📍 Ubicación

- Lista de "Mis Favoritos"
- Formulario

### 🔧 Implementación

Después de enlazar **jQuery UI** en el `<head>`:

- **`sortable()`**: Permite arrastrar y reordenar elementos en la lista
- **`datepicker()`**: Selector de fecha interactivo en el formulario

### 💡 Justificación

El plugin **sortable** es perfecto para que cada usuario pueda **crear su propio ranking visual** de animes, mejorando significativamente la usabilidad e interactividad.

---

## 🏗️ Estructura del Proyecto

```
Clase-Amanda-Daw_M09/
├── index.html          # Página principal
├── registrar.html      # Formulario de registro
├── Readme.md           # Este archivo
├── JS/
│   ├── jquery.js       # Lógica (jQuery)
│   └── language.js     # scripts de idiomas
├── Estilos/
│   ├── styleIndex.css
│   └── styleRegistrar.css
├── imagenes/
├── audio/
├── video/
└── fonts/
```

---

**Práctica 11 - Módulo 09**
