(function () {

  (function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #nav-search-item { position: relative; }

      .search-wrap {
        display: flex;
        align-items: center;
        gap: 0;
      }

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

      #search-dropdown {
        display: none;
        position: fixed;
        max-height: 420px;
        overflow-y: auto;
        background: rgba(8, 14, 36, 0.97);
        border: 1px solid rgba(98, 167, 251, 0.22);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 99999;
        scrollbar-width: thin;
        scrollbar-color: rgba(98, 167, 251, 0.25) transparent;
        animation: search-drop-in 0.18s cubic-bezier(0.34, 1.2, 0.64, 1);
      }
      #search-dropdown::-webkit-scrollbar { width: 4px; }
      #search-dropdown::-webkit-scrollbar-track { background: transparent; }
      #search-dropdown::-webkit-scrollbar-thumb { background: rgba(98,167,251,0.22); border-radius: 2px; }

      @keyframes search-drop-in {
        from { opacity: 0; transform: translateY(-6px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .search-dropdown-header {
        padding: 10px 14px 6px;
        font-size: 10.5px;
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 600;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        color: rgba(98, 167, 251, 0.55);
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }

      .search-result-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.15s;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      .search-result-item:last-child { border-bottom: none; }
      .search-result-item:hover { background: rgba(98, 167, 251, 0.1); }

      .search-result-img {
        width: 48px;
        height: 62px;
        object-fit: cover;
        border-radius: 8px;
        flex-shrink: 0;
        border: 1px solid rgba(255,255,255,0.08);
      }

      .search-result-info { flex: 1; min-width: 0; }

      .search-result-title {
        display: block;
        font-size: 13px;
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 600;
        color: #f6f9ff;
        line-height: 1.3;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .search-result-title mark {
        background: none;
        color: #62a7fb;
        font-weight: 700;
      }

      .search-result-desc {
        display: block;
        font-size: 11.5px;
        font-family: 'Inter', system-ui, sans-serif;
        color: rgba(246,249,255,0.42);
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .search-result-arrow {
        color: rgba(98,167,251,0.35);
        font-size: 13px;
        flex-shrink: 0;
        transition: color 0.15s, transform 0.15s;
      }
      .search-result-item:hover .search-result-arrow {
        color: #62a7fb;
        transform: translateX(3px);
      }

      .search-empty {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px 16px;
        color: rgba(246,249,255,0.35);
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 13px;
      }
      .search-empty i {
        font-size: 22px;
        color: rgba(98,167,251,0.3);
        flex-shrink: 0;
      }

      .anime-card.search-highlight {
        outline: 2px solid #62a7fb;
        outline-offset: 3px;
        border-radius: 12px;
      }

      #search-no-results {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 48px 20px;
        color: rgba(246,249,255,0.42);
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 15px;
        width: 100%;
        text-align: center;
      }
      #search-no-results i {
        font-size: 28px;
        color: rgba(98,167,251,0.35);
        flex-shrink: 0;
      }

      @media (max-width: 991px) {
        #nav-search-item { width: 100%; margin: 2px 0; }
        .search-wrap { width: 100%; }
        .btn-search-toggle { display: none; }
        .search-expand {
          max-width: 100% !important;
          opacity: 1 !important;
          flex: 1;
          overflow: visible;
        }
        .search-input { width: 100%; border-radius: 12px; }
        .search-clear-btn { right: 10px; }
      }
    `;
    document.head.appendChild(style);
  })();

  const PLACEHOLDERS = {
    es: 'Buscar anime...',
    ca: 'Cerca anime...',
    en: 'Search anime...',
  };
  const LABELS = {
    es: { header: 'Resultados', empty: (q) => `Sin resultados para "<strong>${q}</strong>"` },
    ca: { header: 'Resultats',  empty: (q) => `Sense resultats per a "<strong>${q}</strong>"` },
    en: { header: 'Results',    empty: (q) => `No results for "<strong>${q}</strong>"` },
  };

  function getLang() { return localStorage.getItem('userLang') || 'es'; }

  document.addEventListener('DOMContentLoaded', function () {
    const wrap      = document.getElementById('search-wrap');
    const input     = document.getElementById('search-input');
    const toggleBtn = document.getElementById('btn-search-toggle');
    const clearBtn  = document.getElementById('search-clear-btn');

    if (!wrap || !input) return;

    const dropdown = document.createElement('div');
    dropdown.id = 'search-dropdown';
    document.body.appendChild(dropdown);

    const index = [];
    document.querySelectorAll('.anime-card').forEach(card => {
      const title  = card.querySelector('.card-title')?.textContent?.trim() || '';
      const desc   = card.querySelector('.card-text')?.textContent?.trim()  || '';
      const img    = card.querySelector('.card-img-wrapper img');
      index.push({ card, title, desc, imgSrc: img?.getAttribute('src') || '', imgAlt: img?.getAttribute('alt') || '' });
    });

    function positionDropdown() {
      const rect   = input.getBoundingClientRect();
      const mobile = window.innerWidth <= 991;
      const gap    = 8;

      dropdown.style.top = (rect.bottom + gap) + 'px';

      if (mobile) {
        dropdown.style.left  = '8px';
        dropdown.style.right = '8px';
        dropdown.style.width = 'auto';
      } else {
        const searchItem = document.getElementById('nav-search-item');
        const sRect      = searchItem.getBoundingClientRect();
        dropdown.style.right = (window.innerWidth - sRect.right) + 'px';
        dropdown.style.left  = 'auto';
        dropdown.style.width = '320px';
      }
    }

    function updatePlaceholder(lang) {
      input.placeholder = PLACEHOLDERS[lang || getLang()] || PLACEHOLDERS.es;
    }
    updatePlaceholder();

    const origSetLanguage = window.setLanguage;
    if (typeof origSetLanguage === 'function') {
      window.setLanguage = function (lang) {
        origSetLanguage(lang);
        updatePlaceholder(lang);
        if (input.value.trim()) {
          renderDropdown(input.value.trim(), lang);
          filterCards(input.value.trim(), lang);
        }
      };
    }

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
      hideDropdown();
      filterCards('');
    }

    toggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.contains('open') ? closeSearch() : openSearch();
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target) && !dropdown.contains(e.target)) closeSearch();
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    window.addEventListener('resize', () => {
      if (dropdown.style.display === 'block') positionDropdown();
    });

    window.addEventListener('scroll', () => {
      if (dropdown.style.display === 'block') positionDropdown();
    }, { passive: true });

    clearBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      clearBtn.style.display = 'none';
      hideDropdown();
      filterCards('');
      input.focus();
    });

    input.addEventListener('input', function () {
      const q = this.value.trim();
      if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
      if (!q) { hideDropdown(); filterCards(''); return; }
      renderDropdown(q);
      filterCards(q);
    });

    function renderDropdown(q, lang) {
      const lbl     = LABELS[lang || getLang()] || LABELS.es;
      const query   = q.toLowerCase();
      const results = index.filter(item =>
        item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      );

      positionDropdown();

      if (!results.length) {
        dropdown.innerHTML = `<div class="search-empty"><i class="bi bi-search"></i><span>${lbl.empty(q)}</span></div>`;
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = `<div class="search-dropdown-header">${lbl.header}</div>` +
        results.map((item, i) => `
          <div class="search-result-item" data-idx="${i}">
            <img src="${item.imgSrc}" alt="${item.imgAlt}" class="search-result-img">
            <div class="search-result-info">
              <span class="search-result-title">${highlight(item.title, q)}</span>
              <span class="search-result-desc">${item.desc.slice(0, 72)}</span>
            </div>
            <i class="bi bi-chevron-right search-result-arrow"></i>
          </div>`
        ).join('');

      dropdown.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          scrollToCard(results[+el.dataset.idx].card);
          closeSearch();
        });
      });

      dropdown.style.display = 'block';
    }

    function hideDropdown() {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
    }

    function highlight(text, q) {
      return text.replace(
        new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
        '<mark>$1</mark>'
      );
    }

    function scrollToCard(card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('search-highlight');
      setTimeout(() => card.classList.remove('search-highlight'), 2000);
    }

    function filterCards(query, lang) {
      const cols = document.querySelectorAll('#Episodios .row.g-4 > [class*="col-"]');
      let visible = 0;

      cols.forEach(col => {
        const card    = col.querySelector('.anime-card');
        if (!card) return;
        const title   = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const desc    = (card.querySelector('.card-text')?.textContent  || '').toLowerCase();
        const matches = !query || title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase());

        if (matches) {
          col.style.display = '';
          void col.offsetWidth;
          col.style.opacity = '1';
          visible++;
        } else {
          col.style.opacity = '0';
          setTimeout(() => {
            const currentQ = input.value.trim().toLowerCase();
            const t = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
            const d = (card.querySelector('.card-text')?.textContent  || '').toLowerCase();
            if (currentQ && !t.includes(currentQ) && !d.includes(currentQ)) col.style.display = 'none';
          }, 220);
        }
      });

      let noRes = document.getElementById('search-no-results');
      if (!noRes) {
        const row = document.querySelector('#Episodios .row.g-4');
        if (row) {
          noRes = document.createElement('div');
          noRes.id = 'search-no-results';
          row.parentNode.insertBefore(noRes, row.nextSibling);
        }
      }
      if (noRes) noRes.style.display = (query && visible === 0) ? 'flex' : 'none';
    }
  });
})();
