/* Mobile Menu Toggle */
const nav = document.querySelector('.c-nav');
const toggle = document.querySelector('.c-header__toggle');
const links = document.querySelectorAll('.c-nav__link');

if (toggle) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

/* Close menu when clicking a link */
links.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

/* Theme Toggle */
const themeToggle = document.querySelector('.c-theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Update icon
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light-mode');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.removeItem('theme');
        }
    });
}

/* Smooth Scroll for Anchor Links (Enhanced) */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* Active Link on Scroll */
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    // Default to 'about' (hero) if at top
    if (window.scrollY < 100) {
        current = 'about';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for header height
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    links.forEach(link => {
        link.classList.remove('active');
        // Check if href matches current ID.
        // anchor.href returns full url, getAttribute('href') returns just the hash usually if written that way
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* Typewriter Effect */
const typeWriterElement = document.getElementById('typewriter');
const textToType = "enry Gabriel"; // Name surname to type
let typeIndex = 0;

function typeWriter() {
    if (typeWriterElement && typeIndex < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

/* Rotating Roles */
const rolesContainer = document.querySelector('.c-hero__roles');
const roles = [
    "Desenvolvedor Full Stack",
    "Solution Creator",
    "Tech Enthusiast"
];
let roleIndex = 0;

function rotateRoles() {
    if (!rolesContainer) return;

    const currentRole = rolesContainer.querySelector('.c-hero__role-text');
    if (!currentRole) return;

    // Fade out
    currentRole.style.opacity = '0';
    currentRole.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        currentRole.textContent = roles[roleIndex];
        // Fade in
        currentRole.style.opacity = '1';
    }, 500);
}

// Start rotation
if (rolesContainer) {
    setInterval(rotateRoles, 3000);
}
