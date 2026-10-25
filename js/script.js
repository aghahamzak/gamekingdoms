// THE GAME KINGDOMS — site behaviour
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal sections as they scroll into view
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Screenshot lightbox (game pages)
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var big = lightbox.querySelector('img');
    var close = function () { lightbox.hidden = true; big.src = ''; };
    document.querySelectorAll('.gallery button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        big.src = img.src;
        big.alt = img.alt;
        lightbox.hidden = false;
        lightbox.querySelector('button').focus();
      });
    });
    lightbox.addEventListener('click', function (e) { if (e.target !== big) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) close(); });
  }
})();
