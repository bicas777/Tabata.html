/* Efeito de blur simples, sem distorção desnecessária */
(function () {
  var TARGETS = [".project", ".project-intro", ".round-link", ".site-header"].join(",");

  if (!document.querySelector(TARGETS)) return;

  document.querySelectorAll(TARGETS).forEach(function (target) {
    target.style.backdropFilter = "blur(20px) saturate(180%)";
    target.style.webkitBackdropFilter = "blur(20px) saturate(180%)";
  });
})();