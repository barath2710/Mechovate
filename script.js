// ==========================================
// MECHOVATE 1.0 - OPTIMIZED & ERROR-FREE
// ==========================================

// Canvas Background Animation
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

if (canvas) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Particle System
class Particle {
    constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
    }

    update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.alpha += (Math.random() - 0.5) * 0.02;
        this.alpha = Math.max(0.1, Math.min(0.8, this.alpha));
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const particles = [];
if (canvas) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                ctx.strokeStyle = particle.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
                ctx.restore();
            }
        });
    });

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateCanvas);
}

if (canvas) {
    animateCanvas();
}

// Scroll-based animations
let scrollY = 0;
const parallaxElements = document.querySelectorAll('.background-layers > div');

function updateParallax() {
    if (parallaxElements.length === 0) return;
    scrollY = window.scrollY;

    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

if (parallaxElements.length > 0) {
    window.addEventListener('scroll', updateParallax);
}

// Mouse interaction effects
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const offsetX = (mouseX - 0.5) * 50 * (index + 1);
        const offsetY = (mouseY - 0.5) * 50 * (index + 1);
        orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    particles.forEach(particle => {
        const dx = e.clientX - particle.x;
        const dy = e.clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card, .coordinator-item, .info-item').forEach(card => {
    observer.observe(card);
});

// Typing effect for main title
const mainTitle = document.querySelector('.main-title-text');
if (mainTitle) {
    const titleText = 'MECHOVATE';
    let titleIndex = 0;

    function typeTitle() {
        if (titleIndex < titleText.length) {
            mainTitle.textContent = titleText.slice(0, titleIndex + 1);
            titleIndex++;
            setTimeout(typeTitle, 150);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeTitle, 1000);
    });
}

// Register button click effect
const registerButton = document.querySelector('.register-button');
if (registerButton) {
    registerButton.addEventListener('click', () => {
        registerButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            registerButton.style.transform = 'scale(1)';
        }, 150);

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        registerButton.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gear rotation animation
const gears = document.querySelectorAll('.gear');
gears.forEach((gear, index) => {
    gear.style.animation = `gearRotate ${15 + index * 5}s linear infinite ${index % 2 === 0 ? '' : 'reverse'}`;
});

// Dynamic background color based on scroll
function updateBackgroundColor() {
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    const hue = 180 + scrollPercent * 180;

    document.body.style.background = `linear-gradient(135deg,
        hsl(${hue}, 100%, 5%) 0%,
        hsl(${hue + 30}, 100%, 8%) 25%,
        hsl(${hue + 60}, 100%, 6%) 50%,
        hsl(${hue + 90}, 100%, 4%) 75%,
        hsl(${hue + 120}, 100%, 8%) 100%)`;
}

window.addEventListener('scroll', updateBackgroundColor);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';

        setTimeout(() => {
            content.style.transition = 'all 1s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    updateParallax();
    updateBackgroundColor();
}, 16));

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('fallback')) {
            fallback.style.display = 'flex';
        }
    });
});

// Accessibility: Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (registerButton && e.key === 'Enter' && e.target === registerButton) {
        registerButton.click();
    }
});

// Prevent context menu on canvas
if (canvas) {
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

// Touch events for mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;

    scrollY += deltaY * 0.1;
    updateParallax();
    updateBackgroundColor();
});

// Battery-friendly: reduce animations when not visible
let animationId;
function startAnimations() {
    if (!animationId) {
        animateCanvas();
        animationId = requestAnimationFrame(animateCanvas);
    }
}

function stopAnimations() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAnimations();
    } else {
        startAnimations();
    }
});

startAnimations();

// Hackathon Particles Effect
function createHackathonParticles() {
    const particlesContainer = document.getElementById('hackathonParticles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hackathon-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.width = (Math.random() * 6 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Enhanced scroll animations
const enhancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = (index * 0.1) + 's';
            entry.target.classList.add('animate-in');
        }
    });
}, enhancedObserverOptions);

document.querySelectorAll('.timeline-item, .feature-card, .highlight-card, .coordinator-item, .stat-card').forEach(item => {
    enhancedObserver.observe(item);
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.timeline-section, .features-section, .info-section, .college-info-section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(element);
});

// Typing effect for version number
const versionElement = document.querySelector('.version-text');
if (versionElement) {
    const versionText = '1.0';
    let versionIndex = 0;

    function typeVersion() {
        if (versionIndex < versionText.length) {
            versionElement.textContent = versionText.slice(0, versionIndex + 1);
            versionIndex++;
            setTimeout(typeVersion, 200);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeVersion, 1500);
    });
}

