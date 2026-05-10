// Z Animation — Watchlist (Mi Lista)
(function () {

  // ── Estilos ───────────────────────────────────────────────────────────────
  (function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ── Botón watchlist en navbar (solo icono) ── */
      #nav-watchlist-item { position: relative; }

      .btn-watchlist-toggle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(251, 191, 36, 0.12);
        border: 1px solid rgba(251, 191, 36, 0.28);
        color: #f6f9ff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        flex-shrink: 0;
        position: relative;
        transition: background 0.2s, border-color 0.2s, color 0.2s;
      }
      .btn-watchlist-toggle:hover {
        background: rgba(251, 191, 36, 0.26);
        border-color: rgba(251, 191, 36, 0.6);
        color: #fbbf24;
      }

      /* Badge contador */
      .watchlist-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        border-radius: 999px;
        background: #ef4444;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        font-family: 'Inter', system-ui, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        pointer-events: none;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      }

      /* Responsive: móvil — botón circular también en navbar colapsado */
      @media (max-width: 991px) {
        #nav-watchlist-item {
          width: auto;
          margin: 4px 0 4px 4px;
        }
      }

      /* ── Botón de tarjeta — pill deslizante ── */
      .card-img-wrapper { position: relative; overflow: hidden; }

      .card-bookmark-btn {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%) translateY(calc(100% + 14px));
        opacity: 0;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 7px 16px;
        border-radius: 999px;
        background: rgba(8, 14, 36, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: rgba(246, 249, 255, 0.92);
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12.5px;
        font-weight: 500;
        letter-spacing: 0.2px;
        cursor: pointer;
        z-index: 5;
        transition:
          opacity 0.22s ease,
          transform 0.26s cubic-bezier(0.34, 1.3, 0.64, 1),
          background 0.2s,
          border-color 0.2s,
          color 0.2s;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
      }
      .card-bookmark-btn i {
        font-size: 14px;
        flex-shrink: 0;
        transition: transform 0.2s;
      }

      /* Ratón: mostrar al hacer hover */
      @media (pointer: fine) {
        .card-img-wrapper:hover .card-bookmark-btn {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      /* Táctil: mostrar al tocar la imagen (clase añadida por JS) */
      @media (pointer: coarse) {
        .card-bookmark-btn.touch-visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      /* Estado: guardado (solo visible en hover, color ámbar) */
      .card-bookmark-btn.saved {
        background: rgba(251, 191, 36, 0.18);
        border-color: rgba(251, 191, 36, 0.55);
        color: #fbbf24;
      }
      .card-bookmark-btn.saved i {
        text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
      }

      /* Hover sobre el botón mismo */
      .card-bookmark-btn:hover:not(.saved) {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.5);
        color: #fbbf24;
      }
      .card-bookmark-btn:hover i { transform: scale(1.15); }
      .card-bookmark-btn:active  { transform: translateX(-50%) scale(0.95) !important; }


      /* ── Panel watchlist (drawer derecho) ── */
      #watchlist-panel {
        position: fixed;
        inset: 0;
        z-index: 10500;
        pointer-events: none;
      }
      #watchlist-panel.open { pointer-events: all; }

      .watchlist-panel-overlay {
        position: absolute;
        inset: 0;
        background: rgba(4, 8, 22, 0.62);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        opacity: 0;
        transition: opacity 0.32s ease;
      }
      #watchlist-panel.open .watchlist-panel-overlay { opacity: 1; }

      .watchlist-panel-drawer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: min(380px, 100vw);
        background: linear-gradient(160deg, rgba(10, 18, 46, 0.97) 0%, rgba(6, 12, 32, 0.99) 100%);
        border-left: 1px solid rgba(251, 191, 36, 0.18);
        box-shadow: -8px 0 48px rgba(0,0,0,0.55);
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }
      #watchlist-panel.open .watchlist-panel-drawer { transform: translateX(0); }

      @media (max-width: 575px) {
        .watchlist-panel-drawer { width: 100vw; border-left: none; }
      }

      /* Header del drawer */
      .watchlist-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px 16px;
        border-bottom: 1px solid rgba(251, 191, 36, 0.12);
        flex-shrink: 0;
      }
      .watchlist-panel-title {
        font-family: 'Poppins', system-ui, sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: #f6f9ff;
        letter-spacing: 0.3px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .watchlist-panel-title::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 2px;
        background: linear-gradient(180deg, #fbbf24, #f59e0b);
        flex-shrink: 0;
      }
      .watchlist-panel-close {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(246,249,255,0.6);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: background 0.18s, color 0.18s;
      }
      .watchlist-panel-close:hover { background: rgba(255,255,255,0.12); color: #f6f9ff; }

      /* Body del drawer */
      .watchlist-panel-body {
        flex: 1;
        overflow-y: auto;
        padding: 12px 0;
        scrollbar-width: thin;
        scrollbar-color: rgba(251,191,36,0.25) transparent;
      }
      .watchlist-panel-body::-webkit-scrollbar { width: 5px; }
      .watchlist-panel-body::-webkit-scrollbar-track { background: transparent; }
      .watchlist-panel-body::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.22); border-radius: 3px; }

      /* Estado vacío */
      .watchlist-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 56px 24px 40px;
        text-align: center;
        color: rgba(246,249,255,0.35);
        font-family: 'Inter', system-ui, sans-serif;
      }
      .watchlist-empty i { font-size: 44px; color: rgba(251,191,36,0.25); margin-bottom: 4px; }
      .watchlist-empty p { margin: 0; font-size: 15px; font-weight: 600; color: rgba(246,249,255,0.42); }
      .watchlist-empty-hint {
        font-size: 12.5px !important;
        font-weight: 400 !important;
        color: rgba(246,249,255,0.26) !important;
        margin-top: 4px !important;
      }

      /* Lista de items */
      .watchlist-list { list-style: none; margin: 0; padding: 0 12px; display: flex; flex-direction: column; gap: 8px; }

      .watchlist-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.07);
        transition: background 0.18s;
      }
      .watchlist-item:hover { background: rgba(255,255,255,0.07); }

      .watchlist-item-img {
        width: 56px;
        height: 72px;
        object-fit: cover;
        border-radius: 8px;
        flex-shrink: 0;
      }
      .watchlist-item-title {
        flex: 1;
        font-size: 13px;
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 500;
        color: rgba(246,249,255,0.85);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .watchlist-remove-btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(239,68,68,0.1);
        border: 1px solid rgba(239,68,68,0.2);
        color: rgba(248,113,113,0.6);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        flex-shrink: 0;
        transition: background 0.18s, color 0.18s, border-color 0.18s;
      }
      .watchlist-remove-btn:hover { background: rgba(239,68,68,0.22); border-color: rgba(239,68,68,0.5); color: #f87171; }
    `;
    document.head.appendChild(style);
  })();

  // ── Traducciones ──────────────────────────────────────────────────────────
  const LABELS = {
    es: {
      panelTitle:    'Mi Lista',
      empty:         'Tu lista está vacía',
      emptyHint:     'Guarda episodios para verlos cuando quieras.',
      addBtn:        'Agregar a lista',
      savedBtn:      'Guardado',
      loginRequired: 'Inicia sesión para guardar en tu lista',
    },
    ca: {
      panelTitle:    'La meva llista',
      empty:         'La teva llista és buida',
      emptyHint:     "Desa episodis per veure'ls quan vulguis.",
      addBtn:        'Afegir a la llista',
      savedBtn:      'Desat',
      loginRequired: 'Inicia sessió per desar a la teva llista',
    },
    en: {
      panelTitle:    'My List',
      empty:         'Your list is empty',
      emptyHint:     'Save episodes to watch them whenever you want.',
      addBtn:        'Add to list',
      savedBtn:      'Saved',
      loginRequired: 'Sign in to save to your list',
    },
  };

  function getLang()    { return localStorage.getItem('userLang') || 'es'; }
  function L(key)       { const l = getLang(); return (LABELS[l] || LABELS.es)[key]; }
  function hasSession() { try { return !!JSON.parse(localStorage.getItem('z_sesion')); } catch { return false; } }

  // ── Persistencia ─────────────────────────────────────────────────────────
  function getList()      { try { return JSON.parse(localStorage.getItem('z_watchlist') || '[]'); } catch { return []; } }
  function saveList(list) { localStorage.setItem('z_watchlist', JSON.stringify(list)); }
  function isInList(id)   { return getList().some(item => item.id === id); }

  // ── Referencias DOM ───────────────────────────────────────────────────────
  let badge, panelTitle, panelList, panelEmpty;

  // ── Inicialización ────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // — Botón en navbar y panel: solo con sesión activa —
    if (hasSession()) {
      const searchItem = document.getElementById('nav-search-item');
      const navItem = document.createElement('li');
      navItem.className = 'nav-item ms-2';
      navItem.id = 'nav-watchlist-item';
      navItem.innerHTML = `
        <button class="btn-watchlist-toggle" id="btn-watchlist-toggle" aria-label="Mi lista">
          <i class="bi bi-bookmark"></i>
          <span class="watchlist-badge" id="watchlist-badge" style="display:none">0</span>
        </button>
      `;
      if (searchItem?.parentNode) {
        searchItem.parentNode.insertBefore(navItem, searchItem.nextSibling);
      }

      badge = document.getElementById('watchlist-badge');

      const panelEl = document.createElement('div');
      panelEl.id = 'watchlist-panel';
      panelEl.innerHTML = `
        <div class="watchlist-panel-overlay" id="watchlist-panel-overlay"></div>
        <div class="watchlist-panel-drawer">
          <div class="watchlist-panel-header">
            <span class="watchlist-panel-title" id="watchlist-panel-title">${L('panelTitle')}</span>
            <button class="watchlist-panel-close" id="btn-watchlist-close" aria-label="Cerrar">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="watchlist-panel-body">
            <div class="watchlist-empty" id="watchlist-empty">
              <i class="bi bi-bookmark"></i>
              <p id="watchlist-empty-title">${L('empty')}</p>
              <p class="watchlist-empty-hint" id="watchlist-empty-hint">${L('emptyHint')}</p>
            </div>
            <ul class="watchlist-list" id="watchlist-list"></ul>
          </div>
        </div>
      `;
      document.body.appendChild(panelEl);

      panelTitle = document.getElementById('watchlist-panel-title');
      panelList  = document.getElementById('watchlist-list');
      panelEmpty = document.getElementById('watchlist-empty');

      document.getElementById('btn-watchlist-toggle').addEventListener('click', (e) => {
        e.stopPropagation();
        openPanel();
      });
      document.getElementById('btn-watchlist-close').addEventListener('click', closePanel);
      document.getElementById('watchlist-panel-overlay').addEventListener('click', closePanel);

      updateBadge();
      renderList();
    }

    // — Pills de bookmark en tarjetas (siempre visibles) —
    document.querySelectorAll('.anime-card').forEach(card => {
      const wrapper = card.querySelector('.card-img-wrapper');
      const img = wrapper?.querySelector('img');
      if (!wrapper || !img) return;

      const id     = img.getAttribute('src').split('/').pop().replace(/\.[^.]+$/, '');
      const imgSrc = img.getAttribute('src');
      const imgAlt = img.getAttribute('alt') || '';
      const saved  = hasSession() && isInList(id);

      const btn = document.createElement('button');
      btn.className = 'card-bookmark-btn' + (saved ? ' saved' : '');
      btn.setAttribute('data-id', id);
      btn.setAttribute('aria-label', saved ? L('savedBtn') : L('addBtn'));
      btn.innerHTML = `<i class="bi bi-bookmark${saved ? '-fill' : ''}"></i><span>${saved ? L('savedBtn') : L('addBtn')}</span>`;
      wrapper.appendChild(btn);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!hasSession()) {
          if (typeof ZNotify !== 'undefined') ZNotify.show({ type: 'warning', title: L('loginRequired'), duration: 3000 });
          setTimeout(() => { window.location.href = './login.html'; }, 1500);
          return;
        }
        const title = card.querySelector('.card-title')?.textContent?.trim() || '';
        toggleItem({ id, title, img: imgSrc, alt: imgAlt }, btn);
      });

      // Tap en la imagen (táctil): muestra/oculta la pill
      wrapper.addEventListener('click', function (e) {
        if (!window.matchMedia('(pointer: coarse)').matches) return;
        if (e.target.closest('.card-bookmark-btn')) return;
        const isVisible = btn.classList.contains('touch-visible');
        document.querySelectorAll('.card-bookmark-btn.touch-visible').forEach(b => b.classList.remove('touch-visible'));
        if (!isVisible) btn.classList.add('touch-visible');
      });
    });

    // Tap fuera de cualquier tarjeta: oculta todas las pills táctiles
    document.addEventListener('click', function (e) {
      if (!window.matchMedia('(pointer: coarse)').matches) return;
      if (!e.target.closest('.card-img-wrapper')) {
        document.querySelectorAll('.card-bookmark-btn.touch-visible').forEach(b => b.classList.remove('touch-visible'));
      }
    });

    // — Eventos globales —
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

    // — Envolver setLanguage —
    const origSetLanguage = window.setLanguage;
    if (typeof origSetLanguage === 'function') {
      window.setLanguage = function (lang) {
        origSetLanguage(lang);
        updateLabels(lang);
      };
    }
  });

  // ── Funciones ─────────────────────────────────────────────────────────────
  function toggleItem(item, btn) {
    const list = getList();
    const idx  = list.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      list.splice(idx, 1);
      saveList(list);
      btn.classList.remove('saved');
      btn.querySelector('i').className = 'bi bi-bookmark';
      btn.querySelector('span').textContent = L('addBtn');
      if (typeof ZNotify !== 'undefined') ZNotify.favoritoEliminado();
    } else {
      list.push(item);
      saveList(list);
      btn.classList.add('saved');
      btn.querySelector('i').className = 'bi bi-bookmark-fill';
      btn.querySelector('span').textContent = L('savedBtn');
      if (typeof ZNotify !== 'undefined') ZNotify.favoritoAniadido();
    }
    updateBadge();
    renderList();
  }

  function openPanel() {
    renderList();
    document.getElementById('watchlist-panel')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    document.getElementById('watchlist-panel')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateBadge() {
    if (!badge) return;
    const count = getList().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  function renderList() {
    if (!panelList || !panelEmpty) return;
    const list = getList();
    panelEmpty.style.display = list.length === 0 ? 'flex' : 'none';
    panelList.innerHTML = '';
    list.forEach(item => {
      const li = document.createElement('li');
      li.className = 'watchlist-item';
      li.innerHTML = `
        <img src="${item.img}" alt="${item.alt}" class="watchlist-item-img">
        <span class="watchlist-item-title">${item.title}</span>
        <button class="watchlist-remove-btn" aria-label="Eliminar">
          <i class="bi bi-trash3"></i>
        </button>
      `;
      li.querySelector('.watchlist-remove-btn').addEventListener('click', () => {
        const updated = getList().filter(i => i.id !== item.id);
        saveList(updated);
        const cardBtn = document.querySelector(`.card-bookmark-btn[data-id="${item.id}"]`);
        if (cardBtn) {
          cardBtn.classList.remove('saved');
          cardBtn.querySelector('i').className = 'bi bi-bookmark';
          cardBtn.querySelector('span').textContent = L('addBtn');
        }
        if (typeof ZNotify !== 'undefined') ZNotify.favoritoEliminado();
        updateBadge();
        renderList();
      });
      panelList.appendChild(li);
    });
  }

  function updateLabels(lang) {
    const lbl = LABELS[lang] || LABELS.es;
    if (panelTitle) panelTitle.textContent = lbl.panelTitle;
    const emptyTitle = document.getElementById('watchlist-empty-title');
    const emptyHint  = document.getElementById('watchlist-empty-hint');
    if (emptyTitle) emptyTitle.textContent = lbl.empty;
    if (emptyHint)  emptyHint.textContent  = lbl.emptyHint;
    // actualizar pills en tarjetas
    document.querySelectorAll('.card-bookmark-btn').forEach(btn => {
      const sp = btn.querySelector('span');
      if (!sp) return;
      sp.textContent = btn.classList.contains('saved') ? lbl.savedBtn : lbl.addBtn;
    });
  }

})();
