// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
  }

  // Animate QC zone bars on load
  var zones = [
    {fill:'z1', val:100},
    {fill:'z2', val:98},
    {fill:'z3', val:94},
    {fill:'z4', val:88},
  ];
  setTimeout(function() {
    zones.forEach(function(z, i) {
      setTimeout(function() {
        var el = document.getElementById(z.fill);
        if (el) el.style.width = z.val + '%';
      }, i * 180);
    });
  }, 400);

  // Animate score counter
  var start = 0, end = 96, duration = 1200;
  var step = end / (duration / 16);
  var el = document.getElementById('heroScore');
  if (el) {
    var interval = setInterval(function() {
      start = Math.min(start + step, end);
      el.textContent = Math.round(start) + '%';
      if (start >= end) clearInterval(interval);
    }, 16);
  }

  // Quote form submission
  var form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      if (btn) {
        btn.textContent = '✓ Sent! We\'ll be in touch within 2 hours.';
        btn.style.background = '#148049';
      }
    });
  }

  // Enter key submits form in inputs (not textarea)
  form && form.querySelectorAll('input, select').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var btn = form.querySelector('.form-submit');
        if (btn) btn.click();
      }
    });
  });
});
