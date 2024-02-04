document.addEventListener('DOMContentLoaded', function () {
    // Position hearts in random locations
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        const maxX = window.innerWidth - heart.offsetWidth;
        const maxY = window.innerHeight - heart.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        heart.style.position = 'fixed'; // Use 'fixed' for viewport-relative positioning
        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;
    });

    // Configuration for the "No" button
    const noButton = document.querySelector('button:nth-of-type(2)'); // Assuming it's the second button
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
        "You know, there is a YES button there too right???",
        "You can't catch me hehehehe"

        // Add your own custom messages here
    ];

    function handleInteraction() {
        moveButtonWithinViewport(noButton);
        changeButtonText(noButton, messages);
    }

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
