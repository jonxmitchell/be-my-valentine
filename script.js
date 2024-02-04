document.addEventListener('DOMContentLoaded', function () {
    positionHeartsRandomlyAvoidingContainer();
    configureNoButton();
});

function positionHeartsRandomlyAvoidingContainer() {
    const hearts = document.querySelectorAll('.heart');
    const container = document.querySelector('.container');
    // Define a safe margin around the container where hearts won't be placed
    const safeMargin = 100; // Adjust based on your layout

    hearts.forEach(heart => {
        let newX, newY, attempts = 0;
        do {
            newX = Math.random() * (window.innerWidth - heart.offsetWidth);
            newY = Math.random() * (window.innerHeight - heart.offsetHeight);
            attempts++;
            // Prevent infinite loop
            if (attempts > 100) break;
        } while (isHeartOverlappingContainer(newX, newY, heart, container, safeMargin));

        heart.style.position = 'fixed';
        heart.style.left = `${newX}px`;
        heart.style.top = `${newY}px`;
    });
}

function isHeartOverlappingContainer(x, y, heart, container, margin) {
    const containerRect = container.getBoundingClientRect();
    const expandedRect = {
        top: containerRect.top - margin,
        left: containerRect.left - margin,
        right: containerRect.right + margin,
        bottom: containerRect.bottom + margin
    };

    // Check if the heart's position is within the expanded container rect
    return (
        x < expandedRect.right &&
        x + heart.offsetWidth > expandedRect.left &&
        y < expandedRect.bottom &&
        y + heart.offsetHeight > expandedRect.top
    );
}

function configureNoButton() {
    const noButton = document.querySelector('#noButton'); // Updated selector to use ID
    const yesButton = document.querySelector('#yesButton'); // Assuming the Yes button has an ID
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
        // Add more messages as needed
    ];

    function handleInteraction() {
        moveButtonAvoidingOverlap(noButton, yesButton);
        changeButtonText(noButton, messages);
    }

    noButton.addEventListener('mouseover', handleInteraction);
    noButton.addEventListener('touchstart', handleInteraction, {passive: true});
}

function moveButtonAvoidingOverlap(buttonToMove, buttonToAvoid) {
    let newX, newY, attempts = 0;
    do {
        newX = Math.random() * (window.innerWidth - buttonToMove.offsetWidth);
        newY = Math.random() * (window.innerHeight - buttonToMove.offsetHeight);
        attempts++;
        // Prevent infinite loop
        if (attempts > 100) break;
    } while (isOverlapping(newX, newY, buttonToMove, buttonToAvoid));

    buttonToMove.style.position = 'fixed';
    buttonToMove.style.left = `${newX}px`;
    buttonToMove.style.top = `${newY}px`;
}

function isOverlapping(newX, newY, movingButton, staticButton) {
    const movingRect = movingButton.getBoundingClientRect();
    movingRect.left = newX;
    movingRect.top = newY;
    movingRect.right = newX + movingButton.offsetWidth;
    movingRect.bottom = newY + movingButton.offsetHeight;

    const staticRect = staticButton.getBoundingClientRect();

    return !(movingRect.right < staticRect.left ||
             movingRect.left > staticRect.right ||
             movingRect.bottom < staticRect.top ||
             movingRect.top > staticRect.bottom);
}

function changeButtonText(button, messages) {
    const messageIndex = Math.floor(Math.random() * messages.length);
    button.textContent = messages[messageIndex];
}
