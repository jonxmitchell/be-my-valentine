document.addEventListener('DOMContentLoaded', function () {
    positionHeartsRandomly();
    configureNoButton();
});

function positionHeartsRandomly() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        positionElementRandomly(heart);
    });
}

function configureNoButton() {
    const noButton = document.querySelector('button:nth-of-type(2)');
    const yesButton = document.querySelector('button:nth-of-type(1)');
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
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
        // Avoid an infinite loop
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

function positionElementRandomly(element) {
    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;
    element.style.position = 'fixed';
    element.style.left = `${Math.random() * maxX}px`;
    element.style.top = `${Math.random() * maxY}px`;
}
