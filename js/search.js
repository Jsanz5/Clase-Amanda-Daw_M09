// Z Animation — Buscador de anime en tiempo real
(function () {

  // ── Estilos ──────────────────────────────────────────────────────────────
  (function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ── Wrapper de búsqueda ── */
      #nav-search-item { position: relative; }

      .search-wrap {
        display: flex;
        align-items: center;
        gap: 0;
      }

      /* Área que se expande (input + botón limpiar) */
      .search-expand {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        max-width: 0;
        opacity: 0;
        transition: max-width 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
      }
      .search-wrap.open .search-expand {
        max-width: 230px;
        opacity: 1;
      }

      /* Input */
      .search-input {
        background: rgba(10, 24, 52, 0.88);
        border: 1px solid rgba(98, 167, 251, 0.32);
        border-radius: 999px;
        color: #f6f9ff;
        padding: 7px 32px 7px 15px;
        font-size: 13.5px;
        font-family: 'Inter', system-ui, sans-serif;
        width: 210px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        white-space: nowrap;
      }
      .search-input:focus {
        border-color: #62a7fb;
        box-shadow: 0 0 0 3px rgba(98, 167, 251, 0.15);
      }
      .search-input::placeholder { color: rgba(246, 249, 255, 0.38); }
      .search-input::-webkit-search-cancel-button { display: none; }

      /* Botón limpiar (X) */
      .search-clear-btn {
        position: absolute;
        right: 8px;
        background: none;
        border: none;
        color: rgba(246, 249, 255, 0.4);
        cursor: pointer;
        font-size: 15px;
        padding: 3px;
        display: none;
        align-items: center;
        justify-content: center;
        line-height: 1;
        transition: color 0.18s;
      }
      .search-clear-btn:hover { color: rgba(246, 249, 255, 0.85); }

      /* Botón lupa (toggle) */
      .btn-search-toggle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(98, 167, 251, 0.12);
        border: 1px solid rgba(98, 167, 251, 0.25);
        color: #f6f9ff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        flex-shrink: 0;
        margin-left: 8px;
        transition: background 0.2s, border-color 0.2s;
      }
      .btn-search-toggle:hover,
      .search-wrap.open .btn-search-toggle {
        background: rgba(98, 167, 251, 0.24);
        border-color: rgba(98, 167, 251, 0.52);
      }

      /* Transición de tarjetas */
      #Episodios .row.g-4 > [class*="col-"] {
        transition: opacity 0.2s ease;
      }

      /* Mensaje sin resultados */
      #search-no-results {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 48px 20px;
        color: rgba(246, 249, 255, 0.42);
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 15px;
        width: 100%;
        text-align: center;
      }
      #search-no-results i {
        font-size: 28px;
        color: rgba(98, 167, 251, 0.35);
        flex-shrink: 0;
      }

      /* ── Responsive: móvil (dentro del navbar colapsado) ── */
      @media (max-width: 991px) {
        #nav-search-item {
          width: 100%;
          margin: 2px 0;
        }
        .search-wrap { width: 100%; }
        .btn-search-toggle { display: none; }
        .search-expand {
          max-width: 100% !important;
          opacity: 1 !important;
          flex: 1;
          overflow: visible;
        }
        .search-input {
          width: 100%;
          border-radius: 12px;
        }
        .search-clear-btn { right: 10px; }
      }
    `;
    document.head.appendChild(style);
  })();

  // ── Traducciones del placeholder ─────────────────────────────────────────
  const PLACEHOLDERS = {
    es: 'Buscar anime...',
    ca: 'Cerca anime...',
    en: 'Search anime...',
  };

  const NO_RESULTS = {
    es: (q) => `No se encontraron resultados para <strong>"${q}"</strong>`,
    ca: (q) => `No s'han trobat resultats per a <strong>"${q}"</strong>`,
    en: (q) => `No results found for <strong>"${q}"</strong>`,
  };

  function getLang() { return localStorage.getItem('userLang') || 'es'; }

  // ── Lógica principal ─────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const wrap      = document.getElementById('search-wrap');
    const input     = document.getElementById('search-input');
    const toggleBtn = document.getElementById('btn-search-toggle');
    const clearBtn  = document.getElementById('search-clear-btn');
    const expand    = document.getElementById('search-expand');

    if (!wrap || !input) return;

    // Placeholder según idioma
    function updatePlaceholder(lang) {
      const l = lang || getLang();
      input.placeholder = PLACEHOLDERS[l] || PLACEHOLDERS.es;
    }
    updatePlaceholder();

    // Envolver setLanguage para reaccionar al cambio de idioma en caliente.
    // IMPORTANTE: se recibe lang como parámetro porque savePreference
    // se llama DESPUÉS de setLanguage, así que localStorage aún tiene el idioma anterior.
    const origSetLanguage = window.setLanguage;
    if (typeof origSetLanguage === 'function') {
      window.setLanguage = function (lang) {
        origSetLanguage(lang);
        updatePlaceholder(lang);
        if (input.value.trim()) filterCards(input.value.trim(), lang);
      };
    }

    // ── Toggle abrir/cerrar (solo desktop) ──
    function openSearch() {
      wrap.classList.add('open');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      setTimeout(() => input.focus(), 360);
    }
    function closeSearch() {
      wrap.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      input.value = '';
      if (clearBtn) clearBtn.style.display = 'none';
      filterCards('');
    }

    toggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.contains('open') ? closeSearch() : openSearch();
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) closeSearch();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    // Botón limpiar
    clearBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      clearBtn.style.display = 'none';
      filterCards('');
      input.focus();
    });

    // Filtrado en tiempo real
    input.addEventListener('input', function () {
      const q = this.value.trim();
      if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
      filterCards(q);
    });

    // ── Filtrar tarjetas ─────────────────────────────────────────────────
    // lang es opcional: si viene de la envoltura de setLanguage se pasa directo
    // para evitar leer localStorage antes de que savePreference lo actualice.
    function filterCards(query, lang) {
      const cols = document.querySelectorAll('#Episodios .row.g-4 > [class*="col-"]');
      let visible = 0;

      cols.forEach(col => {
        const card = col.querySelector('.anime-card');
        if (!card) return;

        const title   = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const desc    = (card.querySelector('.card-text')?.textContent  || '').toLowerCase();
        const matches = !query || title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase());

        if (matches) {
          col.style.display = '';
          void col.offsetWidth; // fuerza reflow para que la transición opacity se active
          col.style.opacity = '1';
          visible++;
        } else {
          col.style.opacity = '0';
          setTimeout(() => {
            const currentQ = input.value.trim().toLowerCase();
            const t = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
            const d = (card.querySelector('.card-text')?.textContent  || '').toLowerCase();
            if (currentQ && !t.includes(currentQ) && !d.includes(currentQ)) {
              col.style.display = 'none';
            }
          }, 220);
        }
      });

      // Mensaje sin resultados
      let noRes = document.getElementById('search-no-results');
      if (!noRes) {
        const row = document.querySelector('#Episodios .row.g-4');
        if (row) {
          noRes = document.createElement('div');
          noRes.id = 'search-no-results';
          row.parentNode.insertBefore(noRes, row.nextSibling);
        }
      }
      if (noRes) {
        const show = query && visible === 0;
        noRes.style.display = show ? 'flex' : 'none';
        if (show) {
          const activeLang = lang || getLang(); // usar lang recibido si existe
          const fn = NO_RESULTS[activeLang] || NO_RESULTS.es;
          noRes.innerHTML = `<i class="bi bi-search"></i><span>${fn(query)}</span>`;
        }
      }
    }
  });
})();
