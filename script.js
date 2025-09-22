// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links ul li a');
    const logoLink = document.querySelector('.logo-link');
    const footerLinks = document.querySelectorAll('.footer-nav a');
    
    // Add logo link and footer links to smooth scrolling
    const allNavLinks = [...navLinksItems, logoLink, ...footerLinks];
    
    allNavLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = 'auto';
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
    
    // Smooth scrolling for all navigation links (including logo)
    allNavLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});

// Contact form handler - mailto fallback
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    // Create mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:official.mohdsakib@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Try Formspree first, if fails use mailto
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    
    // Show loading
    const submitBtn = document.querySelector('.btn[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Try to send via Formspree
    fetch('https://formspree.io/f/mdknzqko', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Formspree failed');
        }
    })
    .catch(error => {
        // Fallback to mailto
        console.log('Using mailto fallback');
        window.location.href = mailtoLink;
        document.getElementById('contact-form').reset();
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});