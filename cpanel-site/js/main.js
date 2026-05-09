/* ============================================================
 * INFRASCALE AFRICA LIMITED — main.js
 * Handles: mobile menu, scroll animations, header behaviour,
 *          contact form submission via Web3Forms
 * ============================================================ */

(function () {
  'use strict';

  // ============ INIT ON LOAD ============
  document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS scroll animations
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
      });
    }

    // Set current year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    var toggle = document.getElementById('mobileToggle');
    var menu = document.getElementById('mobileMenu');
    var icon = document.getElementById('menuIcon');

    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        menu.classList.toggle('is-open');
        if (icon) {
          icon.className = menu.classList.contains('is-open') ? 'bi bi-x-lg' : 'bi bi-list';
        }
      });

      // Close mobile menu when a link is clicked
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('is-open');
          if (icon) icon.className = 'bi bi-list';
        });
      });
    }

    // Smooth scroll for anchor links (with header offset)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var headerHeight = document.getElementById('siteHeader').offsetHeight || 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    // Header scroll shadow / shrink
    var header = document.getElementById('siteHeader');
    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          header.style.background = 'rgba(10, 14, 20, 0.92)';
        } else {
          header.style.background = 'rgba(10, 14, 20, 0.7)';
        }
      });
    }

    // ============ CONTACT FORM ============
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var btn = document.getElementById('submitBtn');
      var alertBox = document.getElementById('formAlert');
      var btnText = btn.querySelector('.btn-text');
      var originalBtnHtml = btnText.innerHTML;

      // Collect form data
      var data = {
        name: form.name.value,
        email: form.email.value,
        company: form.company.value,
        subject: form.subject.value,
        message: form.message.value
      };

      // Disable + show loading
      btn.disabled = true;
      btnText.innerHTML = '<i class="bi bi-arrow-repeat"></i> Sending…';
      alertBox.style.display = 'none';

      try {
        var res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'a344f951-eaa0-4df1-9425-689e20c3b6b6',
            to: 'info@infrascale.africa',
            subject: 'New Enquiry: ' + data.subject + ' — from ' + data.name,
            name: data.name,
            email: data.email,
            company: data.company,
            message: data.message,
            from_name: 'Infrascale Africa Website'
          })
        });

        var result = await res.json();

        if (result.success) {
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = '<i class="bi bi-check-circle"></i> Thank you — your message has been sent. We will respond within 1 business day.';
          alertBox.style.display = 'flex';
          form.reset();

          // Track in Google Analytics
          if (typeof gtag === 'function') {
            gtag('event', 'contact_form_submit', { event_category: 'engagement', event_label: data.subject });
          }
        } else {
          throw new Error('Submission failed');
        }

      } catch (err) {
        alertBox.className = 'form-alert error';
        alertBox.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Something went wrong. Please email us directly at info@infrascale.africa';
        alertBox.style.display = 'flex';
      } finally {
        btn.disabled = false;
        btnText.innerHTML = originalBtnHtml;
      }
    });
  });
})();
