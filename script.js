// HORIZONTAL SCROLL LOGIC
const stickyParent = document.querySelector('.sticky-parent');
const horizontalStrip = document.querySelector('.horizontal-strip');

// Removed the desktop-only restriction so the horizontal scroll works on mobile too!
window.addEventListener('scroll', () => {
    const parentTop = stickyParent.parentElement.getBoundingClientRect().top;

    if (parentTop <= 0) {
        let scrollAmount = parentTop; 
        horizontalStrip.style.transform = `translateX(${scrollAmount}px)`;
    } else {
        horizontalStrip.style.transform = `translateX(0px)`;
    }
});

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
    row.style.transition = `all 0.5s ease ${index * 0.1}s`; 
    observer.observe(row);
});
