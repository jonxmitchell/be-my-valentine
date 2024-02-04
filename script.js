document.addEventListener('DOMContentLoaded', function () {
    const noButton = document.querySelector('button:nth-of-type(2)'); // Assuming it's the second button

    noButton.addEventListener('mouseover', function () {
        // Ensure the button stays within the viewport
        moveButtonWithinViewport(noButton);
    });

    function moveButtonWithinViewport(button) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        // Calculate max possible X and Y positions to keep the button fully visible
        const maxX = viewportWidth - buttonWidth;
        const maxY = viewportHeight - buttonHeight;

        // Generate random new positions within the constraints
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Correcting positions to prevent the button from disappearing off the screen
        newX = Math.max(0, Math.min(newX, maxX)); // Ensures newX is between 0 and maxX
        newY = Math.max(0, Math.min(newY, maxY)); // Ensures newY is between 0 and maxY

        // Apply the new positions
        button.style.position = 'fixed'; // Use 'fixed' to position relative to the viewport
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }
});
