// DOM Elements
const header = document.querySelector('nav');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollElements = document.querySelectorAll('.scroll-animate');
const backToTopBtn = document.querySelector('.back-to-top');

// Navigation Menu Toggle
function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
}

menuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Sticky Header
let lastScroll = 0;
const scrollThreshold = 50;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove sticky class
    if (currentScroll > scrollThreshold) {
        header.classList.add('sticky-header');
    } else {
        header.classList.remove('sticky-header');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    scrollElements.forEach(el => {
        if (isElementInView(el)) {
            el.classList.add('animate-fade-in');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Back to Top Button
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn?.classList.remove('hidden');
    } else {
        backToTopBtn?.classList.add('hidden');
    }
}

window.addEventListener('scroll', toggleBackToTop);

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            // Add custom validation UI if needed
        }
    });
});

// Add accessibility attributes
document.querySelectorAll('button, a[role="button"]').forEach(el => {
    if (!el.getAttribute('aria-label')) {
        el.setAttribute('aria-label', el.textContent.trim());
    }
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    toggleBodyScroll(isExpanded);
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        toggleBodyScroll(false);
    }
});