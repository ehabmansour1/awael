// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.testimonials = document.querySelectorAll(".testimonial-card");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.showTestimonial(0);
    this.bindEvents();
    this.startAutoPlay();
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => {
      this.prevTestimonial();
    });

    this.nextBtn.addEventListener("click", () => {
      this.nextTestimonial();
    });

    // Pause autoplay on hover
    const slider = document.querySelector(".testimonials-slider");
    slider.addEventListener("mouseenter", () => {
      this.stopAutoPlay();
    });

    slider.addEventListener("mouseleave", () => {
      this.startAutoPlay();
    });
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.classList.remove("active");
      if (i === index) {
        testimonial.classList.add("active");
      }
    });
    this.currentIndex = index;
  }

  nextTestimonial() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.showTestimonial(nextIndex);
  }

  prevTestimonial() {
    const prevIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.showTestimonial(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize testimonials slider
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsSlider();
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate");
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-aos]");
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Page loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add loading styles
const loadingStyles = document.createElement("style");
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    }
    
    body.loaded::before {
        opacity: 0;
        pointer-events: none;
    }
`;
document.head.appendChild(loadingStyles);
