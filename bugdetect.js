(function () {
  var banner = null;
  function show(label, info) {
    if (banner) banner.remove();
    banner = document.createElement("div");
    banner.id = "bug-detect";
    banner.style.cssText = "position:fixed;bottom:8px;right:8px;z-index:999999;background:#ff2d55;color:#fff;font:700 12px/1.4 monospace;padding:10px 12px;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.5);";
    banner.textContent = label + " " + info;
    document.body.appendChild(banner);
  }
  function check() {
    var h = document.querySelector(".site-header");
    if (!h) return;
    var cs = getComputedStyle(h);
    var w = parseFloat(cs.width) || 0;
    var broken = cs.position !== "fixed" || w > 1250 || cs.width === "100%";
    if (broken) {
      console.error("[bug-detect] header QUEBRADO: pos=" + cs.position + " w=" + cs.width + " h=" + cs.height + " disp=" + cs.display);
      show("BUG HEADER:", "pos=" + cs.position + " w=" + cs.width + " h=" + cs.height);
    } else {
      console.log("[bug-detect] header ok: pos=" + cs.position + " w=" + cs.width);
    }
  }
  window.addEventListener("load", check);
  setTimeout(check, 1500);
  setTimeout(check, 4000);
  window.addEventListener("resize", check);
})();