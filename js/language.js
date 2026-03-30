// FASE 2: Diccionario de traducciones de la página
const translations = {
  // NAV
  "nav-inicio": { ca: "Inici", es: "Inicio", en: "Home" },
  "nav-episodios": { ca: "Episodis", es: "Episodios", en: "Episodes" },
  "nav-contacto": { ca: "Contacte", es: "Contáctanos", en: "Contact Us" },
  "nav-acceder": { ca: "Accedir", es: "Acceder", en: "Login" },

  // HERO
  "hero-title": { ca: "Món Anime", es: "Mundo Anime", en: "Anime World" },
  "hero-subtitle": {
    ca: "La major col·lecció d'Animes del món",
    es: "La mayor colección de Animes a demanda del mundo",
    en: "The world's largest collection of on-demand Anime",
  },

  "hero-reg-btn": {
    ca: "Registra't ara",
    es: "Regístrate ahora",
    en: "Register now",
  },

  // SIDEBAR
  "sidebar-title": {
    ca: "Últims Episodis",
    es: "Últimos Episodios - Películas",
    en: "Latest Episodes",
  },

  "sidebar-fav": {
    ca: "Els meus favorits",
    es: "Mis Favoritos",
    en: "My Favorites",
  },

  "btn-add-fav": {
    ca: "Afegir",
    es: "Añadir",
    en: "Add",
  },

  // SIDEBAR EPISODIOS
  "sidebar-ep1": {
    ca: "Kimetsu No Yaiba - Episodis",
    es: "Kimetsu No Yaiba - Episodios",
    en: "Kimetsu No Yaiba - Episodes",
  },

  "sidebar-ep2": {
    ca: "Naruto Shippuden - Episodis",
    es: "Naruto Shippuden - Episodios",
    en: "Naruto Shippuden - Episodes",
  },

  "sidebar-ep3": {
    ca: "Tokyo Revengers - Episodis",
    es: "Tokyo Revengers - Episodios",
    en: "Tokyo Revengers - Episodes",
  },

  "sidebar-ep4": {
    ca: "Attack on Titan - Episodis",
    es: "Attack on Titan - Episodios",
    en: "Attack on Titan - Episodes",
  },

  "sidebar-ep5": {
    ca: "Chainsaw Man - Episodis",
    es: "Chainsaw Man - Episodios",
    en: "Chainsaw Man - Episodes",
  },

  "sidebar-ep6": {
    ca: "Dragon Ball Super - Episodis",
    es: "Dragon Ball Super - Episodios",
    en: "Dragon Ball Super - Episodes",
  },

  "sidebar-ep7": {
    ca: "One Piece - Episodis",
    es: "One Piece - Episodios",
    en: "One Piece - Episodes",
  },

  "sidebar-ep8": {
    ca: "Lord of Mysteries - Episodis",
    es: "Lord of Mysteries - Episodios",
    en: "Lord of Mysteries - Episodes",
  },

  "sidebar-ep9": {
    ca: "Death Note - Episodis",
    es: "Death Note - Episodios",
    en: "Death Note - Episodes",
  },

  "sidebar-ep10": {
    ca: "Fullmetal Alchemist - Episodis",
    es: "Fullmetal Alchemist - Episodios",
    en: "Fullmetal Alchemist - Episodes",
  },

  "sidebar-ep11": {
    ca: "Hunter x Hunter - Episodis",
    es: "Hunter x Hunter - Episodios",
    en: "Hunter x Hunter - Episodes",
  },

  "sidebar-ep12": {
    ca: "Jujutsu Kaisen - Episodis",
    es: "Jujutsu Kaisen - Episodios",
    en: "Jujutsu Kaisen - Episodes",
  },

  "sidebar-ep13": {
    ca: "Més Episodis...",
    es: "Más Episodios...",
    en: "More Episodes...",
  },

  // EPISODIOS / TARJETAS
  "ep-1-title": {
    ca: "Kimetsu No Yaiba - Episodi Estrena",
    es: "Kimetsu No Yaiba - Episodio Estreno",
    en: "Kimetsu No Yaiba - Premiere Episode",
  },

  "ep-1-desc": {
    ca: "Un episodi ple d'acció i emocions.",
    es: "Un episodio lleno de acción y emociones.",
    en: "An episode full of action and emotions.",
  },

  "ep-2-title": {
    ca: "Attack on Titan - Episodi Estrena",
    es: "Attack on Titan - Episodio Estreno",
    en: "Attack on Titan - Premiere Episode",
  },

  "ep-2-desc": {
    ca: "Un món al límit de l'extinció.",
    es: "Un mundo al borde de la extinción.",
    en: "A world on the brink of extinction.",
  },

  "ep-3-title": {
    ca: "Dragon Ball Super - Episodi Estrena",
    es: "Dragon Ball Super - Episodio Estreno",
    en: "Dragon Ball Super - Premiere Episode",
  },

  "ep-3-desc": {
    ca: "Torna Dragon Ball amb una nova sèrie després de molts anys.",
    es: "Vuelve Dragon Ball con una nueva serie tras muchos años.",
    en: "Dragon Ball returns with a new series after many years.",
  },

  "ep-4-title": {
    ca: "Naruto Shippuden - Episodi Estrena",
    es: "Naruto Shippuden - Episodio Estreno",
    en: "Naruto Shippuden - Premiere Episode",
  },

  "ep-4-desc": {
    ca: "Moments decisius que canviaran la història.",
    es: "Momentos decisivos que cambiarán la historia.",
    en: "Decisive moments that will change the story.",
  },

  "ep-5-title": {
    ca: "Jujutsu Kaisen - Episodi Estrena",
    es: "Jujutsu Kaisen - Episodio Estreno",
    en: "Jujutsu Kaisen - Premiere Episode",
  },

  "ep-5-desc": {
    ca: "Així s'escriu la llegenda dels bruixots i del poder que pot destruir-ho tot.",
    es: "Así se escribe la leyenda de los hechiceros y del poder que puede destruirlo todo.",
    en: "This is how the legend of sorcerers and all-powerful force is written.",
  },

  "ep-6-title": {
    ca: "Lord of Mysteries - Episodi Estrena",
    es: "Lord of Mysteries - Episodio Estreno",
    en: "Lord of Mysteries - Premiere Episode",
  },

  "ep-6-desc": {
    ca: "Aquesta és la llegenda d'un potencial il·limitat... i d'un perill indescriptible.",
    es: "Esta es la leyenda de un potencial ilimitado... y de un peligro indescriptible.",
    en: "This is the legend of unlimited potential... and an indescribable danger.",
  },

  "ep-7-title": {
    ca: "Tokyo Revengers - Episodi Estrena",
    es: "Tokyo Revengers - Episodio Estreno",
    en: "Tokyo Revengers - Premiere Episode",
  },

  "ep-7-desc": {
    ca: "El protagonista descobreix un nou poder.",
    es: "El protagonista descubre un nuevo poder.",
    en: "The protagonist discovers a new power.",
  },

  "ep-8-title": {
    ca: "One Piece - Episodi Estrena",
    es: "One Piece - Episodio Estreno",
    en: "One Piece - Premiere Episode",
  },

  "ep-8-desc": {
    ca: "Embarca't en el viatge de la teva vida amb One Piece.",
    es: "Embárcate en el viaje de tu vida con One Piece.",
    en: "Embark on the adventure of a lifetime with One Piece.",
  },

  "ep-9-title": {
    ca: "Hunter x Hunter - Episodi Estrena",
    es: "Hunter x Hunter - Episodio Estreno",
    en: "Hunter x Hunter - Premiere Episode",
  },

  "ep-9-desc": {
    ca: "Acompanya en Gon en la seva aventura per convertir-se en un Cacador llegendari.",
    es: "Acompaña a Gon en su aventura para convertirse en un legendario Cazador.",
    en: "Join Gon on his adventure to become a legendary Hunter.",
  },

  "btn-watch": { ca: "Veure ara", es: "Ver ahora", en: "Watch now" },

  // video welcome message
  "welcome-message": {
    ca: "Benvinguts!",
    es: "¡Bienvenidos!",
    en: "Welcome!",
  },

  // SOBRE MI
  "about-title": {
    ca: "Sobre la Pàgina",
    es: "Sobre la Página",
    en: "About the Page",
  },

  "about-content": {
    es: "¡Hola! Bienvenido a Z Animation. He creado este espacio para compartir los mejores estrenos del anime. Podrás encontrar una selección de mis animes favoritos, con reseñas y enlaces para verlos. ¡Disfrútalos!",
    ca: "Hola! Benvingut a Z Animation. He creat aquest espai per compartir els millors estrenes de l'anime. Podràs trobar una selecció dels meus animes preferits, amb ressenyes i enllaços per veure'ls. Gaudeix-los!",
    en: "Hello! Welcome to Z Animation. I created this space to share the best anime premieres. You can find a selection of my favorite animes, with reviews and links to watch them. Enjoy!",
  },

  "about-audio-title": {
    ca: "Presentació",
    es: "Presentación",
    en: "Presentation",
  },

  // CONTACTO
  "contact-title": { ca: "Contacta'ns", es: "Contáctanos", en: "Contact Us" },
  "contact-form-title": {
    ca: "Formulari de Contacte",
    es: "Formulario de Contacto",
    en: "Contact Form",
  },

  "contact-name": { ca: "Nom", es: "Nombre", en: "Name" },
  "contact-name-placeholder": {
    ca: "El teu nom",
    es: "Tu nombre",
    en: "Your name",
  },

  "contact-email": {
    ca: "Correu Electrònic:",
    es: "Correo Electrónico:",
    en: "Email:",
  },

  "contact-email-placeholder": {
    ca: "El teu correu electrònic",
    es: "Tu correo electrónico",
    en: "Your email",
  },

  "contact-message": { ca: "Missatge", es: "Mensaje", en: "Message" },
  "contact-message-placeholder": {
    ca: "Escriu el teu missatge...",
    es: "Escribe tu mensaje...",
    en: "Write your message...",
  },

  "contact-submit": { ca: "Enviat", es: "Enviar", en: "Send" },
  "contact-reset": { ca: "Esborrar", es: "Borrar", en: "Reset" },
  "contact-info": {
    ca: "Informació de Contacte",
    es: "Información de Contacto",
    en: "Contact Information",
  },

  "contact-email-info": {
    ca: "Correu Electrònic:",
    es: "Correo Electrónico:",
    en: "Email:",
  },
  "contact-phone": { ca: "Telèfon:", es: "Teléfono:", en: "Phone:" },
  "contact-address": { ca: "Adreça:", es: "Dirección:", en: "Address:" },

  // FOOTER
  "footer-copy": {
    es: "©2026 Z Animation | Derechos Reservados",
    ca: "©2026 Z Animation | Drets Reservats",
    en: "©2026 Z Animation | All Rights Reserved",
  },
  "social-networks": {
    ca: "Segueix-nos a les nostres xarxes socials",
    es: "Síguenos en nuestras redes sociales",
    en: "Follow us on our social media",
  },

  // REGISTRO
  "reg-titulo-hola": {
    ca: "¡Hola!",
    es: "¡Hola!",
    en: "Hello!",
  },
  "reg-subtitle-alegra": {
    ca: "Ens alegra que estiguis aquí",
    es: "Nos alegra tenerte aquí",
    en: "We're glad to have you here",
  },
  "reg-usuario-placeholder": {
    ca: "Usuari",
    es: "Usuario",
    en: "Username",
  },
  "reg-email-placeholder": {
    ca: "exemple@correu.com",
    es: "ejemplo@correo.com",
    en: "example@email.com",
  },
  "reg-pass-placeholder": {
    ca: "Contrasenya",
    es: "Contraseña",
    en: "Password",
  },
  "reg-pass-confirm-placeholder": {
    ca: "Repeteix la contrasenya",
    es: "Repite la contraseña",
    en: "Repeat the password",
  },
  "reg-btn-crear": {
    ca: "Crear Compte",
    es: "Crear Cuenta",
    en: "Create Account",
  },

  // LABELS DEL FORMULARIO DE REGISTRO
  "reg-label-usuario": {
    ca: "Usuari",
    es: "Usuario",
    en: "Username",
  },
  "reg-label-email": {
    ca: "Correu Electrònic",
    es: "Email",
    en: "Email",
  },
  "reg-label-pass": {
    ca: "Contrasenya",
    es: "Contraseña",
    en: "Password",
  },
  "reg-label-pass-confirm": {
    ca: "Confirmar Contrasenya",
    es: "Confirmar Contraseña",
    en: "Confirm Password",
  },

  "reg-link-signin": {
    ca: "¿Ja tens compte?",
    es: "¿Ya tienes cuenta?",
    en: "Already have an account?",
  },
  "reg-link-signin-btn": {
    ca: "Inicia sessió aquí",
    es: "Inicia sesión aquí",
    en: "Sign in here",
  },

  // GRÁFICO DE ESTADÍSTICAS
  "chart-label": {
    ca: "Milions de Visualitzacions",
    es: "Millones de Visualizaciones",
    en: "Millions of Views",
  },
  "chart-accion": { ca: "Acció", es: "Acción", en: "Action" },
  "chart-comedia": { ca: "Comèdia", es: "Comedia", en: "Comedy" },
  "chart-drama": { ca: "Drama", es: "Drama", en: "Drama" },
  "chart-fantasia": { ca: "Fantasia", es: "Fantasía", en: "Fantasy" },
  "chart-terror": { ca: "Terror", es: "Terror", en: "Horror" },
  "chart-btn-line": {
    ca: "Canviar a Gràfic de Línies",
    es: "Cambiar a Gráfico de Líneas",
    en: "Switch to Line Chart",
  },
  "chart-btn-bar": {
    ca: "Canviar a Gràfic de Barres",
    es: "Cambiar a Gráfico de Barras",
    en: "Switch to Bar Chart",
  },

  // ESTADÍSTICAS Y OTROS TÍTULOS
  "stats-title": {
    ca: "Estadístiques i Interactivitat",
    es: "Estadísticas e Interactividad",
    en: "Statistics and Interactivity",
  },
  "chart-title": {
    ca: "Visualitzacions Mensuals per Gènere",
    es: "Visualizaciones Mensuales por Género",
    en: "Monthly Views by Genre",
  },
  "simulator-particles-title": {
    ca: "Simulador de Partícules 2D",
    es: "Simulador de Partículas 2D",
    en: "2D Particle Simulator",
  },
  "simulator-particles-hint": {
    ca: "(Mou el cursor dins del quadre inferior per crear esteles)",
    es: "(Mueve el cursor dentro del recuadro inferior para crear estelas)",
    en: "(Move the cursor inside the frame below to create trails)",
  },
};

