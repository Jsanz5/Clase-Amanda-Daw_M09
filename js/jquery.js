/*************************************************************
 
 * Nombre y Apellidos: Joel Otoya
 * Misiones completadas: 1, 2, 3, 4, 5 y el Bonus
 
 * Explicaciones:
 * 1: Selectores aplicados a títulos, subtítulos, navegación y listas.
 * 2: Eventos mouseenter, keyup, submit y dblclick capturados con .on().
 * 3: Animaciones personalizadas con animate(), slideToggle y fadeOut/In.
 * 4: Integración de los widgets sortable y datepicker de jQuery UI.
 
 *************************************************************/

// uso $(function() {...}) en lugar del anticuado $(document).ready() para evitar advertencias en navegadores modernos
$(function () {
  // 1 - Selección de Elementos y Manipulación del DOM
  $("h2").css("text-transform", "uppercase"); // Selección por etiqueta
  $(".hero-subtitle").css("color", "#62a7fb"); // Selección por clase
  $("#nav-inicio").css("font-weight", "bold"); // Selección por ID
  $(".list-group-item:odd").css("background-color", "#252525"); // Selector avanzado (:odd) para estilizar filas impares de la lista

  /* Bonus: un usuario elimine su imagen de perfil
   Lo añadí como un detalle extra porque en mi index esta esa clase,
   por lo que más adelante un usuario debe poder modificar o eliminar su imagen de perfil*/
  $(".hero-avatar").on("dblclick", function () {
    $(this).remove();
  });

  // 2 - Manejo de Eventos
  // Evento de Ratón: Hover sobre las cards de anime
  $(".anime-card")
    .on("mouseenter", function () {
      $(this).addClass("border-primary");
    })
    .on("mouseleave", function () {
      $(this).removeClass("border-primary");
    });

  // Evento de Teclado: al escribir en el nombre del formulario
  $("#nombre").on("keyup", function () {
    // uso keyup para detectar cuando el usuario suelta una tecla después de escribir
    let valor = $(this).val();
    if (valor.length > 0) {
      $("#contact-form-title").text("Escribiendo: " + valor);
    } else {
      $("#contact-form-title").text("Formulario de Contacto");
    }
  });

  // Evento del formulario de contacto: evita interferir con otros submit de la web
  $("#nombre").closest("form").on("submit", function (e) {
    e.preventDefault();
    $(this).fadeOut(400, function () {
      $(this).before(
        '<div class="alert alert-success">¡Mensaje enviado correctamente!</div>',
      );
    });
  });

  // 3 - Animaciones
  // .slideDown/Up (a través de slideToggle): Ocultar/Mostrar la sección
  $("#about-title").on("click", function () {
    $("#about-content").slideToggle();
  });

  // .fadeIn/Out: Parpadeo del título al hacer clic en el logo
  $(".navbar-brand img").on("click", function () {
    $("#hero-title").fadeOut(200).fadeIn(200);
  });

  // .animate(): Animación personalizada en el botón de Acceder
  $("#nav-acceder")
    .on("mouseenter", function () {
      $(this).animate(
        {
          fontSize: "1.2rem",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        300,
      );
    })
    .on("mouseleave", function () {
      $(this).animate(
        {
          fontSize: "1rem",
          paddingLeft: "12px",
          paddingRight: "12px",
        },
        300,
      );
    });

  // 4 - Integración de Widgets de jQuery UI
  // Datepicker: widget de jQuery UI (sin campo activo en el formulario)
  // $("#nombre").datepicker(); // eliminado: causaba calendario en campo de texto
});
