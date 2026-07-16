// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');

// ===== Navbar Scroll Effect =====
function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
}

window.addEventListener('scroll', handleScroll);

// ===== Active Navigation Link =====
function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Back to Top =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, about cards, contact cards
document.querySelectorAll('.service-card, .about-card, .contact-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Add staggered delay to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.style.transitionDelay = `${index * 0.05}s`;
});

document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Dynamic Today Highlight =====
function highlightToday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];

    document.querySelectorAll('.hours-row').forEach(row => {
        row.classList.remove('today');
        const daySpan = row.querySelector('.day');
        const badge = daySpan.querySelector('.today-badge');
        if (badge) badge.remove();

        if (daySpan.textContent.trim().startsWith(today)) {
            row.classList.add('today');
            const todayBadge = document.createElement('span');
            todayBadge.className = 'today-badge';
            todayBadge.textContent = 'Today';
            daySpan.appendChild(todayBadge);
        }
    });
}

highlightToday();

// ===== Smooth reveal for hero content =====
window.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    const heroCard = document.querySelector('.hero-card');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        heroText.style.transition = 'all 0.8s ease-out';

        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroCard) {
        heroCard.style.opacity = '0';
        heroCard.style.transform = 'translateY(30px) scale(0.95)';
        heroCard.style.transition = 'all 0.8s ease-out 0.4s';

        setTimeout(() => {
            heroCard.style.opacity = '1';
            heroCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }
});

// ===== Phone number click tracking (console log) =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated: ' + link.getAttribute('href'));
    });
});
