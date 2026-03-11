// HORIZONTAL SCROLL LOGIC
const stickyParent = document.querySelector('.sticky-parent');
const horizontalStrip = document.querySelector('.horizontal-strip');

// Only run this logic on desktop (screen width > 768px)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        // Calculate how far down the user has scrolled relative to the gallery section
        const parentTop = stickyParent.parentElement.getBoundingClientRect().top;
        const parentHeight = stickyParent.parentElement.offsetHeight;
        const windowHeight = window.innerHeight;

        // If the top of the section hits the top of the viewport...
        if (parentTop <= 0) {
            // Calculate percentage scrolled within the section
            // We multiply by -1 to make it move left
            // The logic: As we scroll down vertically, move the strip left horizontally
            
            // Limit how far it scrolls (stop when end is reached)
            let scrollAmount = parentTop; 
            
            // Adjust speed factor if needed
            horizontalStrip.style.transform = `translateX(${scrollAmount}px)`;
        } else {
            horizontalStrip.style.transform = `translateX(0px)`;
        }
    });
}

// TEXT REVEAL ON SCROLL (Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select elements to animate
const serviceRows = document.querySelectorAll('.service-row');
serviceRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(30px)';
    row.style.transition = `all 0.5s ease ${index * 0.1}s`; // Staggered delay
    observer.observe(row);
});
