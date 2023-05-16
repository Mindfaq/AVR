// Set up matrix characters
const matrixCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?/0123456789';

// Store the interval ID
let matrixRainInterval;

// Function to create a matrix rain drop
function createDrop() {
  const drop = document.createElement('div');
  drop.classList.add('matrix');
  drop.style.left = Math.random() * window.innerWidth + 'px';
  drop.textContent = matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length));
  document.body.appendChild(drop);
}

// Function to start the matrix rain
function startMatrixRain() {
  matrixRainInterval = setInterval(createDrop, 100);
}

// Function to stop the matrix rain
function stopMatrixRain() {
  const elements = document.getElementsByClassName('matrix');
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
  clearInterval(matrixRainInterval);
}

// Start the matrix rain when the experiment is waiting to start
startMatrixRain();

// Stop the matrix rain when the experiment starts
window.onkeydown = function(event) {
  if (event.key === ' ') {
    stopMatrixRain();
    window.startExperiment();
  }
}
