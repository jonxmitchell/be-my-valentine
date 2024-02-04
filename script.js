document.addEventListener('DOMContentLoaded', function () {
    const noButton = document.querySelector('button:nth-of-type(2)'); // Assuming it's the second button
    // Array of custom messages for the No button
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
        // Add your own custom messages here
    ];

    // Function to handle moving and changing text
    function handleInteraction() {
        moveButtonWithinViewport(noButton);
        changeButtonText(noButton, messages);
    }

    // Respond to mouseover and touchstart events
    noButton.addEventListener('mouseover', handleInteraction);
    noButton.addEventListener('touchstart', handleInteraction, {passive: true});

    function moveButtonWithinViewport(button) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        const maxX = viewportWidth - buttonWidth;
        const maxY = viewportHeight - buttonHeight;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        button.style.position = 'fixed';
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }

    function changeButtonText(button, messages) {
        const messageIndex = Math.floor(Math.random() * messages.length);
        button.textContent = messages[messageIndex];
    }
});
