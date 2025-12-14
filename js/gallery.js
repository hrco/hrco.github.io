// gallery.js: Initializes scroll-snap behavior and sets up event listeners.

document.addEventListener('DOMContentLoaded', () => {
    // Select all carousel containers
    const carousels = document.querySelectorAll('.photo-carousel');

    carousels.forEach(carousel => {
        // Find the inner grid/scrolling element
        const scroller = carousel.querySelector('.photo-grid');
        if (!scroller) return;

        // Apply a class to enable CSS scroll-snap (modern browsers)
        scroller.classList.add('scroll-snap-enabled');

        // Optional: Simple touch detection for robust swiping on all touch devices
        let touchStartX = 0;
        let touchDeltaX = 0;

        scroller.addEventListener('touchstart', (e) => {
            // Record the starting X position of the touch
            touchStartX = e.touches[0].clientX;
            touchDeltaX = 0;
        }, { passive: true });

        scroller.addEventListener('touchmove', (e) => {
            // Calculate movement delta
            touchDeltaX = e.touches[0].clientX - touchStartX;
        }, { passive: true });

        scroller.addEventListener('touchend', () => {
            // We rely primarily on CSS scroll-snap, but this block can be used 
            // for custom navigation logic if necessary (e.g., swipe thresholds).
            
            // For this minimal implementation, we let CSS handle the snap effect.
            // If the user wants specific navigation behavior (like indicators), 
            // the logic would go here.
        });
    });
});