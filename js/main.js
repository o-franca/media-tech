// ============================================
// OF.MediaTech — Portfolio 2026
// ============================================

// ---- Mobile Menu ----
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ---- Header Scroll & Back to Top ----
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (backToTop) {
        backToTop.classList.toggle('show', window.scrollY > 400);
    }
}, { passive: true });

// ---- Smooth Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ---- Typing Effect ----
const typedElement = document.querySelector('.typed-text');
if (typedElement) {
    const phrases = [
        'Communications Consultant',
        'Digital Marketing Specialist',
        'No-Code Developer',
        'Sales & Telemarketing Pro',
        'Content Creator',
        'AI Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // pause before next
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 600);
}

// ---- Scroll Animations (IntersectionObserver) ----
const animatedElements = document.querySelectorAll('.animate-on-scroll');

if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ---- Animated Counters ----
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}

// ---- Portfolio Filter ----
const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const match = filter === 'all' || item.getAttribute('data-category') === filter;
            if (match) {
                item.classList.remove('filtered-out');
                item.style.display = '';
            } else {
                item.classList.add('filtered-out');
                setTimeout(() => {
                    if (item.classList.contains('filtered-out')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Service "See Projects" links trigger portfolio filter
document.querySelectorAll('.learn-more[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.getAttribute('data-filter');
        const targetBtn = document.querySelector(`.portfolio-filter-btn[data-filter="${filter}"]`);
        if (targetBtn) {
            document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => targetBtn.click(), 600);
        }
    });
});

// ---- Portfolio Modal ----
const modal = document.getElementById('portfolioModal');
const modalImage = modal ? modal.querySelector('.modal-image') : null;
const modalTitle = modal ? modal.querySelector('.modal-title') : null;
const modalDesc = modal ? modal.querySelector('.modal-desc') : null;
const modalMetrics = modal ? modal.querySelector('.modal-metrics') : null;
const modalTags = modal ? modal.querySelector('.modal-tags') : null;
const modalLink = modal ? modal.querySelector('.modal-link') : null;
const modalClose = modal ? modal.querySelector('.modal-close') : null;

if (modal) {
    // Open modal
    document.querySelectorAll('.portfolio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const item = btn.closest('.portfolio-item');
            if (!item) return;

            const img = item.querySelector('.portfolio-img');
            if (modalImage) modalImage.src = img ? img.src : '';
            if (modalTitle) modalTitle.textContent = item.dataset.title || '';
            if (modalDesc) modalDesc.textContent = item.dataset.desc || '';

            // Metrics
            if (modalMetrics) {
                const metrics = (item.dataset.metrics || '').split('|').filter(Boolean);
                modalMetrics.innerHTML = metrics.map(m =>
                    `<span class="modal-metric">${m.trim()}</span>`
                ).join('');
            }

            // Tags
            if (modalTags) {
                const tags = (item.dataset.tags || '').split(',').filter(Boolean);
                modalTags.innerHTML = tags.map(t =>
                    `<span class="modal-tag-item">${t.trim()}</span>`
                ).join('');
            }

            // Link
            if (modalLink) {
                const link = item.dataset.link || '#';
                modalLink.href = link;
                // Hide link if it's just a hash
                modalLink.style.display = link === '#' ? 'none' : '';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

// ---- Testimonials Slider ----
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.testimonial-dot');

if (testimonialItems.length > 0) {
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'translateX(100%)';
            item.style.opacity = '0';
        });

        if (dots.length > 0) {
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }

        testimonialItems[index].classList.add('active');
        testimonialItems[index].style.transform = 'translateX(0)';
        testimonialItems[index].style.opacity = '1';
        currentIndex = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let i = currentIndex - 1;
            if (i < 0) i = testimonialItems.length - 1;
            showTestimonial(i);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let i = currentIndex + 1;
            if (i >= testimonialItems.length) i = 0;
            showTestimonial(i);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate
    let autoInterval = setInterval(() => {
        let i = currentIndex + 1;
        if (i >= testimonialItems.length) i = 0;
        showTestimonial(i);
    }, 5000);

    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoInterval));
        slider.addEventListener('mouseleave', () => {
            autoInterval = setInterval(() => {
                let i = currentIndex + 1;
                if (i >= testimonialItems.length) i = 0;
                showTestimonial(i);
            }, 5000);
        });
    }

    // Touch swipe for testimonials
    let touchStartX = 0;
    const sliderEl = document.querySelector('.testimonials-slider');
    if (sliderEl) {
        sliderEl.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderEl.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // swipe left → next
                    let i = currentIndex + 1;
                    if (i >= testimonialItems.length) i = 0;
                    showTestimonial(i);
                } else {
                    // swipe right → prev
                    let i = currentIndex - 1;
                    if (i < 0) i = testimonialItems.length - 1;
                    showTestimonial(i);
                }
            }
        }, { passive: true });
    }
}

// ---- Contact Form (Formspree) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btnText = contactForm.querySelector('.btn-text');
        const btnLoading = contactForm.querySelector('.btn-loading');
        const formStatus = contactForm.querySelector('.form-status');
        const submitBtn = contactForm.querySelector('.submit-btn');

        // Check if Formspree is configured
        const action = contactForm.getAttribute('action');
        if (!action || action.includes('YOUR_FORM_ID')) {
            // Fallback: mailto
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            const mailtoLink = `mailto:oconnorfranca@gmail.com?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            window.location.href = mailtoLink;
            if (formStatus) {
                formStatus.textContent = 'Opening your email client...';
                formStatus.className = 'form-status success';
            }
            return;
        }

        // Show loading
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
        if (submitBtn) submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                }
                contactForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            if (formStatus) {
                formStatus.textContent = 'Something went wrong. Please try email or WhatsApp instead.';
                formStatus.className = 'form-status error';
            }
        } finally {
            if (btnText) btnText.style.display = '';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// ---- Dynamic Copyright Year ----
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Mobile: show portfolio overlay on tap (no hover on touch) ----
if ('ontouchstart' in window) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // If clicking the button inside overlay, let it bubble
            if (e.target.closest('.portfolio-btn')) return;

            // Toggle overlay visibility
            const wasActive = this.classList.contains('touch-active');
            // Remove from all
            portfolioItems.forEach(i => i.classList.remove('touch-active'));
            if (!wasActive) {
                this.classList.add('touch-active');
            }
        });
    });

    // Add touch-active CSS support
    const touchStyle = document.createElement('style');
    touchStyle.textContent = '.portfolio-item.touch-active .portfolio-overlay { opacity: 1; }';
    document.head.appendChild(touchStyle);
}
