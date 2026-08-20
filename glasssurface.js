/* eslint-disable */
(function () {
  var TARGETS = [".project", ".project-intro", ".round-link", ".site-header"].join(",");

  var CONFIG = {
    distortionScale: -180,
    redOffset: 50,
    greenOffset: 50,
    blueOffset: 50,
    displace: 3,
  };

  var SUPPORTED = (function () {
    try {
      if ((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) || /Firefox/.test(navigator.userAgent)) {
        return false;
      }
      var div = document.createElement("div");
      div.style.backdropFilter = "url(#glass-surface-test)";
      return div.style.backdropFilter !== "";
    } catch (e) {
      return false;
    }
  })();

  var counter = 0;

  function uid() {
    return "gs-" + (++counter);
  }

  function elN(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function generateDisplacementMap(target, filterId, redGradId, blueGradId) {
    var rect = target.getBoundingClientRect();
    var actualWidth = rect.width || 400;
    var actualHeight = rect.height || 200;
    var borderWidth = 0.07;
    var borderRadius = 20;
    var brightness = 50;
    var opacity = 0.93;
    var blur = 11;
    var mixBlendMode = "difference";
    var edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    var svgContent =
      "<svg viewBox=\"0 0 " + actualWidth + " " + actualHeight + "\" xmlns=\"http://www.w3.org/2000/svg\">" +
      "<defs>" +
      "<linearGradient id=\"" + redGradId + "\" x1=\"100%\" y1=\"0%\" x2=\"0%\" y2=\"0%\">" +
      "<stop offset=\"0%\" stop-color=\"#0000\"/><stop offset=\"100%\" stop-color=\"red\"/></linearGradient>" +
      "<linearGradient id=\"" + blueGradId + "\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">" +
      "<stop offset=\"0%\" stop-color=\"#0000\"/><stop offset=\"100%\" stop-color=\"blue\"/></linearGradient>" +
      "</defs>" +
      "<rect x=\"0\" y=\"0\" width=\"" + actualWidth + "\" height=\"" + actualHeight + "\" fill=\"black\"></rect>" +
      "<rect x=\"0\" y=\"0\" width=\"" + actualWidth + "\" height=\"" + actualHeight + "\" rx=\"" + borderRadius + "\" fill=\"url(#" + redGradId + ")\" />" +
      "<rect x=\"0\" y=\"0\" width=\"" + actualWidth + "\" height=\"" + actualHeight + "\" rx=\"" + borderRadius + "\" fill=\"url(#" + blueGradId + ")\" style=\"mix-blend-mode: " + mixBlendMode + "\" />" +
      "<rect x=\"" + edgeSize + "\" y=\"" + edgeSize + "\" width=\"" + (actualWidth - edgeSize * 2) + "\" height=\"" + (actualHeight - edgeSize * 2) + "\" rx=\"" + borderRadius + "\" fill=\"hsl(0 0% " + brightness + "% / " + opacity + ")\" style=\"filter:blur(" + blur + "px)\" />" +
      "</svg>";

    return "data:image/svg+xml," + encodeURIComponent(svgContent);
  }

  function buildGlass(target) {
    var id = uid();
    var filterId = "glass-filter-" + id;
    var redGradId = "red-grad-" + id;
    var blueGradId = "blue-grad-" + id;

    var content = document.createElement("div");
    content.className = "glass-surface__content";
    while (target.firstChild) content.appendChild(target.firstChild);
    target.appendChild(content);

    var svg = elN("svg", { class: "glass-surface__filter", xmlns: "http://www.w3.org/2000/svg" });
    var defs = elN("defs", {});
    var filter = elN("filter", {
      id: filterId,
      "color-interpolation-filters": "sRGB",
      x: "0%", y: "0%", width: "100%", height: "100%",
    });

    var feImage = elN("feImage", {
      x: "0", y: "0", width: "100%", height: "100%",
      preserveAspectRatio: "none", result: "map",
    });
    feImage.setAttribute("href", generateDisplacementMap(target, filterId, redGradId, blueGradId));
    filter.appendChild(feImage);

    var rect = target.getBoundingClientRect();
    var sizeFactor = Math.max(0.25, Math.min(1, Math.min(rect.width, rect.height) / 400));
    var scales = [
      (CONFIG.distortionScale + CONFIG.redOffset) * sizeFactor,
      (CONFIG.distortionScale + CONFIG.greenOffset) * sizeFactor,
      (CONFIG.distortionScale + CONFIG.blueOffset) * sizeFactor,
    ];
    var channels = [
      "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0",
      "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0",
      "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0",
    ];
    var names = ["red", "green", "blue"];

    for (var i = 0; i < 3; i++) {
      filter.appendChild(elN("feDisplacementMap", {
        in: "SourceGraphic", in2: "map", scale: String(scales[i]),
        xChannelSelector: "R", yChannelSelector: "G",
        result: "disp" + names[i],
      }));
      filter.appendChild(elN("feColorMatrix", {
        in: "disp" + names[i], type: "matrix", values: channels[i], result: names[i],
      }));
    }
    filter.appendChild(elN("feBlend", { in: "red", in2: "green", mode: "screen", result: "rg" }));
    filter.appendChild(elN("feBlend", { in: "rg", in2: "blue", mode: "screen", result: "output" }));
    filter.appendChild(elN("feGaussianBlur", { in: "output", stdDeviation: String(CONFIG.displace) }));

    defs.appendChild(filter);
    svg.appendChild(defs);
    target.appendChild(svg);

    target.classList.add("glass-surface", "glass-surface--svg");
    var frost = target.classList.contains("round-link") || target.classList.contains("site-header") ? 0.1 : 0;
    target.style.setProperty("--glass-frost", String(frost));
    target.style.setProperty("--glass-saturation", "1");
    target.style.setProperty("--filter-id", "url(#" + filterId + ")");

    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        setTimeout(function () {
          feImage.setAttribute("href", generateDisplacementMap(target, filterId, redGradId, blueGradId));
        }, 0);
      }).observe(target);
    }
  }

  if (!SUPPORTED) return;
  if (!document.querySelector(TARGETS)) return;

  document.querySelectorAll(TARGETS).forEach(buildGlass);
})();