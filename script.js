document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    function toggleMenu() {
        nav.classList.toggle('active');
        header.classList.toggle('menu-open');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-times');
            icon.classList.toggle('fa-bars');
        }
        
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Support both click and touch events
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
    }, { passive: false });
    
    // Close menu when clicking links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            header.classList.remove('menu-open');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            document.body.style.overflow = '';
        });
        
        // Add touch support for links
        link.addEventListener('touchend', function(e) {
            if (e.cancelable) e.preventDefault();
            this.click();
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animated-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate tech icons
    const techIcons = document.querySelectorAll('.tech-icons i');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
});