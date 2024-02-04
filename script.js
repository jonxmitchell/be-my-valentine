document.addEventListener('DOMContentLoaded', function () {
    const noButton = document.querySelector('button:nth-of-type(2)'); // Assuming it's the second button
    noButton.addEventListener('mouseover', function () {
        // Calculate new positions, ensuring the button stays within the viewport
        const newX = Math.random() * (window.innerWidth - noButton.clientWidth);
        const newY = Math.random() * (window.innerHeight - noButton.clientHeight);

        // Apply new positions
        noButton.style.position = 'absolute';
        noButton.style.left = Math.max(0, newX) + 'px'; // Prevent the button from moving out of view horizontally
        noButton.style.top = Math.max(0, newY) + 'px'; // Prevent the button from moving out of view vertically
    });
});
