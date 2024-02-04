document.addEventListener('DOMContentLoaded', function () {
    const noButton = document.querySelector('button:nth-of-type(2)'); // Assuming it's the second button
    // Array of custom messages for the No button
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
        "You know there is a Yes button right there right??",
        "Nuh uh, wrong answer, try again!"
        // Add your own custom messages here
    ];

    noButton.addEventListener('mouseover', function () {
        moveButtonWithinViewport(noButton);
        changeButtonText(noButton, messages);
    });

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
        // Randomly select a new message from the array
        const messageIndex = Math.floor(Math.random() * messages.length);
        button.textContent = messages[messageIndex];
    }
});
