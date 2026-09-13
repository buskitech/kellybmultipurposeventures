/**
 * KELLY B MULTIPURPOSE VENTURE
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // Disable Right-Click
  // ========================================
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    return false;
  });

  /* ── 1. Navigation & Mobile Menu ───────────────────────── */
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const body = document.body;

  // Sticky Header on Scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
  }

  /* ── 2. Scroll Reveal Animations ───────────────────────── */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  /* ── 3. Number Counter Animation ───────────────────────── */
  const counterElements = document.querySelectorAll('.stat-item__number');

  const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += 1;

      el.textContent =
        current + (el.getAttribute('data-suffix') || '');

      if (current === target) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Use Intersection Observer for counters
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach(el => {
      counterObserver.observe(el);
    });

  } else {
    // Fallback if no IntersectionObserver
    counterElements.forEach(el => runCounter(el));
  }

  /* ── 4. Accordion Functionality (FAQ / HSE) ────────────── */
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(acc => {
    acc.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ── 5. Project Filtering (Simple Implementation) ──────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {

        // Update active class on buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {

          if (
            filterValue === 'all' ||
            card.getAttribute('data-category') === filterValue
          ) {
            card.style.display = 'block';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);

          } else {

            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';

            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ── 6. Hero Slideshow ─────────────────────────────────── */
  const heroSlides = document.querySelectorAll('.hero__slide');

  if (heroSlides.length > 0) {
    let currentSlide = 0;

    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');

      currentSlide =
        (currentSlide + 1) % heroSlides.length;

      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  /* ── 7. Back To Top Button ─────────────────────────────── */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {

    const toggleBackToTop = () => {

      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener('click', (e) => {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });
  }

  /* ── 8. Footer Accordions (Mobile) ──────────────────────── */
  const footerAccHeaders =
    document.querySelectorAll('.footer__accordion-header');

  footerAccHeaders.forEach(header => {

    header.addEventListener('click', function () {

      const group =
        this.closest('.footer__accordion-group');

      if (group) {

        group.classList.toggle('active');

        const icon =
          this.querySelector('.footer__accordion-icon');

        if (icon) {

          icon.textContent =
            group.classList.contains('active')
              ? '▲'
              : '▼';
        }
      }
    });
  });

  /* ── 9. News Read More Modal System ─────────────────────── */
  const newsModal =
    document.getElementById('news-modal');

  const newsReadMoreBtns =
    document.querySelectorAll('.news-read-more-btn');

  const newsModalClose =
    document.getElementById('news-modal-close');

  if (newsModal && newsReadMoreBtns.length > 0) {

    newsReadMoreBtns.forEach(btn => {

      btn.addEventListener('click', (e) => {

        e.preventDefault();

        const article = btn.closest('article');

        if (article) {

          const title =
            article.querySelector('.news-title')?.innerText ||
            'Company Announcement';

          const category =
            article.querySelector('.news-category')?.innerText ||
            'News';

          const img =
            article.querySelector('.news-img')?.src ||
            article.querySelector('img')?.src ||
            '';

          const date =
            article.getAttribute('data-date') ||
            'August 2026';

          const fullContent =
            article.querySelector('.news-full-text')?.innerHTML ||
            '<p>Full story update available upon request.</p>';

          const modalTitle =
            document.getElementById('modal-news-title');

          const modalCat =
            document.getElementById('modal-news-category');

          const modalImg =
            document.getElementById('modal-news-img');

          const modalDate =
            document.getElementById('modal-news-date');

          const modalBody =
            document.getElementById('modal-news-body');

          if (modalTitle) modalTitle.textContent = title;
          if (modalCat) modalCat.textContent = category;
          if (modalImg) modalImg.src = img;
          if (modalDate) modalDate.textContent = date;
          if (modalBody) modalBody.innerHTML = fullContent;

          newsModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {

      newsModal.classList.remove('active');
      document.body.style.overflow = '';

    };

    if (newsModalClose) {
      newsModalClose.addEventListener('click', closeModal);
    }

    newsModal.addEventListener('click', (e) => {

      if (e.target === newsModal) {
        closeModal();
      }

    });

    document.addEventListener('keydown', (e) => {

      if (
        e.key === 'Escape' &&
        newsModal.classList.contains('active')
      ) {
        closeModal();
      }

    });
  }

  /* ── 10. Google Maps Iframe Fallback ────────────────────── */
  const mapIframe = document.getElementById('contact-map-iframe');
  const mapFallback = document.getElementById('contact-map-fallback');

  if (mapIframe && mapFallback) {
    // Detect if iframe fails to load (e.g. file:// protocol, CSP block)
    const showMapFallback = () => {
      mapFallback.classList.add('visible');
      mapFallback.removeAttribute('aria-hidden');
      mapIframe.style.display = 'none';
    };

    mapIframe.addEventListener('error', showMapFallback);

    // Also detect file:// protocol where iframes are always blocked
    if (window.location.protocol === 'file:') {
      showMapFallback();
    } else {
      // Short timeout fallback — if iframe doesn't load within 5s, show fallback
      const mapTimeout = setTimeout(() => {
        try {
          // If iframe loaded successfully this will not throw
          const doc = mapIframe.contentDocument || mapIframe.contentWindow?.document;
          if (!doc || doc.readyState !== 'complete') {
            showMapFallback();
          }
        } catch (e) {
          // Cross-origin access denied = iframe is loading fine (normal for Google Maps)
          // Do nothing — this is expected
        }
      }, 5000);

      mapIframe.addEventListener('load', () => {
        clearTimeout(mapTimeout);
      });
    }
  }

  /* ── 11. Contact Form - Web3Forms ───────────────────────── */

  const contactForm = document.getElementById("contact-form");
  const contactPopup = document.getElementById("contact-success-popup");
  const contactPopupClose = document.getElementById("contact-popup-close");
  const contactPopupOk = document.getElementById("contact-popup-ok");

  function openContactPopup() {
    if (!contactPopup) return;
    contactPopup.classList.add("is-visible");
    contactPopup.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-popup-open");
  }

  function closeContactPopup() {
    if (!contactPopup) return;
    contactPopup.classList.remove("is-visible");
    contactPopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-popup-open");
  }

  if (contactPopupClose) contactPopupClose.addEventListener("click", closeContactPopup);
  if (contactPopupOk) contactPopupOk.addEventListener("click", closeContactPopup);

  if (contactPopup) {
    const popupOverlay = contactPopup.querySelector(".contact-popup__overlay");
    if (popupOverlay) popupOverlay.addEventListener("click", closeContactPopup);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && contactPopup?.classList.contains("is-visible")) {
      closeContactPopup();
    }
  });

  if (contactForm) {

    // ── Inline error helpers ─────────────────────────────────
    const VALID_SUBJECTS = [
      "General Inquiries", "Technical Inquiries",
      "Press Inquiries", "Job application", "Become a supplier"
    ];

    /**
     * Show an inline error under a field.
     * Adds the .is-invalid class to the input and shows the error span.
     */
    function setFieldError(input, errorId, message) {
      if (input) input.classList.add("is-invalid");
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("visible");
      }
    }

    /**
     * Clear the inline error for a field.
     */
    function clearFieldError(input, errorId) {
      if (input) input.classList.remove("is-invalid");
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
    }

    /**
     * Clear ALL inline errors and invalid states on the form.
     * Called at the start of every submission attempt so nothing is "stuck".
     */
    function clearAllErrors() {
      contactForm.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
      contactForm.querySelectorAll(".form-error").forEach(el => {
        el.textContent = "";
        el.classList.remove("visible");
      });
      // Also clear any stale native validity state
      contactForm.querySelectorAll("input, select, textarea").forEach(el => {
        el.setCustomValidity("");
      });
    }

    // ── Security: sanitize a string against XSS ─────────────
    function sanitize(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    }

    // ── Per-field validation functions ───────────────────────
    function validateName(input) {
      const val = input.value.trim();
      if (!val) {
        setFieldError(input, "name-error", "Full name is required.");
        return false;
      }
      if (val.length < 2 || val.length > 80) {
        setFieldError(input, "name-error", "Name must be between 2 and 80 characters.");
        return false;
      }
      // Allow letters, spaces, hyphens, apostrophes, periods, numbers (e.g. John 3rd)
      if (!/^[\w\s'\.\-]{2,80}$/i.test(val)) {
        setFieldError(input, "name-error", "Name contains invalid characters.");
        return false;
      }
      clearFieldError(input, "name-error");
      return true;
    }

    function validateEmail(input) {
      const val = input.value.trim();
      if (!val) {
        setFieldError(input, "email-error", "Email address is required.");
        return false;
      }
      if (val.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
        setFieldError(input, "email-error", "Please enter a valid email address (e.g. name@example.com).");
        return false;
      }
      clearFieldError(input, "email-error");
      return true;
    }

    function validatePhone(input) {
      // Auto-sanitize: strip any characters that aren't digits, +, spaces, -, ()
      input.value = input.value.replace(/[^0-9+\s\-()]/g, "").trim();
      const val = input.value;
      if (!val) {
        setFieldError(input, "phone-error", "Phone number is required.");
        return false;
      }
      if (!/^[0-9+\s\-()]{7,20}$/.test(val)) {
        setFieldError(input, "phone-error", "Enter a valid phone number (7–20 digits, e.g. +234 808 556 1258).");
        return false;
      }
      clearFieldError(input, "phone-error");
      return true;
    }

    function validateSubject(input) {
      if (!VALID_SUBJECTS.includes(input.value)) {
        setFieldError(input, "subject-error", "Please select a subject from the list.");
        return false;
      }
      clearFieldError(input, "subject-error");
      return true;
    }

    function validateMessage(input) {
      const val = input.value.trim();
      if (!val) {
        setFieldError(input, "message-error", "Please enter your message.");
        return false;
      }
      if (val.length > 1000) {
        setFieldError(input, "message-error", "Message must not exceed 1000 characters.");
        return false;
      }
      clearFieldError(input, "message-error");
      return true;
    }

    const msgInput = contactForm.querySelector('[name="message"]');

    // ── Blur validation (validate field when user leaves it) ──
    const nameInput   = contactForm.querySelector('[name="name"]');
    const emailInput  = contactForm.querySelector('[name="email"]');
    const phoneInput  = contactForm.querySelector('[name="phone"]');
    const subjectInput = contactForm.querySelector('[name="subject"]');

    if (nameInput) {
      nameInput.addEventListener("blur", () => validateName(nameInput));
      nameInput.addEventListener("input", () => clearFieldError(nameInput, "name-error"));
    }
    if (emailInput) {
      emailInput.addEventListener("blur", () => validateEmail(emailInput));
      emailInput.addEventListener("input", () => clearFieldError(emailInput, "email-error"));
    }
    if (phoneInput) {
      phoneInput.addEventListener("blur", () => validatePhone(phoneInput));
      phoneInput.addEventListener("input", () => clearFieldError(phoneInput, "phone-error"));
    }
    if (subjectInput) {
      subjectInput.addEventListener("change", () => validateSubject(subjectInput));
    }
    if (msgInput) {
      msgInput.addEventListener("blur", () => validateMessage(msgInput));
      msgInput.addEventListener("input", () => clearFieldError(msgInput, "message-error"));
    }

    // ── Submission handler ───────────────────────────────────
    let isSubmitting = false;

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (isSubmitting) return;

      // ALWAYS clear all errors first — prevents "stuck" errors from prior attempts
      clearAllErrors();

      // Trim text fields before validating
      if (nameInput)  nameInput.value  = nameInput.value.trim();
      if (emailInput) emailInput.value = emailInput.value.trim();
      if (msgInput)   msgInput.value   = msgInput.value.trim();

      // Run ALL validators and collect results — show all errors at once
      const results = [
        nameInput    ? validateName(nameInput)       : true,
        emailInput   ? validateEmail(emailInput)     : true,
        phoneInput   ? validatePhone(phoneInput)     : true,
        subjectInput ? validateSubject(subjectInput) : true,
        msgInput     ? validateMessage(msgInput)     : true,
      ];

      if (results.includes(false)) {
        // Scroll to the first errored field and focus it
        const firstError = contactForm.querySelector(".is-invalid");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          firstError.focus();
        }
        return;
      }

      // ── All valid — submit to Web3Forms ─────────────────────
      const submitBtn = document.getElementById("contact-submit-btn");
      if (!submitBtn) return;

      const originalBtnText = submitBtn.textContent;
      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      submitBtn.setAttribute("aria-busy", "true");

      try {
        const formData = new FormData(contactForm);

        // Sanitize text values before sending
        ["name", "email", "phone", "message"].forEach(field => {
          const raw = formData.get(field);
          if (raw) formData.set(field, sanitize(raw));
        });

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          contactForm.reset();
          openContactPopup();
        } else {
          throw new Error(result.message || "Submission rejected by server.");
        }

      } catch (error) {
        console.error("Contact form error:", error);

        // Show a non-blocking inline error instead of alert()
        const submitArea = submitBtn.parentElement;
        let networkErr = submitArea.querySelector(".form-network-error");
        if (!networkErr) {
          networkErr = document.createElement("p");
          networkErr.className = "form-network-error";
          submitArea.insertBefore(networkErr, submitBtn);
        }
        networkErr.textContent =
          "Could not send your message right now. Please try again or email us directly at info@kellybmultipurposeventures.com.";

      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.removeAttribute("aria-busy");
      }
    });
  }


  const projectModal =
    document.getElementById('project-modal');

  const projectGalleryBtns =
    document.querySelectorAll('.project-gallery-btn');

  const projectModalClose =
    document.getElementById('project-modal-close');

  if (
    projectModal &&
    projectGalleryBtns.length > 0
  ) {

    projectGalleryBtns.forEach(btn => {

      btn.addEventListener('click', (e) => {

        e.preventDefault();

        const title =
          btn.querySelector(
            '.project-card__title'
          )?.innerText ||
          'Project Details';

        const category =
          btn.querySelector(
            '.project-card__category'
          )?.innerText ||
          'Portfolio';

        const locationText =
          btn.querySelector(
            '.project-card__location span'
          )?.innerText ||
          btn.querySelector(
            '.project-card__location'
          )?.innerText.trim() ||
          'Nigeria';

        const descHtml =
          btn.querySelector(
            '.project-gallery-desc'
          )?.innerHTML ||
          '<p>Detailed project information is currently being updated.</p>';

        // Get images
        const galleryImages =
          btn.querySelectorAll(
            '.project-gallery-images img'
          );

        let images = [];

        if (galleryImages.length > 0) {

          galleryImages.forEach(img => {
            images.push(img.src);
          });

        } else {

          // Fallback to main card image
          // if no gallery images are provided
          const mainImg =
            btn.querySelector(
              '.project-card__img'
            )?.src;

          if (mainImg) {
            images.push(mainImg);
          }
        }

        const modalTitle =
          document.getElementById(
            'modal-project-title'
          );

        const modalCat =
          document.getElementById(
            'modal-project-category'
          );

        const modalLocation =
          document.getElementById(
            'modal-project-location'
          );

        const modalDesc =
          document.getElementById(
            'modal-project-desc'
          );

        const modalMainImg =
          document.getElementById(
            'modal-project-main-img'
          );

        const modalThumbnails =
          document.getElementById(
            'modal-project-thumbnails'
          );

        if (modalTitle) {
          modalTitle.textContent = title;
        }

        if (modalCat) {
          modalCat.textContent = category;
        }

        if (modalLocation) {
          modalLocation.textContent =
            locationText;
        }

        if (modalDesc) {
          modalDesc.innerHTML = descHtml;
        }

        // Setup Gallery
        if (
          modalMainImg &&
          images.length > 0
        ) {

          modalMainImg.src = images[0];

          if (modalThumbnails) {

            modalThumbnails.innerHTML = '';

            if (images.length > 1) {

              images.forEach((src, index) => {

                const img =
                  document.createElement('img');

                img.src = src;

                img.className =
                  'project-modal__thumb' +
                  (index === 0
                    ? ' active'
                    : '');

                img.addEventListener(
                  'click',
                  () => {

                    // Update main image
                    modalMainImg.style.opacity =
                      '0';

                    setTimeout(() => {

                      modalMainImg.src = src;
                      modalMainImg.style.opacity =
                        '1';

                    }, 150);

                    // Update active state
                    document
                      .querySelectorAll(
                        '.project-modal__thumb'
                      )
                      .forEach(t =>
                        t.classList.remove(
                          'active'
                        )
                      );

                    img.classList.add('active');

                  }
                );

                modalThumbnails.appendChild(img);

              });
            }
          }
        }

        projectModal.classList.add('active');
        document.body.style.overflow =
          'hidden';

      });
    });

    const closeProjectModal = () => {

      projectModal.classList.remove('active');
      document.body.style.overflow = '';

    };

    if (projectModalClose) {
      projectModalClose.addEventListener(
        'click',
        closeProjectModal
      );
    }

    projectModal.addEventListener(
      'click',
      (e) => {

        if (e.target === projectModal) {
          closeProjectModal();
        }

      }
    );

    document.addEventListener(
      'keydown',
      (e) => {

        if (
          e.key === 'Escape' &&
          projectModal.classList.contains('active')
        ) {
          closeProjectModal();
        }

      }
    );
  }

});