const avatar = document.getElementById('avatar');
let position = 50; // Initial position of the avatar
let isFacingRight = true; // Check if the avatar is facing right or left

// Move the avatar left or right based on key input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && position > 0) {
        if (isFacingRight) {
            // Flip avatar image when facing left
            avatar.style.transform = 'scaleX(-1)';
            isFacingRight = false;
        }
        position -= 10;
    } else if (event.key === 'ArrowRight' && position < 100) {
        if (!isFacingRight) {
            // Flip avatar image when facing right
            avatar.style.transform = 'scaleX(1)';
            isFacingRight = true;
        }
        position += 10;
    }
    avatar.style.left = position + '%';
});

// Move the avatar to a given position when screen is clicked with mouse
document.addEventListener('click', (event) => {
    // Calculate the new position based on the mouse click coordinates
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;
    position = (clickX / screenWidth) * 100;

    // Update avatar position and flip image if necessary
    avatar.style.left = position + '%';
    if (position > 50 && !isFacingRight) {
        avatar.style.transform = 'scaleX(1)';
        isFacingRight = true;
    } else if (position < 50 && isFacingRight) {
        avatar.style.transform = 'scaleX(-1)';
        isFacingRight = false;
    }
});

// Toggle full-screen mode when button is clicked
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
    toggleFullscreen();
});

// Function to toggle full-screen mode
function toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
}
// 2


const choicesElem = document.getElementById('choices');
const feedbackElem = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const gameScreen = document.getElementById('gameScreen');

// Add event listener to choices
for (let i = 0; i < choicesElem.children.length; i++) {
  choicesElem.children[i].addEventListener('click', checkAnswer);
}

// Function to check the answer
function checkAnswer(event) {
  const selectedChoice = event.target.textContent;

  if (selectedChoice === 'CSS (correct answer)') {
    // Correct answer
    feedbackElem.textContent = 'Correct! ' + selectedChoice + ' is the intended styling language.';
    nextBtn.style.display = 'block';
  } else {
    // Incorrect answer
    feedbackElem.textContent = 'Incorrect! ' + selectedChoice + ' is not the intended styling language.';
  }

  // Disable choices after answering
  for (let i = 0; i < choicesElem.children.length; i++) {
    choicesElem.children[i].removeEventListener('click', checkAnswer);
  }
}

// Function to handle Next button click
nextBtn.addEventListener('click', moveToNextLevel);

// Function to move to next level
function moveToNextLevel() {
  // Hide mini-test dialog box
  document.getElementById('miniTestDialog').style.display = 'none';

  // Show game screen content
  gameScreen.innerHTML = '<h1>Congratulations!</h1><p>You passed the mini-test and advanced to the next level.</p>';
  // Add additional game screen content or logic for the next level
}