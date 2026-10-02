/* ВОРОТА FIX — утилиты и корзина (localStorage) */
window.VF = window.VF || {};

(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- утилиты ---------- */
  VF.money = function (n) {
    return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
  };
  VF.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  VF.q = $;
  VF.qa = $$;

  VF.icon = function (name, cls) {
    var p = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.5l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      minus: '<path d="M5 12h14"/>',
      check: '<path d="m20 6-11 11-5-5"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/>',
      mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
      truck: '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
      wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.7-.7-2.6z"/>',
      calc: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/>',
      photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>'
    }[name] || "";
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  };

  /* =====================================================
     КОРЗИНА
     ===================================================== */
  var KEY = "vf_cart_v1";
  var ORDERS = "vf_orders_v1";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("vf:cart"));
  }
  function find(id) { return VF.products.filter(function (p) { return p.id === id; })[0]; }

  var cart = {
    items: function () {
      return read().map(function (it) {
        var p = find(it.id);
        return p ? { product: p, qty: it.qty } : null;
      }).filter(Boolean);
    },
    count: function () {
      return read().reduce(function (s, it) { return s + it.qty; }, 0);
    },
    total: function () {
      return cart.items().reduce(function (s, it) { return s + it.product.price * it.qty; }, 0);
    },
    qty: function (id) {
      var it = read().filter(function (x) { return x.id === id; })[0];
      return it ? it.qty : 0;
    },
    add: function (id, qty) {
      qty = qty || 1;
      var items = read();
      var it = items.filter(function (x) { return x.id === id; })[0];
      if (it) it.qty += qty; else items.push({ id: id, qty: qty });
      write(items);
      var p = find(id);
      VF.toast((p ? p.short : "Товар") + " — добавлено в корзину");
      cart.open();
    },
    setQty: function (id, qty) {
      var items = read();
      var it = items.filter(function (x) { return x.id === id; })[0];
      if (!it) return;
      it.qty = Math.max(1, qty);
      write(items);
    },
    remove: function (id) {
      write(read().filter(function (x) { return x.id !== id; }));
    },
    clear: function () { write([]); },
    open: function () { $("#vf-drawer").classList.add("is-open"); $("#vf-overlay").classList.add("is-open"); document.body.style.overflow = "hidden"; },
    close: function () { $("#vf-drawer").classList.remove("is-open"); if (!$("#vf-modal").classList.contains("is-open")) { $("#vf-overlay").classList.remove("is-open"); document.body.style.overflow = ""; } }
  };
  VF.cart = cart;

  /* =====================================================
     РАЗМЕТКА: корзина, модалка, тосты
     ===================================================== */
  var MINI = '<div class="cart-item__img">{short}</div>';

  function cartItemHTML(it) {
    var p = it.product;
    return '' +
      '<div class="cart-item" data-id="' + p.id + '">' +
        '<div class="cart-item__img">' + VF.esc(p.short.replace(/\s.+/,"")) + "</div>" +
        "<div>" +
          '<div class="cart-item__brand">' + VF.esc(p.brand) + "</div>" +
          '<div class="cart-item__name">' + VF.esc(p.name) + "</div>" +
          '<div class="cart-item__price">' + VF.money(p.price * it.qty) + "</div>" +
          '<button class="cart-item__remove" data-remove="' + p.id + '">Удалить</button>' +
        "</div>" +
        '<div class="cart-item__side">' +
          '<div class="qty">' +
            '<button data-dec="' + p.id + '" aria-label="Меньше">−</button>' +
            "<span>" + it.qty + "</span>" +
            '<button data-inc="' + p.id + '" aria-label="Больше">+</button>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function renderCart() {
    var items = cart.items();
    var n = cart.count();
    VF.qa("[data-cart-count]").forEach(function (el) {
      el.textContent = n;
      el.setAttribute("data-empty", n === 0 ? "true" : "false");
    });
    var list = $("#vf-cart-list");
    var foot = $("#vf-cart-foot");
    if (!list) return;
    if (!items.length) {
      list.innerHTML = '<div class="cart-empty">' + VF.icon("cart") + "<p>Корзина пока пуста</p></div>";
      foot.innerHTML = "";
      return;
    }
    list.innerHTML = items.map(cartItemHTML).join("");
    foot.innerHTML =
      '<div class="summary-row"><span>Товаров</span><span>' + n + " шт.</span></div>" +
      '<div class="summary-row summary-row--total"><span>Итого</span><b>' + VF.money(cart.total()) + "</b></div>" +
      '<button class="btn btn--primary btn--lg btn--block" id="vf-checkout" style="margin-top:14px">Оформить заказ</button>';
  }

  function buildUI() {
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<div class="overlay" id="vf-overlay"></div>' +
      '<aside class="drawer" id="vf-drawer" aria-label="Корзина">' +
        '<div class="drawer__head"><h3>Корзина</h3>' +
          '<button class="drawer__close" data-cart-close aria-label="Закрыть">' + VF.icon("close") + "</button></div>" +
        '<div class="drawer__body" id="vf-cart-list"></div>' +
        '<div class="drawer__foot" id="vf-cart-foot"></div>' +
      "</aside>" +
      '<div class="modal" id="vf-modal"><div class="modal__box" id="vf-modal-box"></div></div>' +
      '<div class="toast" id="vf-toast"></div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    renderCart();
  }

  /* ---------- оформление заказа ---------- */
  function openCheckout() {
    if (!cart.items().length) return;
    var rows = cart.items().map(function (it) {
      return '<div class="summary-row"><span>' + VF.esc(it.product.short) + " × " + it.qty + "</span><span>" + VF.money(it.product.price * it.qty) + "</span></div>";
    }).join("");
    $("#vf-modal-box").innerHTML =
      '<button class="modal__close" data-modal-close aria-label="Закрыть">' + VF.icon("close") + "</button>" +
      "<h3>Оформление заказа</h3>" +
      '<p class="modal__sub">Заполните данные — менеджер подтвердит заказ и стоимость доставки.</p>' +
      '<form id="vf-order-form" novalidate>' +
        '<div class="field"><label class="field__label" for="of-name">Имя</label>' +
          '<input class="input" id="of-name" name="name" placeholder="Как к вам обращаться" required>' +
          '<div class="field__error">Укажите имя</div></div>' +
        '<div class="field"><label class="field__label" for="of-phone">Телефон</label>' +
          '<input class="input" id="of-phone" name="phone" inputmode="tel" placeholder="+7 (___) ___-__-__" required>' +
          '<div class="field__error">Укажите корректный телефон</div></div>' +
        '<div class="field"><label class="field__label" for="of-comment">Комментарий</label>' +
          '<textarea class="input" id="of-comment" name="comment" placeholder="Адрес объекта, тип ворот, пожелания"></textarea></div>' +
        "<div style=\"border-top:1px solid var(--border);margin:20px 0;padding-top:18px\">" +
          '<div class="summary-row"><span>Товаров</span><span>' + cart.count() + " шт.</span></div>" + rows +
          '<div class="summary-row summary-row--total"><span>Итого</span><b>' + VF.money(cart.total()) + "</b></div>" +
        "</div>" +
        '<button class="btn btn--primary btn--lg btn--block" type="submit">Отправить заказ</button>' +
        '<p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.</p>' +
      "</form>";
    $("#vf-modal").classList.add("is-open");
    $("#vf-overlay").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function validPhone(v) {
    var d = String(v).replace(/\D/g, "");
    return d.length >= 10;
  }

  function submitOrder(form) {
    var els = form.elements;
    var name = els.name.value.trim();
    var phone = els.phone.value.trim();
    var ok = true;
    form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
    if (name.length < 2) { els.name.closest(".field").classList.add("has-error"); ok = false; }
    if (!validPhone(phone)) { els.phone.closest(".field").classList.add("has-error"); ok = false; }
    if (!ok) return;

    var order = {
      id: "VF-" + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      name: name,
      phone: phone,
      comment: els.comment.value.trim(),
      items: cart.items().map(function (it) {
        return { id: it.product.id, name: it.product.name, price: it.product.price, qty: it.qty };
      }),
      total: cart.total()
    };

    // Интеграция с бэкендом: замените этот блок на fetch('/api/order', ...)
    try {
      var all = JSON.parse(localStorage.getItem(ORDERS)) || [];
      all.push(order);
      localStorage.setItem(ORDERS, JSON.stringify(all));
    } catch (e) {}
    console.log("Новый заказ:", order);

    cart.clear();
    $("#vf-modal-box").innerHTML =
      '<button class="modal__close" data-modal-close aria-label="Закрыть">' + VF.icon("close") + "</button>" +
      '<div class="success">' +
        '<div class="success__icon">' + VF.icon("check") + "</div>" +
        "<h3>Заказ " + order.id + " принят</h3>" +
        "<p>Менеджер свяжется с вами в рабочее время, чтобы подтвердить состав и стоимость.<br>Телефон: " + VF.esc(VF.company.phone) + "</p>" +
        '<button class="btn btn--primary btn--block" data-modal-close style="margin-top:22px">Понятно</button>' +
      "</div>";
    VF.toast("Спасибо! Заявка отправлена");
  }

  VF.toast = function (msg) {
    var t = $("#vf-toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-open");
    clearTimeout(VF.toast._t);
    VF.toast._t = setTimeout(function () { t.classList.remove("is-open"); }, 2600);
  };

  /* ---------- события ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var add = t.closest("[data-add]");
    if (add) { cart.add(add.getAttribute("data-add")); return; }

    if (t.closest("[data-cart-open]")) { cart.open(); return; }
    if (t.closest("[data-cart-close]")) { cart.close(); return; }
    if (t.id === "vf-overlay") { cart.close(); closeModal(); return; }
    if (t.closest("[data-modal-close]")) { closeModal(); return; }

    var inc = t.closest("[data-inc]");
    if (inc) { var id = inc.getAttribute("data-inc"); cart.setQty(id, cart.qty(id) + 1); return; }
    var dec = t.closest("[data-dec]");
    if (dec) { var id2 = dec.getAttribute("data-dec"); cart.setQty(id2, cart.qty(id2) - 1); return; }
    var rm = t.closest("[data-remove]");
    if (rm) { cart.remove(rm.getAttribute("data-remove")); return; }
    if (t.closest("#vf-checkout")) { openCheckout(); return; }
  });

  function closeModal() {
    $("#vf-modal").classList.remove("is-open");
    $("#vf-overlay").classList.remove("is-open");
    document.body.style.overflow = "";
  }
  VF.closeModal = closeModal;

  document.addEventListener("submit", function (e) {
    if (e.target.id === "vf-order-form") {
      e.preventDefault();
      submitOrder(e.target);
    }
  });

  document.addEventListener("vf:cart", renderCart);

  document.addEventListener("DOMContentLoaded", function () {
    buildUI();
    renderCart();
  });
})();
