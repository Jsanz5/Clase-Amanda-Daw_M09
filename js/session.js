// Z Animation — Gestión de sesión de usuario
(function () {
  const SESSION_KEY = 'z_sesion';
  const USERS_KEY   = 'z_usuarios';

  // ── Helpers de localStorage ──────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  }
  function saveSession(data) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }

  function getInitials(name) {
    return (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    if (window.ZNotify) ZNotify.logoutExitoso();
    setTimeout(() => { window.location.href = resolveRoot('index.html'); }, 1200);
  }

  // Resolve path to root (works when pages are at root level)
  function resolveRoot(file) {
    return './' + file;
  }

  // ── Inyección de estilos ─────────────────────────────────────────────────
  (function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ── Botón usuario navbar ── */
      .btn-usuario-nav {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(98, 167, 251, 0.12);
        border: 1px solid rgba(98, 167, 251, 0.28);
        border-radius: 999px;
        padding: 5px 14px 5px 6px;
        cursor: pointer;
        color: #f6f9ff;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Inter', system-ui, sans-serif;
        transition: background 0.2s, border-color 0.2s;
      }
      .btn-usuario-nav:hover {
        background: rgba(98, 167, 251, 0.22);
        border-color: rgba(98, 167, 251, 0.5);
      }
      .usuario-nav-nombre {
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .usuario-chevron {
        font-size: 11px;
        color: rgba(246,249,255,0.55);
        transition: transform 0.22s ease;
      }

      /* ── Avatares ── */
      .avatar-nav, .avatar-dropdown, .z-panel-avatar {
        border-radius: 50%;
        overflow: hidden;
        background: linear-gradient(135deg, #62a7fb, #cf7609);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: #fff;
        flex-shrink: 0;
      }
      .avatar-nav { width: 30px; height: 30px; font-size: 12px; }
      .avatar-dropdown { width: 42px; height: 42px; font-size: 16px; }
      .z-panel-avatar { width: 90px; height: 90px; font-size: 28px; }
      .avatar-nav img, .avatar-dropdown img, .z-panel-avatar img {
        width: 100%; height: 100%; object-fit: cover;
      }

      /* ── Dropdown usuario ── */
      #nav-usuario-item { position: relative; }
      .usuario-dropdown {
        position: absolute;
        right: 0;
        top: calc(100% + 10px);
        min-width: 230px;
        background: linear-gradient(145deg, rgba(10,20,44,0.97), rgba(8,16,36,0.97));
        border: 1px solid rgba(98,167,251,0.18);
        border-radius: 16px;
        box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 6px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px) scale(0.97);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 9990;
      }
      .usuario-dropdown.open {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0) scale(1);
      }
      .usuario-dropdown-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 10px 8px;
      }
      .usuario-dropdown-nombre {
        font-weight: 700;
        font-size: 14px;
        color: #f6f9ff;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .usuario-dropdown-email {
        font-size: 12px;
        color: rgba(246,249,255,0.5);
        font-family: 'Inter', system-ui, sans-serif;
      }
      .usuario-dropdown-divider {
        border-color: rgba(255,255,255,0.08);
        margin: 4px 6px;
      }
      .usuario-dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        background: none;
        border: none;
        color: rgba(246,249,255,0.82);
        font-size: 13.5px;
        font-family: 'Inter', system-ui, sans-serif;
        padding: 9px 12px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.18s, color 0.18s;
        text-align: left;
      }
      .usuario-dropdown-item:hover {
        background: rgba(98,167,251,0.14);
        color: #f6f9ff;
      }
      .usuario-logout-btn { color: rgba(248,113,113,0.85) !important; }
      .usuario-logout-btn:hover {
        background: rgba(248,113,113,0.12) !important;
        color: #f87171 !important;
      }

      /* ── Panel overlay ── */
      #z-user-panel {
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      #z-user-panel.open {
        opacity: 1;
        pointer-events: all;
      }

      /* ── Panel drawer (slide desde la derecha) ── */
      .z-panel-modal {
        position: absolute;
        right: 0; top: 0; bottom: 0;
        width: min(440px, 100vw);
        background: linear-gradient(160deg, rgba(10,18,38,0.99) 0%, rgba(8,14,28,0.99) 100%);
        border-left: 1px solid rgba(98,167,251,0.15);
        box-shadow: -24px 0 64px rgba(0,0,0,0.55);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(98,167,251,0.25) transparent;
        transform: translateX(100%);
        transition: transform 0.36s cubic-bezier(0.32, 0.72, 0, 1);
      }
      #z-user-panel.open .z-panel-modal {
        transform: translateX(0);
      }
      .z-panel-modal::-webkit-scrollbar { width: 5px; }
      .z-panel-modal::-webkit-scrollbar-thumb { background: rgba(98,167,251,0.2); border-radius: 99px; }

      /* ── Cabecera del panel ── */
      .z-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px 24px 16px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        position: sticky;
        top: 0;
        background: rgba(10,18,38,0.97);
        backdrop-filter: blur(10px);
        z-index: 2;
      }
      .z-panel-title {
        font-size: 18px;
        font-weight: 700;
        color: #f6f9ff;
        margin: 0;
        font-family: 'Poppins', sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .z-panel-title i { color: #62a7fb; }
      .z-panel-close {
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(246,249,255,0.6);
        border-radius: 10px;
        width: 34px; height: 34px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        font-size: 15px;
        transition: background 0.2s, color 0.2s;
      }
      .z-panel-close:hover { background: rgba(248,113,113,0.18); color: #f87171; }

      /* ── Secciones del panel ── */
      .z-panel-section { padding: 22px 24px; }
      .z-panel-section-title {
        font-size: 13px;
        font-weight: 700;
        color: rgba(246,249,255,0.45);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 16px;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .z-panel-divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 0; }

      /* ── Avatar wrap ── */
      .z-panel-avatar-wrap {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .z-panel-avatar-actions { display: flex; flex-direction: column; gap: 8px; }
      .z-panel-btn-upload {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: rgba(98,167,251,0.14);
        border: 1px solid rgba(98,167,251,0.3);
        color: #62a7fb;
        border-radius: 999px;
        padding: 8px 18px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .z-panel-btn-upload:hover { background: rgba(98,167,251,0.25); }
      .z-panel-hint {
        font-size: 11.5px;
        color: rgba(246,249,255,0.35);
        margin: 0;
        font-family: 'Inter', system-ui, sans-serif;
      }

      /* ── Campos del panel ── */
      .z-panel-field { margin-bottom: 14px; }
      .z-panel-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: rgba(246,249,255,0.6);
        margin-bottom: 6px;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .z-panel-input {
        width: 100%;
        background: rgba(10,24,52,0.75);
        border: 1px solid rgba(148,190,255,0.28);
        border-radius: 12px;
        padding: 10px 44px 10px 14px;
        color: #f6f9ff;
        font-size: 14px;
        font-family: 'Inter', system-ui, sans-serif;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .z-panel-input:focus {
        border-color: #62a7fb;
        box-shadow: 0 0 0 3px rgba(98,167,251,0.18);
      }
      .z-panel-field .password-wrapper { position: relative; display: flex; align-items: center; }
      .z-panel-field .toggle-pass-btn {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: rgba(148,190,255,0.5);
        cursor: pointer;
        font-size: 15px;
        padding: 4px;
        line-height: 1;
        transition: color 0.2s;
      }
      .z-panel-field .toggle-pass-btn:hover { color: #62a7fb; }

      /* ── Botones del panel ── */
      .z-panel-btn-primary {
        width: 100%;
        margin-top: 6px;
        padding: 11px;
        border-radius: 999px;
        border: 0;
        color: #fff;
        background: linear-gradient(135deg, #79beff, #62a7fb, #cf7609);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        font-family: 'Inter', system-ui, sans-serif;
        transition: opacity 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .z-panel-btn-primary:hover { opacity: 0.88; }
      .z-panel-btn-logout {
        width: 100%;
        padding: 11px;
        border-radius: 999px;
        border: 1px solid rgba(248,113,113,0.3);
        color: #f87171;
        background: rgba(248,113,113,0.08);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        font-family: 'Inter', system-ui, sans-serif;
        transition: background 0.2s, border-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .z-panel-btn-logout:hover {
        background: rgba(248,113,113,0.18);
        border-color: rgba(248,113,113,0.55);
      }

      /* ── Responsive navbar (menú colapsado ≤991px) ── */
      @media (max-width: 991px) {
        #nav-usuario-item {
          position: static !important;
          width: 100%;
        }
        .btn-usuario-nav {
          width: 100%;
          justify-content: flex-start;
          border-radius: 12px;
          padding: 9px 14px;
          margin: 2px 0;
          background: rgba(98, 167, 251, 0.08);
          border-color: rgba(98, 167, 251, 0.18);
          border-radius: 12px;
        }
        .usuario-nav-nombre {
          display: block !important;
          max-width: unset;
          flex: 1;
        }
        .usuario-chevron { margin-left: auto; }
        .usuario-dropdown {
          position: static !important;
          top: auto !important;
          right: auto !important;
          transform: none !important;
          width: 100%;
          min-width: unset;
          box-shadow: none;
          border-radius: 12px;
          margin-top: 6px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transition: max-height 0.3s ease, opacity 0.25s ease !important;
        }
        .usuario-dropdown.open {
          max-height: 400px;
          opacity: 1;
          pointer-events: all;
          transform: none !important;
        }
      }

      /* ── Responsive panel (móvil) ── */
      @media (max-width: 575px) {
        .z-panel-modal {
          width: 100vw;
          border-left: none;
        }
        .z-panel-section { padding: 18px 16px; }
        .z-panel-header { padding: 18px 16px 14px; }
        .z-panel-avatar-wrap { flex-direction: column; align-items: flex-start; gap: 14px; }
      }
    `;
    document.head.appendChild(style);
  })();

  // ── Lógica principal (espera al DOM) ─────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const sesion = getSession();

    if (sesion) {
      setupLoggedInNavbar(sesion);
      // Ocultar botón "Regístrate ahora" del hero
      const heroRegBtn = document.getElementById('hero-reg-btn');
      if (heroRegBtn) {
        const wrap = heroRegBtn.closest('.btn-registrar') || heroRegBtn;
        wrap.style.display = 'none';
      }
    }
    // Si no hay sesión, el navbar queda como está (botón Acceder)
  });

  // ── Navbar con sesión activa ─────────────────────────────────────────────
  function setupLoggedInNavbar(sesion) {
    // Ocultar botón Acceder
    const accederEl = document.getElementById('nav-acceder');
    if (accederEl) {
      const accederLi = accederEl.closest('li') || accederEl;
      accederLi.style.display = 'none';
    }
    // Ocultar avatar decorativo
    const heroAvatar = document.querySelector('.hero-avatar');
    if (heroAvatar) {
      const li = heroAvatar.closest('li');
      if (li) li.style.display = 'none';
    }

    const initials = getInitials(sesion.usuario);
    const avatarSrc = sesion.avatar;
    const avatarHTML = avatarSrc
      ? `<img src="${avatarSrc}" alt="Avatar">`
      : initials;
    const avatarClass = avatarSrc ? 'avatar-nav' : 'avatar-nav';

    const userLi = document.createElement('li');
    userLi.className = 'nav-item ms-2';
    userLi.id = 'nav-usuario-item';
    userLi.innerHTML = `
      <button class="btn-usuario-nav" id="btn-usuario-nav" aria-label="Menú de usuario" aria-expanded="false">
        <div class="${avatarClass}" id="nav-avatar">${avatarHTML}</div>
        <span class="usuario-nav-nombre">${sesion.usuario}</span>
        <i class="bi bi-chevron-down usuario-chevron"></i>
      </button>
      <div class="usuario-dropdown" id="usuario-dropdown" role="menu">
        <div class="usuario-dropdown-header">
          <div class="${avatarSrc ? 'avatar-dropdown' : 'avatar-dropdown'}" id="dropdown-avatar">${avatarHTML}</div>
          <div>
            <div class="usuario-dropdown-nombre">${sesion.usuario}</div>
            <div class="usuario-dropdown-email">${sesion.email}</div>
          </div>
        </div>
        <hr class="usuario-dropdown-divider">
        <button class="usuario-dropdown-item" id="btn-abrir-panel" role="menuitem">
          <i class="bi bi-person-gear"></i> <span data-i18n="session-mi-panel">Mi panel</span>
        </button>
        <hr class="usuario-dropdown-divider">
        <button class="usuario-dropdown-item usuario-logout-btn" id="btn-logout-nav" role="menuitem">
          <i class="bi bi-box-arrow-right"></i> <span data-i18n="session-cerrar-sesion">Cerrar sesión</span>
        </button>
      </div>
    `;

    const navList = document.querySelector('.navbar-nav');
    if (navList) navList.appendChild(userLi);

    // Toggle dropdown
    const btnNav    = document.getElementById('btn-usuario-nav');
    const dropdown  = document.getElementById('usuario-dropdown');

    btnNav.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btnNav.setAttribute('aria-expanded', isOpen);
      btnNav.querySelector('.usuario-chevron').style.transform = isOpen ? 'rotate(180deg)' : '';
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btnNav.setAttribute('aria-expanded', 'false');
      btnNav.querySelector('.usuario-chevron').style.transform = '';
    });

    document.getElementById('btn-logout-nav').addEventListener('click', logout);
    document.getElementById('btn-abrir-panel').addEventListener('click', () => {
      dropdown.classList.remove('open');
      openUserPanel();
    });

    // Construir panel
    buildUserPanel(sesion);
  }

  // ── Panel de usuario ─────────────────────────────────────────────────────
  function buildUserPanel(sesion) {
    if (document.getElementById('z-user-panel')) return;

    const initials  = getInitials(sesion.usuario);
    const avatarSrc = sesion.avatar;
    const avatarHTML = avatarSrc ? `<img src="${avatarSrc}" alt="Avatar">` : initials;

    const panel = document.createElement('div');
    panel.id = 'z-user-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Panel de usuario');
    panel.innerHTML = `
      <div class="z-panel-modal">

        <!-- Cabecera -->
        <div class="z-panel-header">
          <h2 class="z-panel-title"><i class="bi bi-person-circle"></i> <span data-i18n="session-mi-perfil">Mi perfil</span></h2>
          <button class="z-panel-close" id="z-panel-close" aria-label="Cerrar panel">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Foto de perfil -->
        <div class="z-panel-section">
          <p class="z-panel-section-title" data-i18n="session-foto-perfil">Foto de perfil</p>
          <div class="z-panel-avatar-wrap">
            <div class="z-panel-avatar" id="z-panel-avatar-preview">${avatarHTML}</div>
            <div class="z-panel-avatar-actions">
              <label class="z-panel-btn-upload" for="z-panel-file-input">
                <i class="bi bi-camera-fill"></i> <span data-i18n="session-cambiar-foto">Cambiar foto</span>
              </label>
              <input type="file" id="z-panel-file-input" accept="image/*" style="display:none">
              <p class="z-panel-hint" data-i18n="session-foto-hint">JPG, PNG o GIF · Máx 2 MB</p>
            </div>
          </div>
        </div>

        <div class="z-panel-divider"></div>

        <!-- Cambiar contraseña -->
        <div class="z-panel-section">
          <p class="z-panel-section-title" data-i18n="session-cambiar-pass">Cambiar contraseña</p>
          <form id="z-panel-pass-form" novalidate>
            <div class="z-panel-field">
              <label class="z-panel-label" for="z-pass-actual" data-i18n="session-label-pass-actual">Contraseña actual</label>
              <div class="password-wrapper">
                <input type="password" class="z-panel-input" id="z-pass-actual" placeholder="Tu contraseña actual" data-placeholder-id="session-placeholder-pass-actual" autocomplete="current-password">
                <button type="button" class="toggle-pass-btn" data-target="z-pass-actual" aria-label="Mostrar"><i class="bi bi-eye"></i></button>
              </div>
            </div>
            <div class="z-panel-field">
              <label class="z-panel-label" for="z-pass-nueva" data-i18n="session-label-pass-nueva">Nueva contraseña</label>
              <div class="password-wrapper">
                <input type="password" class="z-panel-input" id="z-pass-nueva" placeholder="Mínimo 8 caracteres" data-placeholder-id="session-placeholder-pass-nueva" autocomplete="new-password">
                <button type="button" class="toggle-pass-btn" data-target="z-pass-nueva" aria-label="Mostrar"><i class="bi bi-eye"></i></button>
              </div>
            </div>
            <div class="z-panel-field">
              <label class="z-panel-label" for="z-pass-confirmar" data-i18n="session-label-pass-confirmar">Confirmar nueva contraseña</label>
              <div class="password-wrapper">
                <input type="password" class="z-panel-input" id="z-pass-confirmar" placeholder="Repite la nueva contraseña" data-placeholder-id="session-placeholder-pass-confirmar" autocomplete="new-password">
                <button type="button" class="toggle-pass-btn" data-target="z-pass-confirmar" aria-label="Mostrar"><i class="bi bi-eye"></i></button>
              </div>
            </div>
            <button type="submit" class="z-panel-btn-primary">
              <i class="bi bi-shield-check"></i> <span data-i18n="session-actualizar-pass">Actualizar contraseña</span>
            </button>
          </form>
        </div>

        <div class="z-panel-divider"></div>

        <!-- Cerrar sesión -->
        <div class="z-panel-section">
          <button class="z-panel-btn-logout" id="z-panel-btn-logout">
            <i class="bi bi-box-arrow-right"></i> <span data-i18n="session-cerrar-sesion">Cerrar sesión</span>
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(panel);

    // Cerrar
    document.getElementById('z-panel-close').addEventListener('click', closeUserPanel);
    panel.addEventListener('click', (e) => { if (e.target === panel) closeUserPanel(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeUserPanel(); });

    // Toggles de ojo
    panel.querySelectorAll('.toggle-pass-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = document.getElementById(this.dataset.target);
        const icon  = this.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'bi bi-eye-slash';
          this.setAttribute('aria-label', 'Ocultar');
        } else {
          input.type = 'password';
          icon.className = 'bi bi-eye';
          this.setAttribute('aria-label', 'Mostrar');
        }
      });
    });

    // Subir foto
    document.getElementById('z-panel-file-input').addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        if (window.ZNotify) ZNotify.archivoGrande();
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        const base64 = ev.target.result;
        // Actualizar preview del panel
        document.getElementById('z-panel-avatar-preview').innerHTML = `<img src="${base64}" alt="Avatar">`;
        // Actualizar sesión y lista de usuarios
        const s = getSession();
        s.avatar = base64;
        saveSession(s);
        const users = getUsers();
        const idx = users.findIndex(u => u.email === s.email);
        if (idx !== -1) { users[idx].avatar = base64; localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
        // Actualizar avatares del navbar
        ['nav-avatar', 'dropdown-avatar'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = `<img src="${base64}" alt="Avatar">`;
        });
        if (window.ZNotify) ZNotify.fotoPerfil();
      };
      reader.readAsDataURL(file);
    });

    // Cambiar contraseña
    document.getElementById('z-panel-pass-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const actual    = document.getElementById('z-pass-actual').value;
      const nueva     = document.getElementById('z-pass-nueva').value;
      const confirmar = document.getElementById('z-pass-confirmar').value;

      const s     = getSession();
      const users = getUsers();
      const user  = users.find(u => u.email === s.email);

      if (!actual || !nueva || !confirmar) {
        if (window.ZNotify) ZNotify.camposObligatorios(); return;
      }
      if (!user || user.password !== actual) {
        if (window.ZNotify) ZNotify.passwordIncorrecta(); return;
      }
      if (nueva.length < 8) {
        if (window.ZNotify) ZNotify.passwordCorta(); return;
      }
      if (nueva !== confirmar) {
        if (window.ZNotify) ZNotify.passwordNoCoincide(); return;
      }
      const idx = users.findIndex(u => u.email === s.email);
      users[idx].password = nueva;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      this.reset();
      if (window.ZNotify) ZNotify.passwordCambiada();
    });

    // Logout desde panel
    document.getElementById('z-panel-btn-logout').addEventListener('click', logout);
  }

  // ── API pública ──────────────────────────────────────────────────────────
  function openUserPanel() {
    const panel = document.getElementById('z-user-panel');
    if (panel) { panel.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeUserPanel() {
    const panel = document.getElementById('z-user-panel');
    if (panel) { panel.classList.remove('open'); document.body.style.overflow = ''; }
  }

  window.ZSession = { getSession, logout, openUserPanel, closeUserPanel };
})();
