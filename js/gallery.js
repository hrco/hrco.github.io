/**
 * gallery.js - Scroll-snap carousel (mostly harmless)
 * "Like hyperspace, but for photos"
 */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.photo-carousel').forEach(carousel => {
        const scroller = carousel.querySelector('.photo-grid');
        if (!scroller) return;

        scroller.classList.add('scroll-snap-enabled');

        // Touch handling for enhanced swipe
        let startX = 0;
        scroller.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        scroller.addEventListener('touchmove', (e) => {
            // Delta calculated but primarily relying on CSS scroll-snap
        }, { passive: true });
    });
});