// FASE 3: Función principal para cambiar idioma de la página
function setLanguage(lang) {
  console.log("setLanguage llamado con:", lang);
  console.log("Diccionario disponible:", typeof translations !== "undefined");

  // Actualizo todos los elementos con ID según el diccionario
  let elementosActualizados = 0;
  for (const id in translations) {
    const el = document.getElementById(id);
    if (el) {
      if (translations[id] && translations[id][lang]) {
        el.textContent = translations[id][lang];
        elementosActualizados++;
      }
    }
  }
  console.log("Elementos actualizados:", elementosActualizados);

  // Actualizo placeholders de inputs para formularios de contacto
  document.querySelectorAll("[data-placeholder-id]").forEach((input) => {
    const key = input.dataset.placeholderId;
    if (translations[key] && translations[key][lang]) {
      input.placeholder = translations[key][lang];
    }
  });

  // Actualizo elementos con data-i18n atributo (esto es útil para textos dentro de etiquetas que no tienen ID)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // Actualizar texto del botón del gráfico si existe
  const btnChart = document.getElementById("js-interact-p13-btn-chart");
  if (btnChart) {
    // Obtener el estado actual del gráfico
    const currentChartType = localStorage.getItem("currentChartType") || "bar";
    const btnKey =
      currentChartType === "bar" ? "chart-btn-line" : "chart-btn-bar";
    if (translations[btnKey] && translations[btnKey][lang]) {
      btnChart.textContent = translations[btnKey][lang];
    }
  }

  // Reinicializar gráfico para actualizar etiquetas e idioma
  if (typeof window.reinitChartJS === "function") {
    console.log("Reinicializando gráfico...");
    window.reinitChartJS();
  }
}

