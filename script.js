/* Manu Saxophonist - Interactive JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Navbar scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // Stagger animation for grid items
    document.querySelectorAll('.services-grid, .gallery-grid, .testimonials-grid').forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Form handling with AJAX
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('formModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch('https://formspree.io/f/xvzkanzp', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    modalIcon.textContent = '✓';
                    modalIcon.classList.remove('error');
                    modalTitle.textContent = 'Message Sent!';
                    modalText.textContent = "Thank you for your inquiry. I'll get back to you within 24 hours.";
                    modal.classList.add('active');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                modalIcon.textContent = '✕';
                modalIcon.classList.add('error');
                modalTitle.textContent = 'Oops!';
                modalText.textContent = 'Something went wrong. Please try again or email me directly.';
                modal.classList.add('active');
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Lazy load images with fade-in effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; });
        if (img.complete) { img.style.opacity = '1'; }
    });

    // Gallery item hover effect enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.querySelector('.gallery-overlay').style.opacity = '1';
        });
        item.addEventListener('mouseleave', function () {
            this.querySelector('.gallery-overlay').style.opacity = '0';
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let currentIndex = -1;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        const fullMedia = item.getAttribute('data-full');
        const mediaType = item.getAttribute('data-type');
        const captionH4 = item.querySelector('h4').textContent;
        const captionTag = item.querySelector('.gallery-tag').textContent;

        lightboxContent.innerHTML = '';
        if (mediaType === 'video') {
            const video = document.createElement('video');
            video.src = fullMedia;
            video.autoplay = true;
            video.controls = true;
            video.playsinline = true;
            lightboxContent.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = fullMedia;
            lightboxContent.appendChild(img);
        }

        lightboxCaption.innerHTML = `<span class="gallery-tag">${captionTag}</span><h4>${captionH4}</h4>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });



    // Performance: Debounce scroll events
    function debounce(func, wait = 10) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    console.log('🎷 Manu Saxophonist website loaded successfully!');
});
