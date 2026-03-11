// --- HORIZONTAL SCROLL LOGIC ---
const gallerySection = document.querySelector('.gallery-section');
const horizontalStrip = document.querySelector('.horizontal-strip');

function setupScroll() {
    // 1. Find exactly how far we need to move the strip left
    let moveAmount = horizontalStrip.scrollWidth - window.innerWidth;
    
    // 2. Make the section height equal to the screen height + the move amount. 
    // This perfectly matches the scroll distance, destroying the black gap.
    gallerySection.style.height = `${window.innerHeight + moveAmount}px`;
    gallerySection.dataset.moveAmount = moveAmount;
}

// Run immediately, and run again after 1 second to ensure images are fully loaded
window.addEventListener('load', setupScroll);
setTimeout(setupScroll, 500);
setTimeout(setupScroll, 1500);

window.addEventListener('scroll', () => {
    let offsetTop = gallerySection.getBoundingClientRect().top;
    
    // If the section hits the top of the screen (it is sticking)
    if (offsetTop <= 0) {
        let scrolledDistance = Math.abs(offsetTop);
        let maxMove = parseFloat(gallerySection.dataset.moveAmount);
        
        // HARD STOP: Do not let it slide past the last image
        if (scrolledDistance > maxMove) {
            scrolledDistance = maxMove;
        }
        
        horizontalStrip.style.transform = `translateX(-${scrolledDistance}px)`;
    } else {
        // If we scroll back up past the section, reset it
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