// Header Animations
function initHeaderAnimations() {
    const badges = document.querySelectorAll('.badge');
    const mainTitle = document.querySelector('.main-title');

    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px) scale(0.8)';

        setTimeout(() => {
            badge.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });

    if (mainTitle) {
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'perspective(600px) rotateX(20deg) translateY(30px)';

        setTimeout(() => {
            mainTitle.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'perspective(600px) rotateX(10deg) translateY(0)';
        }, 800);
    }
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('registrationModal');
    const registerBtn = document.querySelector('.cta-button.primary');
    const registerLink = document.querySelector('.register-link');
    const closeBtn = document.querySelector('.close-modal');

    const openModal = (e) => {
        e.preventDefault();
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    if (registerBtn && modal) {
        registerBtn.addEventListener('click', openModal);
    }

    if (registerLink && modal) {
        registerLink.addEventListener('click', openModal);
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '#00ffff';
                }
            });

            if (isValid) {
                alert('Registration submitted successfully! We will contact you soon.');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

// Show fallback brochure for circular view if image fails to load
function showCircularFallback() {
    const brochureImageMain = document.getElementById('brochureImageMain');
    const circularWrapper = document.querySelector('.circular-brochure-wrapper');
    
    if (brochureImageMain) {
        brochureImageMain.style.display = 'none';
    }
    
    if (circularWrapper && !document.getElementById('circularFallback')) {
        const fallback = document.createElement('div');
        fallback.id = 'circularFallback';
        fallback.className = 'circular-fallback-brochure';
        fallback.textContent = 'MECHOVATE\n1.0';
        circularWrapper.appendChild(fallback);
    }
}

// Show fallback brochure if image fails to load
function showFallbackBrochure() {
    const brochureImage = document.getElementById('brochureImage');
    const fallbackBrochure = document.getElementById('fallbackBrochure');
    
    if (brochureImage) {
        brochureImage.style.display = 'none';
    }
    if (fallbackBrochure) {
        fallbackBrochure.style.display = 'block';
    }
    console.log('Fallback brochure displayed');
}

// Brochure Modal functionality
function initBrochureModal() {
    const brochureModal = document.getElementById('brochureModal');
    const viewBtn = document.getElementById('viewBtn');
    const modalClose = document.getElementById('modalClose');
    const brochureImageMain = document.getElementById('brochureImageMain');

    // Open circular image in new tab when clicked
    if (brochureImageMain) {
        brochureImageMain.style.cursor = 'pointer';
        brochureImageMain.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = brochureImageMain.src.split('?')[0]; // Remove cache buster
            window.open(imageSrc, '_blank');
        });
    }

    // Open VIEW FULLSCREEN button - opens in new tab
    if (viewBtn && brochureModal) {
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = brochureImageMain ? brochureImageMain.src.split('?')[0] : 'images/poster.jpeg';
            window.open(imageSrc, '_blank');
        });
    }

    if (modalClose && brochureModal) {
        modalClose.addEventListener('click', () => {
            brochureModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (brochureModal) {
        window.addEventListener('click', (e) => {
            if (e.target === brochureModal) {
                brochureModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// FAQ toggle functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                        if (otherToggle) otherToggle.textContent = '+';
                        otherItem.classList.remove('active');
                    }
                });

                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggle.textContent = '+';
                    item.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.textContent = '−';
                    item.classList.add('active');
                }
            });
        }
    });
}

// Gallery lightbox functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayH4 = item.querySelector('.gallery-overlay h4');
            const overlayP = item.querySelector('.gallery-overlay p');
            
            if (img && img.src && overlayH4 && overlayP) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                        <div class="lightbox-caption">
                            <h4>${overlayH4.textContent}</h4>
                            <p>${overlayP.textContent}</p>
                        </div>
                    </div>
                `;

                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });

                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    });
}

// Enhanced particle effects for sponsors section
function createSponsorParticles() {
    const sponsorsSection = document.querySelector('.sponsors-section');
    if (!sponsorsSection) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'sponsor-particles';
    sponsorsSection.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'sponsor-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particleContainer.appendChild(particle);
    }
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    setInterval(nextTestimonial, 5000);
    showTestimonial(0);
}

// Enhanced scroll animations for new sections
const newSections = document.querySelectorAll('.sponsors-section, .testimonials-section, .faq-section, .gallery-section');

newSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sectionObserver.observe(section);
});

// Google Form Registration
function setupRegistrationButtons() {
    const googleFormURL = 'https://forms.gle/Y1KyWAG7v9MdwnLq6';
    
    document.querySelectorAll('.register-link').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(googleFormURL, '_blank');
        });
    });

    const oldRegisterBtn = document.querySelector('.register-button');
    if (oldRegisterBtn) {
        oldRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(googleFormURL, '_blank');
        });
    }
}

// ==========================================
// COUNTDOWN TIMER - GUARANTEED WORKING
// ==========================================
function initCountdown() {
    console.log('🚀 Countdown Timer Initializing...');
    
    const eventDate = new Date('February 26, 2026 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    console.log('✅ Countdown Timer Started!');
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (this.classList.contains('register-link')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const offsetTop = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Modal basic functionality
function initBasicModal() {
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.close');
    const modalBtn = document.querySelector('.modal-btn');

    if (modal) {
        document.querySelectorAll('.register-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (modalBtn) {
            modalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ==========================================
// SINGLE INITIALIZATION POINT - NO CONFLICTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Loaded - Initializing MECHOVATE 1.0...');
    
    // Initialize countdown timer FIRST
    initCountdown();
    
    // Initialize navigation
    initSmoothScrolling();
    initMobileNav();
    initBackToTop();
    
    // Initialize modals and features
    initBasicModal();
    initModal();
    initBrochureModal();
    initFAQ();
    initGallery();
    
    // Initialize visual effects
    createHackathonParticles();
    createSponsorParticles();
    initTestimonialsSlider();
    initHeaderAnimations();
    
    // Initialize registration
    setupRegistrationButtons();
    
    console.log('✅ All features initialized successfully!');
});

// Load event for additional animations
window.addEventListener('load', () => {
    console.log('🎉 Page fully loaded!');
});

// ================================================
// CUSTOM GEAR CURSOR - MECHANICAL THEME
// ================================================
(function initGearCursor() {
    if (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches) {
        console.log('📱 Touch device - using default cursor');
        return;
    }
    
    console.log('✅ Gear cursor initialized');
    
    const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], .clickable'
    );
    
    let rotationAngle = 0;
    const rotationSpeed = 12;
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            rotationAngle = (rotationAngle + rotationSpeed) % 360;
        });
        
        element.addEventListener('mouseleave', () => {
            rotationAngle = (rotationAngle + rotationSpeed) % 360;
        });
    });
})();

console.log('%c🎯 MECHOVATE 1.0 LOADED', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cFebruary 26-27, 2026', 'color: #ffffff; font-size: 14px;');