/* ==========================================================================
   HOUSE OF CHAOS - LUXURY INTERACTIVE SCRIPT
   Aesthetics: Dubai Nightlife, Rolex, Bentley, Exclusive Members Clubs
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeaderScroll();
  initCanvasParticles();
  initScrollReveal();
  initWhatsAppBooking();
  initMobileMenu();
  initCardGlow();
  initLenis();
});

/* 1. Page Loader Control */
function initLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 1200); // Elegant delay to appreciate the entry logo shimmer
    });
  }
}

/* 2. Header Scroll Effect */
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

/* 3. Gold Particles Canvas Animation */
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
      this.y = Math.random() * height + height; // Start below the visible screen or randomly
      this.size = Math.random() * 2.5 + 0.5; // Small premium dust/spark size
      this.speedY = -(Math.random() * 0.8 + 0.2); // Slow upward float
      this.speedX = Math.random() * 0.4 - 0.2; // Slight horizontal drift
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#D4AF37' : '#E5C56D'; // Gold vs Champagne
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Wrap around screen top/sides
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
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#D4AF37';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particlesArray = [];
    const numberOfParticles = Math.floor((width * height) / 9000); // Balanced particle density
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
      // Distribute particles across initial height
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

/* 4. Intersection Observer scroll reveal */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to run animation once
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/* 5. WhatsApp Form Redirection Handler */
function initWhatsAppBooking() {
  const enquiryForm = document.getElementById('enquiry-form');
  if (!enquiryForm) return;

  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('enquiry-name').value.trim();
    const phone = document.getElementById('enquiry-phone').value.trim();
    const guests = document.getElementById('enquiry-guests').value.trim();

    if (!name || !phone || !guests) {
      alert('Please fill in all the details to request your exclusive entry.');
      return;
    }

    const message = `Hello House of Chaos Team,

Name: ${name}
Phone: ${phone}
Guests: ${guests}

I would like to enquire about passes for House of Chaos on 25 July at Club Nirvana, Jodhpur.

Please share the details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917023438522?text=${encodedMessage}`;

    // Open WhatsApp link in new tab
    window.open(whatsappUrl, '_blank');
  });
}

/* 6. Mobile Navigation Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      
      if (isVisible) {
        navLinks.style.opacity = '0';
        setTimeout(() => {
          navLinks.style.display = 'none';
        }, 300);
        toggle.querySelectorAll('span').forEach((bar, index) => {
          if (index === 0) bar.style.transform = 'none';
          if (index === 1) bar.style.opacity = '1';
          if (index === 2) bar.style.transform = 'none';
        });
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 5, 5, 0.98)';
        navLinks.style.padding = '40px 20px';
        navLinks.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
        
        setTimeout(() => {
          navLinks.style.opacity = '1';
        }, 10);
        
        // Transform sandwich bar to 'X' icon
        toggle.querySelectorAll('span').forEach((bar, index) => {
          if (index === 0) bar.style.transform = 'translateY(7px) rotate(45deg)';
          if (index === 1) bar.style.opacity = '0';
          if (index === 2) bar.style.transform = 'translateY(-7px) rotate(-45deg)';
        });
      }
    });

    // Close menu when link is clicked (on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
          toggle.querySelectorAll('span').forEach((bar, index) => {
            if (index === 0) bar.style.transform = 'none';
            if (index === 1) bar.style.opacity = '1';
            if (index === 2) bar.style.transform = 'none';
          });
        }
      });
    });
  }
}

/* 7. Pass Card Cursor Glow Tracking */
function initCardGlow() {
  const cards = document.querySelectorAll('.pass-card');
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

/* 8. Lenis Inertial Scrolling Initialization */
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false // Ensure mobile scrolling stays native
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Wire Lenis with anchor links for seamless integration
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: -80, // Account for fixed header height
            duration: 1.5
          });
        }
      });
    });
  }
}

