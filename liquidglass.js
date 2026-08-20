(function () {
  var SELECTOR = [
    ".project", ".project-intro", ".world__info", ".site-menu",
    ".round-link", ".language-toggle", ".menu-toggle", ".header-contact",
    ".contact__pretitle",
  ].join(",");

  document.querySelectorAll(SELECTOR).forEach(function (el) {
    el.classList.add("liquid-glass");
  });
})();