// Fase 4: Almaceno las persistencias de preferencias de idioma
// Guardo las preferencias de idioma en localStorage
function savePreference(lang) {
  localStorage.setItem("userLang", lang);
}

// Fase 4: Cargo las preferencias de idioma al iniciar la página
// Cargo preferencias al iniciar de la página para mantener el idioma seleccionado
function loadPreference() {
  let preferredLang = localStorage.getItem("userLang") || "es";
  setLanguage(preferredLang);
}

// Evento de cambio de idioma
const selector = document.getElementById("select-language");
console.log("Buscando selector #select-language...");
console.log("Selector encontrado:", selector !== null);

if (selector) {
  selector.addEventListener("click", (event) => {
    console.log("Click en selector de idioma:", event.target);
    if (!event.target.matches("button[data-lang]")) {
      console.log("No coincide con button[data-lang]");
      return;
    }
    const selectedLang = event.target.dataset.lang;
    console.log(">>>>>> IDIOMA SELECCIONADO:", selectedLang);
    setLanguage(selectedLang);
    savePreference(selectedLang);
    console.log(">>>>>> IDIOMA GUARDADO:", selectedLang);
  });
  console.log("Event listener agregado al selector");
} else {
  console.error("ERROR: No se encontró elemento #select-language");
}

// Función global para probar manualmente desde la consola
window.testChangeLanguage = function (lang) {
  console.log("PRUEBA MANUAL: Cambiando a", lang);
  setLanguage(lang);
  savePreference(lang);
  console.log("PRUEBA COMPLETADA");
};

// Función global para ver idioma actual
window.getCurrentLang = function () {
  const lang = localStorage.getItem("userLang") || "es";
  console.log("Idioma actual:", lang);
  return lang;
};

// Ejecuto al cargar la página
window.onload = loadPreference;
