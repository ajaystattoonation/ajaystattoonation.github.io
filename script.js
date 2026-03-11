// --- HORIZONTAL SCROLL LOGIC ---
const gallerySection = document.querySelector('.gallery-section');
const stickyParent = document.querySelector('.sticky-parent');
const horizontalStrip = document.querySelector('.horizontal-strip');

// 1. Calculate exact scroll height so there are NO black gaps
function updateGalleryHeight() {
    // Measure the exact width of all images combined
    const stripWidth = horizontalStrip.scrollWidth;
    // Calculate the distance needed to scroll to the end
    const scrollDistance = stripWidth - window.innerWidth;
    // Set the section height exactly to that distance
    gallerySection.style.height = `${scrollDistance + window.innerHeight}px`;
}

// Run the math when page loads and if screen rotates
window.addEventListener('load', updateGalleryHeight);
window.addEventListener('resize', updateGalleryHeight);

// 2. The slide effect
window.addEventListener('scroll', () => {
    const parentTop = gallerySection.getBoundingClientRect().top;
    
    if (parentTop <= 0) {
        // Cap the movement so it stops EXACTLY on the last image
        const maxTranslate = horizontalStrip.scrollWidth - window.innerWidth;
        let scrollAmount = Math.min(Math.abs(parentTop), maxTranslate);
        
        horizontalStrip.style.transform = `translateX(-${scrollAmount}px)`;
    } else {
        horizontalStrip.style.transform = `translateX(0px)`;
    }
});

// --- TEXT REVEAL ON SCROLL (Observer) ---
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const serviceRows = document.querySelectorAll('.service-row');
serviceRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(30px)';
    row.style.transition = `all 0.5s ease ${index * 0.1}s`; 
    observer.observe(row);
});
