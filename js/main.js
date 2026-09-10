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

  /* ── 10. Contact Form - Web3Forms ───────────────────────── */
  const contactForm =
    document.getElementById("contact-form");

  const contactPopup =
    document.getElementById("contact-success-popup");

  const contactPopupClose =
    document.getElementById("contact-popup-close");

  const contactPopupOk =
    document.getElementById("contact-popup-ok");

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

  if (contactPopupClose) {
    contactPopupClose.addEventListener(
      "click",
      closeContactPopup
    );
  }

  if (contactPopupOk) {
    contactPopupOk.addEventListener(
      "click",
      closeContactPopup
    );
  }

  if (contactPopup) {

    const popupOverlay =
      contactPopup.querySelector(
        ".contact-popup__overlay"
      );

    if (popupOverlay) {
      popupOverlay.addEventListener(
        "click",
        closeContactPopup
      );
    }
  }

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      contactPopup?.classList.contains("is-visible")
    ) {
      closeContactPopup();
    }

  });

  if (contactForm) {

    // Guard against double-submission
    let isSubmitting = false;

    contactForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        if (isSubmitting) return;

        // ── JS-side validation ───────────────────
        const nameInput = contactForm.querySelector('[name="name"]');
        const emailInput = contactForm.querySelector('[name="email"]');
        const phoneInput = contactForm.querySelector('[name="phone"]');
        const subjectInput = contactForm.querySelector('[name="subject"]');
        const msgInput = contactForm.querySelector('[name="message"]');

        // Trim whitespace from text fields
        if (nameInput) nameInput.value = nameInput.value.trim();
        if (emailInput) emailInput.value = emailInput.value.trim();
        if (phoneInput) phoneInput.value = phoneInput.value.trim();
        if (msgInput) msgInput.value = msgInput.value.trim();

        const validSubjectValues = [
          "General Inquiries",
          "Technical Inquiries",
          "Press Inquiries",
          "Job application",
          "Become a supplier"
        ];

        let validationPassed = true;

        // Name: 2–80 characters, letters/spaces/hyphens/apostrophes
        if (!nameInput || !/^[A-Za-z\s'\.\-]{2,80}$/.test(nameInput.value)) {
          nameInput?.setCustomValidity("Please enter a valid full name (2–80 characters, letters only).");
          nameInput?.reportValidity();
          validationPassed = false;
        } else {
          nameInput.setCustomValidity("");
        }

        // Email format
        if (validationPassed && emailInput) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!emailRegex.test(emailInput.value) || emailInput.value.length > 100) {
            emailInput.setCustomValidity("Please enter a valid email address.");
            emailInput.reportValidity();
            validationPassed = false;
          } else {
            emailInput.setCustomValidity("");
          }
        }

        // Phone: 7–20 digits/spaces/+/hyphens/parens
        if (validationPassed && phoneInput) {
          const phoneRegex = /^[0-9+\s\-()]{7,20}$/;
          // Sanitize: strip any non-allowed chars first
          phoneInput.value = phoneInput.value.replace(/[^0-9+\s\-()]/g, "");
          if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.setCustomValidity("Please enter a valid phone number (digits, spaces, +, - and () only).");
            phoneInput.reportValidity();
            validationPassed = false;
          } else {
            phoneInput.setCustomValidity("");
          }
        }

        // Subject: must be one of the known options
        if (validationPassed && subjectInput) {
          if (!validSubjectValues.includes(subjectInput.value)) {
            subjectInput.setCustomValidity("Please select a valid subject.");
            subjectInput.reportValidity();
            validationPassed = false;
          } else {
            subjectInput.setCustomValidity("");
          }
        }

       // Message: 5–1000 characters, not blank
if (validationPassed && msgInput) {
  const message = msgInput.value.trim();

  if (message.length < 5 || message.length > 1000) {
    msgInput.setCustomValidity(
      "Please enter a message between 5 and 1000 characters."
    );
    msgInput.reportValidity();
    validationPassed = false;
  } else {
    msgInput.setCustomValidity("");
    msgInput.value = message;
  }
}
        if (!validationPassed) return;
        // ── End validation ───────────────────────

        const submitButton =
          contactForm.querySelector(
            'button[type="submit"]'
          );

        if (!submitButton) return;

        const originalButtonText =
          submitButton.textContent;

        isSubmitting = true;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

          const formData =
            new FormData(contactForm);

          const response =
            await fetch(
              "https://api.web3forms.com/submit",
              {
                method: "POST",
                body: formData
              }
            );

          const result =
            await response.json();

          if (result.success) {

            contactForm.reset();
            openContactPopup();

          } else {

            throw new Error(
              result.message ||
              "Unable to send your message."
            );
          }

        } catch (error) {

          console.error(
            "Contact form error:",
            error
          );

          alert(
            "We could not send your message right now. Please try again or contact us directly by email."
          );

        } finally {

          isSubmitting = false;
          submitButton.disabled = false;
          submitButton.textContent =
            originalButtonText;
        }
      }
    );
  }

  /* ── 11. Project Gallery Modal System ───────────────────── */
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