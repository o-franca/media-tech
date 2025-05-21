// main.js

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header Scroll Effect & Back to Top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonials Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.testimonial-dot');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialItems.forEach(item => {
        item.classList.remove('active');
        item.style.transform = 'translateX(100%)';
        item.style.opacity = '0';
    });
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    testimonialItems[index].classList.add('active');
    testimonialItems[index].style.transform = 'translateX(0)';
    testimonialItems[index].style.opacity = '1';
    
    currentIndex = index;
}

prevBtn.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = testimonialItems.length - 1;
    showTestimonial(index);
});

nextBtn.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= testimonialItems.length) index = 0;
    showTestimonial(index);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    let index = currentIndex + 1;
    if (index >= testimonialItems.length) index = 0;
    showTestimonial(index);
}, 5000);

// Pause rotation on hover
const slider = document.querySelector('.testimonials-slider');
slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
slider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        let index = currentIndex + 1;
        if (index >= testimonialItems.length) index = 0;
        showTestimonial(index);
    }, 5000);
});

// Skills Progress Animation
const skillBars = document.querySelectorAll('.skill-progress span');
let skillsAnimated = false;

function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    if (!skillsAnimated && sectionPosition < screenPosition) {
        animateSkills();
        skillsAnimated = true;
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    
    alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
    contactForm.reset();
});
