let currentSlide = 0;
const totalSlides = 6;
const container = document.getElementById('container');
const navDots = document.querySelectorAll('.nav-dot');
const skillTabs = document.querySelectorAll('.skill-tab');
const skillContents = document.querySelectorAll('.skill-content');

// Navigation function
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    container.style.transform = `translateX(-${slideIndex * 100}vw)`;
    
    // Update nav dots
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Nav dots click event
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

// Touch/swipe navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
}

// Skills tab functionality
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const skillType = tab.dataset.skill;
        
        // Remove active class from all tabs and contents
        skillTabs.forEach(t => t.classList.remove('active'));
        skillContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(skillType).classList.add('active');
    });
});

// Mouse wheel navigation
let isScrolling = false;
document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    setTimeout(() => isScrolling = false, 800);
    
    if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else if (e.deltaY < 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
});

// Add click functionality to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 150);
    });
});