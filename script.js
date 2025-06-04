// Loader fade out on page load
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => (loader.style.display = 'none'), 500);
  }
});

// Scroll To Top Button and Nav Link Highlight - optimized with requestAnimationFrame
const scrollBtn = document.getElementById('scrollToTopBtn');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

function onScroll() {
  const top = window.scrollY;

  // Scroll To Top Button show/hide
  if (scrollBtn) {
    scrollBtn.style.display = top > 400 ? 'block' : 'none';
  }

  // Highlight nav links on scroll
  sections.forEach((sec) => {
    const offset = sec.offsetTop - 70;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const id = sec.getAttribute('id');
      const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      onScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Filter Projects
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projects.forEach((project) => {
      if (filter === 'all' || project.classList.contains(filter)) {
        project.style.display = 'flex';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

// Dark / Light Mode Toggle with localStorage
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Light Mode';
  }
  localStorage.setItem('theme', theme);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  // Start typing animation after DOM loaded
  if (typingTextElement) type();
});

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
}

// Typing Animation
const typingTexts = ["Software Developer", "Innovator", "Problem Solver", "Woman in Tech"];
let i = 0;
let j = 0;
let currentText = '';
let isDeleting = false;
const typingSpeed = 150;
const erasingSpeed = 75;
const delayBetweenTexts = 1500;

const typingTextElement = document.getElementById('typingText');

function type() {
  if (i >= typingTexts.length) i = 0;

  const fullText = typingTexts[i];

  if (!isDeleting) {
    currentText = fullText.substring(0, j + 1);
    j++;
    typingTextElement.textContent = currentText;

    if (j === fullText.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenTexts);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    currentText = fullText.substring(0, j - 1);
    j--;
    typingTextElement.textContent = currentText;

    if (j === 0) {
      isDeleting = false;
      i++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, erasingSpeed);
    }
  }
}

// Contact Form Validation & Submit
const form = document.querySelector('#contact form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name === '' || email === '' || message === '') {
      alert('Please fill out all fields.');
      return;
    }

    // More flexible email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    form.reset();
  });
}
