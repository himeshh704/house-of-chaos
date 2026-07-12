/* ==========================================================================
   HOUSE OF CHAOS - LUXURY INTERACTIVE SCRIPT
   Aesthetics: Dubai Nightlife, Exclusive Members Clubs, Dark & Champagne Gold
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const config = loadAdminConfig();
  
  initLoader();
  initHeaderScroll();
  initCanvasParticles();
  applyAdminConfig(config);
  initWhatsAppBooking(config);
  initMobileMenu();
  initCardGlow();
  initFAQAccordion();
  initLenis();
});

/* 1. Load Admin Configuration JSON */
function loadAdminConfig() {
  try {
    const configEl = document.getElementById('admin-config');
    if (configEl) {
      return JSON.parse(configEl.textContent);
    }
  } catch (e) {
    console.error('Error parsing admin-config JSON', e);
  }
  return {
    eventDate: "25 July",
    eventTime: "7 PM Onwards",
    venueName: "Club Nirvana",
    venueLocation: "Jodhpur",
    contactNumber: "917023438522",
    passesTotal: 80,
    passesReserved: 52,
    currentPhase: "PHASE 1",
    prices: {
      "stag": 699,
      "stagCover": 1500,
      "couple": 599,
      "coupleCover": 2000,
      "girls": 0,
      "girlsCover": 1000,
      "vipSmall": 7999,
      "vipBig": 11999
    }
  };
}

/* 2. Apply Admin Settings to HTML Elements */
function applyAdminConfig(config) {
  // Date & Time Elements
  const dateEl = document.getElementById('meta-date');
  const venueEl = document.getElementById('meta-venue');
  const timeEl = document.getElementById('meta-time');
  const phaseEl = document.getElementById('phase-badge');

  if (dateEl) dateEl.textContent = config.eventDate.toUpperCase();
  if (venueEl) venueEl.textContent = `${config.venueName.toUpperCase()}, ${config.venueLocation.toUpperCase()}`;
  if (timeEl) timeEl.textContent = config.eventTime.toUpperCase();
  if (phaseEl) phaseEl.textContent = config.currentPhase.toUpperCase();

  // Pricing Elements
  const priceStag = document.getElementById('price-stag');
  const priceStagCover = document.getElementById('price-stag-cover');
  const priceCouple = document.getElementById('price-couple');
  const priceCoupleCover = document.getElementById('price-couple-cover');
  const priceGirls = document.getElementById('price-girls');
  const priceGirlsCover = document.getElementById('price-girls-cover');
  const priceVipSmall = document.getElementById('price-vip-small');
  const priceVipBig = document.getElementById('price-vip-big');

  if (priceStag) priceStag.textContent = `₹${config.prices.stag}`;
  if (priceStagCover) priceStagCover.textContent = `₹${config.prices.stagCover}`;
  if (priceCouple) priceCouple.textContent = `₹${config.prices.couple}`;
  if (priceCoupleCover) priceCoupleCover.textContent = `₹${config.prices.coupleCover}`;
  if (priceGirls) priceGirls.textContent = config.prices.girls === 0 ? "FREE" : `₹${config.prices.girls}`;
  if (priceGirlsCover) priceGirlsCover.textContent = `₹${config.prices.girlsCover}`;
  if (priceVipSmall) priceVipSmall.textContent = `₹${config.prices.vipSmall.toLocaleString('en-IN')}`;
  if (priceVipBig) priceVipBig.textContent = `₹${config.prices.vipBig.toLocaleString('en-IN')}`;

  // Capacity / Urgency Elements
  const reservedEl = document.getElementById('tickets-reserved');
  const remainingEl = document.getElementById('tickets-remaining');
  const progressFill = document.getElementById('tickets-progress-fill');
  const stickyAlert = document.getElementById('sticky-ticket-alert');

  const reserved = config.passesReserved;
  const total = config.passesTotal;
  const remaining = Math.max(0, total - reserved);
  const percentage = Math.min(100, Math.floor((reserved / total) * 100));

  if (reservedEl) reservedEl.textContent = reserved;
  if (remainingEl) remainingEl.textContent = remaining;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (stickyAlert) stickyAlert.textContent = `${reserved}/${total} Passes Reserved`;
}

/* 3. Page Loader Control */
function initLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.classList.remove('loading');
      }, 1000);
    });
  }
}

/* 4. Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.nav-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 5. Gold Particles Canvas Animation */
function initCanvasParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height + height;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '#D4AF37' : '#F5E6C4';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y < 0) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
      if (this.x < 0 || this.x > width) {
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particlesArray = [];
    const numberOfParticles = Math.floor((width * height) / 10000);
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
      particlesArray[i].y = Math.random() * height;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

/* 6. WhatsApp Link and Booking Management */
function initWhatsAppBooking(config) {
  const contact = config.contactNumber;

  // General inquiry links
  const generalMsg = `Hi House of Chaos Team, I would like to enquire about passes for House of Chaos on ${config.eventDate} at ${config.venueName}, ${config.venueLocation}.`;
  const encodedGeneral = encodeURIComponent(generalMsg);
  const generalUrl = `https://wa.me/${contact}?text=${encodedGeneral}`;

  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.setAttribute('href', generalUrl);
    link.setAttribute('target', '_blank');
  });

  // Ticket tier booking buttons
  document.querySelectorAll('.pass-booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const passName = btn.getAttribute('data-pass');
      
      const message = `Hi House of Chaos Team,

I would like to reserve:

${passName}

Please share booking details.

Thank you.`;

      const encodedMsg = encodeURIComponent(message);
      const bookingUrl = `https://wa.me/${contact}?text=${encodedMsg}`;
      window.open(bookingUrl, '_blank');
    });
  });
}

/* 7. Mobile Navigation Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isVisible = navLinks.classList.contains('active');
      
      if (isVisible) {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
      } else {
        navLinks.classList.add('active');
        toggle.classList.add('active');
      }
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
}

/* 8. Pass Card Cursor Glow Tracking */
function initCardGlow() {
  const cards = document.querySelectorAll('.pass-card, .vip-card');
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 9. FAQ Accordion Handler */
function initFAQAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close other accordion panels
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const panel = item.querySelector('.faq-panel');
        if (panel) {
          panel.style.maxHeight = null;
        }
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isActive) {
        parent.classList.add('active');
        const panel = parent.querySelector('.faq-panel');
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        const icon = parent.querySelector('.faq-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });
}

/* 10. Lenis Inertial Scrolling Initialization */
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with standard hash link scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: -80,
            duration: 1.2
          });
        }
      });
    });
  }
}
