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
    var href = "product.html?id=" + p.id;
    return '' +
      '<article class="product" data-id="' + p.id + '">' +
        '<a class="product__media" href="' + href + '">' + badge + '<span class="product__ph">' + esc(p.short) + "</span></a>" +
        '<div class="product__body">' +
          '<div class="product__meta"><span class="product__brand">' + esc(p.brand) + "</span>" + stock + "</div>" +
          '<h3 class="product__name"><a href="' + href + '">' + esc(p.name) + "</a></h3>" +
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

  function renderProductsSlider(sel, list) {
    var el = $(sel);
    if (!el) return;
    el.innerHTML = list.map(function (p) {
      return '<div class="swiper-slide">' + productCard(p) + "</div>";
    }).join("");
  }

  function mountSwipers() {
    if (typeof Swiper === "undefined") return;
    VF.qa(".products-swiper").forEach(function (el) {
      if (el.getAttribute("data-swiper-init")) return;
      el.setAttribute("data-swiper-init", "1");
      var root = el.closest(".products-slider") || el;
      new Swiper(el, {
        slidesPerView: 1.15,
        spaceBetween: 16,
        watchOverflow: true,
        pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
        navigation: { nextEl: root.querySelector(".swiper-button-next"), prevEl: root.querySelector(".swiper-button-prev") },
        breakpoints: {
          560: { slidesPerView: 2, spaceBetween: 16 },
          900: { slidesPerView: 3, spaceBetween: 18 },
          1200: { slidesPerView: 4, spaceBetween: 18 }
        }
      });
    });
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

  /* ---------- каталог: мега-меню (desktop) и аккордеон (mobile) ---------- */
  function initCatalogMenus() {
    var mega = document.getElementById("catalog-megamenu");
    var grid = document.getElementById("catalog-megamenu-grid");
    var sub = document.getElementById("nav-submenu");
    if (grid) {
      grid.innerHTML = VF.categories.map(function (c) {
        return '<a class="megamenu__item" href="catalog.html?cat=' + c.slug + '">' +
          "<b>" + esc(c.title) + "</b><span>" + esc(c.desc) + "</span></a>";
      }).join("");
    }
    if (sub) {
      sub.innerHTML = VF.categories.map(function (c) {
        return '<li><a href="catalog.html?cat=' + c.slug + '">' + esc(c.title) + "</a></li>";
      }).join("") + '<li><a href="catalog.html">Весь каталог →</a></li>';
    }

    function openMega() {
      if (!mega) return;
      mega.classList.add("is-open");
      var b = document.querySelector("[data-catalog-toggle]");
      if (b) { b.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); }
    }
    function closeMega() {
      if (!mega) return;
      mega.classList.remove("is-open");
      var b = document.querySelector("[data-catalog-toggle]");
      if (b) { b.classList.remove("is-open"); b.setAttribute("aria-expanded", "false"); }
    }

    document.addEventListener("click", function (e) {
      var toggle = e.target.closest("[data-catalog-toggle]");
      if (toggle) {
        e.preventDefault();
        if (mega && mega.classList.contains("is-open")) closeMega(); else openMega();
        return;
      }
      if (mega && mega.classList.contains("is-open") && !e.target.closest("#catalog-megamenu")) closeMega();

      var st = e.target.closest("[data-submenu-toggle]");
      if (st) {
        e.preventDefault();
        var list = st.parentElement.querySelector(".nav-submenu");
        var open = list ? list.classList.toggle("is-open") : false;
        st.classList.toggle("is-open", open);
        st.setAttribute("aria-expanded", open ? "true" : "false");
        var panel = st.closest(".header__nav");
        if (open && panel) {
          panel.scrollTop = 0;
          setTimeout(function () { panel.scrollTop = 0; }, 360);
        }
      }
    });
    if (mega) mega.addEventListener("click", function (e) { if (e.target.closest("a")) closeMega(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMega(); });
    VF.closeMegamenu = closeMega;
  }

  /* ---------- квиз подбора ---------- */
  function initQuiz() {
    var form = document.querySelector("[data-quiz]");
    if (!form) return;
    var steps = Array.prototype.slice.call(form.querySelectorAll("[data-quiz-step]"));
    if (!steps.length) return;
    var progress = form.querySelector("[data-quiz-progress]");
    var curEl = form.querySelector("[data-quiz-current]");
    var totalEl = form.querySelector("[data-quiz-total]");
    var back = form.querySelector("[data-quiz-back]");
    var next = form.querySelector("[data-quiz-next]");
    var submit = form.querySelector("[data-quiz-submit]");
    var i = 0;
    if (totalEl) totalEl.textContent = steps.length;

    function render() {
      steps.forEach(function (s, n) { s.classList.toggle("is-active", n === i); });
      if (curEl) curEl.textContent = i + 1;
      if (progress) progress.style.width = ((i + 1) / steps.length * 100) + "%";
      if (back) back.hidden = i === 0;
      if (next) next.hidden = i === steps.length - 1;
      if (submit) submit.hidden = i !== steps.length - 1;
    }
    function go(n) { i = Math.max(0, Math.min(steps.length - 1, n)); render(); }

    if (next) next.addEventListener("click", function () { go(i + 1); });
    if (back) back.addEventListener("click", function () { go(i - 1); });
    form.addEventListener("click", function (e) {
      var choice = e.target.closest(".choice");
      if (!choice || i >= steps.length - 1) return;
      if (choice.closest("[data-quiz-step]") !== steps[i]) return;
      setTimeout(function () { go(i + 1); }, 220);
    });
    form.addEventListener("change", function (e) {
      if (!e.target.matches('input[type="file"]')) return;
      var label = e.target.closest(".upload");
      if (!label) return;
      var nameEl = label.querySelector("[data-upload-name]");
      var f = e.target.files && e.target.files[0];
      if (f) { if (nameEl) nameEl.textContent = f.name; label.classList.add("has-file"); }
      else { if (nameEl) nameEl.textContent = ""; label.classList.remove("has-file"); }
    });
    render();
  }

  /* ---------- страница товара ---------- */
  function benefit(iconName, title, text) {
    return '<div class="product-benefit"><span class="product-benefit__icon">' + icon(iconName) + "</span>" +
      "<div><h4>" + esc(title) + "</h4><p>" + esc(text) + "</p></div></div>";
  }

  function initProductPage() {
    var root = document.getElementById("product-root");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = id ? byId(id) : VF.products[0];
    var bc = document.getElementById("product-breadcrumbs");

    if (!p) {
      root.innerHTML = '<div class="empty">Товар не найден. <a class="section__link" href="catalog.html">Вернуться в каталог →</a></div>';
      if (bc) bc.innerHTML = '<a href="index.html">Главная</a> <span>/</span> <a href="catalog.html">Каталог</a>';
      return;
    }

    var cat = VF.categories.filter(function (c) { return c.slug === p.category; })[0];
    document.title = p.name + " — купить в " + VF.company.name;
    if (bc) bc.innerHTML =
      '<a href="index.html">Главная</a> <span>/</span> ' +
      '<a href="catalog.html">Каталог</a> <span>/</span> ' +
      '<a href="catalog.html?cat=' + p.category + '">' + esc(cat ? cat.title : "Каталог") + "</a> <span>/</span> " +
      "<span>" + esc(p.short) + "</span>";

    var badge = p.badge ? '<span class="badge badge--' + p.badge + '">' + BADGE[p.badge] + "</span>" : "";
    var stock = p.stock === "order" ? '<span class="stock stock--order">Под заказ</span>' : '<span class="stock stock--in">В наличии</span>';
    var old = p.oldPrice ? "<s>" + money(p.oldPrice) + "</s>" : "";
    var specs = (p.specs || []).map(function (s) {
      return '<div class="row"><dt>' + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>";
    }).join("");

    root.innerHTML =
      '<div class="product-gallery">' +
        '<div class="product-gallery__main">' + badge + '<span class="ph">' + esc(p.short) + "</span></div>" +
        '<div class="product-gallery__thumbs">' +
          [0, 1, 2].map(function () { return '<span class="product-gallery__thumb">' + esc(p.brand) + "</span>"; }).join("") +
        "</div>" +
      "</div>" +
      '<div class="product-info">' +
        '<div class="product-info__meta"><span class="product__brand">' + esc(p.brand) + "</span>" + stock + "</div>" +
        "<h1>" + esc(p.name) + "</h1>" +
        '<p class="product-info__desc">' + esc(p.desc) + "</p>" +
        '<div class="product-info__price"><b>' + money(p.price) + "</b>" + old + "</div>" +
        '<div class="product-buy">' +
          '<div class="qty"><button type="button" data-pqty="dec" aria-label="Меньше">−</button><span id="p-qty">1</span><button type="button" data-pqty="inc" aria-label="Больше">+</button></div>' +
          '<button class="btn btn--primary btn--lg" data-buy="' + p.id + '">В корзину</button>' +
          '<button class="btn btn--ghost btn--lg" data-callback>Купить в 1 клик</button>' +
        "</div>" +
        '<div class="product-benefits">' +
          benefit("shield", "Гарантия до 2 лет", "Официальная гарантия на оборудование и монтаж") +
          benefit("truck", "Доставка по Москве и области", "Привезём на объект или в пункт выдачи") +
          benefit("wrench", "Профессиональный монтаж", "Установим и настроим систему под ключ") +
        "</div>" +
        (specs ? '<div class="product-specs"><h3>Характеристики</h3><dl>' + specs + "</dl></div>" : "") +
      "</div>";

    var descEl = document.getElementById("product-desc");
    if (descEl) {
      descEl.innerHTML =
        '<div class="product-text">' +
          '<h3 style="font-size:24px;margin-bottom:10px">Описание</h3>' +
          "<p>" + esc(p.name) + " — " + esc(p.desc) + ". Оборудование поставляется оригинальным, с документами и официальной гарантией. Перед покупкой уточним совместимость с вашими воротами и при необходимости поможем с установкой под ключ в Москве и Московской области.</p>" +
        "</div>";
    }

    var qty = 1;
    var qtyEl = document.getElementById("p-qty");
    root.addEventListener("click", function (e) {
      if (e.target.closest('[data-pqty="inc"]')) { qty++; qtyEl.textContent = qty; return; }
      if (e.target.closest('[data-pqty="dec"]')) { qty = Math.max(1, qty - 1); qtyEl.textContent = qty; return; }
      var buy = e.target.closest("[data-buy]");
      if (buy) { VF.cart.add(buy.getAttribute("data-buy"), qty); }
    });

    var rel = VF.products.filter(function (x) { return x.category === p.category && x.id !== p.id; });
    VF.products.forEach(function (x) {
      if (x.id !== p.id && rel.indexOf(x) === -1 && rel.length < 8) rel.push(x);
    });
    renderProductsSlider("#related-grid", rel.slice(0, 8));
    mountSwipers();
  }

  /* =====================================================
     ИНИЦИАЛИЗАЦИЯ
     ===================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    $$("[data-vf-form]").forEach(bindStaticForm);
    bindLeadButtons();
    initCatalogMenus();

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
      renderProductsSlider("#showcase-avtomatika", VF.products.filter(function (p) { return p.category === "avtomatika"; }).slice(0, 8));
      renderProductsSlider("#showcase-video", VF.products.filter(function (p) { return p.category === "videonablyudenie"; }).slice(0, 8));
      renderProductsSlider("#showcase-domofony", VF.products.filter(function (p) { return p.category === "domofony" || p.category === "skud"; }).slice(0, 8));
      mountSwipers();
    }
    if (page === "catalog") initCatalog();
    if (page === "product") initProductPage();
    initQuiz();

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
        if (open) nav.scrollTop = 0;
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
