/* ========================================
   Odisha Polyclinic™ - Interactive Scripts
   Multi-Specialty Healthcare Centre
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar shrink on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll);

    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link, .nav-btn');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }


    // ========== ACTIVE NAV LINK ON SCROLL ==========
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 150;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== APPOINTMENT FORM HANDLING ==========
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');
    const bookAnother = document.getElementById('bookAnother');

    if (appointmentForm) {
        // Set min date to today
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            const dept = document.getElementById('department').value;

            if (!name || !phone || !date || !time || !dept) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Phone validation (Indian numbers)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\+91]/g, ''))) {
                showNotification('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Show success message
            appointmentForm.style.display = 'none';
            formSuccess.style.display = 'block';

            showNotification('Appointment request submitted successfully!', 'success');
        });
    }

    if (bookAnother) {
        bookAnother.addEventListener('click', function() {
            appointmentForm.reset();
            appointmentForm.style.display = 'flex';
            formSuccess.style.display = 'none';
        });
    }


    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i><span>' + message + '</span>';

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#28a745' : '#dc3545',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '10px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: '500',
            animation: 'fadeInUp 0.3s ease',
            maxWidth: '350px'
        });

        document.body.appendChild(notification);

        // Auto-remove after 4 seconds
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .specialist-card, .service-card, .diagnostic-card, ' +
        '.contact-card, .gallery-item, .info-card, .appt-info-card'
    );

    animateElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease ' + (index % 4) * 0.1 + 's';
        observer.observe(el);
    });

    // When animated in, reset inline styles
    const animStyleObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('animate-in')) {
                mutation.target.style.opacity = '1';
                mutation.target.style.transform = 'translateY(0)';
            }
        });
    });

    animateElements.forEach(function(el) {
        animStyleObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
    });


    // ========== COUNTER ANIMATION ==========
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(function(stat) {
            const text = stat.textContent;
            const numMatch = text.match(/(\d+)/);
            if (numMatch) {
                const target = parseInt(numMatch[1]);
                const suffix = text.replace(numMatch[1], '');
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, 30);
            }
        });
    }

    // Trigger counter animation when hero card is visible
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(heroCard);
    }

    // ========== DYNAMIC TODAY HIGHLIGHT ==========
    function highlightToday() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = days[new Date().getDay()];
        const hoursRows = document.querySelectorAll('.hours-row');

        hoursRows.forEach(function(row) {
            const daySpan = row.querySelector('.day');
            if (daySpan) {
                const dayText = daySpan.textContent.trim().split(' ')[0];
                row.classList.remove('today');
                if (dayText === today) {
                    row.classList.add('today');
                    // Add or update today badge
                    let badge = daySpan.querySelector('.today-badge');
                    if (!badge) {
                        badge = document.createElement('span');
                        badge.className = 'today-badge';
                        badge.textContent = 'Today';
                        daySpan.appendChild(badge);
                    }
                } else {
                    const badge = daySpan.querySelector('.today-badge');
                    if (badge) badge.remove();
                }
            }
        });
    }

    highlightToday();

    // ========== PHONE NUMBER FORMATTING ==========
    const phoneInput = document.getElementById('patientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // ========== NAVBAR TOGGLE ANIMATION ==========
    const navToggleBtn = document.getElementById('navToggle');
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', function() {
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ========== LAZY LOADING FOR IMAGES ==========
    const images = document.querySelectorAll('img[src]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imgObserver.observe(img);
        });
    }

    // Initial scroll handler call
    handleScroll();
});
