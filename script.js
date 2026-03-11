// --- HORIZONTAL SCROLL LOGIC ---
const gallerySection = document.querySelector('.gallery-section');
const stickyParent = document.querySelector('.sticky-parent');
const horizontalStrip = document.querySelector('.horizontal-strip');

function syncGallery() {
    // 1. Calculate EXACT width of the image strip
    const stripWidth = horizontalStrip.scrollWidth;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 2. Calculate the maximum amount we can slide left without showing the black void
    const maxSlide = stripWidth - windowWidth;
    
    // 3. Force the section height to perfectly match the slide duration
    const totalHeight = maxSlide + windowHeight;
    // The '!important' here forcefully overrides any CSS causing the gap
    gallerySection.style.setProperty('height', `${totalHeight}px`, 'important');
    
    // Save maxSlide to a dataset so the scroll function can use it instantly
    gallerySection.dataset.maxSlide = maxSlide;
}

// Run on load. (We don't run this on 'resize' because mobile address bars jumping up and down breaks the math)
window.addEventListener('load', syncGallery);
// A backup timer just in case your large high-res images take an extra second to load
setTimeout(syncGallery, 800); 

window.addEventListener('scroll', () => {
    // Pull the exact locking distance we calculated above
    const maxSlide = parseFloat(gallerySection.dataset.maxSlide) || (horizontalStrip.scrollWidth - window.innerWidth);
    const parentTop = gallerySection.getBoundingClientRect().top;
    
    if (parentTop <= 0) {
        // Convert the downward scroll into the leftward slide
        let slideAmount = Math.abs(parentTop);
        
        // THE HARD LOCK: This physically stops the images from sliding off the screen into the black space
        if (slideAmount >= maxSlide) {
            slideAmount = maxSlide;
        }
        
        horizontalStrip.style.transform = `translateX(-${slideAmount}px)`;
    } else {
        horizontalStrip.style.transform = `translateX(0px)`;
    }
});

// --- TEXT REVEAL ON SCROLL ---
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
