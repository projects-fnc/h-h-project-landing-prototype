(() => {
  document.documentElement.classList.add("js-enabled");

  function initRevealAnimations() {
    const elements = document.querySelectorAll(".reveal, [data-reveal-image]");
    if (!elements.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    elements.forEach((element) => observer.observe(element));
  }

  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Gallery Slider
  function initGallerySlider() {
    const gallery = document.querySelector("#gallery");
    if (!gallery) return;

    const images = Array.from(gallery.querySelectorAll(".gallery-images img"));
    const prevBtn = gallery.querySelector(".gallery-btn.prev");
    const nextBtn = gallery.querySelector(".gallery-btn.next");

    if (!images.length || !prevBtn || !nextBtn) return;

    prevBtn.type = "button";
    nextBtn.type = "button";

    let currentIndex = images.findIndex(image => image.classList.contains("active"));
    if (currentIndex < 0) currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        images.forEach((image, i) => {
            const isActive = i === currentIndex;
            image.classList.toggle("active", isActive);
            image.setAttribute("aria-hidden", String(!isActive));
        });
    }

    prevBtn.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    showImage(currentIndex);
  }

  // Initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initRevealAnimations();
      initNavbarScroll();
      initGallerySlider();
    }, { once: true });
  } else {
    initRevealAnimations();
    initNavbarScroll();
    initGallerySlider();
  }
})();