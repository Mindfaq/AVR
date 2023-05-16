// Create an AudioContext
let audioContext;

// Use only the higher frequency
let frequency = 880; // A5

// Use only the green color
let color = 'green';

// Array to store the results
let results = [];

// Specify the number of experiments for each type
let numExperiments = 6;

// Experiment plan
let experimentPlan = [];

// Populate the experiment plan
for(let i = 0; i < numExperiments; i++) {
  // Half the experiments will be of type 'sound', the other half will be 'visual'
  if(i < numExperiments / 2) {
    experimentPlan.push({ type: 'sound', frequency: frequency, color: null });
  } else {
    experimentPlan.push({ type: 'visual', frequency: null, color: color });
  }
}

// Function to shuffle the array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Shuffle the experiment plan at the beginning
shuffleArray(experimentPlan);

// Function to play a sound of a certain frequency
function playSound(frequency) {
  let oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioContext.destination);
  oscillator.start();
  setTimeout(() => { oscillator.stop(); }, 1000); // Stop after 1 second
}

// Function to show a color
function showColor(color) {
  document.body.style.backgroundColor = color;
}

// Function to start the experiment
function startExperiment() {
  // If there are no more tests left in the plan, don't start a new experiment
  if (experimentPlan.length === 0) {
    console.log('Experiment completed.');
    downloadButton.style.display = 'block';
    nameInput.style.display = 'block';
    return;
  }
  document.getElementById('startText').style.display = 'none';
  // Get the next test from the experiment plan
  let nextTest = experimentPlan.pop();

  // Create the AudioContext in response to the user gesture
  audioContext = new window.AudioContext();

  // Wait a random amount of time between 1 and 3 seconds, then either play the sound or show the color
  setTimeout(function() {
    let startTime = Date.now();

    if (nextTest.type === 'sound') {
      playSound(nextTest.frequency);
    } else {
      showColor(nextTest.color);
    }

    // When the user presses the spacebar, record their reaction time and save the result
    window.onkeydown = function(event) {
      if (event.key === ' ') {
        let endTime = Date.now();
        let reactionTime = endTime - startTime;

        console.log(`Reaction time for ${nextTest.type}: ${reactionTime}ms`);

        // Save the result
        results.push({
            type: nextTest.type,
            frequency: nextTest.type === 'sound' ? nextTest.frequency : 'N/A',
            color: nextTest.type === 'visual' ? nextTest.color : 'N/A',
            reactionTime: reactionTime
        });

        // Reset the background color
        if (nextTest.type === 'visual') {
            document.body.style.backgroundColor = '';
        }

        // Re-add the event listener to start the next test
        window.onkeydown = startOnSpace;
        }
    };
    }, 1000 + Math.random() * 2000);
}
          
// ...

// Function to download the results as a CSV file
function downloadResults() {
  let csvContent = resultsToCSV(results);
  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);
  let downloadLink = document.createElement('a');

  downloadLink.href = url;
  downloadLink.download = 'results.csv';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

let downloadButton = document.getElementById('downloadButton');

downloadButton.onclick = downloadResults;

// Function to start the experiment when the spacebar is pressed
function startOnSpace(event) {
  if (event.key === ' ') {
    startExperiment();
    // Remove the event handler so the experiment doesn't restart until it's finished
    window.onkeydown = null;
  }
}

window.onkeydown = startOnSpace;


// Function to convert the results array into a CSV format
function resultsToCSV(results) {
    let csvContent = 'Type of test,Sound frequency,Color,Reaction time\n';

    results.forEach(result => {
        csvContent += `${result.type},${result.frequency},${result.color},${result.reactionTime}\n`;
    });

    return csvContent;
}

// Function to download the results as a CSV file
function downloadResults() {
  let name = document.getElementById('nameInput').value;
  let csvContent = resultsToCSV(results);
  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);
  let downloadLink = document.createElement('a');

  downloadLink.href = url;
  downloadLink.download = name + '.csv';  // Use the input text as the filename
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

  
