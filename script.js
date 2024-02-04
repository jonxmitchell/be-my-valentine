document.addEventListener('DOMContentLoaded', function () {
    positionHeartsRandomlyAvoidingOverlap();
    configureNoButton();
});

let placedHearts = []; // Tracks placed hearts to avoid overlap

function positionHeartsRandomlyAvoidingOverlap() {
    const hearts = document.querySelectorAll('.heart');
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    placedHearts.push(containerRect); // Include container in overlap checks

    hearts.forEach(heart => {
        let position;
        do {
            position = getRandomPosition(heart.offsetWidth, heart.offsetHeight);
        } while (isOverlappingAny(position, heart.offsetWidth, heart.offsetHeight));
        
        heart.style.position = 'fixed';
        heart.style.left = `${position.x}px`;
        heart.style.top = `${position.y}px`;

        // Save the heart's position for future overlap checks
        placedHearts.push({
            left: position.x,
            top: position.y,
            right: position.x + heart.offsetWidth,
            bottom: position.y + heart.offsetHeight
        });
    });
}

function getRandomPosition(width, height) {
    return {
        x: Math.random() * (window.innerWidth - width),
        y: Math.random() * (window.innerHeight - height)
    };
}

function isOverlappingAny(newPosition, width, height) {
    const newRect = {
        left: newPosition.x,
        top: newPosition.y,
        right: newPosition.x + width,
        bottom: newPosition.y + height
    };

    return placedHearts.some(placedRect => 
        !(newRect.right < placedRect.left || 
          newRect.left > placedRect.right || 
          newRect.bottom < placedRect.top || 
          newRect.top > placedRect.bottom));
}

function configureNoButton() {
    const noButton = document.querySelector('#noButton');
    const yesButton = document.querySelector('#yesButton');
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
}

function moveButtonAvoidingOverlap(buttonToMove, buttonToAvoid) {
    let newX, newY;
    do {
        newX = Math.random() * (window.innerWidth - buttonToMove.offsetWidth);
        newY = Math.random() * (window.innerHeight - buttonToMove.offsetHeight);
    } while (isOverlapping(newX, newY, buttonToMove.offsetWidth, buttonToMove.offsetHeight, buttonToAvoid.getBoundingClientRect()));

    buttonToMove.style.position = 'fixed';
    buttonToMove.style.left = `${newX}px`;
    buttonToMove.style.top = `${newY}px`;
}

function isOverlapping(x, y, width, height, rectToAvoid) {
    const newRect = {
        left: x,
        top: y,
        right: x + width,
        bottom: y + height
    };

    return !(newRect.right < rectToAvoid.left || 
             newRect.left > rectToAvoid.right || 
             newRect.bottom < rectToAvoid.top || 
             newRect.top > rectToAvoid.bottom);
}

function changeButtonText(button, messages) {
    const messageIndex = Math.floor(Math.random() * messages.length);
    button.textContent = messages[messageIndex];
}
