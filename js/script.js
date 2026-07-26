/**
 * ==========================================================================
 * NEXUS DIGITAL STUDIO - VANILLA JAVASCRIPT CONTROLLER
 * Task-2 Website Interactivity & Form Validation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initIntroLoader();
  initStickyHeader();
  initMobileMenu();
  initActiveNavHighlight();
  initScrollAnimations();
  initStatsCounter();
  initScrollToTop();
  initContactFormValidation();
  initBentoGridModal();
});

/* ==========================================================================
   0. OPENING INTRO ANIMATION LOADER (FIRST VISIT PER SESSION ONLY)
   ========================================================================== */
function initIntroLoader() {
  const loader = document.getElementById('introLoader');
  if (!loader) return;

  // Check if intro has already played in this browser session
  if (sessionStorage.getItem('nexus_intro_seen')) {
    loader.style.display = 'none';
    loader.remove();
    return;
  }

  // Mark session as seen
  sessionStorage.setItem('nexus_intro_seen', 'true');

  // Trigger black screen fade-out at 1.9s as Netflix zoom explosion reaches camera
  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 1900);

  // Completely remove loader DOM element after fade out completes (at 2.5s)
  setTimeout(() => {
    if (loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }, 2500);
}

/* ==========================================================================
   1. STICKY HEADER & NAVBAR SCROLL DETECTOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger check on initial load
}

/* ==========================================================================
   2. MOBILE HAMBURGER MENU & ACCESSIBILITY
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Auto-close drawer when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close when clicking outside menu overlay
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   3. ACTIVE NAVIGATION LINK HIGHLIGHTER
   ========================================================================== */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  let currentPath = window.location.pathname.split('/').pop();

  // Default to index.html if root directory or empty path
  if (!currentPath || currentPath === '') {
    currentPath = 'index.html';
  }

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. JAVASCRIPT FORM VALIDATION (MANDATORY TASK-2 SPECIFICATION)
   ========================================================================== */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const successAlert = document.getElementById('formSuccessAlert');

  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Regex pattern for standard email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper to set field error state
  const setError = (input, errorElement, message) => {
    input.classList.add('input-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };

  // Helper to clear field error state
  const clearError = (input, errorElement) => {
    input.classList.remove('input-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  };

  // Real-time input listener to clear error as user types
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      const errorElem = document.getElementById(`${input.id}Error`);
      clearError(input, errorElem);
    });
  });

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset previous success message
    if (successAlert) {
      successAlert.classList.remove('show');
    }

    // 1. Name Validation: Required & Minimum 3 characters
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setError(nameInput, nameError, 'Full Name is required.');
      isValid = false;
    } else if (nameVal.length < 3) {
      setError(nameInput, nameError, 'Full Name must be at least 3 characters.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // 2. Email Validation: Required & Valid email format
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setError(emailInput, emailError, 'Email Address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      setError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // 3. Subject Validation: Required
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal) {
      setError(subjectInput, subjectError, 'Subject is required.');
      isValid = false;
    } else {
      clearError(subjectInput, subjectError);
    }

    // 4. Message Validation: Required & Minimum 10 characters
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      setError(messageInput, messageError, 'Message is required.');
      isValid = false;
    } else if (messageVal.length < 10) {
      setError(messageInput, messageError, 'Message must be at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    // If validation fails, prevent submission
    if (!isValid) {
      return false;
    }

    // Success state handling
    if (successAlert) {
      successAlert.classList.add('show');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset form after successful submission
    form.reset();

    // Auto dismiss success alert after 5 seconds
    setTimeout(() => {
      if (successAlert) {
        successAlert.classList.remove('show');
      }
    }, 5000);
  });
}

/* ==========================================================================
   5. INTERSECTION OBSERVER - SCROLL FADE & SLIDE ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ==========================================================================
   7. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. EXPANDABLE BENTO GRID MODAL CONTROLLER
   ========================================================================== */
function initBentoGridModal() {
  const bentoCards = document.querySelectorAll('.bento-card');
  const modalOverlay = document.getElementById('bentoModalOverlay');
  const modalClose = document.getElementById('bentoModalClose');
  if (!modalOverlay || bentoCards.length === 0) return;

  const modalTitle = document.getElementById('bentoModalTitle');
  const modalSubtitle = document.getElementById('bentoModalSubtitle');
  const modalDesc = document.getElementById('bentoModalDesc');
  const modalContent = document.getElementById('bentoModalContent');
  const modalIcon = document.getElementById('bentoModalIcon');

  const bentoData = {
    "1": {
      title: "Innovation First",
      subtitle: "Cutting-edge web trends & glassmorphism",
      iconClass: "fa-solid fa-lightbulb",
      desc: "We leverage modern design trends like glassmorphism, dynamic gradients, and fluid CSS grid systems to make your web app stand out.",
      content: "Our engineering team continuously explores emerging frontend technologies, modern CSS architectures, and micro-interaction patterns. By integrating AI-driven workflows and state-of-the-art layout algorithms, we ensure your digital presence is not only visually stunning but stays years ahead of competition."
    },
    "2": {
      title: "Pixel-Perfect Precision",
      subtitle: "Meticulous design & typography",
      iconClass: "fa-solid fa-gem",
      desc: "Meticulous attention to typography, micro-interactions, responsive breakpoints, and visual harmony across all viewports.",
      content: "Every pixel matters. From fluid responsive typography scales to crisp vector iconography and harmonized color palettes, our designs undergo rigorous visual audits. We test across 15+ device viewports to guarantee seamless responsiveness and flawless aesthetic appeal."
    },
    "3": {
      title: "Rapid & Agile Delivery",
      subtitle: "Streamlined development workflows",
      iconClass: "fa-solid fa-rocket",
      desc: "Streamlined development workflows guarantee fast turnaround times without compromising on quality or code cleanliness.",
      content: "We employ modular Vanilla JavaScript architectures, reusable CSS utility classes, and optimized asset pipelines. This lean development process eliminates framework bloat, speeds up page load times to under 1 second, and accelerates product launch timelines by up to 50%."
    },
    "4": {
      title: "Dedicated Support",
      subtitle: "24/7 technical partnership",
      iconClass: "fa-solid fa-shield-halved",
      desc: "We form long-term partnerships, providing continuous maintenance, updates, and dedicated technical support 24/7.",
      content: "Our commitment doesn't end at deployment. We offer round-the-clock infrastructure monitoring, performance optimization, security patches, and direct developer support to ensure your application operates at peak reliability every single day."
    }
  };

  const openModal = (id) => {
    const data = bentoData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalDesc.textContent = data.desc;
    modalContent.textContent = data.content;
    modalIcon.innerHTML = `<i class="${data.iconClass}"></i>`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  bentoCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-bento-id');
      openModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
