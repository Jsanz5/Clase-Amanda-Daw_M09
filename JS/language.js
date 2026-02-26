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
    ca: "Correo Electrónico:",
    es: "Correo Electrónico:",
    en: "Email:",
  },

  "contact-email-placeholder": {
    ca: "Tu correo electrónico",
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

  "contact-phone": { ca: "Telèfon:", es: "Teléfono:", en: "Phone:" },
  "contact-address": { ca: "Adreça:", es: "Dirección:", en: "Address:" },

  // FOOTER
  "footer-copy": {
    ca: "© 2025 Z Animation | Drets Reservats",
    es: "© 2025 Z Animation | Derechos Reservados",
    en: "© 2025 Z Animation | All Rights Reserved",
  },
  "social-networks": {
    ca: "Segueix-nos a les nostres xarxes socials",
    es: "Síguenos en nuestras redes sociales",
    en: "Follow us on our social media",
  },
};

// FASE 3: Función principal para cambiar idioma de la página
function setLanguage(lang) {
  // Actualizo todos los elementos con ID según el diccionario
  for (const id in translations) {
    const el = document.getElementById(id);
    if (el && translations[id][lang]) {
      el.textContent = translations[id][lang];
    }
  }

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
if (selector) {
  selector.addEventListener("click", (event) => {
    if (!event.target.matches("button[data-lang]")) return;
    const selectedLang = event.target.dataset.lang;
    setLanguage(selectedLang);
    savePreference(selectedLang);
  });
}

// Ejecuto al cargar la página
window.onload = loadPreference;
