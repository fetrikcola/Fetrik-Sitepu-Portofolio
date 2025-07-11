document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const navDots = document.querySelectorAll('.nav-dot');
    const slides = document.querySelectorAll('.slide');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    //-------------------------------------
    /**
     *  Scroll to specific section (Vertically)
     *  its based on var "index"
     *  using condition if index on slide, it will slide to the requested slide
     *  only when the slide is not open yet
     */
    function goToSection(index) {
        const targetSlide = slides[index];
        if (targetSlide) {
            targetSlide.scrollIntoView({ behavior: 'smooth' });

            // Update nav indicators
            navLinks.forEach((link, i) => {
                link.classList.toggle('active', i === index);
            });
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    // Handle click on nav links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToSection(index);

            // Close mobile menu
            navMenu?.classList.remove('active');
            mobileMenu?.classList.remove('active');
        });
    });

    // Handle click on nav dots (if used)
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSection(index);
        });
    });

    // Mobile menu toggle
    mobileMenu?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
            mobileMenu?.classList.remove('active');
        }
    });

    // Optional: Highlight nav item on scroll
    window.addEventListener('scroll', () => {
        let currentIndex = 0;
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
                currentIndex = index;
            }
        });
        navLinks.forEach((link, i) => link.classList.toggle('active', i === currentIndex));
        navDots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    });
});

// SKILL TABS SWITCHING
const skillTabs = document.querySelectorAll('.skill-tab');
const skillContents = document.querySelectorAll('.skill-content');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-skill');

        // remove active from all tabs & contents
        skillTabs.forEach(t => t.classList.remove('active'));
        skillContents.forEach(c => c.classList.remove('active'));

        // add active to current
        tab.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) targetContent.classList.add('active');
    });
});
