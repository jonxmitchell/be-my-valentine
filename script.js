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
        "Oh no, try again! ( ◡‿◡ *)",
        "Oops... Missed me! （￣ε￣ʃƪ）",
        "Not this time!",
        "Try again! ❀◕ ‿ ◕❀",
        "Maybe next time!",
        "You know, there is a YES button there too right???",
        "You can't catch me hehehehe °˖✧◝(⁰▿⁰)◜✧˖°",
        "nuh uh, wrong answer, try again!!",
        "pssssst! The yes button over there ,_,",
        "no take backs, you hex'd me, you're stuck with me ლↂ‿‿ↂლ",
        "You can keep trying, there is no escape from this ٩(＾◡＾)۶",
        "uhm, excuse you, where do you think you're going?? (´∀｀•)",
        "naaaa you stuck with me, yes button is right there >:)"
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
        
        container.innerHTML = `<img src="./img/chipi-chipi-chapa-chapa-chipi.gif" class="chipi-chipi-chapa-chapa-chipi-gif" alt="chipi chipi chapa chapa chipi gif">
                               <h1 class="title"> <img src="./img/heart.gif" class="heart-gif" alt="heart gif"> YAAAAAAAAAAAAAAY!
                                    <img src="./img/heart.gif" class="heart-gif" alt="heart gif">
                                </h1>
                               <p>You've made me the happiest by accepting to be my Valentine. I look forward to our beautiful journey together.</p>
                               <p>Make sure to return back to this site on Valentine's day ♥</p>
                               <div id="countdown"></div>
                               <audio autoplay loop id="chipi-chipi">
                                <source src="./audio/chipi-chipi.mp3">
                               </audio>`;

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
        countdownElement.innerHTML = `<h2 style="color: #d10069"><img src="./img/heart.gif" class="heart-gif" alt="heart gif"> Happy Valentine's Day! <img src="./img/heart.gif" class="heart-gif" alt="heart gif"></h2>
                                      <p>My Dearest Aiydan,</p>

                                      <p>As I sit under the often grey but hopeful skies of the United Kingdom, my thoughts embark on a journey, traversing oceans,  navigating through the bustling cities and quiet towns of Germany, just to find you. Despite the formidable distance that separates us, my heart feels undeniably connected to yours, woven together by an invisible thread of love and affection that knows no boundaries.</p>

                                      <p>Counting down the days until June feels like waiting for rain in a drought - eagerly anticipated and much needed. The thought of holding you in my arms is the beacon that guides me through the longest of nights and the dullest of days. I miss you more than a British summer misses the sun.</p>
                                      
                                      <p>Our love story may not follow the easiest path, challenged by miles and time zones, yet it's a journey I cherish deeply. Your remarkable ability to show unwavering love, care, and support from afar has only deepened my affection for you. Your messages are my daily highlights, your voice a soothing melody that calms my storms, and your laughter a reminder of the joy that awaits us.</p>
                                      
                                      <p>The times we spend together, though virtual, are filled with an intimacy and connection that many search for their entire lives. Our sleep calls, in particular, bring an unparalleled sense of peace and comfort, knowing you're just on the other end. Falling asleep to the sound of you being there and waking up to your voice or a message from you makes the distance feel inconsequential. It's in these moments that I feel closest to you, enveloped in an invisible embrace that spans continents.</p>
                                      
                                      <p>The saying goes, home is where the heart is, from that I can truly feel at home when I am with you, proving my heart belongs with you. I love you with every fibre in my body, I would give my all for you and to ensure you are always okay and protected, you will always be my number one in my life. You honest bring so much light and happiness into my life and I am so honoured to call you my life long soul mate and partner. I believe there is nothing in this world that could stop us from achieving everything we set out to achieve in this life together.</p>
                                      
                                      <p>As we count down the days until we can share the same space, breathe the same air, and create new memories, I hold onto the thought of our next meeting with a heart full of anticipation and love. The simple joys of being together, from exploring new places to enjoying quiet moments side by side, are what I yearn for the most. Until then, I find solace in our shared dreams and the nightly ritual of our calls, which continue to bridge the gap between us.</p>
                                      
                                      <p>With every beat of my heart and every breath I take, I am evermore grateful for you and the love we share. Until we can be together again, know that you are my first thought in the morning and my last at night, the peace in my chaos, and the home in my heart.</p>
                                      
                                      <p>With all my love and more,</p>
                                      
                                      <p>Jon (Your Teddy ♥) </p>
                                      
                                      <p>x</p>

                                      <img src="./img/cute-bears-love.gif" class="cute-bears-love-gif" alt="cute bears love gif">
                                      `;

        // Use localStorage to check if we've already reloaded for Valentine's Day
        if (!localStorage.getItem('valentineReloaded')) {
            // Set a flag to prevent future reloads
            localStorage.setItem('valentineReloaded', 'true');
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
