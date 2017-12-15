var html = document.documentElement;
up.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) + 1 + 'px';
};
down.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) - 1 + 'px';
};