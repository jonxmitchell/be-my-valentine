document.addEventListener('DOMContentLoaded', function () {
    positionHeartsRandomlyAvoidingOverlap();
    configureNoButton();
    configureYesButton();
    checkPreviousResponse();
});

let placedHearts = []; // Tracks placed hearts and container bounds to avoid overlap

function positionHeartsRandomlyAvoidingOverlap() {
    const hearts = document.querySelectorAll('.heart');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    // Add a margin to avoid hearts too close to the container
    const margin = 50;
    const expandedContainerRect = {
        top: containerRect.top - margin,
        right: containerRect.right + margin,
        bottom: containerRect.bottom + margin,
        left: containerRect.left - margin,
    };
    placedHearts.push(expandedContainerRect); // Consider container in overlap checks

    hearts.forEach(heart => {
        let position;
        do {
            position = getRandomPosition(heart.offsetWidth, heart.offsetHeight);
        } while (isOverlappingAny(position, heart.offsetWidth, heart.offsetHeight) || isOverlappingContainer(position, heart.offsetWidth, heart.offsetHeight, expandedContainerRect));
        
        heart.style.position = 'fixed';
        heart.style.left = `${position.x}px`;
        heart.style.top = `${position.y}px`;
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

function isOverlappingContainer(newPosition, width, height, containerRect) {
    // Check if the heart's position overlaps with the expanded container area
    const heartRect = {
        left: newPosition.x,
        right: newPosition.x + width,
        top: newPosition.y,
        bottom: newPosition.y + height,
    };

    return !(heartRect.right < containerRect.left || 
             heartRect.left > containerRect.right || 
             heartRect.bottom < containerRect.top || 
             heartRect.top > containerRect.bottom);
}

function configureNoButton() {
    const noButton = document.querySelector('#noButton');
    const messages = [
        "Oh no, try again!",
        "Oops... Missed me!",
        "Not this time!",
        "Try again!",
        "Maybe next time!",
    ];

    noButton.addEventListener('mouseover', function() {
        moveButtonAvoidingOverlap(noButton);
        changeButtonText(noButton, messages);
    });
}

function moveButtonAvoidingOverlap(buttonToMove) {
    let newX, newY;
    do {
        newX = Math.random() * (window.innerWidth - buttonToMove.offsetWidth);
        newY = Math.random() * (window.innerHeight - buttonToMove.offsetHeight);
    } while (isOverlappingAny({x: newX, y: newY}, buttonToMove.offsetWidth, buttonToMove.offsetHeight));

    buttonToMove.style.position = 'fixed';
    buttonToMove.style.left = `${newX}px`;
    buttonToMove.style.top = `${newY}px`;
}

function changeButtonText(button, messages) {
    const messageIndex = Math.floor(Math.random() * messages.length);
    button.textContent = messages[messageIndex];
}

function configureYesButton() {
    const yesButton = document.querySelector('#yesButton');
    yesButton.addEventListener('click', function() {
        localStorage.setItem('valentineResponse', 'accepted');
        updateContainerForValentine(true);
    });
}

function updateContainerForValentine(isNewAcceptance = false) {
    const container = document.querySelector('.container');
    const valentinesDay = new Date('2024-02-14T00:00:00');

    if (isNewAcceptance) {
        container.innerHTML = `<h1 class="title">Thank You!</h1>
                               <p>You've made me the happiest by accepting to be my Valentine. Looking forward to our beautiful journey together.</p>
                               <div id="countdown"></div>`;
    } else {
        container.innerHTML = `<div id="countdown"></div>`;
    }

    const countdown = document.getElementById("countdown");
    const countdownReached = updateCountdown(valentinesDay, countdown);

    if (!countdownReached) {
        setInterval(function() {
            updateCountdown(valentinesDay, countdown);
        }, 1000);
    }
}

function updateCountdown(valentinesDay, countdownElement) {
    const now = new Date();
    const distance = valentinesDay - now;

    // Check if Valentine's Day has been reached or passed
    if (distance < 0) {
        countdownElement.innerHTML = `<h2>Happy Valentine's Day!</h2>
                                      <p>I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.I love you more than words can say.</p>`;

        // Use localStorage to check if we've already reloaded for Valentine's Day
        if (!localStorage.getItem('valentineReloaded')) {
            // Set a flag to prevent future reloads
            localStorage.setItem('valentineReloaded', 'true');

            // Wait a bit before reloading to allow users to see the message
            setTimeout(() => {
                location.reload();
            }, 5000); // Delay the refresh for 5 seconds
        }
        return true;
    } else {
        // Ensure we can reload next year when Valentine's Day comes around again
        localStorage.removeItem('valentineReloaded');
    }

    // If Valentine's Day hasn't been reached yet, continue showing the countdown
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `Countdown to Valentine's Day: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    return false;
}



function checkPreviousResponse() {
    const response = localStorage.getItem('valentineResponse');
    if (response === 'accepted') {
        updateContainerForValentine();
    }
}
