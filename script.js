document.addEventListener('DOMContentLoaded', function () {
    positionHeartsRandomlyAvoidingOverlap();
    configureNoButton();
    configureYesButton();
    checkPreviousResponse();
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

    noButton.addEventListener('mouseover', function() {
        moveButtonAvoidingOverlap(noButton, yesButton);
        changeButtonText(noButton, messages);
    });
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

    const avoidRect = rectToAvoid;

    return !(newRect.right < avoidRect.left || 
             newRect.left > avoidRect.right || 
             newRect.bottom < avoidRect.top || 
             newRect.top > avoidRect.bottom);
}

function changeButtonText(button, messages) {
    const messageIndex = Math.floor(Math.random() * messages.length);
    button.textContent = messages[messageIndex];
}

function configureYesButton() {
    const yesButton = document.querySelector('#yesButton');
    yesButton.addEventListener('click', function() {
        localStorage.setItem('valentineResponse', 'accepted');
        updateContainerForValentine();
    });
}

function updateContainerForValentine() {
    const container = document.querySelector('.container');
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 1, 5); // February 14th
    if (now > valentinesDay) {
        valentinesDay.setFullYear(now.getFullYear() + 1);
    }
    
    container.innerHTML = `<h1>Thank You!</h1>
                           <p>You've made me the happiest by accepting to be my Valentine. Looking forward to our beautiful journey together.</p>
                           <div id="countdown"></div>`;

    const countdown = document.getElementById("countdown");
    updateCountdown(valentinesDay, countdown);

    const countdownInterval = setInterval(function() {
        if (!updateCountdown(valentinesDay, countdown)) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function updateCountdown(valentinesDay, countdownElement) {
    const now = new Date().getTime();
    const distance = valentinesDay.getTime() - now;

    if (distance < 0) {
        countdownElement.innerHTML = `<h2>Happy Valentine's Day!</h2>
                                      <p>I love you more than words can say.</p>`;
        return false;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `Countdown to Valentine's Day: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    return true;
}

function checkPreviousResponse() {
    const response = localStorage.getItem('valentineResponse');
    if (response === 'accepted') {
        updateContainerForValentine();
    }
}
