/* ВОРОТА FIX — рендер секций, каталог, формы */
(function () {
  "use strict";

  var $ = VF.q, $$ = VF.qa, esc = VF.esc, money = VF.money, icon = VF.icon;
  var byId = function (id) { return VF.products.filter(function (p) { return p.id === id; })[0]; };

  /* ---------- карточка товара ---------- */
  var BADGE = { hit: "ХИТ", popular: "Популярное", kit: "Комплект" };

  function specsHTML(p) {
    if (!p.specs || !p.specs.length) return "";
    return '<dl class="product__specs">' + p.specs.map(function (s) {
      return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>";
    }).join("") + "</dl>";
  }

  function productCard(p) {
    var badge = p.badge ? '<span class="badge badge--' + p.badge + '">' + BADGE[p.badge] + "</span>" : "";
    var stock = p.stock === "order"
      ? '<span class="stock stock--order">Под заказ</span>'
      : '<span class="stock stock--in">В наличии</span>';
    var old = p.oldPrice ? "<s>" + money(p.oldPrice) + "</s>" : "";
    return '' +
      '<article class="product" data-id="' + p.id + '">' +
        '<div class="product__media">' + badge + '<div class="product__ph">' + esc(p.short) + "</div></div>" +
        '<div class="product__body">' +
          '<div class="product__meta"><span class="product__brand">' + esc(p.brand) + "</span>" + stock + "</div>" +
          '<h3 class="product__name">' + esc(p.name) + "</h3>" +
          '<p class="product__desc">' + esc(p.desc) + "</p>" +
          specsHTML(p) +
          '<div class="product__foot">' +
            '<div class="product__price">' + money(p.price) + old + "</div>" +
            '<button class="btn btn--primary btn--sm" data-add="' + p.id + '">Купить</button>' +
          "</div>" +
        "</div>" +
      "</article>";
  }
  VF.productCard = productCard;

  function renderProducts(sel, list) {
    var el = $(sel);
    if (!el) return;
    el.innerHTML = list.map(productCard).join("");
  }

  /* ---------- категории ---------- */
  function catGhostClass(accent) {
    return accent === "indigo" ? "indigo" : accent === "orange" ? "orange" : "peri";
  }
  function renderCategories(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.categories.map(function (c) {
      var g = catGhostClass(c.accent);
      return '' +
        '<a class="cat" href="catalog.html?cat=' + c.slug + '">' +
          '<span class="cat__circle cat__circle--' + g + '"></span>' +
          '<h3>' + esc(c.title) + "</h3>" +
          "<p>" + esc(c.desc) + "</p>" +
          '<span class="cat__link">Перейти в раздел ' + icon("arrow") + "</span>" +
          '<span class="cat__ghost cat__ghost--' + g + '">' + esc(c.short) + "</span>" +
        "</a>";
    }).join("");
  }

  function renderGateTypes(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.gateTypes.map(function (g) {
      return '' +
        '<article class="gate-card">' +
          '<div class="gate-card__media">' + gateSvg(g.id) + "</div>" +
          '<span class="gate-card__tag">' + esc(g.tag) + "</span>" +
          '<div class="gate-card__head"><h3>' + esc(g.title) + "</h3><span>" + g.num + "</span></div>" +
          "<p>" + esc(g.desc) + "</p>" +
          '<ul class="gate-card__points">' + g.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
          '<div class="gate-card__foot">' +
            '<a class="section__link" href="catalog.html?cat=' + g.category + '">Смотреть автоматику ' + icon("arrow") + "</a>" +
            '<button class="btn btn--ghost btn--sm" data-open-lead>Монтаж</button>' +
          "</div>" +
        "</article>";
    }).join("");
  }

  function renderMount(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.mount.map(function (m, i) {
      return '' +
        '<article class="mount-card">' +
          '<div class="mount-card__num">' + m.num + "</div>" +
          '<div class="mount-card__art">' + mountSvg(i) + "</div>" +
          "<h3>" + esc(m.title) + "</h3>" +
          "<p>" + esc(m.desc) + "</p>" +
          '<div class="mount-card__price">' + esc(m.price) + icon("arrow") + "</div>" +
        "</article>";
    }).join("");
  }

  function renderAdvantages(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.advantages.map(function (a) {
      var dark = a.num === "06" ? " why-card--dark" : (a.num === "01" ? " why-card--accent" : "");
      var link = a.num === "01"
        ? '<a class="why-card__link" href="#" data-open-lead>Получить консультацию ' + icon("arrow") + "</a>"
        : a.num === "06"
        ? '<a class="why-card__link" href="#" data-open-lead>Отправить данные ' + icon("arrow") + "</a>"
        : "";
      return '' +
        '<article class="why-card' + dark + '">' +
          '<span class="why-card__num">' + a.num + "</span>" +
          "<h3>" + esc(a.title) + "</h3>" +
          "<p>" + esc(a.desc) + "</p>" + link +
        "</article>";
    }).join("");
  }

  function renderWorks(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.works.map(function (w, i) {
      return '' +
        '<article class="work">' +
          '<div class="work__media"><span class="work__place">' + esc(w.place) + "</span></div>" +
          '<div class="work__body">' +
            '<div class="work__head"><h3>' + esc(w.title) + "</h3><span>0" + (i + 1) + "</span></div>" +
            '<dl class="work__rows">' +
              '<div class="work__row"><dt>Задача</dt><dd>' + esc(w.task) + "</dd></div>" +
              '<div class="work__row"><dt>Оборудование</dt><dd>' + esc(w.equipment) + "</dd></div>" +
              '<div class="work__row"><dt>Работы</dt><dd>' + esc(w.works) + "</dd></div>" +
              '<div class="work__row work__result"><dt>Результат</dt><dd>' + esc(w.result) + "</dd></div>" +
            "</dl>" +
            '<a class="work__link" href="#" data-open-lead>Подробнее о проекте ' + icon("arrow") + "</a>" +
          "</div>" +
        "</article>";
    }).join("");
  }

  function renderSecurity(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.securityItems.map(function (s, i) {
      return '' +
        '<article class="sec-item">' +
          '<span class="sec-item__num">0' + (i + 1) + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.desc) + "</p>" +
          '<div class="sec-item__foot">' +
            '<span class="sec-item__price">' + esc(s.price) + "</span>" + icon("arrow") +
          "</div>" +
        "</article>";
    }).join("");
  }

  function renderBrands(sel) {
    var el = $(sel); if (!el) return;
    el.innerHTML = VF.brands.map(function (b, i) {
      return '' +
        '<a class="brand" href="catalog.html?search=' + encodeURIComponent(b.name) + '">' +
          '<span class="brand__num">0' + (i + 1) + "</span>" +
          '<div class="brand__logo">' + esc(b.name) + "</div>" +
          "<p>" + esc(b.desc) + "</p>" +
          '<span class="brand__link">Товары бренда ' + icon("arrow") + "</span>" +
        "</a>";
    }).join("");
  }

  /* ---------- простые SVG-заглушки ---------- */
  function gateSvg(id) {
    var s = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    if (id === "swing") return '<svg width="150" height="90" viewBox="0 0 150 90" ' + s + '><path d="M20 80V20h20M20 80h110"/><path d="M45 25v50M45 25h45M45 75h45M95 25l30 50"/></svg>';
    if (id === "sectional") return '<svg width="150" height="90" viewBox="0 0 150 90" ' + s + '><rect x="25" y="20" width="100" height="60"/><path d="M25 35h100M25 50h100M25 65h100"/></svg>';
    return '<svg width="150" height="90" viewBox="0 0 150 90" ' + s + '><path d="M15 78h120"/><rect x="20" y="24" width="72" height="54"/><path d="M20 34h72M20 44h72M20 54h72M20 64h72M92 24v54"/><path d="M112 30v24M124 30v24"/></svg>';
  }
  function mountSvg(i) {
    return '<svg width="90" height="60" viewBox="0 0 90 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (i === 1 ? '<path d="M8 52h74"/><path d="M20 52V16h50v36"/><path d="M20 30h50M20 42h50"/><path d="M45 16v36"/>' : i === 2 ? '<path d="M8 52h74"/><rect x="22" y="14" width="46" height="38"/><path d="M22 24h46M22 34h46M22 44h46"/>' : '<path d="M8 52h74"/><path d="M16 52V18h18v34"/><path d="M34 22l40 26M34 48l40-26"/>') + "</svg>";
  }

  /* ---------- формы (статичные) ---------- */
  function bindStaticForm(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (inp) {
        var field = inp.closest(".field");
        var empty = !inp.value.trim();
        if (inp.type === "tel") empty = inp.value.replace(/\D/g, "").length < 10;
        if (field) field.classList.toggle("has-error", empty);
        if (empty) ok = false;
      });
      if (!ok) return;
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      console.log("Заявка:", data);
      var box = form.closest("[data-form-wrap]") || form.parentNode;
      box.innerHTML =
        '<div class="success">' +
          '<div class="success__icon">' + icon("check") + "</div>" +
          "<h3>Заявка отправлена</h3>" +
          "<p>Менеджер перезвонит в рабочее время: " + esc(VF.company.hours) + ".<br>Телефон: " + esc(VF.company.phone) + "</p>" +
        "</div>";
      VF.toast("Спасибо! Мы свяжемся с вами");
    });
  }

  /* ---------- кнопки "открыть лид-форму" ---------- */
  function bindLeadButtons() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open-lead]");
      if (!b) return;
      e.preventDefault();
      var t = document.getElementById("lead");
      if (t) t.scrollIntoView({ behavior: "smooth" });
      else window.location.href = "index.html#lead";
    });
  }

  /* =====================================================
     СЛАЙДЕР ГЛАВНОЙ
     ===================================================== */
  function initHeroSlider() {
    var slider = document.getElementById("hero-slider");
    var track = document.getElementById("hero-track");
    if (!slider || !track) return;
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;
    var dotsWrap = document.getElementById("hero-dots");
    var i = 0, timer = null, paused = false;

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map(function (_, n) {
        return '<button type="button" data-hero-dot="' + n + '" aria-label="Слайд ' + (n + 1) + '"></button>';
      }).join("");
    }
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-i * 100) + "%)";
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
    }
    function next() { go(i + 1); }
    function prev() { go(i - 1); }
    function play() { stop(); if (!paused) timer = setInterval(next, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    slider.addEventListener("click", function (e) {
      if (e.target.closest("[data-hero-next]")) { next(); play(); }
      else if (e.target.closest("[data-hero-prev]")) { prev(); play(); }
      else {
        var d = e.target.closest("[data-hero-dot]");
        if (d) { go(Number(d.getAttribute("data-hero-dot"))); play(); }
      }
    });
    slider.addEventListener("mouseenter", function () { paused = true; stop(); });
    slider.addEventListener("mouseleave", function () { paused = false; play(); });

    var x0 = null;
    slider.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); play(); }
      x0 = null;
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); play(); }
      if (e.key === "ArrowLeft") { prev(); play(); }
    });

    go(0);
    play();
  }

  /* =====================================================
     КАТАЛОГ
     ===================================================== */
  function initCatalog() {
    var params = new URLSearchParams(location.search);
    var state = {
      cat: params.get("cat") || "all",
      search: params.get("search") || "",
      sort: "popular",
      max: 200000
    };
    var grid = $("#catalog-grid");
    var listEl = $("#filters-cats");
    var countEl = $("#catalog-count");
    var sortEl = $("#catalog-sort");
    var priceEl = $("#price-range");
    var priceVal = $("#price-val");
    var searchEl = $("#catalog-search");
    var chipsEl = $("#catalog-chips");
    var resetEl = $("#filters-reset");

    if (searchEl) searchEl.value = state.search;

    function counts() {
      var m = { all: VF.products.length };
      VF.products.forEach(function (p) { m[p.category] = (m[p.category] || 0) + 1; });
      return m;
    }

    var cats = [{ slug: "all", title: "Все товары" }].concat(VF.categories);

    function renderFilters() {
      var c = counts();
      if (listEl) {
        listEl.innerHTML = cats.map(function (x) {
          var active = state.cat === x.slug ? " is-active" : "";
          return '<button class="' + active.trim() + '" data-cat="' + x.slug + '">' + esc(x.title) +
            "<span>" + (c[x.slug] || 0) + "</span></button>";
        }).join("");
      }
      if (chipsEl) {
        chipsEl.innerHTML = cats.map(function (x) {
          var active = state.cat === x.slug ? " is-active" : "";
          return '<button class="' + active.trim() + '" data-cat="' + x.slug + '">' + esc(x.title) +
            " (" + (c[x.slug] || 0) + ")</button>";
        }).join("");
      }
    }

    function apply() {
      var list = VF.products.filter(function (p) {
        if (state.cat !== "all" && p.category !== state.cat) return false;
        if (state.max && p.price > state.max) return false;
        if (state.search) {
          var q = state.search.toLowerCase();
          if ((p.name + " " + p.brand + " " + p.desc + " " + p.short).toLowerCase().indexOf(q) === -1) return false;
        }
        return true;
      });
      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name, "ru"); });
      else list.sort(function (a, b) { return (b.badge ? 1 : 0) - (a.badge ? 1 : 0); });

      if (grid) grid.innerHTML = list.length ? list.map(productCard).join("") : '<div class="empty">По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</div>';
      if (countEl) countEl.textContent = "Найдено: " + list.length + " " + plural(list.length, "товар", "товара", "товаров");
    }

    function plural(n, a, b, c) {
      var m = n % 100, d = n % 10;
      if (m > 10 && m < 20) return c;
      if (d === 1) return a;
      if (d > 1 && d < 5) return b;
      return c;
    }

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b || (!listEl || !listEl.contains(b)) && (!chipsEl || !chipsEl.contains(b))) return;
      state.cat = b.getAttribute("data-cat");
      renderFilters(); apply();
      try { history.replaceState(null, "", state.cat === "all" ? location.pathname : "?cat=" + state.cat); } catch (err) {}
    });

    if (sortEl) sortEl.addEventListener("change", function () { state.sort = sortEl.value; apply(); });
    if (priceEl) priceEl.addEventListener("input", function () {
      state.max = Number(priceEl.value);
      if (priceVal) priceVal.textContent = "до " + money(state.max);
      apply();
    });
    if (searchEl) searchEl.addEventListener("input", function () { state.search = searchEl.value; apply(); });
    if (resetEl) resetEl.addEventListener("click", function () {
      state.cat = "all"; state.search = ""; state.max = 200000;
      if (searchEl) searchEl.value = "";
      if (priceEl) priceEl.value = 200000;
      if (priceVal) priceVal.textContent = "до " + money(200000);
      if (sortEl) sortEl.value = "popular";
      state.sort = "popular";
      renderFilters(); apply();
    });

    var titleEl = $("#catalog-title");
    if (titleEl && state.search) {
      titleEl.textContent = 'Поиск: "' + state.search + '"';
    } else if (titleEl && state.cat !== "all") {
      var c = VF.categories.filter(function (x) { return x.slug === state.cat; })[0];
      if (c) titleEl.textContent = c.title;
    } else if (titleEl) {
      titleEl.textContent = "Каталог оборудования";
    }

    renderFilters();
    apply();
  }

  /* ---------- модалка «Заказать звонок» ---------- */
  function openCallback() {
    var modal = document.getElementById("vf-modal");
    var box = document.getElementById("vf-modal-box");
    var overlay = document.getElementById("vf-overlay");
    if (!modal || !box || !overlay) return;
    box.innerHTML =
      '<button class="modal__close" data-modal-close aria-label="Закрыть">' + icon("close") + "</button>" +
      "<h3>Заказать звонок</h3>" +
      '<p class="modal__sub">Оставьте номер — инженер перезвонит и поможет с подбором оборудования.</p>' +
      '<form id="vf-callback-form" novalidate>' +
        '<div class="field"><label class="field__label" for="cb-name">Имя</label>' +
          '<input class="input" id="cb-name" name="name" placeholder="Как к вам обращаться" required>' +
          '<div class="field__error">Укажите имя</div></div>' +
        '<div class="field"><label class="field__label" for="cb-phone">Телефон</label>' +
          '<input class="input" id="cb-phone" name="phone" type="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" required>' +
          '<div class="field__error">Укажите корректный телефон</div></div>' +
        '<button class="btn btn--primary btn--lg btn--block" type="submit">Жду звонка</button>' +
        '<p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.</p>' +
      "</form>";
    modal.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function submitCallback(form) {
    var els = form.elements;
    var ok = true;
    form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
    if (els.name.value.trim().length < 2) { els.name.closest(".field").classList.add("has-error"); ok = false; }
    if (els.phone.value.replace(/\D/g, "").length < 10) { els.phone.closest(".field").classList.add("has-error"); ok = false; }
    if (!ok) return;
    console.log("Заявка на звонок:", { name: els.name.value.trim(), phone: els.phone.value.trim() });
    document.getElementById("vf-modal-box").innerHTML =
      '<button class="modal__close" data-modal-close aria-label="Закрыть">' + icon("close") + "</button>" +
      '<div class="success">' +
        '<div class="success__icon">' + icon("check") + "</div>" +
        "<h3>Заявка принята</h3>" +
        "<p>Перезвоним в рабочее время: " + esc(VF.company.hours) + ".<br>Телефон: " + esc(VF.company.phone) + "</p>" +
        '<button class="btn btn--primary btn--block" data-modal-close style="margin-top:22px">Понятно</button>' +
      "</div>";
    VF.toast("Спасибо! Мы свяжемся с вами");
  }

  /* =====================================================
     ИНИЦИАЛИЗАЦИЯ
     ===================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    $$("[data-vf-form]").forEach(bindStaticForm);
    bindLeadButtons();

    // телефон/почта в статичной разметке
    $$("[data-phone]").forEach(function (el) { el.textContent = VF.company.phone; });
    $$("[data-phone-link]").forEach(function (el) { el.setAttribute("href", "tel:" + VF.company.phoneRaw); });
    $$("[data-email]").forEach(function (el) { el.textContent = VF.company.email; });
    $$("[data-email-link]").forEach(function (el) { el.setAttribute("href", "mailto:" + VF.company.email); });

    var page = document.body.getAttribute("data-page");
    if (page === "home") {
      initHeroSlider();
      renderCategories("#cats-grid");
      renderGateTypes("#gate-grid");
      renderMount("#mount-grid");
      renderAdvantages("#why-grid");
      renderWorks("#works-grid");
      renderSecurity("#sec-grid");
      renderBrands("#brands-grid");
      renderProducts("#showcase-avtomatika", VF.products.filter(function (p) { return p.category === "avtomatika"; }).slice(0, 4));
      renderProducts("#showcase-video", VF.products.filter(function (p) { return p.category === "videonablyudenie"; }).slice(0, 4));
      renderProducts("#showcase-domofony", VF.products.filter(function (p) { return p.category === "domofony" || p.category === "skud"; }).slice(0, 4));
      // мобильное меню
    }
    if (page === "catalog") initCatalog();

    var burger = $("#burger"), nav = $("#header-nav"), backdrop = $("#nav-backdrop");
    function closeNav() {
      if (nav) nav.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
    }
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        if (backdrop) backdrop.classList.toggle("is-open", open);
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a, [data-callback]")) closeNav();
      });
      if (backdrop) backdrop.addEventListener("click", closeNav);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-callback]")) { e.preventDefault(); openCallback(); }
    });
    document.addEventListener("submit", function (e) {
      if (e.target.id === "vf-callback-form") { e.preventDefault(); submitCallback(e.target); }
    });
  });
})();
