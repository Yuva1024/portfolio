// Project Media Gallery Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.media-gallery-grid');
    const modal = document.getElementById('media-modal');
    const modalMedia = modal?.querySelector('.media-modal-media');
    const modalTitle = modal?.querySelector('.media-modal-title');
    const modalDesc = modal?.querySelector('.media-modal-description');
    const modalClose = modal?.querySelector('.media-modal-close');
    if (!gallery || !modal) return;
    gallery.addEventListener('click', function (e) {
        let item = e.target.closest('.media-item');
        if (!item) return;
        const type = item.getAttribute('data-type');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-description');
        let content = '';
        if (type === 'image') {
            const img = item.querySelector('img');
            content = `<img src="${img.src}" alt="${img.alt}">`;
            // Hide title and description for images
            modalTitle.textContent = '';
            modalDesc.textContent = '';
            modalTitle.style.display = 'none';
            modalDesc.style.display = 'none';
        } else if (type === 'video') {
            // Check for Google Drive iframe
            const iframe = item.querySelector('iframe');
            if (iframe) {
                content = `<iframe src="${iframe.src}" width="800" height="450" allow="autoplay; encrypted-media" allowfullscreen style="border-radius: 0.5rem; border: none; background: #000;"></iframe>`;
            } else {
                const video = item.querySelector('video');
                const src = video.querySelector('source').src;
                content = `<video controls autoplay style="background:#000;"><source src="${src}" type="video/mp4"></video>`;
            }
            // Show title and description for videos
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalTitle.style.display = '';
            modalDesc.style.display = '';
        }
        modalMedia.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
        modalMedia.innerHTML = '';
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalMedia.innerHTML = '';
            document.body.style.overflow = '';
        }
    });
});
// Portfolio JavaScript - Vanilla JS Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollAnimations();
    initializeViewWorkButton();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        localStorage.setItem('theme', theme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('theme-light') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

// Navigation with Active Section Detection
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const brandLogo = document.getElementById('brand-logo');
    const sections = document.querySelectorAll('section[id]');
    
    // Active section detection
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 200 && sectionTop > -section.clientHeight + 200) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('data-href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    function scrollToSection(href) {
        const target = document.querySelector(href);
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) {
                scrollToSection(href);
                closeMobileMenu();
            }
        });
    });
    
    // Brand logo scroll to top
    brandLogo.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMobileMenu();
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Particle Background Animation
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    // Continue creating particles
    setInterval(createParticle, 300);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.style.display = 'none';
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; // Form doesn't exist in this simplified version
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showToast('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--destructive)' : 'var(--primary)'};
        color: ${type === 'error' ? 'var(--destructive-foreground)' : 'var(--primary-foreground)'};
        padding: 16px 24px;
        border-radius: var(--radius);
        z-index: 1000;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.skill-tile, .project-card, .contact-link');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// View Work Button
function initializeViewWorkButton() {
    const viewWorkBtn = document.getElementById('view-work-btn');
    
    viewWorkBtn.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-based effects can be added here
}, 16)); // ~60fps

// Handle resume download
document.addEventListener('click', function(e) {
    if (e.target.closest('[data-testid="download-resume"], [data-testid="mobile-download-resume"]')) {
        // Analytics or tracking could be added here
        console.log('Resume download initiated');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

console.log('Portfolio JavaScript loaded successfully! 🚀');