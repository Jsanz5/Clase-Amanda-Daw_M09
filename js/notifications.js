// Z Animation — Sistema de notificaciones toast modernas
(function () {
  const style = document.createElement('style');
  style.textContent = `
    #z-toast-container {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 99999;
      display: flex;
      flex-direction: column-reverse;
      gap: 10px;
      pointer-events: none;
    }

    .z-toast {
      pointer-events: all;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      min-width: 300px;
      max-width: 380px;
      padding: 14px 16px 18px 16px;
      border-radius: 18px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow:
        0 16px 48px rgba(0, 0, 0, 0.45),
        0 2px 8px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.07);
      color: #f6f9ff;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 13.5px;
      line-height: 1.5;
      position: relative;
      overflow: hidden;
      animation: z-slide-in 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .z-toast.z-exit {
      animation: z-slide-out 0.28s ease forwards;
    }

    .z-toast::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3.5px;
    }

    /* Tipos */
    .z-toast-success {
      background: linear-gradient(145deg, rgba(8, 38, 24, 0.93), rgba(6, 28, 18, 0.9));
      border-color: rgba(52, 211, 153, 0.22);
    }
    .z-toast-success::before { background: linear-gradient(180deg, #34d399, #10b981); }

    .z-toast-error {
      background: linear-gradient(145deg, rgba(40, 8, 16, 0.93), rgba(30, 5, 12, 0.9));
      border-color: rgba(248, 113, 113, 0.22);
    }
    .z-toast-error::before { background: linear-gradient(180deg, #f87171, #ef4444); }

    .z-toast-warning {
      background: linear-gradient(145deg, rgba(40, 26, 6, 0.93), rgba(30, 20, 4, 0.9));
      border-color: rgba(251, 191, 36, 0.22);
    }
    .z-toast-warning::before { background: linear-gradient(180deg, #fbbf24, #f59e0b); }

    .z-toast-info {
      background: linear-gradient(145deg, rgba(8, 20, 48, 0.93), rgba(6, 16, 38, 0.9));
      border-color: rgba(98, 167, 251, 0.22);
    }
    .z-toast-info::before { background: linear-gradient(180deg, #62a7fb, #4c96f2); }

    /* Icono */
    .z-toast-icon {
      font-size: 19px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .z-toast-success .z-toast-icon { color: #34d399; }
    .z-toast-error   .z-toast-icon { color: #f87171; }
    .z-toast-warning .z-toast-icon { color: #fbbf24; }
    .z-toast-info    .z-toast-icon { color: #62a7fb; }

    /* Texto */
    .z-toast-body { flex: 1; }
    .z-toast-title {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 3px;
      letter-spacing: 0.2px;
    }
    .z-toast-message {
      font-size: 12.5px;
      color: rgba(246, 249, 255, 0.72);
    }

    /* Botón cerrar */
    .z-toast-close {
      background: none;
      border: none;
      color: rgba(246, 249, 255, 0.4);
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
      transition: color 0.2s;
    }
    .z-toast-close:hover { color: rgba(246, 249, 255, 0.85); }

    /* Barra de progreso */
    .z-toast-bar {
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      border-radius: 0 0 18px 18px;
      animation: z-bar-shrink linear forwards;
    }
    .z-toast-success .z-toast-bar { background: linear-gradient(90deg, #34d399, #10b981); }
    .z-toast-error   .z-toast-bar { background: linear-gradient(90deg, #f87171, #ef4444); }
    .z-toast-warning .z-toast-bar { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
    .z-toast-info    .z-toast-bar { background: linear-gradient(90deg, #62a7fb, #4c96f2); }

    @keyframes z-slide-in {
      from { opacity: 0; transform: translateX(64px) scale(0.9); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes z-slide-out {
      from { opacity: 1; transform: translateX(0) scale(1); max-height: 120px; }
      to   { opacity: 0; transform: translateX(64px) scale(0.9); max-height: 0; padding: 0; margin: 0; }
    }
    @keyframes z-bar-shrink {
      from { width: 100%; }
      to   { width: 0%; }
    }

    @media (max-width: 480px) {
      #z-toast-container { bottom: 16px; right: 12px; left: 12px; }
      .z-toast { min-width: unset; max-width: 100%; }
    }
  `;
  document.head.appendChild(style);

  function getContainer() {
    let el = document.getElementById('z-toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'z-toast-container';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'false');
      document.body.appendChild(el);
    }
    return el;
  }

  const ICONS = {
    success: 'bi bi-check-circle-fill',
    error:   'bi bi-x-circle-fill',
    warning: 'bi bi-exclamation-triangle-fill',
    info:    'bi bi-info-circle-fill',
  };

  function showToast({ type = 'info', title = '', message = '', duration = 4200 } = {}) {
    const container = getContainer();
    const toast = document.createElement('div');
    toast.className = `z-toast z-toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <i class="${ICONS[type]} z-toast-icon"></i>
      <div class="z-toast-body">
        ${title   ? `<div class="z-toast-title">${title}</div>` : ''}
        ${message ? `<div class="z-toast-message">${message}</div>` : ''}
      </div>
      <button class="z-toast-close" aria-label="Cerrar notificación">
        <i class="bi bi-x"></i>
      </button>
      <div class="z-toast-bar" style="animation-duration:${duration}ms"></div>
    `;
    container.appendChild(toast);

    function dismiss() {
      toast.classList.add('z-exit');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }

    toast.querySelector('.z-toast-close').addEventListener('click', dismiss);
    let timer = setTimeout(dismiss, duration);
    let remaining = duration;
    let startedAt = Date.now();
    toast.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      remaining -= Date.now() - startedAt;
    });
    toast.addEventListener('mouseleave', () => {
      startedAt = Date.now();
      timer = setTimeout(dismiss, remaining);
    });

    return toast;
  }

  // ── Idioma activo ────────────────────────────────────────────────────────
  function getLang() {
    return localStorage.getItem('userLang') || 'es';
  }

  // ── Diccionario de mensajes ───────────────────────────────────────────────
  const MSG = {
    es: {
      registroExitoso:          { title: '¡Cuenta creada!',                message: (u) => `Bienvenido, <strong>${u}</strong>. Ya puedes iniciar sesión.` },
      loginExitoso:             { title: 'Sesión iniciada',                 message: (u) => `¡Hola de nuevo, <strong>${u}</strong>!` },
      logoutExitoso:            { title: 'Sesión cerrada',                  message: () => 'Has cerrado sesión correctamente.' },
      passwordNoCoincide:       { title: 'Las contraseñas no coinciden',    message: () => 'Comprueba que ambas contraseñas sean iguales.' },
      passwordCorta:            { title: 'Contraseña muy corta',            message: () => 'Debe tener al menos 8 caracteres.' },
      camposObligatorios:       { title: 'Campos incompletos',              message: () => 'Por favor, rellena todos los campos obligatorios.' },
      emailInvalido:            { title: 'Email no válido',                 message: () => 'Introduce una dirección de correo electrónico válida.' },
      emailYaRegistrado:        { title: 'Email ya registrado',             message: () => 'Ese correo ya tiene una cuenta. Inicia sesión.' },
      credencialesIncorrectas:  { title: 'Credenciales incorrectas',        message: () => 'Email o contraseña no válidos.' },
      passwordCambiada:         { title: 'Contraseña actualizada',          message: () => 'Tu contraseña se ha cambiado correctamente.' },
      passwordIncorrecta:       { title: 'Contraseña incorrecta',           message: () => 'La contraseña actual no es correcta.' },
      fotoPerfil:               { title: 'Foto de perfil actualizada',      message: () => 'Los cambios se han guardado correctamente.' },
      perfilActualizado:        { title: 'Perfil guardado',                 message: () => 'Tus datos de perfil han sido actualizados.' },
      archivoGrande:            { title: 'Archivo muy grande',              message: () => 'La imagen no puede superar 2 MB.' },
      favoritoAniadido:         { title: 'Añadido a lista',                 message: () => '' },
      favoritoEliminado:        { title: 'Eliminado de lista',              message: () => '' },
      errorGenerico:            { title: 'Algo ha salido mal',              message: () => 'Por favor, inténtalo de nuevo más tarde.' },
    },
    ca: {
      registroExitoso:          { title: 'Compte creat!',                   message: (u) => `Benvingut, <strong>${u}</strong>. Ja pots iniciar sessió.` },
      loginExitoso:             { title: 'Sessió iniciada',                  message: (u) => `Hola de nou, <strong>${u}</strong>!` },
      logoutExitoso:            { title: 'Sessió tancada',                   message: () => 'Has tancat sessió correctament.' },
      passwordNoCoincide:       { title: 'Les contrasenyes no coincideixen', message: () => 'Comprova que ambdues contrasenyes siguin iguals.' },
      passwordCorta:            { title: 'Contrasenya massa curta',          message: () => 'Ha de tenir almenys 8 caràcters.' },
      camposObligatorios:       { title: 'Camps incomplets',                 message: () => 'Si us plau, omple tots els camps obligatoris.' },
      emailInvalido:            { title: 'Correu no vàlid',                  message: () => 'Introdueix una adreça de correu electrònic vàlida.' },
      emailYaRegistrado:        { title: 'Correu ja registrat',              message: () => 'Aquest correu ja té un compte. Inicia sessió.' },
      credencialesIncorrectas:  { title: 'Credencials incorrectes',          message: () => 'Correu o contrasenya no vàlids.' },
      passwordCambiada:         { title: 'Contrasenya actualitzada',         message: () => "La teva contrasenya s'ha canviat correctament." },
      passwordIncorrecta:       { title: 'Contrasenya incorrecta',           message: () => 'La contrasenya actual no és correcta.' },
      fotoPerfil:               { title: 'Foto de perfil actualitzada',      message: () => "Els canvis s'han desat correctament." },
      perfilActualizado:        { title: 'Perfil desat',                     message: () => 'Les teves dades de perfil han estat actualitzades.' },
      archivoGrande:            { title: 'Fitxer massa gran',                message: () => 'La imatge no pot superar 2 MB.' },
      favoritoAniadido:         { title: 'Afegit a la llista',               message: () => '' },
      favoritoEliminado:        { title: 'Eliminat de la llista',            message: () => '' },
      errorGenerico:            { title: 'Alguna cosa ha anat malament',     message: () => 'Si us plau, torna-ho a intentar més tard.' },
    },
    en: {
      registroExitoso:          { title: 'Account created!',                message: (u) => `Welcome, <strong>${u}</strong>. You can now log in.` },
      loginExitoso:             { title: 'Logged in',                        message: (u) => `Welcome back, <strong>${u}</strong>!` },
      logoutExitoso:            { title: 'Logged out',                       message: () => 'You have been logged out successfully.' },
      passwordNoCoincide:       { title: 'Passwords do not match',           message: () => 'Make sure both passwords are the same.' },
      passwordCorta:            { title: 'Password too short',               message: () => 'Must be at least 8 characters.' },
      camposObligatorios:       { title: 'Incomplete fields',                message: () => 'Please fill in all required fields.' },
      emailInvalido:            { title: 'Invalid email',                    message: () => 'Please enter a valid email address.' },
      emailYaRegistrado:        { title: 'Email already registered',         message: () => 'That email already has an account. Please log in.' },
      credencialesIncorrectas:  { title: 'Incorrect credentials',            message: () => 'Invalid email or password.' },
      passwordCambiada:         { title: 'Password updated',                 message: () => 'Your password has been changed successfully.' },
      passwordIncorrecta:       { title: 'Wrong password',                   message: () => 'The current password is incorrect.' },
      fotoPerfil:               { title: 'Profile photo updated',            message: () => 'Changes have been saved successfully.' },
      perfilActualizado:        { title: 'Profile saved',                    message: () => 'Your profile data has been updated.' },
      archivoGrande:            { title: 'File too large',                   message: () => 'The image cannot exceed 2 MB.' },
      favoritoAniadido:         { title: 'Added to list',                    message: () => '' },
      favoritoEliminado:        { title: 'Removed from list',               message: () => '' },
      errorGenerico:            { title: 'Something went wrong',             message: () => 'Please try again later.' },
    },
  };

  function t(key, arg) {
    const lang = getLang();
    const dict = MSG[lang] || MSG.es;
    const entry = dict[key] || MSG.es[key];
    return { title: entry.title, message: entry.message(arg) };
  }

  // ── API pública ───────────────────────────────────────────────────────────
  window.ZNotify = {
    show:    showToast,
    success: (title, msg, dur) => showToast({ type: 'success', title, message: msg, duration: dur }),
    error:   (title, msg, dur) => showToast({ type: 'error',   title, message: msg, duration: dur }),
    warning: (title, msg, dur) => showToast({ type: 'warning', title, message: msg, duration: dur }),
    info:    (title, msg, dur) => showToast({ type: 'info',    title, message: msg, duration: dur }),

    // — Registro & Login —
    registroExitoso:         (u) => { const m = t('registroExitoso', u);        showToast({ type: 'success', ...m }); },
    loginExitoso:            (u) => { const m = t('loginExitoso', u);           showToast({ type: 'success', ...m }); },
    logoutExitoso:           ()  => { const m = t('logoutExitoso');             showToast({ type: 'info',    ...m }); },
    credencialesIncorrectas: ()  => { const m = t('credencialesIncorrectas');   showToast({ type: 'error',   ...m }); },
    emailYaRegistrado:       ()  => { const m = t('emailYaRegistrado');         showToast({ type: 'error',   ...m }); },

    // — Errores de formulario —
    passwordNoCoincide:  () => { const m = t('passwordNoCoincide');  showToast({ type: 'error',   ...m }); },
    passwordCorta:       () => { const m = t('passwordCorta');       showToast({ type: 'warning', ...m }); },
    camposObligatorios:  () => { const m = t('camposObligatorios');  showToast({ type: 'warning', ...m }); },
    emailInvalido:       () => { const m = t('emailInvalido');       showToast({ type: 'error',   ...m }); },

    // — Perfil —
    passwordCambiada:    () => { const m = t('passwordCambiada');    showToast({ type: 'success', ...m }); },
    passwordIncorrecta:  () => { const m = t('passwordIncorrecta');  showToast({ type: 'error',   ...m }); },
    fotoPerfil:          () => { const m = t('fotoPerfil');          showToast({ type: 'success', ...m }); },
    perfilActualizado:   () => { const m = t('perfilActualizado');   showToast({ type: 'success', ...m }); },
    archivoGrande:       () => { const m = t('archivoGrande');       showToast({ type: 'error',   ...m }); },

    // — Favoritos —
    favoritoAniadido:  (titulo) => { const m = t('favoritoAniadido', titulo);  showToast({ type: 'info', ...m, duration: 3000 }); },
    favoritoEliminado: (titulo) => { const m = t('favoritoEliminado', titulo); showToast({ type: 'info', ...m, duration: 3000 }); },

    // — Genérico —
    errorGenerico: () => { const m = t('errorGenerico'); showToast({ type: 'error', ...m }); },
  };
})();
