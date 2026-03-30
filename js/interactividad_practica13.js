/**
integracion de anime.js para animaciones de interfaz, chart.js para visualizaciones dinámicas y canvas 2D para efectos de partículas, todo optimizado para un rendimiento fluido y una experiencia de usuario atractiva.
 */
(function () {
  "use strict";

  // Espera a que el HTML cargue completamente
  document.addEventListener("DOMContentLoaded", () => {
    initAnimeJS();
    initChartJS();
    initCanvas();
  });

  // acá se integran las tres librerías para crear una experiencia interactiva y visualmente atractiva, con animaciones suaves, gráficos dinámicos y efectos de partículas en tiempo real, todo optimizado para un rendimiento fluido.
  function initAnimeJS() {
    // 1. Efecto de Entrada Escalonada (Staggering)
    anime({
      targets: ".anime-card",
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, { start: 300 }),
      easing: "easeOutQuart",
      duration: 1000,
    });

    // 2. Micro-interacciones de Feedback en los botones
    const botonesVer = document.querySelectorAll(".btn-ver-ahora");

    botonesVer.forEach((btn) => {
      // Hover In (MouseEnter)
      btn.addEventListener("mouseenter", () => {
        anime({
          targets: btn,
          scale: 1.05,
          duration: 300,
          easing: "easeOutElastic(1, .8)",
        });
      });
      // Hover Out (MouseLeave)
      btn.addEventListener("mouseleave", () => {
        anime({
          targets: btn,
          scale: 1,
          duration: 300,
          easing: "easeOutElastic(1, .8)",
        });
      });
      // Click In (MouseDown)
      btn.addEventListener("mousedown", () => {
        anime({
          targets: btn,
          scale: 0.95,
          duration: 100,
          easing: "easeInOutQuad",
        });
      });
      // Click Out (MouseUp)
      btn.addEventListener("mouseup", () => {
        anime({
          targets: btn,
          scale: 1.05,
          duration: 100,
          easing: "easeInOutQuad",
        });
      });
    });
  }

  // 2. Gráfico Interactivo con Chart.js
  let miGrafico = null; // Variable global para controlar el gráfico
  const colorPrimario = "rgba(98, 167, 251, 0.8)";
  const colorSecundario = "rgba(210, 105, 30, 0.8)";

  function getChartLabels() {
    // Obtener etiquetas del diccionario de translations si existe
    if (typeof translations !== "undefined") {
      return [
        translations["chart-accion"][getCurrentLanguage()] || "Acción",
        translations["chart-comedia"][getCurrentLanguage()] || "Comedia",
        translations["chart-drama"][getCurrentLanguage()] || "Drama",
        translations["chart-fantasia"][getCurrentLanguage()] || "Fantasía",
        translations["chart-terror"][getCurrentLanguage()] || "Terror",
      ];
    }
    return ["Acción", "Comedia", "Drama", "Fantasía", "Terror"];
  }

  function getChartLabel() {
    if (typeof translations !== "undefined") {
      return (
        translations["chart-label"][getCurrentLanguage()] ||
        "Millones de Visualizaciones"
      );
    }
    return "Millones de Visualizaciones";
  }

  function getCurrentLanguage() {
    return localStorage.getItem("userLang") || "es";
  }

  function initChartJS() {
    const ctx = document.getElementById("js-interact-p13-chart");
    if (!ctx) return;

    // Destruir gráfico anterior si existe
    if (miGrafico) {
      miGrafico.destroy();
    }

    const data = {
      labels: getChartLabels(),
      datasets: [
        {
          label: getChartLabel(),
          data: [150, 90, 60, 110, 40],
          backgroundColor: colorPrimario,
          borderColor: "#62a7fb",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#ffffff" } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#aaaaaa" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
          x: {
            ticks: { color: "#aaaaaa" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
        },
      },
    };

    miGrafico = new Chart(ctx.getContext("2d"), config);

    // Guardar tipo de gráfico actual en localStorage
    localStorage.setItem("currentChartType", config.type);

    // Interactividad controlada por botón
    const btnChart = document.getElementById("js-interact-p13-btn-chart");
    if (btnChart) {
      btnChart.removeEventListener("click", handleChartToggle); // Remover evento anterior
      btnChart.addEventListener("click", handleChartToggle);
    }
  }

  function handleChartToggle() {
    const btnChart = document.getElementById("js-interact-p13-btn-chart");
    if (!miGrafico) return;

    const isBar = miGrafico.config.type === "bar";

    miGrafico.destroy();

    const newConfig = {
      type: isBar ? "line" : "bar",
      data: {
        labels: getChartLabels(),
        datasets: [
          {
            label: getChartLabel(),
            data: [150, 90, 60, 110, 40],
            backgroundColor: isBar ? "rgba(210, 105, 30, 0.2)" : colorPrimario,
            borderColor: isBar ? "#d2691e" : "#62a7fb",
            borderWidth: isBar ? 2 : 1,
            borderRadius: isBar ? 0 : 4,
            fill: isBar,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#ffffff" } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#aaaaaa" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
          x: {
            ticks: { color: "#aaaaaa" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
        },
      },
    };

    const ctx = document.getElementById("js-interact-p13-chart");
    miGrafico = new Chart(ctx.getContext("2d"), newConfig);

    // Guardar tipo de gráfico en localStorage
    localStorage.setItem("currentChartType", isBar ? "line" : "bar");

    // Actualizar texto del botón
    const newBtnText = isBar
      ? translations
        ? translations["chart-btn-bar"][getCurrentLanguage()] ||
          "Cambiar a Gráfico de Barras"
        : "Cambiar a Gráfico de Barras"
      : translations
        ? translations["chart-btn-line"][getCurrentLanguage()] ||
          "Cambiar a Gráfico de Líneas"
        : "Cambiar a Gráfico de Líneas";
    btnChart.textContent = newBtnText;
  }

  // Hacer la función accesible globalmente para ser llamada desde language.js
  window.reinitChartJS = initChartJS;

  // 3. Efecto de Partículas con Canvas 2D
  function initCanvas() {
    const canvas = document.getElementById("js-interact-p13-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    let w, h;
    let particulas = [];
    let raton = { x: undefined, y: undefined };

    function resize() {
      w = canvas.width = container.clientWidth;
      h = canvas.height = container.clientHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Reacciona a la posición del cursor para crear partículas que siguen al mouse, creando un efecto de estela dinámico y visualmente atractivo.
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      raton.x = e.clientX - rect.left;
      raton.y = e.clientY - rect.top;

      // Creación de estelas de partículas
      for (let i = 0; i < 3; i++) {
        particulas.push(new Particula(raton.x, raton.y));
      }
    });

    canvas.addEventListener("mouseleave", () => {
      raton.x = undefined;
      raton.y = undefined;
    });

    class Particula {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.velocidadX = Math.random() * 3 - 1.5;
        this.velocidadY = Math.random() * 3 - 1.5;
        this.vida = 1;
      }

      actualizar() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;
        if (this.size > 0.1) this.size -= 0.05;
        this.vida -= 0.02;
      }

      dibujar() {
        ctx.fillStyle = `rgba(98, 167, 251, ${this.vida})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Bucle de animación que actualiza y dibuja las partículas, creando un efecto de estela suave y fluida que sigue al cursor, mientras se desvanece gradualmente para mantener un rendimiento óptimo.
    function animar() {
      ctx.fillStyle = "rgba(15, 15, 15, 0.3)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particulas.length; i++) {
        particulas[i].actualizar();
        particulas[i].dibujar();

        if (particulas[i].vida <= 0) {
          particulas.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animar);
    }

    animar();
  }
})();
